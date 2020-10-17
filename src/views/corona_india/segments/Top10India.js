import React from 'react';
import { Line,Bar } from "react-chartjs-2";
import CommaNumber from 'comma-number';
import classNames from 'classnames';
import Axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

import {OptionBar} from '../../../variables/ChartOptions';
class Top10India extends React.PureComponent{
    constructor(props)
    {
        super(props);
        this.ele = []; this.labels_=[];
        this.state = {};
    }

    componentDidMount(){
      Axios.get('https://visuospace.herokuapp.com/india_statewise')
      .then( response => {
          this.setState({data : response.data.statewise , loader : false});
      });
    }
    
    setChartData = (type) => {
        let data = [];
        Object.keys(this.state.data).map((element) => {
          data.push(this.state.data[element]);
        });
        data.sort((a,b) => {return -(Number.parseFloat(a[type])-Number.parseFloat(b[type]))});
        let counter = 0;
        let lb = (this.props.label == 0) ? 'state' : 'statecode';
        //console.log(data);
        data.forEach(element => {
          if(counter > -1 && counter < this.props.number)
          {
            this.labels_.push(((element[lb]).length > 10) ? element['statecode'] : element[lb]);
            this.ele.push({x: element['state'], y : element[type]});
          }
          counter += 1;
        });
    }

    formChartFromData = () => {
        return canvas => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
            gradientStroke.addColorStop(1, "rgba(255,105,180,0.1)");
            gradientStroke.addColorStop(0.4, "rgba(255,105,180,0.0)");
            gradientStroke.addColorStop(0, "rgba(255,105,180,0)");
            let renderData = [...this.ele], renderLable = "Confirmed";
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
      if(this.state.data && this.ele.length == 0) this.setChartData(this.props.type);
        return(
        <>
        { this.state.data &&
            <Card className="card-chart" style={{height: '480px'}}>
                <CardHeader>
                  <h5 className="card-category">Top {this.props.number} States</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-bell-55 text-primary" />{" "}
                    {this.props.text}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={this.formChartFromData()}
                      options={OptionBar}
                    />
                  </div>
                </CardBody>
            </Card>
    }
        </>);
    }
}

export default Top10India;