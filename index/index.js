// Create the input graph
var g = new dagreD3.graphlib.Graph({
  compound: true
})
  .setGraph({})
  .setDefaultEdgeLabel(function () {
    return {};
  });
var original_sentence = 'Computer Science is no more about computers than Astronomy is about telescopes.';
var tokens = ['Computer', 'Science', 'is', 'no', 'more', 'about', 'computers', 'than', 'Astronomy', 'is', 'about', 'telescopes.'];
var lowcase_tokens = ['computer', 'science', 'is', 'no', 'more', 'about', 'computers', 'than', 'astronomy', 'is', 'about', 'telescopes.'];
var just_words_tokens = ['computer', 'science', 'is', 'no', 'more', 'about', 'computers', 'than', 'astronomy', 'is', 'about', 'telescopes'];
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

    render(d3.select("svg g"), g);

    centerGraph();

    d3.select(this).remove();
  });

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
  g.setParent('array_form', 'pre_processing');//
  g.setParent('sentence vector', 'array_form');
  g.setEdge('original sentence', 'sentence vector');//

  g.nodes().forEach(function (v) {
    var node = g.node(v);
    // Round the corners of the nodes
    node.rx = node.ry = 5;
  });
}

function setNodesTokenization() {//setNodesPartTwo
  tokens.forEach(setTokenNode);
  lowcase_tokens.forEach(setTokenNode);

  g.setNode('tokenization', {
    label: 'Tokens',
    style: 'fill: #5f9488'
  });
  g.setNode('low_case', {
    label: 'Lower case',
    style: 'fill: #5f9488'
  });
  g.setParent('tokenization', 'pre_processing');
  g.setParent('low_case', 'pre_processing');
  setNodesPreProcessing();//setNodesPartOne
  var i;
  for (i = 0; i < tokens.length; i++) {
    g.setParent('token'.concat(i.toString()), 'tokenization');
  }
  for (i = tokens.length; i < tokens.length + lowcase_tokens.length; i++) {
    g.setParent('token'.concat(i.toString()), 'low_case');
  }
  // Set up edges, no special attributes.
  for (i = 0; i < tokens.length; i++) {
    g.setEdge('sentence vector', 'token'.concat(i.toString()));
  }
  for (i = 0; i < tokens.length; i++) {
    var lowcase_index = i + tokens.length;
    g.setEdge('token'.concat(i.toString()), 'token'.concat(lowcase_index.toString()));
  }
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    // Round the corners of the nodes
    node.rx = node.ry = 5;
  });
}

function setTokenNode(item, index, arr) {
  if (arr == lowcase_tokens) {
    var index = index + tokens.length;
  } else if (arr == just_words_tokens) {
    var index = index + lowcase_tokens.length + tokens.length;
  }

  g.setNode('token'.concat(index.toString()), {
    label: item
  });
}

g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Center the graph
function centerGraph() {
  var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
  svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
  svg.attr("height", g.graph().height + 40);
}

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG pre_processing so that we can translate the final graph.
var svg = d3.select("svg"),
  svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

centerGraph();