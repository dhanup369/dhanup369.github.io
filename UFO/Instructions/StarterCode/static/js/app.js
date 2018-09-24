// from data.js
var tableData = data;

//Default Display 
var tbody = d3.select("tbody");
tableData.forEach(function(ufo) {
var row = tbody.append("tr");
Object.entries(ufo).forEach(function([key, value]) {
var cell = tbody.append("td");
cell.text(value);
});
});
// Filter Options!
var submit = d3.select("#filter-btn");
submit.on("click", function() {
// Prevent the page from refreshing
d3.event.preventDefault();
//Deleting the previous filter results
d3.select("tbody").html("");

//Filter Definitions based on Data,State,Shape (We can add more oprions though)
var filters={
datetime:d3.select("#datetime").node().value,
state:d3.select("#state").node().value,
shapes:d3.select("#shape").node().value,
};

console.log(filters.datetime);
console.log(filters.state);
console.log(filters.shapes);

//Conditions to filter the table based on the filter field entries
if(filters.datetime!="" && filters.state!="" && filters.shapes!=""){
filterData = tableData.filter(obj => obj.datetime == filters.datetime && obj.state == filters.state && obj.shape == filters.shapes);
}
else if(filters.datetime!="" && filters.state!="" && filters.shapes==""){
var filterData = tableData.filter(obj => obj.datetime == filters.datetime && obj.state == filters.state || obj.shape == filters.shapes);
}
else if(filters.datetime!="" && filters.state=="" && filters.shapes!=""){
var filterData = tableData.filter(obj => obj.datetime == filters.datetime || obj.state == filters.state && obj.shape == filters.shapes);
}
else if(filters.datetime!="" && filters.state=="" && filters.shapes==""){
var filterData = tableData.filter(obj => obj.datetime == filters.datetime || obj.state == filters.state || obj.shape == filters.shapes);
}
else if(filters.datetime=="" && filters.state=="" && filters.shapes==""){
var filterData = tableData.filter(obj => obj.datetime == filters.datetime || obj.state == filters.state || obj.shape == filters.shapes);
}
else {var tbody = d3.select("tbody");
tableData.forEach(function(ufo) {
var row = tbody.append("tr");
Object.entries(ufo).forEach(function([key, value]) {
var cell = tbody.append("td");
cell.text(value);
});
});
};

console.log(filterData)
//Displaying the filter data on the table body
var tbody = d3.select("tbody");
filterData.forEach(function(ufo) {
var row = tbody.append("tr");
Object.entries(ufo).forEach(function([key, value]) {
var cell = tbody.append("td");
cell.text(value);
});
});
});