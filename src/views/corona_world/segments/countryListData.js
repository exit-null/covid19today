export const columns = [
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
export var customStyles = {
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