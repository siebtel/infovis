//-----------------------------------------------functions------------------------------------------------
function resetFunctions(){
  if (state == 1) {
    d3.select("#tokenization").style("opacity", 1);
    //uppercase
    d3.select(".low").attr("class", "upperCase");
    d3.selectAll(".low").style("color", "black");

    d3.selectAll(".special").style("color", "black");
    d3.selectAll(".special").style("opacity", 1);

    d3.selectAll(".removal").transition().style("color", "black");
    d3.selectAll(".removal").style("opacity", 1);

    d3.selectAll(".ste").transition().style("color", "black");
    d3.selectAll(".ste").style("opacity", 1);
  } else {
    
  }
}

function display(stepCallback, highlited) {
  stepCallback();
}

function set_explanation(index) {
  explanation.transition().style("opacity", 0).duration(800);	
  explanation.transition().delay(800).text(texts[index]);
  explanation.transition().delay(800).style("opacity", 1).duration(1000);
}

function tokenization() {
  if (visualizationStarted == true) {
    resetFunctions();
  } else {
    visualizationStarted = true
  }
  state = 1;
  set_explanation(1);
  d3.select("#sentence").transition().style("opacity", 0).duration(1000);
  $("#sentence").replaceWith( $("#tokenization"));
  document.getElementById("tokenization").style.display = "block";
  d3.select("#tokenization").transition().delay(1000).style("opacity", 1).duration(1000);
}

function lowercase() {
  set_explanation(2);
	d3.selectAll(".low").transition().style("color", "red").duration(1000);
  d3.select("#tokenization").transition().delay(1000).attr("class", "lowerCase");
  d3.selectAll(".low").transition().delay(1000).style("color", "black").duration(1000);
}

function removingSpecial() {
  set_explanation(3);
  d3.selectAll(".special").transition().style("color", "red").duration(1000);
  d3.selectAll(".special").transition().delay(1000).style("opacity", 0).duration(1000);
}

function stopwords() {
  set_explanation(4);
  d3.selectAll(".removal").transition().style("color", "red").duration(1000);
  d3.selectAll(".removal").transition().delay(1000).style("opacity", 0).duration(1000);
}

function stemming() {
  set_explanation(5);
  d3.selectAll(".ste").transition().style("color", "red").duration(1000);
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
var visualizationStarted = false;
var state = 0;
// --------------------------------------------------------main------------------------------------------------------

sentenca.attr("transform", "translate(3,80)");
sentenca.attr("stroke", "blue")
.attr("stroke-width", ".2px");

explanation.text(texts[0]);