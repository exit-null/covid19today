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

import {OptionLine2,OptionBar2} from '../../../variables/ChartOptions';

class StatewiseGraph extends React.Component
{  
  constructor(props) {
        super(props);
        this.ele = []; this.labels_ = []; this.rec=[]; this.dec=[]; this.act=[];
        this.dele = []; this.drec=[]; this.ddec=[]; this.dact=[]; this.tst = [];
        this.dtst = [];
        this.prevData = null;
        this.state = {
          currentChartData: "data1",
        };
        this.setChartData(this.props.data);
    }

    componentDidMount(){
        /*Axios.get('https://visuospace.herokuapp.com/findstate/'+this.props.id)
        .then( response => {
            if(response.data.length == 0) return null;
            this.setChartData([...response.data]);
            this.setState({graphdata : response.data});
        });*/
    }

    setBgChartData = name => {
        this.setState({
          currentChartData: name
        });
    };
    setChartData = (e) => {
      let full = [{...e.cases},{...e.deaths},{...e.recovered}];
      let data = [];
      Object.keys(full[0]).forEach((e,i) => {
        data.push({
          date : new Date(e),
          confirmed : full[0][e],
          recovered : full[2][e],
          deceased : full[1][e],
        });
      });
      this.finaldata = [data[80].confirmed, data[80].deceased, data[80].recovered];

      for(let i=1; i<81; i++)
      {
        const dte = data[i].date;
        const month = dte.toLocaleString('default', { month: 'short' });
        const day_ = (dte.getDate() < 10) ? "0"+dte.getDate() : dte.getDate();
        this.labels_.push(day_+" "+month);
        let conf = Number.parseInt(data[i]['confirmed']);
        let rec = Number.parseInt(data[i]['recovered']);
        let dec = Number.parseInt(data[i]['deceased']);

        let act = conf - rec - dec;
        let dconf = Number.parseInt(data[i]['confirmed'] - data[i-1]['confirmed']);
        let drec = Number.parseInt(data[i]['recovered'] - data[i-1]['recovered']);
        let ddec = Number.parseInt(data[i]['deceased'] - data[i-1]['deceased']);

        let dact = dconf - drec - ddec;
        this.ele.push({x: data[i].date, y : conf});
        this.rec.push({x: data[i].date, y : rec});
        this.dec.push({x: data[i].date, y : dec});
        this.act.push({x: data[i].date, y : act});

        this.dele.push({x: data[i].date, y : dconf});
        this.drec.push({x: data[i].date, y : drec});
        this.ddec.push({x: data[i].date, y : ddec});
        this.dact.push({x: data[i].date, y : dact});
      }
    }
    getCurrentCount = (dataNumber) => {
      let Count = null, len = 50;
      let conf = Number.parseInt(this.finaldata[0]);
      let rec = Number.parseInt(this.finaldata[2]);
      let dec = Number.parseInt(this.finaldata[1]);
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

    formChartFromData2 = (dataNumber) => {
        return canvas => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); 
            let renderData = null, renderLable = null;
            if(dataNumber === "data1") 
            {
              renderData = [...this.dele];
              renderLable = "Daily Confirmed";
            }
            else if(dataNumber === "data2") 
            {
              renderData = [...this.drec];
              renderLable = "Daily Recovered";
            }
            else if(dataNumber === "data3")
            {
              renderData = [...this.ddec];
              renderLable = "Daily Deceased";
            }
            else
            {
              renderData = [...this.dact];
              renderLable = "Daily Active";
            }
            return {
              labels : this.labels_,
              datasets: [
                {
                  label: renderLable,
                  fill: true,
                  backgroundColor: gradientStroke,
                  borderColor: "#1f8ef1",
                  borderWidth: 1,
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

    renderWhenNotNull = (flg) => {
        if(!flg) return null;
        return (
            <Card className="card-chart" style={{minHeight : '480px'}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Statistics</h5>
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
                  <Row>
                      <Col md='6'>
                        <div className="chart-area" style={{paddingLeft: '10px'}}>
                            <Line
                            data={this.formChartFromData(this.state.currentChartData)}
                            options={OptionLine2}
                            />
                        </div>
                      </Col>
                      <Col md='6'>
                        <div className="chart-area" style={{paddingRight: '10px'}}>
                            <Bar
                            data={this.formChartFromData2(this.state.currentChartData)}
                            options={OptionBar2}
                            />
                        </div>
                      </Col>
                  </Row>
                </CardBody>
              </Card>
        );
    }

    render()
    {
      return(
            <>
              {this.renderWhenNotNull(1)}
          </>
        );
    }
}

export default StatewiseGraph;