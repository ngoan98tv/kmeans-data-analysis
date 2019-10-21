import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table'
import { Button, Paper } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import EditIcon from '@material-ui/icons/Edit'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import FilterListIcon from '@material-ui/icons/FilterList'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import SearchIcon from '@material-ui/icons/Search'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import RemoveIcon from '@material-ui/icons/Remove'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'

const customIcons = {
    'Add': forwardRef((props, ref) => <AddIcon {...props} ref={ref} />),
    'Check': forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
    'Clear': forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    'Delete': forwardRef((props, ref) => <DeleteOutlineIcon {...props} ref={ref} />),
    'DetailPanel': forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
    'Edit': forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    'Export': forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
    'Filter': forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
    'FirstPage': forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
    'LastPage': forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
    'NextPage': forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
    'PreviousPage': forwardRef((props, ref) => <ChevronLeftIcon {...props} ref={ref} />),
    'ResetSearch': forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    'Search': forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
    'SortArrow': forwardRef((props, ref) => <ArrowUpwardIcon {...props} ref={ref} />),
    'ThirdStateCheck': forwardRef((props, ref) => <RemoveIcon {...props} ref={ref} />),
    'ViewColumn': forwardRef((props, ref) => <ViewColumnIcon {...props} ref={ref} />),
}

function Preview({data, onBack}) {
    const [fields, setFields] = useState([]);
    
    useEffect(() => {
        if (data.length === 0) return;
        const tmp = Object.keys(data[0])
            .filter(field => typeof data[0][field] !== 'object') 
            .map(fieldName => ({
                title: fieldName,
                field: fieldName
            }));
        setFields(tmp);
    }, [data])
    
    return (
        <Paper>
            {data.length === 0 ? '' :
                <MaterialTable
                    columns={fields}
                    data={data}
                    title={<Button startIcon={<BackIcon/>} onClick={onBack}>Quay lại</Button>}
                    icons={customIcons}
                    options={{
                        padding: 'dense'
                    }}
                />
            }
        </Paper>
    );
}

export default Preview;