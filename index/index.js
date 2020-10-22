// Create the input graph
var g = new dagreD3.graphlib.Graph({
  compound: true
})
  .setGraph({})
  .setDefaultEdgeLabel(function () {
    return {};
  });
var original_sentence = 'To be or not to be, that is the question';
tokens = ['To', 'be', 'or', 'not', 'to', 'be', ',', 'that', 'is', 'the', 'question']

g.setNode('original sentence', {//Exemplo escolhido
  label: original_sentence
});

var svg1 = d3.select("svg");
svg1.append('rect')//Primeiro botão para acionar
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

    // Here we're setting the nodes
    g.setNode('original sentence', {
      label: original_sentence
    });
    g.setNode('sentence vector', {
      label: original_sentence,
      style: 'fill: aqua'
    });

    g.setNode('group', {
      label: 'Tokenizer',
      clusterLabelPos: 'top',
      style: 'fill: white'
    });
    g.setNode('top_group', {
      label: 'vector',
      clusterLabelPos: 'bottom',
      style: 'fill: #ffd47f'
    });
    g.setParent('top_group', 'group');
    g.setParent('sentence vector', 'top_group');
    g.setEdge('original sentence', 'sentence vector');

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    render(d3.select("svg g"), g);

    // Center the graph
    var xCenterOffset = (svg1.attr("width") - g.graph().width) / 2;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg1.attr("height", g.graph().height + 40);

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

    g.setNode('original sentence', {
      label: original_sentence
    });
    g.setNode('sentence vector', {
      label: original_sentence,
      style: 'fill: aqua'
    });

    tokens.forEach(setTokens);

    g.setNode('group', {
      label: 'Tokenizer',
      clusterLabelPos: 'top',
      style: 'fill: white'
    });
    g.setNode('top_group', {
      label: 'vector',
      clusterLabelPos: 'bottom',
      style: 'fill: #ffd47f'
    });
    g.setNode('bottom_group', {
      label: 'Tokens',
      style: 'fill: #5f9488'
    });

    g.setParent('top_group', 'group');
    g.setParent('bottom_group', 'group');
    g.setParent('sentence vector', 'top_group');

    var i;
    for (i = 0; i < tokens.length; i++) {
      var index = i + 1
      g.setParent('token'.concat(index.toString()), 'bottom_group');
    }
    // Set up edges, no special attributes.
    g.setEdge('original sentence', 'sentence vector');
    for (i = 0; i < tokens.length; i++) {
      var index = i + 1
      g.setEdge('sentence vector', 'token'.concat(index.toString()));
    }

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    render(d3.select("svg g"), g);

    // Center the graph
    var xCenterOffset = (svg1.attr("width") - g.graph().width) / 2;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg1.attr("height", g.graph().height + 40);

    d3.select(this).remove();
  });

function setTokens(item, index) {
  var index = index + 1;
  g.setNode('token'.concat(index.toString()), {
    label: item
  });
}

g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
  svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

// Center the graph
var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);