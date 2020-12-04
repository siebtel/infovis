//-----------------------------------------------functions------------------------------------------------

function display(stepCallback, highlited) {
  stepCallback();
}

function set_explanation(index) {
  explanation.transition().style("opacity", 0).duration(800);
  explanation.transition().delay(800).text(texts[index]);
  explanation.transition().delay(800).style("opacity", 1).duration(1000);
}

function tokenization() {
  set_explanation(1);
  // resetting eventual accomulations of bracets sekected in previous interactions

  d3.select("#sentence").text().replaceAll("[", "").replaceAll("]", "").replaceAll(",", ""); // it is not a good idea to replace commas

  //d3.select("#sentence").text().replaceAll(/(\],)+?, (\[)+?/g, "");
  // replace logi
  var tokenized = "[" + d3.select("#sentence").text().replaceAll(" ", "], [") + "]";
  d3.select("#sentence").transition().style("opacity", 0).duration(500);
  d3.select("#sentence").transition().delay(500).text(tokenized);
  d3.select("#sentence").transition().delay(500).style("opacity", 1).duration(500);
  //d3.select("#sentence").transition().style("opacity", 0).duration(1000);
  //d3.select("#tokenization").transition().delay(999).attr("opacity", 1).duration(1000);
}

function lowercase() {
  //tokenization();
  set_explanation(2);
  d3.selectAll(".low").transition().style("fill", "red").duration(1000);
  d3.select("#tokenization").transition().delay(2000).attr("class", "lowerCase");
  //d3.selectAll(".low").transition().delay(2000).style("fill", "black").duration(1000);
}

function removingSpecial() {
  tokenization();
  set_explanation(3);
  d3.selectAll(".special").transition().style("fill", "red").duration(1000);
  d3.selectAll(".special").transition().delay(1000).style("opacity", 0).duration(1000);
}

function stopwords() {
  tokenization();
  set_explanation(4);
  d3.selectAll(".removal").transition().style("fill", "red").duration(1000);
  d3.selectAll(".removal").transition().delay(1000).style("opacity", 0).duration(1000);
}

function stemming() {
  tokenization();
  set_explanation(5);
  d3.selectAll(".ste").transition().style("fill", "red").duration(1000);
  d3.selectAll(".ste").transition().delay(1000).style("opacity", 0).duration(1000);
}

//##########################################################Globals##########################################################
var svg = d3.select("div");
var sentenca = d3.select("#sentence");
var tokens = d3.select("#tokenization");
var explanation = d3.selectAll("div#section span");
var texts = ["An example of pre-processing in Natural Language Processing. This visualization shows examples of techniques used to transform raw text into just a text that we need.", "Take the sentence and divide into various tokens, i.e. segment of the text.",
  "Turns all uppercased character into lowercase", "Removes all special characters.",
  "A stopword is an ordinarily used word on a text (e.g. “is”, “a”, “an”, “on”). We usually remove them to remain only significant words.",
  "Stemming makes an approximation of words which canchange by number or other part-of-speech specification. There are many different types of implementations; one of the most well-known is the Porter’sstemming algorithm [Porter 1980], which removes most commons morphological endings from words in English."
];

// --------------------------------------------------------main------------------------------------------------------

//d3.select(".teste").classed(lowerCase, false);

sentenca.attr("transform", "translate(3,80)");
sentenca.attr("stroke", "blue")
  .attr("stroke-width", ".2px");

d3.select("#tokenization").attr("opacity", 0);
tokens.attr("transform", "translate(3,80)");

explanation.text(texts[0]);
