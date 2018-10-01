function buildMetadata(sample) {
   d3.json("/metadata/"+sample).then((metadata) => {
   var selector = d3.select("#sample-metadata");
   d3.select("#sample-metadata").html("");
   Object.entries(metadata).forEach(([key, value]) => 
   d3.select("#sample-metadata").append("div").html(`${key}:${value}`));
  }); 
};

function buildCharts(sample) {
  d3.json("/samples/"+sample).then((samdata) =>{
    
  
  //Pie Chart 
  var data1 = [{
    values: samdata.sample_values.slice(0,10),
    labels:samdata.otu_ids.slice(0,10),
    hovertext:samdata.otu_labels.slice(0,10),
    type: "pie"
  }];

  var layout = {
    height:400,
    width:500
  };
//Gauge Chart
// Enter a speed between 0 and 180
var level = 35;
// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9,50/9, 50],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3','1-2','0-1',''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(190, 200, 75, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(200, 210, 110, .5)', 'rgba(200, 210, 100, .5)',
                         'rgba(200, 226, 150, .5)','rgba(200, 230, 200, .5)',
                         'rgba(220, 230, 200, .5)',
                         'rgba(255, 255, 255, 0)']},
  //labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  //hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout1 = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title:'Belly Button Washing Frequency<br>Scrubs per week',
  Speed: 0-100,
  height:400,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};


//Bubble Chart
var trace3 = {
  x: samdata.otu_ids,
  y: samdata.sample_values ,
  mode: 'markers+text',
  hovertext:samdata.otu_labels,
  marker: {
    color:  samdata.otu_ids,
    size: samdata.sample_values,
  }
};

var data2 = [trace3];
var layout3 = {
  title: 'Otu_ids Vs Sample_Values',
  xaxis:{title:"Otu_ids"},
  yaxis:{title:"Sample Values"},
  showlegend: false,
  height: 600,
  width:1200
};

Plotly.newPlot("bubble", data2, layout3);
Plotly.newPlot('gauge', data, layout1);
Plotly.newPlot("pie", data1, layout);
});
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
