import React from 'react';
import { Col, Card, CardBody, CardHeader, Row } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Axios from 'axios';
var abbreviate = require('number-abbreviate');
 
class StateWiseData extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.data = [];
    }

    componentDidMount(){
        Axios.get('https://visuospace.herokuapp.com/india_topstates')
        .then( response => {
            this.setState({...response.data});
            //console.log(response.data);
        });
    }

    currentTheme(){
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
    }

    stateLink(element)
    {
        if(element['statecode'] == 'TT')
        {
            return "Total";
        }
        else if(element['statecode'] == 'UN')
        {
            return "Unassigned";
        }
        else
        {
            return <Link to={"/state/"+element['statecode']}><span style={{color : '#8080ff'}}>{element['state']+" "}</span></Link>
        }
    }

    preWork = () => {
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
        this.data = [];
        let int = (a) => (a == undefined) ? 0 : Number.parseInt(a);
        let intf = (a) => (a == undefined) ? 0 : Number.parseInt(a).toLocaleString();
        let abbreviate_int = (a,u) => (a == undefined) ? 0 : abbreviate(Number.parseInt(a),1);
        let total = {};
        this.state.data.forEach((element,index) => {
            let cnf_str;
            if(int(element['confirmed']) != 0) {
            if(int(element['deltaconfirmed']) != 0) cnf_str = <div>
                <div style={{color: '#ff3333', fontSize: '11px', textAlign:'center'}}>{((int(element['deltaconfirmed']) < 0) ? "" : "+")+intf(element['deltaconfirmed'])}</div>
                <div>{intf(element['confirmed'])}</div></div>
            else cnf_str = <div><div>{intf(element['confirmed'])}</div></div>
            let rec_str;
            if(int(element['deltarecovered']) > 0) rec_str = <div>
                <div style={{color: 'green', fontSize: '11px', textAlign:'center'}}>+{intf(element['deltarecovered'])}</div>
                <div>{intf(element['recovered'])}</div></div>
            else rec_str = <div><div>{intf(element['recovered'])}</div></div>
            let dec_str;
            if(int(element['deltadeaths']) > 0) dec_str = <div>
                <div style={{color: 'gray', fontSize: '11px', textAlign:'center'}}>+{intf(element['deltadeaths'])}</div>
                <div>{intf(element['deaths'])}</div></div>
            else dec_str = <div><div>{intf(element['deaths'])}</div></div>
            let tes_str;
            if(int(element['deltatested']) > 0) tes_str = <div>
                <div style={{color: '#3333ff', fontSize: '11px', textAlign:'center'}}>+{abbreviate_int(element['deltatested'],1)}</div>
                <div>{abbreviate_int(element['tested'],1)}</div></div>
            else if(element['state'] == "Total") tes_str = <div><div>{abbreviate_int(this.state.tested.totalsamplestested,1)}</div></div>
            else tes_str = <div><div>{abbreviate_int(element['tested'],1)}</div></div>
            
            let active_ = int(element['deltaconfirmed']) - int(element['deltadeaths']) - int(element['deltarecovered']);
            let act_str;
            if((int(element['deltaconfirmed']) != 0 || int(element['deltadeaths']) > 0 || int(element['deltarecovered']) > 0) && (active_ != 0)) 
            act_str = <div>
                <div style={{color: '#3399ff', fontSize: '11px', textAlign:'center'}}>
                    {((active_ < 0) ? "" : "+")+active_}</div>
                <div>{intf(element['active'])}</div>
                </div>
            else act_str = <div><div>{intf(element['active'])}</div></div>
            let ele = {id : index,
                state : element['state'],
                statelink : this.stateLink(element),
                confirmed :   cnf_str,
                confirmedsor : int(element['confirmed']),
                active : act_str,
                activesor : int(element['active']),
                recovered : rec_str,
                recoveredsor : int(element['recovered']),
                deaths : dec_str,
                deathssor : int(element['deaths']),
                tested : tes_str,
                testedsor : int(element['tested'])
               };
            if(index != 0)
            this.data.push(ele);
            else total = ele;
            }
        });
        this.data.push(total);
        this.columns = [
        {
            name: 'States / UT',
            selector: 'statelink',
            wrap: true,
            center:false,
            sortable:'true',
            width: '24%',
        },
        {
            name: 'Cofirmed',
            selector: 'confirmed',
            sortable: true,
            center:true,
            width: '16%',
        },
        {
            name: 'Active',
            selector: 'active',
            sortable: true,
            center:true,
            width: '16%',
        },
        {
            name: 'Recovered',
            selector: 'recovered',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '16%',
        },
        {
            name: 'Deaths',
            selector: 'deaths',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '14%',
        },
        {
            name: 'Tested',
            selector: 'tested',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '15%',
        }
        ];
        this.customStyles = {
            display : 'block',
            rows: {
                style: {
                  minHeight: '46px',
                }
              },
            headCells: {
                style: {
                    fontSize : '14px',
                    color: !theme ? "#333333" : "#262626",
                    background: '#cccccc'
                }
            },
          }; 
        this.sortFunction = (rows,field,direction) => {
            if(field == 'state') 
            rows.sort((a,b) => ((direction === 'desc') ? -1 : 1) * a[field].localeCompare(b[field]));
            else rows.sort((a,b) => {
                if(direction === 'asc') return a[field+'sor']-b[field+'sor'];
                else return b[field+'sor']-a[field+'sor'];
            });
            let ele = [];
            let tot = {};
            rows.forEach(element => {
                if(element.id == 0) tot = element;
                else ele.push(element);
            });
            ele.push(tot);
            return ele;
        };
    }

    render()
    {
        if(this.state.data && this.data.length == 0) this.preWork();
        console.log(this.data.length);
        return (
            <>
            {this.state.data &&
            <Card className="card-chart">
                <CardBody style={{display : 'block', overflowX: 'hidden',padding: '2% 2%'}}>
                <DataTable
                    title='Statewise Data'
                    columns={this.columns}
                    data={this.data}
                    theme="solarized"
                    customStyles={this.customStyles}
                    highlightOnHover= {true}
                    wrap={true}
                    sortFunction={this.sortFunction}
                    defaultSortField="confirmed"
                    defaultSortAsc={false}
                    center={true}
                    maxWidth={'100%'}
                />
                </CardBody>
              </Card>}
            </>
        );
    }
}

export default StateWiseData;