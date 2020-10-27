//-----------------------------------------------functions------------------------------------------------
function setNodesPreProcessing() {//setNodesPartOne
	// Here we're setting the nodes
	g.setNode('sentence vector', {
		label: original_sentence,
		style: 'fill: #00ffd0'
	});
	g.setNode('pre_processing', {//
		label: 'Pre Processing',
		clusterLabelPos: 'top',
		style: 'fill:white'
	});
	g.setNode('array_form', {
		label: 'Sentence in array',
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

	//Removendo passo Tokenization
	for (i = 0; i < tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'tokenization');
	}
	g.removeNode('tokenization');

	//Removendo passo LowCaseTokens
	for (i = tokens.length; i < tokens.length + lowcase_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'low_case');
	}
	g.removeNode('low_case');

	//Removendo passo NoSpecialCharTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + no_special_char_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'no_special_character_token');
	}
	g.removeNode('no_special_character_token');

	//Removendo passo TokenWithoutStopwords
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stopwords_removal');
	}
	g.removeNode('stopwords_removal');

	//Removendo passo StemmedTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + stemmed_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stemmed_tokens');
	}
	g.removeNode('stemmed_tokens');

}
function setNodesTokenization() {//setNodesPartTwo
	//Removendo passo NodesPreProcessing - exclusao do seu anterior imediato
	g.removeNode('sentence vector');
	g.removeNode('pre_processing');
	g.removeNode('array_form');
	setNodesPreProcessing();//chamando novamente
	g.setNode('sentence vector', {//clareando
		label: original_sentence,
		style: 'fill: white'
	});

	g.setNode('pre_processing', {//clareando
		label: 'Pre Processing',
		clusterLabelPos: 'top',
		style: 'fill:white'
	});

	tokens.forEach(setTokenNodeColor);
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

	//Removendo passo LowCaseTokens
	for (i = tokens.length; i < tokens.length + lowcase_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'low_case');
	}
	g.removeNode('low_case');

	//Removendo passo NoSpecialCharTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + no_special_char_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'no_special_character_token');
	}
	g.removeNode('no_special_character_token');

	//Removendo passo TokenWithoutStopwords
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stopwords_removal');
	}
	g.removeNode('stopwords_removal');

	//Removendo passo StemmedTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + stemmed_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stemmed_tokens');
	}
	g.removeNode('stemmed_tokens');
}
function setLowcaseTokens() {
	//Removendo passo Tokenization, o passo anterior imediato
	var i;
	for (i = 0; i < tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'tokenization');
	}
	g.removeNode('tokenization');
	setNodesTokenization();//e recriando

	// Here we're setting the nodes
	lowcase_tokens.forEach(setTokenNodeColor);
	g.setNode('low_case', {
		label: 'Lower case',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	});
	g.setNode('tokenization', {//clarear a etapa anterior
		label: 'Tokens',
		clusterLabelPos: 'top',
		style: 'fill: white'
	});
	tokens.forEach(setTokenNode);//clarear os nodes anteriores
	
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
	g.nodes().forEach(function (v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});

	//Removendo passo NoSpecialCharTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + no_special_char_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'no_special_character_token');
	}
	g.removeNode('no_special_character_token');

	//Removendo passo TokenWithoutStopwords
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stopwords_removal');
	}
	g.removeNode('stopwords_removal');

	//Removendo passo StemmedTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + stemmed_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stemmed_tokens');
	}
	g.removeNode('stemmed_tokens');

}
function setNoSpecialCharTokens() {
	//Removendo o passo anterior imediato 
	for (i = tokens.length; i < tokens.length + lowcase_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'low_case');
	}
	g.removeNode('low_case');
	setLowcaseTokens();//e recriando

	// Here we're setting the nodes
	no_special_char_tokens.forEach(setTokenNodeColor);
	g.setNode('no_special_character_token', {
		label: 'Removing Special Characters',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	});

	g.setNode('low_case', {//clarear a etapa anterior
		label: 'Lower case',
		clusterLabelPos: 'top',
		style: 'fill: white'
	});
	lowcase_tokens.forEach(setTokenNode);//clarear os nodes anteriores

	// Set the parents to define which nodes belong to which cluster
	g.setParent('no_special_character_token', 'pre_processing');
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + no_special_char_tokens.length; i++) {
		g.setParent('token'.concat(i.toString()), 'no_special_character_token');
	}
	// Set up edges, no special attributes.
	var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
	for (i = 0; i < tokens.length; i++) {
		if (tokens[i].match(format)) {
			continue;
		}
		var no_special_character_token_index = i + sum_of_nodes_of_tokens;
		var lowcase_index = i + tokens.length;
		g.setEdge('token'.concat(lowcase_index.toString()), 'token'.concat(no_special_character_token_index.toString()));
	}
	// Round the corners of the nodes
	g.nodes().forEach(function (v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});

	//Removendo passo TokenWithoutStopwords
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stopwords_removal');
	}
	g.removeNode('stopwords_removal');

	//Removendo passo StemmedTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + stemmed_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stemmed_tokens');
	}
	g.removeNode('stemmed_tokens');

}
function setTokenWithoutStopwords() {
	//removendo passo anterior
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + no_special_char_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'no_special_character_token');
	}
	g.removeNode('no_special_character_token');
	//g.removeNode('no_special_char_tokens');
	setNoSpecialCharTokens();//e recriando

	// Here we're setting the nodes
	tokens_with_removed_stopwords.forEach(setTokenNodeColor);
	g.setNode('stopwords_removal', {
		label: 'Stopwords Removal',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	});
	g.setNode('no_special_character_token', {//clarear a etapa anterior
		label: 'Removing Special Characters',
		clusterLabelPos: 'top',
		style: 'fill: white'
	});
	no_special_char_tokens.forEach(setTokenNode);//clarear os nodes anteriores

	// Set the parents to define which nodes belong to which cluster
	g.setParent('stopwords_removal', 'pre_processing');
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.setParent('token'.concat(i.toString()), 'stopwords_removal');
	}
	// Set up edges, no special attributes.
	var count = tokens_with_removed_stopwords.length;
	for (i = 0; i < tokens.length; i++) {
		if (stopwords.includes(no_special_char_tokens[i])) {
			continue;
		}
		else {
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
	g.nodes().forEach(function (v) {
		var node = g.node(v);
		node.rx = node.ry = 5;
	});
	//Removendo passo StemmedTokens
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + stemmed_tokens.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stemmed_tokens');
	}
	g.removeNode('stemmed_tokens');
}
function setStemmedTokens() {
	//removendo o passo anterior
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + tokens_with_removed_stopwords.length; i++) {
		g.removeNode('token'.concat(i.toString()), 'stopwords_removal');
	}
	g.removeNode('stopwords_removal');
	setTokenWithoutStopwords();//e recriando

	// Here we're setting the nodes
	stemmed_tokens.forEach(setTokenNodeColor);
	g.setNode('stemmed_tokens', {
		label: 'Stemming',
		clusterLabelPos: 'top',
		style: 'fill: #5f9488'
	});
	g.setNode('stopwords_removal', {//clarear a etapa anterior
		label: 'Stopwords Removal',
		clusterLabelPos: 'top',
		style: 'fill: white'
	});

	tokens_with_removed_stopwords.forEach(setTokenNode);//clarear os nodes anteriores

	// Set the parents to define which nodes belong to which cluster
	g.setParent('stemmed_tokens', 'pre_processing');
	var sum_of_nodes_of_tokens = tokens.length + lowcase_tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	for (i = sum_of_nodes_of_tokens; i < sum_of_nodes_of_tokens + stemmed_tokens.length; i++) {
		g.setParent('token'.concat(i.toString()), 'stemmed_tokens');
	}
	// Set up edges, no special attributes.
	for (i = 0; i < stemmed_tokens.length; i++) {
		var stemmed_tokens_index = i + sum_of_nodes_of_tokens;
		var tokens_with_removed_stopwords_index = i + sum_of_nodes_of_tokens - tokens_with_removed_stopwords.length;
		g.setEdge('token'.concat(tokens_with_removed_stopwords_index.toString()), 'token'.concat(stemmed_tokens_index.toString()));
	}
	// Round the corners of the nodes
	g.nodes().forEach(function (v) {
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
	} else if (arr == stemmed_tokens) {
		var index = index + lowcase_tokens.length + tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	}

	g.setNode('token'.concat(index.toString()), {
		label: item
	});
}
function setTokenNodeColor(item, index, arr) {
	if (arr == lowcase_tokens) {
		var index = index + tokens.length;
	} else if (arr == no_special_char_tokens) {
		var index = index + lowcase_tokens.length + tokens.length;
	} else if (arr == tokens_with_removed_stopwords) {
		var index = index + lowcase_tokens.length + tokens.length + no_special_char_tokens.length;
	} else if (arr == stemmed_tokens) {
		var index = index + lowcase_tokens.length + tokens.length + no_special_char_tokens.length + tokens_with_removed_stopwords.length;
	}

	g.setNode('token'.concat(index.toString()), {
		label: item,
		style: 'fill: #00ffd0'
	});
}
function centerGraph() {
	var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
	svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
	svg.attr("height", g.graph().height + 40);
}

