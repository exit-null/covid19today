import React, {Suspense} from "react";
import { CSSTransition } from 'react-transition-group';
import CommaNumber from 'comma-number';
import Axios from 'axios';
import {BrowserView, MobileView} from 'react-device-detect';

//import '../../../assets/css/dummy.css';
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col
} from "reactstrap";

const AllInOneGraph = React.lazy( () => import("./AllInOneGraph"));
const Top10India = React.lazy( () => import("./Top10India"));

class NumberPanel extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = {
            showMessage : true,
        };
        this.list = null;
    }

    componentDidMount(){
        Axios.get('https://visuospace.herokuapp.com/india_current')
        .then( response => {
            this.setState({data : response.data.current_number , loader : false});
        });
    }

    fillFunction = () => {
        let confirmed = CommaNumber(this.state.data['confirmed']);
        let deceased = CommaNumber(this.state.data['deaths']);
        let recovered = CommaNumber(this.state.data['recovered']);
        let active = CommaNumber(this.state.data['active']);
        let dcon = Number.parseInt(this.state.data['deltaconfirmed']);
        let drec = Number.parseInt(this.state.data['deltarecovered']);
        let ddec = Number.parseInt(this.state.data['deltadeaths']);
        let dact = dcon - drec - ddec;
        let dconfirmed = "[ "+(dcon > 0 ? "+" : "")+CommaNumber(this.state.data['deltaconfirmed'])+" ]";
        let ddeceased = "[ +"+CommaNumber(this.state.data['deltadeaths'])+" ]";
        let drecovered = "[ +"+CommaNumber(this.state.data['deltarecovered'])+" ]";
        let dactive = "[ "+(dact > 0 ? "+" : "")+CommaNumber(dact)+" ]";
        let today_test = "[ +"+CommaNumber(this.state.data.samplereportedtoday)+" ]";
        let tests = CommaNumber(this.state.data['totalsamplestested']);
        let listContent = [
            [2, "Confirmed", "text-danger", confirmed, dconfirmed],
            [2, "Active", "text-primary", active, dactive],
            [2, "Recovered", "text-success", recovered, drecovered],
            [2, "Deceased", "text-defalut", deceased, ddeceased],
            [2, "Tests", "text-info", tests, today_test]
        ];
        //const link
        this.list = listContent.map((ele, key) => {
            let link = null, update= null;
            if(key == 5) link = <a href={this.state.data['source']} target="_blank">
                    <i className={"pull-right tim-icons icon-attach-87 "+ele[2]} />
                </a>
            if(ele[4].length != 0)
            {
                update = <div style={{fontSize : "12px"}}>{ele[4]}</div>;
            }
            else update = <div style={{fontSize : "12px"}}><br></br></div>;
            return (
                <Col lg={ele[0]} key={key} className="mt-1 ml-3 mr-3 pl-0 pr-0">
                <Card className="card-chart">
                    <CardHeader>
                    <h1 className="card-category">
                        <span style={{fontSize : '17px'}}> {ele[1]} </span>
                        {link}
                    </h1>
                    {update}
                    <CardTitle tag="h4">
                        <i className={"tim-icons icon-world "+ele[2]} />{" "}
                        <span >{ele[3]}</span>
                    </CardTitle>
                    </CardHeader>
                </Card>
                </Col>
            );
        });
    }
    
    render(){
        
        if(this.state.data) this.fillFunction();
        return (
            <>
                {this.state.data &&
                <>
                <CSSTransition
                    in={this.state.showMessage}
                    timeout={1000}
                    appear={true}
                    classNames="fader"
                >
                    <Row>
                        {this.list}
                    </Row>
                </CSSTransition>
                <Row >
                    <Col xs='12' sm='12' md='7'>
                        <Suspense fallback={<div></div>}>
                            <AllInOneGraph />
                        </Suspense>
                    </Col>
                    <Col xs="12" sm="12" md="5">
                        <BrowserView>
                            <Suspense fallback={<div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                            </div>}>
                                <Top10India label={1} number={7} type="confirmed" text="Confirmed Cases"/>
                            </Suspense>
                        </BrowserView>
                    </Col>
                </Row>
                </>}
            </>

        );
    }
}

export default NumberPanel;