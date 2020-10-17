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
        let confirmed = CommaNumber(this.props.data['confirmed']);
        let deceased = CommaNumber(unDef(this.props.data['deceased']));
        let recovered = CommaNumber(this.props.data['recovered']);
        let tested = CommaNumber(this.props.data['tested']);
        let active = CommaNumber((this.props.data['confirmed']) 
                        - unDef(this.props.data['deceased']) 
                        - (this.props.data['recovered']));
        let dconfirmed = <br></br>, ddeceased = <br></br>;
        let drecovered = <br></br>, dactive = <br></br>, dtested = <br></br>;
        if(this.props.delta != null)
        {
            let dcon = unDef(this.props.delta['confirmed']);
            let drec = unDef(this.props.delta['recovered']);
            let ddec = unDef(this.props.delta['deceased']);
            let dtst = unDef(this.props.delta['tested']);
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
            if(key == 4 && this.props.meta.tested !== undefined) link = <a href={this.props.meta.tested['source']} target="_blank">
                    <i className={"pull-right tim-icons icon-attach-87 "+ele[2]} />
                </a>
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