

function optionChanged(idChoosen){
      console.log(idChoosen);
      d3.json("samples.json").then((data) => {
        getDemographicInfo(data, parseInt(idChoosen));
        getSamples(data,idChoosen);
      });
}

function init(){
  console.log("here INIT");


  d3.json("samples.json").then((data) => {
    var idNo = data.names;
    var idName1 = parseInt(data.names[0]);
    var idName2 = data.names[0];
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
    getSamples(data,idName2);
   
  });
}

function getDemographicInfo(data, idName1){

   function filterOTU(metadata) {
    //  console.log("metadata=", metadata.id);
    //  console.log("idName1=", idName1);
      return metadata.id === idName1;
   }

   var filteredMetadata = data.metadata.filter(filterOTU);
   console.log("filteredMetadata=", filteredMetadata);

   var id = filteredMetadata.map(metadatas => metadatas.id);
   var ethnicity = filteredMetadata.map(metadatas => metadatas.ethnicity);
   //console.log("ethnicity =", ethnicity);

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
// getting "samples" Data for graphing

function getSamples(data, idName2){
  
  console.log("getSamples");
  console.log("getSamples data = ", data);

  function filterSValues(samples) {
    // console.log("samples=", samples.id);
    // console.log("samples idName1=", idName1);
     return samples.id === idName2;
  }
  console.log("idName2 = ", idName2);
  //var filteredSamples = data.samples.filter(filterSValues);
  var filteredSamples0 = data.samples;
  var filteredSamples = filteredSamples0.filter(filterSValues);
  var idSample = filteredSamples.map(samples => samples.id);
  console.log("idSample=", idSample);

  // does not work ???
  // var otuIds = filteredSamples.map(samples => samples.otu_ids);
  // console.log("otuIds[0]=", otuIds[0]);
  // console.log("otuIds[1]=", otuIds[1]);
  // console.log("otuIds[2]=", otuIds[2]);
  // console.log ("length=", otuIds.length);
  // var sampleValues = filteredSamples.map(samples => samples.sample_values);
  // console.log("sampleValues =", sampleValues);
  // var otuLabels = filteredSamples.map(samples => samples.otu_labels);
  // console.log("1 - otuLabels=", otuLabels);
  // var otuLabels10 = otuLabels.slice(0, 10);
  // console.log("1 - otuLabels10=", otuLabels10);
  // does not work ??? until here
  
  console.log("filteredSamples=", filteredSamples);
  console.log("filteredSamples.[0].id=", filteredSamples[0].id);

  // getting otu_ids
  console.log("filteredSamples.[0].otu_ids[0]=", filteredSamples[0].otu_ids[0]);
  console.log("filteredSamples.[0].otu_ids[1]=", filteredSamples[0].otu_ids[1]);
  
  var otuIds10 = filteredSamples[0].otu_ids.slice(0, 10);
  console.log("sliced otuIds=", otuIds10);
  var otuReversedData = otuIds10.reverse();
  var otuIds10Name = [];
  for (i = 0; i < 10; i++){
    otuIds10Name[i] = `OTU ${otuReversedData[i]}`;
  }
  console.log("otuIds10Name = ", otuIds10Name);
  

  // getting sample_values
  var sampleValues10 = filteredSamples[0].sample_values.slice(0, 10);
  var sampleValuesReversedData = sampleValues10.reverse();
  console.log("sliced sampleValues10=", sampleValues10);
  
  // getting otu_labels slice does not work because it is a string ??
  console.log("filteredSamples.[0].otu_labels[0]=", filteredSamples[0].otu_labels[0]);
  console.log("filteredSamples.[0].otu_labels[1]=", filteredSamples[0].otu_labels[1]);
  //var otuLabels10 = filteredSamples[0].otu_lables.slice(0, 10);
  //var otuLabesReversedData = otuLabels10.reverse();
  //console.log("sliced otuLables10=", otuLabels10);

  var trace1 = {
    x:sampleValuesReversedData,
    y: otuIds10Name,
    type: "bar",
    orientation: "h"
    //text: otuLabels10
  };
 
  var dataBar = [trace1];
 
  var layout = {
    title: "OTU Values"
  };
 
  Plotly.newPlot("bar", dataBar, layout);

  // bubble chart

  var trace2 = {
    y:sampleValuesReversedData,
    x: otuReversedData,
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(164, 89, 240)', 'rgb(232, 226, 65)',  'rgb(232, 65, 182)', 
      'rgb(97, 64, 16)', 'rgb(20, 25, 179)', 'rgb(188, 242, 94)'],
      opacity: [1,1,1,1,1,1,1,1,1,1],
      size: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ]
    }
  };
  
  var dataBubble = [trace2];
  
  var layout2 = {
    //title: 'Marker Size and Color',
    showlegend: false,
    height: 600,
    width: 1000
  };
  
  
  Plotly.newPlot("bubble", dataBubble, layout2);
}
  
init();
