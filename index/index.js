//-----------------------------------------------functions------------------------------------------------
function setNodesPreProcessing() {//setNodesPartOne
	// Here we're setting the nodes
	g.setNode('sentence vector', {
	  label: original_sentence,
	  style: 'fill: aqua'
	});
	g.setNode('pre_processing', {//
	  label: 'Pre Processing',
	  clusterLabelPos: 'top',
	  style: 'fill: white'
	});
	g.setNode('array_form', {
	  label: 'array form',
	  clusterLabelPos: 'bottom',
	  style: 'fill: #ffd47f'
	});
	// Set the parents to define which nodes belong to which cluster
	g.setParent('array_form', 'pre_processing');//
	g.setParent('sentence vector', 'array_form');
	// Set up edges, no special attributes.
	g.setEdge('original sentence', 'sentence vector');//
	// Round the corners of the nodes
	g.nodes().forEach(function (v) {
	  var node = g.node(v);
	  node.rx = node.ry = 5;
	});
  }
function setNodesTokenization() {//setNodesPartTwo
	// Here we're setting the nodes
	tokens.forEach(setTokenNode);
	g.setNode('tokenization', {
	  label: 'Tokens',
	  clusterLabelPos: 'top',
	  style: 'fill: #5f9488'
	});
	// Set the parents to define which nodes belong to which cluster
	g.setParent('tokenization', 'pre_processing');
	var i;
	for (i = 0; i < tokens.length; i++) {
	  g.setParent('token'.concat(i.toString()), 'tokenization');
	}
	// Set up edges, no special attributes.
	for (i = 0; i < tokens.length; i++) {
	  g.setEdge('sentence vector', 'token'.concat(i.toString()));
	}
	// Round the corners of the nodes
	g.nodes().forEach(function (v) {
	  var node = g.node(v);
	  node.rx = node.ry = 5;
	});
  }
function setLowcaseTokens() {
	// Here we're setting the nodes
	lowcase_tokens.forEach(setTokenNode);
	g.setNode('low_case', {
		label: 'Lower case',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	  });
	// Set the parents to define which nodes belong to which cluster
	g.setParent('low_case', 'pre_processing');
	for (i = tokens.length; i < tokens.length + lowcase_tokens.length; i++) {
		g.setParent('token'.concat(i.toString()), 'low_case');
	}
	// Set up edges, no special attributes.
	for (i = 0; i < tokens.length; i++) {
		var lowcase_index = i + tokens.length;
		g.setEdge('token'.concat(i.toString()), 'token'.concat(lowcase_index.toString()));
	}
	// Round the corners of the nodes
	g.nodes().forEach(function(v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});
}

