import React, {Suspense} from 'react';
import classNames from 'classnames';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {columns, customStyles} from './countryListData';
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Row, Col } from 'reactstrap';
import { createTheme } from 'react-data-table-component';
const DataTable = React.lazy(() => import('react-data-table-component'));

class CountryWiseData extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { currentTable : 0};
    }
    changeCurrentTable = (e) => {
        this.setState({currentTable : e});
    }
    countryLink(code,name)
    {
        return <Link to={"/country/"+code}><span style={{color : '#8080ff'}}>{name+" "}</span></Link>

    }
    componentDidMount(){
        Axios.all([Axios.get(`https://disease.sh/v3/covid-19/countries`),
        Axios.get(`https://disease.sh/v3/covid-19/countries?yesterday=true`)])
      .then(Axios.spread((firstResponse, secondResponse) => {  
          let data = [firstResponse.data, secondResponse.data];
          this.setState({
              data : data
          });
      }))
      .catch(error => console.log(error));
    }
    currentTheme(){
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
    }
    makeData = () => {
        let int = (str) => {
            return str;
        }
        const theme = this.currentTheme();
        createTheme('solarized', {
            text: {
              primary: !theme ? "#f2f2f2" : "#333333",
              secondary: '#2aa198',
            },
            background: {
              default: !theme ? "#27293d" : "#ffffff",
            },
            divider:{
                default: !theme ? "#666666" : "#cccccc",
            },
            context: {
              background: '#cb4b16',
              text: '#FFFFFF',
            },
            action: {
              button: 'rgba(0,0,0,.54)',
              hover: 'rgba(0,0,0,.08)',
            },
          });
        let data = [[],[]];
        let formatNum = (k) => k.toLocaleString();
        for(let ii = 0; ii < 2; ii++){
            let total = {};
        this.state.data[ii].forEach((element,index) => {
            let cnf_str;
            if(int(element['todayCases']) > 0) cnf_str = <div>
                <div style={{color: '#ff3333', fontSize: '12px', textAlign:'center'}}>{"+"+formatNum(element['todayCases'])}</div>
                <div>{formatNum(element['cases'])}</div></div>
            else cnf_str = <div><div>{formatNum(element['cases'])}</div></div>
            let rec_str;
            if(int(element['todayRecovered']) > 0) rec_str = <div>
                <div style={{color: 'green', fontSize: '12px', textAlign:'center'}}>{"+"+formatNum(element['todayRecovered'])}</div>
                <div>{formatNum(element['recovered'])}</div></div>
            else rec_str = <div><div>{formatNum(element['recovered'])}</div></div>
            let dec_str;
            if(int(element['todayDeaths']) > 0) dec_str = <div>
                <div style={{color: 'gray', fontSize: '12px', textAlign:'center'}}>{"+"+formatNum(element['todayDeaths'])}</div>
                <div>{formatNum(element['deaths'])}</div></div>
            else dec_str = <div><div>{formatNum(element['deaths'])}</div></div>
            let ele = {id : index,
                country : this.countryLink(element['countryInfo']['iso2'],element['country']),
                confirmed :   cnf_str,
                confirmedsor : element['cases'],
                active : formatNum(element['active']),
                activesor : element['active'],
                recovered : rec_str,
                recoveredsor : element['recovered'],
                deaths : dec_str,
                deathssor : int(element['deaths']),
                tests : formatNum(element['tests']),
                testssor : int(element['tests']),
                cpm : formatNum(element['casesPerOneMillion']),
                cpmsor : int(element['casesPerOneMillion']),
                dpm : formatNum(element['deathsPerOneMillion']),
                dpmsor : int(element['deathsPerOneMillion']),
                tpm : formatNum(element['testsPerOneMillion']),
                tpmsor : int(element['testsPerOneMillion'])
               };
            if(index != 0)
            data[ii].push(ele);
            else total = ele;
        });
        data[ii].push(total);}
        console.log(data);
        this.data = data;
        this.columns = columns;
        this.customStyles = customStyles;
        this.customStyles.headCells.style.color = !theme ? "#333333" : "#262626";
        this.sortFunction = (rows,field,direction) => {
            if(field == 'country') 
            rows.sort((a,b) => ((direction === 'desc') ? -1 : 1) * a[field].localeCompare(b[field]));
            else rows.sort((a,b) => {
                if(direction === 'asc') return a[field+'sor']-b[field+'sor'];
                else return b[field+'sor']-a[field+'sor'];
            });
            let ele = [];
            let tot = {};
            rows.forEach(element => {
                ele.push(element);
            });
            return ele;
        };
    }
    renderWhenNotNull = (flg) => {
        if(flg == null) return;
        this.makeData();
        return (
            <>
            <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">World Data</h5>
                </CardHeader>
                
                <CardBody style={{padding: '2% 2%'}}>
                <Row>
                    <Col sm='8'>
                        <CardTitle tag="h4">
                            <i className="tim-icons icon-bell-55 text-primary" />{" "}
                            Countrywise Data
                        </CardTitle>
                    </Col>
                    <Col sm='4'>
                    <div class='pull-right' style={{marginBottom : '8px'}}>
                        <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                        >
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {active: this.state.currentTable === 0})}
                        color="info" id="0" size="sm"
                        onClick={() => this.changeCurrentTable(0)}
                        >
                        <input defaultChecked className="d-none" name="options" type="radio"/>
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Today
                        </span>
                        <span className="d-block d-sm-none">
                            Today
                        </span>
                        </Button>
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {active: this.state.currentTable === 1})}
                        color="info" id="1" size="sm"
                        onClick={() => this.changeCurrentTable(1)}
                        >
                        <input
                            defaultChecked className="d-none" name="options" type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Yesterday
                        </span>
                        <span className="d-block d-sm-none">
                            Yestd.
                        </span>
                        </Button>
                        </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                <div style={{display : this.state.currentTable === 0 ? 'block' : 'none'}}>
                <Suspense fallback={<div></div>}>
                <DataTable
                    columns={this.columns}
                    data={this.data[0]}
                    noHeader={true}
                    theme="solarized"
                    customStyles={this.customStyles}
                    highlightOnHover= {true}
                    pagination={true}
                    paginationPerPage={15}
                    paginationRowsPerPageOptions={[15,50,100]}
                    sortFunction={this.sortFunction}
                    defaultSortField="confirmed"
                    defaultSortAsc={false}
                />
                </Suspense>
                
                </div>
                <div style={{display : this.state.currentTable === 1 ? 'block' : 'none'}}>
                <Suspense fallback={<div></div>}>
                <DataTable
                    columns={this.columns}
                    noHeader={true}
                    data={this.data[1]}
                    theme="solarized"
                    customStyles={this.customStyles}
                    highlightOnHover= {true}
                    pagination={true}
                    paginationPerPage={15}
                    paginationRowsPerPageOptions={[15,50,100]}
                    sortFunction={this.sortFunction}
                    defaultSortField="confirmed"
                    defaultSortAsc={false}
                />
                </Suspense>
                
                </div>
                </CardBody>
              </Card>
            </>
        );
    }
    render()
    {
        return (
            <>
            {this.renderWhenNotNull(this.state.data)}
            </>
        );
    }
}

export default CountryWiseData;