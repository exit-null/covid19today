import React from "react";
import { Line,Bar } from "react-chartjs-2";
import CommaNumber from 'comma-number';
import classNames from 'classnames';
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

class MultiCharts extends React.Component
{  
  constructor(props) {
        super(props);
	}
	getRandomColor = () => {
		let letters = '0123456789ABCDEF';
		var color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}	
    formChartFromData = () => {
		let int = (e) => Number.parseInt(e);
		let data = this.props.data;
		let make_data = [];
		let renderLables = [];
		this.labels_ = [];
		data.forEach((element,i) => {
			make_data.push([]);
			renderLables.push(element._id);
			element.timeline.forEach(e => {
				make_data[i].push(int(e.ddata.tested));
			});
			make_data[i].pop();
		});
		data[0].timeline.forEach(e => {
			this.labels_.push(e.date);
		});
		this.labels_.pop();
		return canvas => {
			let ctx = canvas.getContext("2d");
			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); 
			let dataset_p = [];
			make_data.forEach((e,i) => {
				let col = this.getRandomColor();
				let obj = {
					label: renderLables[i],
					fill: true,
					backgroundColor: gradientStroke,
					borderColor: col,
					borderWidth: 1.5,
					borderDash: [],
					borderDashOffset: 0.0,
					pointBackgroundColor: col,
					pointBorderColor: "rgba(255,255,255,0)",
					pointHoverBackgroundColor: col,
					pointBorderWidth: 20,
					pointHoverRadius: 4,
					pointHoverBorderWidth: 15,
					pointRadius: 2,
					data: [...e]
				};
				dataset_p.push(obj);
			});
			return {
				labels : this.labels_,
				datasets: dataset_p
			};
		};
    }

    render()
    {
      if(this.props.data == null) return null;  
      return(
            <>
              <Card className="card-chart" style={{minHeight : '480px'}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Indian Statistics</h5>
                      <CardTitle tag="h3"> Top 10 states worst affected states </CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
					  <Col md='6'>
						<div className="chart-area">
							<Line
							data={this.formChartFromData()}
							options={OptionLine}
							/>
						</div>
					  </Col>
					  <Col md='6'>
						<div className="chart-area">
							<Line
								data={this.formChartFromData()}
								options={OptionLine}
							/>
						</div>
					  </Col>
				  </Row>
                </CardBody>
              </Card>
          
          </>
        );
    }
}

export default MultiCharts;