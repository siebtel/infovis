// Create the input graph
var g = new dagreD3.graphlib.Graph({
  compound: true
})
.setGraph({})
.setDefaultEdgeLabel(function() {
  return {};
});

// Here we're setting the nodes
g.setNode('original sentence', {
label: 'To be or not to be, that is the question'
});
g.setNode('sentence vector', {
label: 'To be or not to be, that is the question',
style: 'fill: aqua'
});
g.setNode('token 1', {
label: 'To'
});
g.setNode('token 2', {
label: 'be'
});
g.setNode('token 3', {
label: 'or'
});
g.setNode('token 4', {
label: 'not'
});
g.setNode('token 5', {
label: 'to'
});
g.setNode('token 6', {
label: 'be'
});
g.setNode('token 7', {
label: ','
});
g.setNode('token 8', {
label: 'that'
});
g.setNode('token 9', {
label: 'is'
});
g.setNode('token 10', {
label: 'the'
});
g.setNode('token 11', {
label: 'question'
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
g.setNode('bottom_group', {
label: 'Tokens',
style: 'fill: #5f9488'
});

// Set the parents to define which nodes belong to which cluster
g.setParent('top_group', 'group');
g.setParent('bottom_group', 'group');
g.setParent('sentence vector', 'top_group');
g.setParent('token 1', 'bottom_group');
g.setParent('token 2', 'bottom_group');
g.setParent('token 3', 'bottom_group');
g.setParent('token 4', 'bottom_group');
g.setParent('token 5', 'bottom_group');
g.setParent('token 6', 'bottom_group');
g.setParent('token 7', 'bottom_group');
g.setParent('token 8', 'bottom_group');
g.setParent('token 9', 'bottom_group');
g.setParent('token 10', 'bottom_group');
g.setParent('token 11', 'bottom_group');
// Set up edges, no special attributes.
g.setEdge('original sentence', 'sentence vector');
g.setEdge('sentence vector', 'token 1');
g.setEdge('sentence vector', 'token 2');
g.setEdge('sentence vector', 'token 3');
g.setEdge('sentence vector', 'token 4');
g.setEdge('sentence vector', 'token 5');
g.setEdge('sentence vector', 'token 6');
g.setEdge('sentence vector', 'token 7');
g.setEdge('sentence vector', 'token 8');
g.setEdge('sentence vector', 'token 9');
g.setEdge('sentence vector', 'token 10');
g.setEdge('sentence vector', 'token 11');

g.nodes().forEach(function(v) {
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