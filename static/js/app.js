

function optionChanged(idChoosen){
      console.log(idChoosen);
      d3.json("samples.json").then((data) => {
        getDemographicInfo(data, parseInt(idChoosen));
      });
}

function init(){
  console.log("here INIT");


  d3.json("samples.json").then((data) => {
    var idNo = data.names;
    var idName1 = parseInt(data.names[0]);
    console.log(idName1);
    var selector = d3.select("#selDataset");
          
    idNo.forEach((id) => {
        selector
            .append("option")
            .text(id)
            .property("value", id);
        
        //console.log ("id",id);
    });
   
   
    getDemographicInfo(data, idName1);
   
  });
}

function getDemographicInfo(data, idName1){

  //var idName = parseInt(idName1)

  function filterOTU(metadata) {
    // console.log("metadata=", metadata.id);
    // console.log("idName1=", idName1);
      return metadata.id === idName1;
  }

  var filteredMetadata = data.metadata.filter(filterOTU);
  console.log("filteredMetadata=", filteredMetadata);

  var id = filteredMetadata.map(metadatas => metadatas.id);
  var ethnicity = filteredMetadata.map(metadatas => metadatas.ethnicity);
  console.log("ethnicity =", ethnicity);

  var gender = filteredMetadata.map(metadatas => metadatas.gender);
  var age = filteredMetadata.map(metadatas => metadatas.age);
  var location = filteredMetadata.map(metadatas => metadatas.location);
  var bbtype = filteredMetadata.map(metadatas => metadatas.bbtype);
  var wfreq = filteredMetadata.map(metadatas => metadatas.wfreq);

  var demoInfo = d3.select("#sample-metadata"); 
  
  demoInfo.html("");
  var row6 = demoInfo.append("P");
  row6.text("ID: " + id);

  var row0 = demoInfo.append("P");
  row0.text("Ethnicityr: " + ethnicity);

  var row1 = demoInfo.append("P");
  row1.text("Gender: " + gender);

  var row2 = demoInfo.append("P");
  row2.text("Age: " + age);

  var row3 = demoInfo.append("P");
  row3.text("Location: " + location);

  var row4 = demoInfo.append("P");
  row4.text("BBType: " + bbtype);

  var row5 = demoInfo.append("P");
  row5.text("WFreq: " + wfreq);
}
//15-02-07

//  d3.selectAll("selDataset").on("change", updatePage);

// function updatePage() {
// Use D3 to select the dropdown menu
  // console.log("here");
  // var dropdownMenu = d3.selectAll("#selectOption").node();
// Assign the dropdown menu item ID to a variable
  // var dropdownMenuID = dropdownMenu.id;
// Assign the dropdown menu option to a variable
  // var selectedOption = dropdownMenu.value;

//  console.log(dropdownMenuID);
//  console.log(selectedOption);
//  }


// 
// d3.json("samples.json").then((data) => {
    //  Create the Traces
    // var trace1 = {
    //   x: data.samples.sample_values,
    //   y: data.samples.otu_ids,
    //   type: "bar",
    //   name: "Cancer Survival",
    //   boxpoints: "all"
    // };
  
    // var data = [trace1];

    //  var layout = {
    //    title: "'Bar' Chart"
    //  };

    // Plot the chart to a div tag with id "plot"
    // Plotly.newPlot("plot", data, layout);
//   });
  
init();