let text = ['to be, or not to be, that is the question']
let tokenized_text = ['to', 'be', 'or', 'not', 'to','be', 'that','is' ,'the' ,'question']

var svg = d3.select("div");
svg.selectAll('p')
    .data(tokenized_text)
    .enter()
    .append('p')
    .attr("x", function(d,i){return 100 * ((i*2) % 3)})
    .attr("y", function(d,i){return 20 * ( Math.floor(i/3) ) })
    .text(function(d){return d});