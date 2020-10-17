import React from "react";
import { Line,Bar } from "react-chartjs-2";
import CommaNumber from 'comma-number';
import classNames from 'classnames';
import Axios from 'axios';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import {OptionLine} from '../../../variables/ChartOptions';

class AllInOneGraph extends React.Component
{  
  constructor(props) {
        super(props);
        this.ele = []; this.labels_ = []; this.rec=[]; this.dec=[]; this.act=[];
        this.prevData = null;
        this.state = {
          currentChartData: "data1",
        };
    }

    componentDidMount(){
        Axios.get('https://visuospace.herokuapp.com/india_timeseries')
        .then( response => {
            this.setState({data : response.data.time_series , loader : false});
        });
    }

    setBgChartData = name => {
        this.setState({
          currentChartData: name
        });
    };
    setChartData = () => {
      let data = this.state.data;
      for(let i=data.length-50; i<data.length; i++)
      {
        this.labels_.push(data[i]['date']);
        let conf = Number.parseInt(data[i]['totalconfirmed']);
        let rec = Number.parseInt(data[i]['totalrecovered']);
        let dec = Number.parseInt(data[i]['totaldeceased']);
        
        let act = conf - rec - dec;
        this.ele.push({x: new Date(data[i]['date']), y : conf});
        this.rec.push({x: new Date(data[i]['date']), y : rec});
        this.dec.push({x: new Date(data[i]['date']), y : dec});
        this.act.push({x: new Date(data[i]['date']), y : act});
      }
    }
    getCurrentCount = (dataNumber) => {
      let Count = null, len = this.state.data.length - 1;
      let conf = Number.parseInt(this.state.data[len]['totalconfirmed']);
      let rec = Number.parseInt(this.state.data[len]['totalrecovered']);
      let dec = Number.parseInt(this.state.data[len]['totaldeceased']);
      let act = conf - rec - dec;
      if(dataNumber === "data1") 
      {
        Count = conf;
      }
      else if(dataNumber === "data2") 
      {
        Count = rec;
      }
      else if(dataNumber === "data3")
      {
        Count = dec;
      }
      else
      {
        Count = act;
      }
      return CommaNumber(Count);
    }
    formChartFromData = (dataNumber) => {
      return canvas => {
          let ctx = canvas.getContext("2d");
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); 
          let renderData = null, renderLable = null;
          if(dataNumber === "data1") 
          {
            renderData = [...this.ele];
            renderLable = "Total Confirmed";
          }
          else if(dataNumber === "data2") 
          {
            renderData = [...this.rec];
            renderLable = "Total Recovered";
          }
          else if(dataNumber === "data3")
          {
            renderData = [...this.dec];
            renderLable = "Total Deceased";
          }
          else
          {
            renderData = [...this.act];
            renderLable = "Total Active";
          }
          return {
            labels : this.labels_,
            datasets: [
              {
                label: renderLable,
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 1.5,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 2,
                data: renderData
              }
            ]
          };
      };
    }

    render()
    {
      if(this.state.data && this.ele.length == 0) this.setChartData();  
      return(
            <>{ this.state.data &&
              <Card className="card-chart" style={{minHeight : '480px'}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Indian Statistics</h5>
                      <CardTitle tag="h3"> {this.getCurrentCount(this.state.currentChartData)} </CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.currentChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Confirmed
                          </span>
                          <span className="d-block d-sm-none">
                            C
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.currentChartData === "data4"
                          })}
                          onClick={() => this.setBgChartData("data4")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            &#160;Active&#160;
                          </span>
                          <span className="d-block d-sm-none">
                            A
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.currentChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Recovered
                          </span>
                          <span className="d-block d-sm-none">
                            R
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.currentChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Deceased
                          </span>
                          <span className="d-block d-sm-none">
                            D
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.formChartFromData(this.state.currentChartData)}
                      options={OptionLine}
                    />
                  </div>
                </CardBody>
              </Card>}

          
          </>
        );
    }
}

export default AllInOneGraph;