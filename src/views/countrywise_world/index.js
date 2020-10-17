import React from "react";
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import { Row, Col, Card, CardHeader,CardTitle, CardFooter, CardBody } from "reactstrap";
import { utcToZonedTime, format } from 'date-fns-tz/esm';
import NumberPanel from "./segments/NumberPanel";
import isValid from '../../countryiso';
import StatewiseGraph from './segments/StatewiseGraph';
import {BrowserView, MobileView} from 'react-device-detect';

class CountrywiseWorld extends React.Component
{
    constructor(props)
    {
        super(props);
        this.id = this.props.match.params.id;
        this.graphdata = [];
        if(!isValid(this.id))
        {
            window.location.href = '/404';
        }
        this.state = {loader : true};
        this.cardBigNumber = {width : '100%', 
        textAlign : 'right', 
        marginBottom : '2px'};
    }

    Loading = (flag) => {
        if(flag)
        return(
            <>
                <div style={{marginLeft: '45%', marginTop: '20%' }}>
                <BrowserView>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={9000}
                    />
                </BrowserView>
                </div>
                <div style={{marginLeft: '35%', marginTop: '20%' }}>
                <MobileView>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={9000}
                    />
                </MobileView>
                </div>
            </>
        );
    }

    componentDidMount()
    {
        window.scrollTo(0, 0);
        Axios.all([Axios.get(`https://disease.sh/v3/covid-19/countries/${this.id}`),
        Axios.get(`https://disease.sh/v3/covid-19/historical/${this.id}?lastdays=81`)])
      .then(Axios.spread((firstResponse, secondResponse) => {  
          this.setState({
              quick : firstResponse.data,
              timeseries : secondResponse.data,
              loader : false
          });
          //console.log(data[0],data[1]);
      }))
      .catch(error => console.log(error));
    }
    
    RenderWhenNotNullNumberPanel = (flag) => {
        if(!flag) return null;
        if(flag) return(
            <NumberPanel data={this.state.quick}/>
        );
    }

    perMillion = (e) => {
        if(e == undefined) return [0,0];
        let t = this.state.quick.population;
        return [(Math.round((e*1000000)/t)).toLocaleString(),Math.round((e*1000000)/t).toLocaleString()];
    }

    perCent = (e, t) => {
        if(e == undefined) return [0,0];
        return [((e*100)/t).toFixed(2).toLocaleString(),((e*100)/t).toFixed(0).toLocaleString()];
    }

