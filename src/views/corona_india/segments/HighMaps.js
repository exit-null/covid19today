import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataIndia from './mapDataIndia';
import { Card, CardBody, CardHeader } from 'reactstrap';

// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);

class HighMaps extends React.PureComponent {
    constructor(props)
    {
        super(props);
        this.backgroundColor = this.props.theme !== true ? "#27293d" : "#ffffff";
        this.state = {};
        this.se = [];
    }
    componentDidMount(){
        Axios.get(`https://visuospace.herokuapp.com/${this.props.data}`)
        .then( response => {
            this.setState({...response.data});
        });
    }
    render() {
        if(this.state.data && this.se.length == 0)
        {
            this.d = this.state.data[0];
            let s = this.state.data[1];
            let k = s[s.length-1].maxvalue;
            let f = (e) => Number.parseFloat(e);
            k = f(k);
            for(let i=0; i<s.length; i++) se.push([f(s[i].maxvalue)/k,s[i].code]);
            this.mapOptions = {
                title: {
                text: ''
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
    return (
        <>{ 
            this.state.data &&
        
        <Card className="card-chart">
            <CardHeader>
                <h3 className="card-category" style={{marginBottom : '0px'}}>
                <span style={{fontSize : "20px", textAlign : "left"}}>
                {this.state.data[3]} </span>
                <span className='pull-right' style={{fontSize : "18px", textAlign : "right"}}>
                {this.state.data[2]} </span>
                </h3>
            </CardHeader>
            <CardBody>
                <div className="chart-area" style={{height: this.props.height}} >
                <HighchartsReact
                    options={this.mapOptions}
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                />
                </div>
            </CardBody>
        </Card> }</>
    );
    }
}

export default HighMaps;