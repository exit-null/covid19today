import React from "react";
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import { Row, Col, Card, CardHeader,CardTitle, CardFooter, CardBody } from "reactstrap";
import { utcToZonedTime, format } from 'date-fns-tz/esm';
import NumberPanel from "./segments/NumberPanel";
import {isValidStateId, STATE_NAMES, STATE_POPULATIONS} from '../../constant';
import ControlledExpansionPanels from './segments/Expandable';
import StatewiseGraph from './segments/StatewiseGraph';
import {BrowserView, MobileView} from 'react-device-detect';

class StatewiseIndia extends React.Component
{
    constructor(props)
    {
        super(props);
        this.id = this.props.match.params.id;
        this.graphdata = [];
        if(!isValidStateId(this.id))
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
        Axios.get('https://visuospace.herokuapp.com/districtwise/'+this.id)
        .then( response => {
            this.setState({...response.data, loader : false});
        });
    }
    
    RenderWhenNotNullNumberPanel = (flag) => {
        if(!flag) return null;
        if(flag) return(
            <NumberPanel data={this.state.total} meta={this.state.meta} delta={this.state.delta}/>
        );
    }

    perMillion = (e) => {
        if(e == undefined) return [0,0];
        let t = STATE_POPULATIONS[this.id];
        return [((e*1000000)/t).toFixed(1).toLocaleString(),((e*1000000)/t).toFixed(0).toLocaleString()];
    }

    perCent = (e, t) => {
        if(e == undefined) return [0,0];
        return [((e*100)/t).toFixed(2).toLocaleString(),((e*100)/t).toFixed(0).toLocaleString()];
    }

    RenderWhenNotNullQuickInsights = (flag) => {
        if(!flag) return null;
        let unDef = (e) => (e == undefined) ? 0 : e;
        let pm = this.perMillion(flag.confirmed);
        let ts = this.perMillion(flag.tested);
        let dt = this.perMillion(flag.deceased);
        let actp = this.perCent(flag.confirmed,flag.tested);
        let rcv = this.perCent(flag.recovered,flag.confirmed);
        let mor = this.perCent(unDef(flag.deceased),flag.confirmed);
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
                <Col md='4'>
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
                <Col md='4'>
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
        <ControlledExpansionPanels data={this.state.districts}/>
        </>
        );
    }

    getTimeStamp = (flg) => {
        if(flg == undefined) return null;
        const pattern = 'd.MM.yyyy HH:mm'
        const date = this.state.meta.last_updated;  
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
               <Card className="card-chart">
                    <CardHeader>
                    <Row>
                        <Col md='7'>
                        <h1 className="card-category" 
                            style={{fontSize : '1.6rem', marginTop : '12px'}}> 
                            {STATE_NAMES[this.id]} </h1>
                        </Col>
                        <Col md='5'>
                            
                            <span  style={{fontSize : '0.9rem', float : 'right'}}>Population</span> <span style={{fontSize : '16px'}}><br></br></span>
                            <span style={{color: '#999999', fontSize : '1.4rem', float : 'right'}}>{(STATE_POPULATIONS[this.id]).toLocaleString()}</span> 
                            
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardFooter style={{margin : '0', paddingTop : '0'}}>
                    <span style={{fontSize : '0.8rem', float : 'left'}}>{this.getTimeStamp(this.state.meta)}</span>
                    </CardFooter>
                </Card>
                {this.Loading(this.state.loader)}
                {this.RenderWhenNotNullNumberPanel(this.state.total)}
                { (this.state.total != undefined) ? <h3 style={{paddingLeft : '15px', marginBottom : '15px'}}>Quick Insights</h3> : <div></div>}
                { (this.state.total == undefined && !this.state.loader) ? <h4 style={{width : '100%', textAlign : 'center'}}>No Covid cases has been registered for this state</h4> : <div></div>}
                {this.RenderWhenNotNullQuickInsights(this.state.total)}
                <br></br><br></br>
                <StatewiseGraph id={this.id} />
            </div>
        );
    }
}

export default StatewiseIndia;