import React from 'react';
import { Col, Card, CardBody, CardHeader, Row } from 'reactstrap';
import DataTable, { createTheme } from 'react-data-table-component';
 
class DistrictWiseData extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    currentTheme(){
        const body = document.body.classList;
        let white = false;
        Object.keys(body).map((e) => {if(body[e] === 'white-content') white = true;})
        return white;
    }
    render()
    {
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
        let data = [];
        let int = (a) => (a == undefined) ? 0 : Number.parseInt(a);
        let intf = (a) => (a == undefined) ? 0 : Number.parseInt(a).toLocaleString();
        let unDef = (a) => (a == undefined) ? 0 : a;
        let total = {};
        console.log(this.props.data.data);
        Object.keys(this.props.data.data).map((element,index) => {
            let cnf_str;
            let key = element;
            let ele = this.props.data.data[element];
            if(ele.total == undefined) return null;
            let act = unDef(ele.total.confirmed) - unDef(ele.total.recovered) - unDef(ele.total.deceased);
            if(ele.delta!= undefined && int(ele.delta['confirmed']) != 0) cnf_str = <div>
                <div style={{color: '#ff3333', fontSize: '10px', textAlign:'center'}}>{((int(ele.delta['confirmed']) < 0) ? "" : "+")+intf(ele.delta['confirmed'])}</div>
                <div>{intf(ele.total['confirmed'])}</div></div>
            else cnf_str = <div><div>{intf(ele.total['confirmed'])}</div></div>
            let rec_str;
            if(ele.delta!= undefined && int(ele.delta['recovered']) > 0) rec_str = <div>
                <div style={{color: 'green', fontSize: '10px', textAlign:'center'}}>+{intf(ele.delta['recovered'])}</div>
                <div>{intf(ele.total['recovered'])}</div></div>
            else rec_str = <div><div>{intf(ele.total['recovered'])}</div></div>
            let dec_str;
            if(ele.delta!= undefined && int(ele.delta['deceased']) > 0) dec_str = <div>
                <div style={{color: 'gray', fontSize: '10px', textAlign:'center'}}>+{intf(ele.delta['deceased'])}</div>
                <div>{intf(ele.total['deceased'])}</div></div>
            else dec_str = <div><div>{intf(ele.total['deceased'])}</div></div>
            let obj = {id : index,
                state : key,
                confirmed :   cnf_str,
                confirmedsor : int(ele.total['confirmed']),
                active : intf(act),
                activesor : int(act),
                recovered : rec_str,
                recoveredsor : int(ele.total['recovered']),
                deaths : dec_str,
                deathssor : int(ele.total['deceased'])
               };
            data.push(obj);
            return null;
        });

        const columns = [
        {
            name: 'Districts',
            selector: 'state',
            wrap: true,
            center:false,
            sortable:'true',
            width: '28%',
        },
        {
            name: 'Cofirmed',
            selector: 'confirmed',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '18%',
        },
        {
            name: 'Active',
            selector: 'active',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '18%',
        },
        {
            name: 'Recovered',
            selector: 'recovered',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '18%',
        },
        {
            name: 'Deaths',
            selector: 'deaths',
            sortable: true,
            allowOverflow:true,
            center:true,
            width: '18%',
        }
        ];
        const customStyles = {
            rows: {
              style: {
                minHeight: '38px',
              }
            },
            headCells: {
                style: {
                    fontSize : '14px',
                    fontWeight: 300,
                    color: !theme ? "#333333" : "#262626",
                    background: '#cccccc'
                }
            },
            cells: {
                style: {
                  align: 'left',
                },
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
            rows.forEach(element => ele.push(element));
            return ele;
        };
            
        return (
            <>
            <Card className="card-chart">
                <CardBody style={{padding: '0 2%'}}>
                <DataTable
                    columns={columns}
                    data={data}
                    theme="solarized"
                    customStyles={customStyles}
                    highlightOnHover= {true}
                    wrap={false}
                    width={'100%'}
                    defaultSortField={'confirmed'}
                    defaultSortAsc={false}
                    sortFunction={this.sortFunction}
                    noHeader={true}
                    pagination={true}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10,25,50]}
                />
                </CardBody>
              </Card>
            </>
        );
    }
}

export default DistrictWiseData;