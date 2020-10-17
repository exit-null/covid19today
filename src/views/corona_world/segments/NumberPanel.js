import React from "react";
import { CSSTransition } from 'react-transition-group';
import CommaNumber from 'comma-number';
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col
} from "reactstrap";


class NumberPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showMessage : true
        };
    }

    int = (str) => {
        return str;
    }
    
    render(){
        if(this.props.data == null) return null;
        let confirmed = this.props.data['cases'];
        let deceased = this.props.data['deaths'];
        let recovered = this.props.data['recovered'];
        let active = CommaNumber(this.props.data['cases']
                        - this.props.data['deaths']
                        - this.props.data['recovered']);
        let dcon = this.int(this.props.data['todayCases']);
        let drec = this.int(this.props.data['todayRecovered']);
        let ddec = this.int(this.props.data['todayDeaths']);
        let dact = dcon - drec - ddec;
        let dconfirmed = "[ +"+this.props.data['todayCases'].toLocaleString()+" ]";
        let ddeceased = "[ +"+this.props.data['todayDeaths'].toLocaleString()+" ]";
        let drecovered = "[ +"+this.props.data['todayRecovered'].toLocaleString()+" ]";
        let dactive = "[ "+((dact > 0) ? "+" : "") + CommaNumber(dact)+" ]";
        let listContent = [
            [3, "Confirmed", "text-danger", confirmed.toLocaleString(), dconfirmed],
            [3, "Active", "text-primary", active.toLocaleString(), dactive],
            [3, "Recovered", "text-success", recovered.toLocaleString(), drecovered],
            [3, "Deceased", "text-defalut", deceased.toLocaleString(), ddeceased]
        ];
        //const link
        const list = listContent.map((ele, key) => {
            let link = null, update= null;
            update = <div style={{fontSize : "15px"}}>{ele[4]}</div>;
            return (
                <Col lg={ele[0]} key={key}>
                <Card className="card-chart">
                    <CardHeader>
                    <h1 className="card-category">
                        <span className="card-big-text"> {ele[1]} </span>
                    </h1>
                    {update}
                    <CardTitle tag="h4">
                        <i className={"tim-icons icon-world "+ele[2]} />{" "}
                        {ele[3]}
                    </CardTitle>
                    </CardHeader>
                </Card>
                </Col>
            );
        });
        return (
      
            <>
                <CSSTransition
                    in={this.state.showMessage}
                    timeout={200}
                    appear={true}
                    classNames="fader"
                >
                    <Row>
                        {list}
                    </Row>
                </CSSTransition>
            </>

        );
    }
}

export default NumberPanel;