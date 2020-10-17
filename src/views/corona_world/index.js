import React, {Suspense} from 'react';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import NumberPanel from "./segments/NumberPanel";

import { Row, Col } from 'reactstrap';
import {BrowserView, MobileView} from 'react-device-detect';
const CountryWiseDataNew = React.lazy(() => import('./segments/CountryWiseDataNew'));
const ls = require('local-storage');
class CoronaWorld extends React.Component{
    constructor(props)
    {
        super(props);
        this.graphCss = {width: '100%', height: '450px', border: '0px none'};
        this.graphCss2 = {width: '100%', height: '500px', border: '0px none'};
        let fetcher = true, world_data = null, countrywise_data = null;
        this.state = 
        {
            world_data : world_data,
            countrywise_data : countrywise_data,
            loader : fetcher,
            fetcher : fetcher
        }
    }

    componentDidMount()
    {
        if(this.state.fetcher)
        {
            Axios.get('https://disease.sh/v3/covid-19/all')
            .then( response => {
                this.setState({
                    world_data : response.data,
                    loader: false
                });
            });
        }
    }

    RenderWhenNotNullNumber= (flg) => {
        if(flg)
        return (<NumberPanel data={this.state.world_data} />);
    }

    RenderWhenNotNull = (flg) => {
        if(flg)
        return (
            <div>
                <Row>
                    <Col xs='12' md='12'>
                        <Suspense fallback={() => <div></div>}>
                            <CountryWiseDataNew data={this.state.countrywise_data} />
                        </Suspense>
                    </Col>
                </Row>
                
            </div>
        );
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
        return (
            <div className='content'>
                {this.Loading(this.state.loader)}
                {this.RenderWhenNotNullNumber(this.state.world_data)}
                <Row style={{marginBottom : '30px'}}>
                    <Col sm='12' md='6'>
                    <iframe src="https://ourworldindata.org/coronavirus-data-explorer?zoomToSelection=true&country=BRA~IND~IRN~ITA~RUS~ESP~GBR~USA&casesMetric=true&totalFreq=true&hideControls=true&smoothing=0&pickerMetric=location&pickerSort=asc"
                     loading="lazy" style={this.graphCss}></iframe>
                    </Col>
                    <Col sm='12' md='6'>
                    <iframe src="https://ourworldindata.org/coronavirus-data-explorer?zoomToSelection=true&country=BEL~BRA~CAN~FRA~IND~IRN~ITA~MEX~RUS~GBR~USA&deathsMetric=true&totalFreq=true&hideControls=true&smoothing=0&pickerMetric=location&pickerSort=asc"
                     loading="lazy" style={this.graphCss}></iframe>
                    </Col>
                </Row>
                {this.RenderWhenNotNull(true)}
                <Row style={{marginBottom : '30px'}}>
                    <Col sm='12' md='6'>
                    <iframe src="https://ourworldindata.org/grapher/daily-covid-cases-3-day-average?country=FRA~DEU~IND~ITA~RUS~KOR~ESP~GBR~USA~BRA" 
                    loading="lazy" style={this.graphCss}></iframe>
                    </Col>
                    <Col sm='12' md='6'>
                    <iframe src="https://ourworldindata.org/grapher/coronavirus-cfr?country=BRA~DEU~IND~ITA~RUS~KOR~ESP~OWID_WRL" 
                    loading="lazy" style={this.graphCss}></iframe>
                    </Col>
                </Row>
                <Row style={{marginBottom : '30px'}}>
                    <Col sm='12' md='12'>
                    <iframe src="https://ourworldindata.org/grapher/total-confirmed-cases-of-covid-19-per-million-people" 
                    loading="lazy" style={this.graphCss2}></iframe>
                    </Col>
                    <Col sm='12' md='12'>
                    <iframe src="https://ourworldindata.org/grapher/total-covid-deaths-per-million" 
                    loading="lazy" style={this.graphCss2}></iframe>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default CoronaWorld;