function display(stepCallback) {
	var svg = d3.select("svg > g");//limpar renderizacao anterior
	svg.selectAll("*").remove();
	d3.selectAll("g.nodes")
		.attr('fill', "white")
	stepCallback();
	render(d3.select("svg g"), g);
	centerGraph();
	d3.select(this).remove();
}
//##########################################################Globals##########################################################
var original_sentence = '"Computer Science is no more about computers than Astronomy is about telescopes".';
var tokens = ['"Computer', 'Science', 'is', 'no', 'more', 'about', 'computers', 'than', 'Astronomy', 'is', 'about', 'telescopes".'];
var lowcase_tokens = ['"computer', 'science', 'is', 'no', 'more', 'about', 'computers', 'than', 'astronomy', 'is', 'about', 'telescopes".'];
var no_special_char_tokens = ['computer', 'science', 'is', 'no', 'more', 'about', 'computers', 'than', 'astronomy', 'is', 'about', 'telescopes'];
var tokens_with_removed_stopwords = ['computer', 'science', 'computers', 'astronomy', 'telescopes'];
var stemmed_tokens = ['comput', 'scienc', 'comput', 'astronomi', 'telescop'];
var stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
	'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
	'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
	'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at',
	'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up',
	'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
	'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
	't', 'can', 'will', 'just', 'don', 'should', 'now'];

// --------------------------------------------------------main------------------------------------------------------
// Create the input graph
var g = new dagreD3.graphlib.Graph({
	compound: true
})
	.setGraph({})
	.setDefaultEdgeLabel(function () {
		return {};
	});

g.setNode('original sentence', {//Exemplo escolhido
	label: original_sentence
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