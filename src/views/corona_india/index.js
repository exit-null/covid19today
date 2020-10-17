import React, {Suspense} from "react";
import Axios from 'axios';
import {BrowserView, MobileView} from 'react-device-detect';
import { Row, Col } from "reactstrap";
import NumberPanel from "./segments/NumberPanel";
import Loader from 'react-loader-spinner';

//const PredictedGraph = React.lazy( () => import('./segments/PredictedGraph'));
const HighMaps = React.lazy( () => import('./segments/HighMaps'));
const Top7India = React.lazy( () => import("./segments/Top7India"));
const MultiCharts = React.lazy( () => import("./segments/multiCharts"));
const NewsList = React.lazy( () => import("./segments/NewsList"));
const StateWiseData = React.lazy( () => import("./segments/StateWiseData"));

class CoronaIndia extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = 
        {
            time_series : null,
            current_number : null,
            loader : true
        }
    }
    componentDidMount()
    {
        Axios.get('https://visuospace.herokuapp.com/india')
        .then( response => {
            this.setState({...response.data, loader : false});
        });
    }

    RenderWhenNotNullTests = (flag) => {
        if(!flag) return null;
        if(flag) return (
            <Suspense fallback={<div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            </div>}>
            <MultiCharts data={this.state.tests}/>
            </Suspense>
        );
    }

    RenderWhenNotNull = (flag) => {
        if(!flag) return null;
        this.maps1 = ["cnf", "rec", "dec", "tst"];
        let theme = this.currentTheme();
        if(flag) return(
            <>
            <Row >
                <Col xs='12' md='7'>
                    <Suspense fallback={<div></div>}>
                        <StateWiseData style={{maxHeight: '700px'}}/>
                    </Suspense>
                </Col>
                <Col xs='12' md='5'>
                    <Row>
                        <Col  xs='12' lg='12'>
                                {
                                    this.maps1.map((element,index) => {
                                        return(<Suspense key={index} fallback={<div></div>}>
                                            <HighMaps theme={theme} data={element} height={'370px'}/>
                                        </Suspense>)
                                    })
                                }
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Suspense fallback={<div></div>}>
            <Top7India data={this.state.statewise} 
                        map={
                                [
                                    {...this.state.mor, text : 'Mortality Rate'},
                                    {...this.state.tpm, text : 'Tests per million'},
                                    {...this.state.ppm, text : 'Confirmed per million'}
                                ]
                            } 
                        label={0} 
                        number={8} 
                        theme={this.currentTheme()}
            />
            </Suspense>
            <Suspense fallback={<div></div>}>
                    <NewsList currentTheme={this.currentTheme()}/>
            </Suspense>
            </>
        );
    }
    currentTheme(){
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
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

    render()
    { 
        return(
            <div className='content'>
                <Suspense fallback={<div></div>}>
                    <NumberPanel />
                </Suspense>
                {this.Loading(this.state.loader)}
                {this.RenderWhenNotNull(this.state.current_number)}
                
            </div>
        );
    }
}

export default CoronaIndia;