function setNoSpecialCharTokens() {
	// Here we're setting the nodes
	no_special_char_tokens.forEach(setTokenNode);
	g.setNode('no_special_character_token', {
		label: 'Removing Special Characters',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	  });
	// Set the parents to define which nodes belong to which cluster
	g.setParent('no_special_character_token', 'pre_processing');
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + no_special_char_tokens.length; i++) {
		g.setParent('token'.concat(i.toString()), 'no_special_character_token');
	}
	// Set up edges, no special attributes.
	var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
	for (i = 0; i < tokens.length; i++) {
		if (tokens[i].match(format)){
			continue;
		} 
		var no_special_character_token_index = i + sum_of_nodes_of_tokens;
		var lowcase_index = i + tokens.length;
		g.setEdge('token'.concat(lowcase_index.toString()), 'token'.concat(no_special_character_token_index.toString()));
	}
	// Round the corners of the nodes
	g.nodes().forEach(function(v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});
}
function setTokenWithoutStopwords() {
	// Here we're setting the nodes
	tokens_with_removed_stopwords.forEach(setTokenNode);
	g.setNode('stopwords_removal', {
		label: 'Stopwords Removal',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	  });
	// Set the parents to define which nodes belong to which cluster
	g.setParent('stopwords_removal', 'pre_processing');
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.setParent('token'.concat(i.toString()), 'stopwords_removal');
	}
	// Set up edges, no special attributes.
	var count = tokens_with_removed_stopwords.length;
	for (i = 0; i < tokens.length; i++) {
		if (stopwords.includes(no_special_char_tokens[i])){
			continue;
		}
		else{
			result = tokens_with_removed_stopwords.length - count;
			if (result == tokens_with_removed_stopwords.length) {
				break;
			} else {
				count = count - 1;
				var tokens_with_removed_stopwords_index = result + sum_of_nodes_of_tokens;
				var no_special_character_token_index = i + lowcase_tokens.length + tokens.length;
				g.setEdge('token'.concat(no_special_character_token_index.toString()), 'token'.concat(tokens_with_removed_stopwords_index.toString()));
			}
		}
	}
	// Round the corners of the nodes
	g.nodes().forEach(function(v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});
}
function setTokenNode(item, index, arr) {
	if (arr == lowcase_tokens) {
		var index = index + tokens.length;
	} else if (arr == no_special_char_tokens) {
		var index = index + lowcase_tokens.length + tokens.length;
	} else if (arr == tokens_with_removed_stopwords) {
		var index = index + lowcase_tokens.length + tokens.length + no_special_char_tokens.length;
	}
  
	g.setNode('token'.concat(index.toString()), {
	  label: item
	});
}
function centerGraph() {
	var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
	svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
	svg.attr("height", g.graph().height + 40);
}
// --------------------------------------------------------main------------------------------------------------------
// Create the input graph
var g = new dagreD3.graphlib.Graph({
  compound: true
})
  .setGraph({})
  .setDefaultEdgeLabel(function () {
    return {};
  });
var original_sentence = '"Computer Science is no more about computers than Astronomy is about telescopes".';
var tokens = ['"Computer', 'Science', 'is', 'no', 'more', 'about', 'computers', 'than', 'Astronomy', 'is', 'about', 'telescopes".'];
var lowcase_tokens = ['"computer', 'science', 'is', 'no', 'more', 'about', 'computers', 'than', 'astronomy', 'is', 'about', 'telescopes".'];
var no_special_char_tokens = ['computer', 'science', 'is', 'no', 'more', 'about', 'computers', 'than', 'astronomy', 'is', 'about', 'telescopes'];
var tokens_with_removed_stopwords = ['computer', 'science', 'computers', 'astronomy', 'telescopes'];
var stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
  'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at',
  'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up',
  'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
  'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
  't', 'can', 'will', 'just', 'don', 'should', 'now'];

g.setNode('original sentence', {//Exemplo escolhido
  label: original_sentence
});

var svg1 = d3.select("svg");
svg1.append('rect')//Primeiro botão p/ acionar
  .attr('width', 50)
  .attr('height', 20)
  .attr('fill', 'blue')
  .attr('x', 10)
  .attr('y', 10)
  .attr('stroke', 'yellow')
  .attr('stroke-width', 5)
  .on('mousedown', function () {

    var svg = d3.select("svg > g");//limpar renderizacao anterior
    svg.selectAll("*").remove();

    setNodesPreProcessing();//setNodesPartOne

    render(d3.select("svg g"), g);

    centerGraph();

    d3.select(this).remove();
  });

svg1.append('rect')//Segundo botão p/ acionar
  .attr('width', 50)
  .attr('height', 20)
  .attr('fill', 'blue')
  .attr('x', 10)
  .attr('y', 50)
  .attr('stroke', 'yellow')
  .attr('stroke-width', 5)
  .on('mousedown', function () {

    var svg = d3.select("svg > g");//limpar renderizacao anterior
    svg.selectAll("*").remove();

    setNodesTokenization();
	setLowcaseTokens();
	setNoSpecialCharTokens();
	setTokenWithoutStopwords();
    render(d3.select("svg g"), g);

    centerGraph();

    d3.select(this).remove();
  });

g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG pre_processing so that we can translate the final graph.
var svg = d3.select("svg"),
  svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

centerGraph();