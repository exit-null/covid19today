let OptionLine = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "x",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.2,
          stacked : false,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 100,
            suggestedMax: 25,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 10,
            fontColor: "#9a9a9a",
            source: 'data',
            autoSkip: true,
            maxTicksLimit: 14
          },
  
          bounds : 'labels',
  
        }
      ]
    }
  };

  let OptionLine2 = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Cumulative Graph'
   } ,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "x",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          stacked : false,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 100,
            suggestedMax: 25,
            padding: 20,
            fontColor: "#9a9a9a",
            callback: function(value, index, values) {
                return value / 1e3 + 'K';
            }
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 10,
            fontColor: "#9a9a9a",
            source: 'data',
            autoSkip: true,
            maxTicksLimit: 12
          },
  
          bounds : 'labels',
  
        }
      ]
    }
  };
let OptionBar = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 5,
          padding: 20,
          fontColor: "#9e9e9e"
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e"
        },
        barPercentage: 0.7
      }
    ]
  }
}

let OptionBar2 = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Daily Graph'
 } ,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 1,
    xPadding: 10,
    mode: "point",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 5,
          padding: 10,
          fontColor: "#9e9e9e"
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 10,
          fontColor: "#9e9e9e",
          autoSkip : true,
          maxTicksLimit : 12
        },
        barPercentage: 0.5
      }
    ]
  }
}
  module.exports = {
      OptionLine, OptionBar, OptionBar2, OptionLine2
  }