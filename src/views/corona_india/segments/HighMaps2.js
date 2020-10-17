import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataIndia from './mapDataIndia';
import { Card, CardBody, CardHeader } from 'reactstrap';

// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);

class HighMaps2 extends React.PureComponent {
    constructor(props)
    {
        super(props);
        this.backgroundColor = this.props.theme !== true ? "#27293d" : "#ffffff";
        let d = props.data[0];
        let s = props.data[1];
        let k = s[s.length-1].maxvalue;
        let se = [];
        let f = (e) => Number.parseFloat(e);
        k = f(k);
        for(let i=0; i<s.length; i++) se.push([f(s[i].maxvalue)/k,s[i].code]);
        this.mapOptions = {
            title: {
              text: ''
            },
            credits: {
                enabled: false
            },
            chart :{
                backgroundColor : this.backgroundColor,
            },
            
            colorAxis: {
              min: 0,
              stops: se
            },
            plotOptions : {
                map :{
                    borderColor : this.backgroundColor,
                    borderWidth : 0.4,
                },
            },
            series: [
              {
                mapData: mapDataIndia,
                name: 'India',
                data: d,
              }
            ]
        };
    }
    render() {
    return (

        <div className="chart-area" style={{ height: this.props.height}} >
            <HighchartsReact
                options={this.mapOptions}
                constructorType={'mapChart'}
                highcharts={Highcharts}
            />
        </div>
    );
    }
}

export default HighMaps2;