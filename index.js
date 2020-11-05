//-----------------------------------------------functions------------------------------------------------

function display(stepCallback, highlited) {
  stepCallback();
}

function tokenization() {
  d3.select("#sentence").transition().style("opacity", 0).duration(1000);
  d3.select("#tokenization").transition().delay(999).attr("opacity", 1).duration(1000);
}

function lowercase() {
  d3.selectAll(".low").transition().style("fill", "red").duration(1000);
  d3.select("#tokenization").transition().delay(2000).attr("class", "lowerCase");
  d3.selectAll(".low").transition().delay(2000).style("fill", "black").duration(1000);
}

function removingSpecial() {
  d3.selectAll(".special").transition().style("fill", "red").duration(1000);
  d3.selectAll(".special").transition().delay(1000).style("opacity", 0).duration(1000);
}

function stopwords() {
  d3.selectAll(".removal").transition().style("fill", "red").duration(1000);
  d3.selectAll(".removal").transition().delay(1000).style("opacity", 0).duration(1000);
}

function stemming() {
  d3.selectAll(".ste").transition().style("fill", "red").duration(1000);
  d3.selectAll(".ste").transition().delay(1000).style("opacity", 0).duration(1000);
}

//##########################################################Globals##########################################################
var svg = d3.select("div");
var sentenca = d3.select("#sentence");
var tokens = d3.select("#tokenization");

// --------------------------------------------------------main------------------------------------------------------

//d3.select(".teste").classed(lowerCase, false);

sentenca.attr("transform", "translate(3,80)");
sentenca.attr("stroke", "blue")
  .attr("stroke-width", ".2px");

d3.select("#tokenization").attr("opacity", 0);
tokens.attr("transform", "translate(3,80)");
