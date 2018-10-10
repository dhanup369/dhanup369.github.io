// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";
//var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label = "In Poverty(%)";
  }
  else if (chosenXAxis === "age") {
    var label = "Age(Median)";
  }
  else
    {var label = "House Hold Income(Median)" ;
}

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    
    .offset([-50,50])
      .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(data,err) {
    if (err) throw err;
    
    data.forEach(function(data1) {

    data1.poverty = +data1.poverty;
    data1.age = +data1.age;
    data1.healthcare= +data1.healthcare;
    data1.income= +data1.income;
    data1.obesity= +data1.obesity;
    data1.smokes= +data1.smokes;
  });

// xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

// Create y scale function
// var yLinearScale1 = d3.scaleLinear()
//    .domain([d3.min(census, d => d[chosenYAxis]) * 0.8,
//            d3.max(census, d => d[chosenYAxis]) * 1.1])
//    .range([height, 0]);

//  return yLinearScale1;
// }


  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);


  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .attr("fill", "lightblue")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height +20})`);

  var povertylabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty(%)");

  var householdincome = labelsGroup.append("text")
    .attr("x", -100)
    .attr("y", 40)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive1", true)
    .text("Household Income(Median)");

  var agemedian = labelsGroup.append("text")
    .attr("x", -50)
    .attr("y", 60)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive2", true)
    .text("Age(Median)");





  // var labelsGroup2 = chartGroup1.append("g")
  //   // .attr("transform", `translate(${width / 2}, ${height + 20})`);

  // var healthcare = labelsGroup2.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 50 - margin.left)
  //   .attr("x", 0 - (height / 2))
  //   .attr("value", "healthcare")
  //   .attr("dy", "1em")
  //   .classed("active", true)
  //   .text("Lacks Healthcare (%)");

  // var smokes = labelsGroup2.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 30 - margin.left)
  //   .attr("x", 0 - (height / 2))
  //   .attr("value", "smokes")
  //   .attr("dy", "1em")
  //   .classed("inactive", true)
  //   .text("Smokes (%)");

  // var obesity = labelsGroup2.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 10 - margin.left)
  //   .attr("x", 0 - (height / 2))
  //   .attr("value", "obesity")
  //   .attr("dy", "1em")
  //   .classed("inactive", true)
  //   .text("Obese (%)");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare(%)");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          povertylabel
            .classed("active", true)
            .classed("inactive", false);
          householdincome
            .classed("active", false)
            .classed("inactive", true);
          agemedian
            .classed("active", false)
            .classed("inactive", true);

        }
        else if (chosenXAxis === "householdincome"){
          povertylabel
            .classed("active", false)
            .classed("inactive", true);
          householdincome
            .classed("active", true)
            .classed("inactive", false);
          agemedian
            .classed("active", false)
            .classed("inactive", true);

        }
      else{
        povertylabel
            .classed("active", false)
            .classed("inactive", true);
          householdincome
            .classed("active", false)
            .classed("inactive", true);
          agemedian
            .classed("active", true)
            .classed("inactive", false);

      }
    }
      
    });
});



// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Import Data
// d3.csv("data.csv")
//   .then(function(data) {

//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     data.forEach(function(data) {
//       data.poverty = +data.poverty;
//       data.healthcare = +data.healthcare;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     var xLinearScale = d3.scaleLinear()
//       .domain([8, d3.max(data, d => d.poverty)])
//       .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "8")
//     .attr("fill", "lightblue")
//     .attr("opacity", ".75");
             
    

  //   // Step 6: Initialize tool tip
  //   // ==============================
  //   var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([60, -60])
  //     .html(function(d) {
  //       return (`${d.state}<br>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`);
  //     });

  //   // Step 7: Create tooltip in the chart
  //   // ==============================
  //   chartGroup.call(toolTip);

  //   // Step 8: Create event listeners to display and hide the tooltip
  //   // ==============================
  //   circlesGroup.on("mouseover", function(data) {
  //     toolTip.show(data, this);
  //   })
  //     // onmouseout event
  //     .on("mouseout", function(data, index) {
  //       toolTip.hide(data);
  //     });

  //   // Create axes labels
  //   chartGroup.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left + 40)
  //     .attr("x", 0 - (height / 2))
  //     .attr("dy", "1em")
  //     .attr("class", "axisText")
  //     .text("Lacks Healthcare(%)");

  //   chartGroup.append("text")
  //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  //     .attr("class", "axisText")
  //     .text("In Poverty(%)");
  // });