    RenderWhenNotNullQuickInsights = (flag) => {
        if(!flag) return null;
        let unDef = (e) => (e == undefined) ? 0 : e;
        let pm = this.perMillion(flag.cases);
        let ts = this.perMillion(flag.tests);
        let dt = this.perMillion(flag.deaths);
        let actp = this.perCent(flag.cases,flag.tests);
        let rcv = this.perCent(flag.recovered,flag.cases);
        let mor = this.perCent(unDef(flag.deaths),flag.cases);
        let pcnt = [
            {
                color : 'text-info', title : 'Test Positivity Rate',
                xs1 : '4', className1 : 'm-2 mt-4', xs2 : '6', bigno : actp[0]+"%",
                maintext : `Around ${actp[1]} samples are tested positive per 100 samples`
            },
            {
                color : 'text-primary', title : 'Recovery Rate',
                xs1 : '4', className1 : 'm-2 mt-4', xs2 : '6', bigno : rcv[0]+"%",
                maintext : `Around ${rcv[1]} people have been recovered per 100 confirmed`
            },
            {
                color : 'text-success', title : 'Mortality Rate',
                xs1 : '4', className1 : 'm-2 mt-4', xs2 : '6', bigno : mor[0]+"%",
                maintext : `Unfortunately ${mor[1]} have passed away per 100 confirmed cases`
            }
        ];
        let element = [
            {
                color : 'text-primary', title : 'Confirmed Per Million',
                xs1 : '4', className1 : 'm-2 mt-4', xs2 : '6', bigno : pm[0],
                maintext : `About ${pm[1]} people have been tested positive every million`
            },
            {
                color : 'text-danger', title : 'Tested Per Million',
                xs1 : '4', className1 : 'm-2 mt-4', xs2 : '6', bigno : ts[1],
                maintext : `About ${ts[1]} people have been tested for covid per million`
            },
            {
                color : 'text-info', title : 'Deaths Per Million',
                xs1 : '2', className1 : 'm-2 mt-4', xs2 : '8', bigno : dt[1],
                maintext : `Unfortunately about ${dt[1]} people every million have succumbed to the disease`
            }
        ]; 
        return (
            <>
        <Row>
            {element.map((e,i) => {
            return(
                <Col md='4' key={i}>
                    <Card className="card-chart">
                        <CardHeader>
                            <CardTitle tag="h4">
                                <i className={"tim-icons icon-molecule-40 "+e.color} />{" "}
                                <span className='card-category' style={{fontSize : '1.1rem'}}>{e.title}</span>
                            </CardTitle>
                            <Row className='no-gutters'>
                                <Col xs={e.xs1} className={e.className1}>
                                    <h3 style={this.cardBigNumber}>{e.bigno}</h3>
                                </Col>
                                <Col xs={e.xs2} className='m-2'>
                                    {e.maintext}
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody></CardBody>
                    </Card>
                </Col>
            )})}
        </Row>
        <Row>
            {pcnt.map((e,i) => {
            return(
                <Col md='4' key={i}>
                    <Card className="card-chart">
                        <CardHeader>
                            <CardTitle tag="h4">
                                <i className={"tim-icons icon-molecule-40 "+e.color} />{" "}
                                <span className='card-category' style={{fontSize : '1.1rem'}}>{e.title}</span>
                            </CardTitle>
                            <Row className='no-gutters'>
                                <Col xs={e.xs1} className={e.className1}>
                                    <h3 style={this.cardBigNumber}>{e.bigno}</h3>
                                </Col>
                                <Col xs={e.xs2} className='m-2'>
                                    {e.maintext}
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody></CardBody>
                    </Card>
                </Col>
            )})}
        </Row>
        </>
        );
    }

    getTimeStamp = (flg) => {
        if(flg == undefined) return null;
        const pattern = 'd.MM.yyyy HH:mm'
        const date = new Date(this.state.quick.updated);  
        const timeZone = 'asia/kolkata';
        return "Last updated "+format(utcToZonedTime(date, timeZone),pattern,{timeZone});
    }

    currentTheme(){
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
    }
    render()
    { 
        return(
            <div className='content'>
                {this.state.quick &&
                <>
                <Card className="card-chart">
                        <CardHeader>
                        <Row>
                            <Col md='7'>
                            <Row>
                                <Col sm='2'>
                                    <img src={this.state.quick.countryInfo.flag} style={{maxHeight : "50px"}}/>
                                </Col>
                                <Col sm='10'>
                                    <h1 className="card-category" 
                                    style={{fontSize : '1.6rem', marginTop : '12px', marginLeft: '0'}}> 
                                    {this.state.quick.country} </h1>
                                </Col>
                            </Row>
                            </Col>
                            <Col md='5'>
                                
                                <span  style={{fontSize : '0.9rem', float : 'right'}}>Population</span> <span style={{fontSize : '16px'}}><br></br></span>
                                <span style={{color: '#999999', fontSize : '1.4rem', float : 'right'}}>{(this.state.quick.population).toLocaleString()}</span> 
                                
                            </Col>
                        </Row>
                        </CardHeader>
                        <CardFooter style={{margin : '0', paddingTop : '0'}}>
                        <span style={{fontSize : '0.8rem', float : 'left'}}>{this.getTimeStamp(this.state.quick)}</span>
                        </CardFooter>
                    </Card>
                {this.Loading(this.state.loader)}
                {this.RenderWhenNotNullNumberPanel(this.state.quick)}
                { this.state.quick && <h3 style={{paddingLeft : '15px', marginBottom : '15px'}}>Quick Insights</h3>}
                {this.RenderWhenNotNullQuickInsights(this.state.quick)}
                <br></br><br></br>
                <StatewiseGraph data={this.state.timeseries.timeline} />
                </>
                }
            </div>
        );
    }
}

export default CountrywiseWorld;