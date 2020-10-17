import React from 'react';
import { Line,Bar } from "react-chartjs-2";
import CommaNumber from 'comma-number';
import {BrowserView} from 'react-device-detect';
import classNames from 'classnames';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col, Button, ButtonGroup
} from "reactstrap";
//import IndiaMap2 from './IndiaMap2';
import HighMaps2 from './HighMaps2';
import {OptionBar} from '../../../variables/ChartOptions';
class Top7India extends React.PureComponent{
    constructor(props)
    {
        super(props);
        this.ele = []; this.labels_=[];
        this.chart = ['mor', 'tpm', 'ppm'];
        this.mapdata = this.props.map;
        this.state = {currentChart : 0};
        this.text = this.props.map[this.state.currentChart].text;
    }

    changeCurrentChart = (e) => {
      this.setState({currentChart : e});
    }
    
    setChartData = (type) => {
        let data = [];
        Object.keys(this.props.data).map((element) => {
          data.push(this.props.data[element]);
        });
        data.sort((a,b) => {return -(Number.parseFloat(a[type])-Number.parseFloat(b[type]))});
        let counter = 0;
        let lb = 'state';
        //console.log(data);
        this.labels_ = [];
        this.ele = [];
        data.forEach(element => {
          if(counter > -1 && counter < this.props.number)
          {
            this.labels_.push((element[lb].length > 8) ? element['statecode'] : element[lb]);
            this.ele.push({x: element['state'], y : element[type]});
          }
          counter += 1;
        });
    }
    formChartFromData = (type) => {
        this.setChartData(type);
        return canvas => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, "rgba(255,105,180,0.1)");
            gradientStroke.addColorStop(0.4, "rgba(255,105,180,0.0)");
            gradientStroke.addColorStop(0, "rgba(255,105,180,0)");
            let renderData = [...this.ele], renderLable = "Value";
            return {
              labels : this.labels_,
              datasets: [
                {
                  label: renderLable,
                  fill: true,
                  backgroundColor: gradientStroke,
                  hoverBackgroundColor: gradientStroke,
                  borderColor: "#FF69B4",
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: "#FF69B4",
                  pointBorderColor: "rgba(255,255,255,0)",
                  pointHoverBackgroundColor: "#FF69B4",
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: renderData
                }]
            };
        };
    }

    render(){
      this.chartList = [this.formChartFromData('mor'),this.formChartFromData('tpm'),this.formChartFromData('ppm')];
      return(
        <>
            <Card className="card-chart" style={{padding: '0 10px'}}>
                <CardHeader>
                  <h5 className="card-category">Top {this.props.number} States</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                      <Col sm='7'>
                      <Row>
                        <Col sm='8'>
                          <CardTitle tag="h4">
                            <i className="tim-icons icon-bell-55 text-primary" />{" "}
                            {this.props.map[this.state.currentChart].text}
                          </CardTitle>
                        </Col>
                        <Col sm='4'>
                          <ButtonGroup
                            className="btn-group-toggle float-right"
                            data-toggle="buttons"
                          >
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {active: this.state.currentChart === 0})}
                            color="info" id="0" size="sm"
                            onClick={() => this.changeCurrentChart(0)}
                          >
                            <input
                              defaultChecked className="d-none" name="options" type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Mortality
                            </span>
                            <span className="d-block d-sm-none">
                              MR
                            </span>
                          </Button>
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {active: this.state.currentChart === 1})}
                            color="info" id="1" size="sm"
                            onClick={() => this.changeCurrentChart(1)}
                          >
                            <input
                              defaultChecked className="d-none" name="options" type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Tests/1M
                            </span>
                            <span className="d-block d-sm-none">
                              TPM
                            </span>
                          </Button>
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {active: this.state.currentChart === 2})}
                            color="info" id="2" size="sm"
                            onClick={() => this.changeCurrentChart(2)}
                          >
                            <input
                              defaultChecked className="d-none" name="options" type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Confirmed/1M
                            </span>
                            <span className="d-block d-sm-none">
                              CPM
                            </span>
                          </Button>
                          </ButtonGroup>
                          </Col>
                      </Row>
                      
                        <div className="chart-area" style={{fontSize : '10px'}}>
                            <Bar
                            data={this.formChartFromData(this.chart[this.state.currentChart])}
                            options={OptionBar}
                            />
                        </div>
                      </Col>
                      
                      <Col sm='5' style={{padding: '0'}}>
                        <div style={{display : this.state.currentChart === 0 ? 'block' : 'none'}}>
                          <HighMaps2 theme={this.props.theme}  data={this.mapdata[0]} height={'410px'}/></div>
                        <div style={{display : this.state.currentChart === 1 ? 'block' : 'none'}}>
                          <HighMaps2 theme={this.props.theme} data={this.mapdata[1]} height={'410px'}/></div>
                        <div style={{display : this.state.currentChart === 2 ? 'block' : 'none'}}>
                          <HighMaps2 theme={this.props.theme} data={this.mapdata[2]} height={'410px'}/></div>
                      </Col>
                      
                  </Row>
                </CardBody>
            </Card>
        </>);
    }
}

export default Top7India;