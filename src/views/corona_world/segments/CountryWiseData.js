import React, {Suspense} from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Row, Col } from 'reactstrap';
import { createTheme } from 'react-data-table-component';
const DataTable = React.lazy(() => import('react-data-table-component'));

class CountryWiseData extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { currentTable : 0};
        this.makeData();
    }
    changeCurrentTable = (e) => {
        this.setState({currentTable : e});
    }
    currentTheme(){
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
    }
    
    makeData = () => {
        let int = (str) => {
            if(str === undefined) return 0;
            let e = "";
            for(let i=0; i<str.length; i++)
            {
                if(str[i] - '0' >= 0 || str[i] - '0' <= 9) e+=str[i];
                //if(str[i] == '.') break;
            }
            if(e.length == 0) return 0;
            return Number.parseInt(e);
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
        for(let ii = 0; ii < 2; ii++){
            let total = {};
        this.props.data[ii].forEach((element,index) => {
            let cnf_str;
            if(int(element['NewCases']) > 0) cnf_str = <div>
                <div style={{color: '#ff3333', fontSize: '12px', textAlign:'center'}}>{element['NewCases']}</div>
                <div>{element['TotalCases']}</div></div>
            else cnf_str = <div><div>{element['TotalCases']}</div></div>
            let rec_str;
            if(int(element['NewRecovered']) > 0) rec_str = <div>
                <div style={{color: 'green', fontSize: '12px', textAlign:'center'}}>{(element['NewRecovered'])}</div>
                <div>{element['TotalRecovered']}</div></div>
            else rec_str = <div><div>{element['TotalRecovered']}</div></div>
            let dec_str;
            if(int(element['NewDeaths']) > 0) dec_str = <div>
                <div style={{color: 'gray', fontSize: '12px', textAlign:'center'}}>{(element['NewDeaths'])}</div>
                <div>{element['TotalDeaths']}</div></div>
            else dec_str = <div><div>{element['TotalDeaths']}</div></div>
            let ele = {id : index,
                country : element['Country'],
                confirmed :   cnf_str,
                confirmedsor : int(element['TotalCases']),
                active : element['ActiveCases'],
                activesor : int(element['ActiveCases']),
                recovered : rec_str,
                recoveredsor : int(element['TotalRecovered']),
                deaths : dec_str,
                deathssor : int(element['TotalDeaths']),
                tests : element['TotalTests'],
                testssor : int(element['TotalTests']),
                cpm : element['TotCases_1M_Pop'],
                cpmsor : int(element['TotCases_1M_Pop']),
                dpm : element['Deaths_1M_pop'],
                dpmsor : int(element['Deaths_1M_pop']),
                tpm : element['Tests_1M_Pop'],
                tpmsor : int(element['Tests_1M_Pop'])
               };
            if(index != 0)
            data[ii].push(ele);
            else total = ele;
        });
        data[ii].push(total);}
        this.data = data;
        this.columns = [
        {
            name: 'Country',
            selector: 'country',
            wrap: true,
            center:false,
            sortable:'true',
            width: '16%',
        },
        {
            name: 'Cofirmed',
            selector: 'confirmed',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '11%',
        },
        {
            name: 'Active',
            selector: 'active',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '11%',
        },
        {
            name: 'Recovered',
            selector: 'recovered',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '10%',
        },
        {
            name: 'Deaths',
            selector: 'deaths',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '10%',
        },
        {
            name: 'Tests',
            selector: 'tests',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '12%',
        },
        {
            name: 'Cases/1M',
            selector: 'cpm',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '10%',
        },
        {
            name: 'Deaths/1M',
            selector: 'dpm',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '10%',
        },
        {
            name: 'Tests/1M',
            selector: 'tpm',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '10%',
        }
        ];
        this.customStyles = {
            rows: {
              style: {
                minHeight: '45px',
                fontSize: '15px',
                width: '100%'
              }
            },
            headCells: {
                style: {
                    fontSize: '17px',
                    fontWeight: 400,
                    color: !theme ? "#333333" : "#262626",
                    background: '#cccccc',
                    width: '100%'
                }
            },
            cells: {
                style: {
                  width: '100%',
                  align: 'left',
                },
              },
          }; 
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
    render()
    {

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
}

export default CountryWiseData;