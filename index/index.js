let text = ['to be, or not to be, that is the question']
let tokenized_text = ['to', 'be', 'or', 'not', 'to','be', 'that','is' ,'the' ,'question']

var svg = d3.select("svg");
var text = svg.selectAll('text')
    .data(tokenized_text)
    .enter().append('text')
    .attr("x", function(d,i){return 100 * (i % 3)})
    .attr("y", function(d,i){return 20 * ( Math.floor(i/3) ) })
    .text(function(d){return d});