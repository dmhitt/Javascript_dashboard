
function bonusChart(bbwash){
    // Bonus
         
      var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: bbwash,
        title: { text: "Scrubs per Week", font: { size: 15}},
        type: "indicator",
        mode: "gauge",
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: "#76FDBE"},
            { range: [1, 2], color: "#73F0B6" },
            { range: [2, 3], color: "#6DE4AC" },
            { range: [3, 4], color: "#69DBA6" },
            { range: [4, 5], color: "#65D4A0" },
            { range: [5, 6], color: "#63CA9A" },
            { range: [6, 7], color: "#5FC093" },
            { range: [7, 8], color: "#5AAF87" },
            { range: [8, 9], color: "#55A17D" },
            
          ],
          threshold: {
            line: { color: "purple", width: 6 },
            thickness: 0.75,
            value: bbwash
          }
        }
      }
    ];
    
    var layout = { width: 500, height: 350, 
                   margin: { t: 100, r: 100, l: 100, b: 25 }, 
                  title: { text:"Belly Buttom Washing Frequency" }, font: { size: 12 }};
    
    Plotly.newPlot('gauge', data, layout);
    }