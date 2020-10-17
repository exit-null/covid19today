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
    
    render(){
        if(this.props.data == null) return null;
        let unDef = (e) => (e == undefined) ? 0 : e;
        let confirmed = CommaNumber(this.props.data['cases']);
        let deceased = CommaNumber(unDef(this.props.data['deaths']));
        let recovered = CommaNumber(this.props.data['recovered']);
        let tested = CommaNumber(this.props.data['tests']);
        let active = CommaNumber((this.props.data['cases']) 
                        - unDef(this.props.data['deaths']) 
                        - (this.props.data['recovered']));
        let dconfirmed = <br></br>, ddeceased = <br></br>;
        let drecovered = <br></br>, dactive = <br></br>, dtested = <br></br>;
        if(this.props.data != null)
        {
            let dcon = unDef(this.props.data['todayCases']);
            let drec = unDef(this.props.data['todayRecovered']);
            let ddec = unDef(this.props.data['todayDeaths']);
            let dtst = 0;
            let dact = dcon - drec - ddec;
            if(dcon !== 0)
            dconfirmed = "[ "+((dcon > 0) ? "+" : "") +CommaNumber(dcon)+" ]";
            if(ddec !== 0)
            ddeceased = "[ "+((ddec> 0) ? "+" : "") +CommaNumber(ddec)+" ]";
            if(drec !== 0)
            drecovered = "[ "+((drec > 0) ? "+" : "") +CommaNumber(drec)+" ]";
            if(dact !== 0)
            dactive = "[ "+((dact > 0) ? "+" : "") + CommaNumber(dact)+" ]";
            if(dtst !== 0)
            dtested = "[ "+((dtst > 0) ? "+" : "") + CommaNumber(dtst)+" ]";
        }
        let listContent = [
            [2, "Confirmed", "text-danger", confirmed, dconfirmed],
            [2, "Active", "text-primary", active, dactive],
            [2, "Recovered", "text-success", recovered, drecovered],
            [2, "Deceased", "text-defalut", deceased, ddeceased],
            [2, "Tested", "text-info", tested, dtested]
        ];
        //const link
        
        const list = listContent.map((ele, key) => {
            let link = null, update= null;
            update = <div style={{fontSize : "0.8rem"}}>{ele[4]}</div>;
            return (
                <Col md={ele[0]} key={key} className="mt-1 ml-3 mr-3 pl-0 pr-0">
                <Card className="card-chart">
                    <CardHeader>
                    <h1 className="card-category">
                        <span style={{fontSize : '1rem'}}> {ele[1]} </span>
                        {link}
                    </h1>
                    {update}
                    <CardTitle style={{fontSize : '1.2rem'}}>
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