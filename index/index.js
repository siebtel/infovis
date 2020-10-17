let text = ['to be, or not to be, that is the question']
let tokenized_text = ['to', 'be', 'or', 'not', 'to','be', 'that','is' ,'the' ,'question']

var svg = d3.select("svg");
svg.selectAll('text')
    .data(tokenized_text)
    .enter()
    .append('text')
    .attr("x", function(d,i){return 50 * ((i+10) % 10)})
    .attr("y", function(d,i){return 70 })
    .text(function(d, i){return d});