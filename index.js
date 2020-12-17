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
  var tokenized = "[" + d3.select("#sentence").text().replaceAll(" ", "],[") + "]";
  d3.select("#sentence").transition().style("opacity", 0).duration(500);
  d3.select("#sentence").transition().delay(500).text(tokenized);
  d3.select("#sentence").transition().delay(500).style("opacity", 1).duration(500);
}

function lowercase() {
  set_explanation(2);
 
  d3.select("#sentence").transition().delay(2000).attr("class", "lowerCase");
}

function removingSpecial() {
  set_explanation(3);
  var removespec = d3.select("#sentence").text().replaceAll('"', '').replaceAll('.', '');
  d3.select("#sentence").transition().delay(500).text(removespec);
}

function stopwords() {
  set_explanation(4);
  var removeword = d3.select("#sentence").text().replaceAll('[is],[no],[more],[about],', '')
  .replaceAll('[than],', '').replaceAll('[is],[about],', '');
  d3.select("#sentence").transition().delay(500).text(removeword);
}

function stemming() {
  set_explanation(5);
  var stem = d3.select("#sentence").text().replaceAll('er]', ']').replaceAll('ers]', ']')
  .replaceAll('y', '').replaceAll('e]', ']').replaceAll('es]', ']');
  d3.select("#sentence").transition().delay(500).text(stem);
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
