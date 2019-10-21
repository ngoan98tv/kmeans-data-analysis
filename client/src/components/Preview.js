import React, { useEffect, useState } from 'react'
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
    'Add': () => <AddIcon />,
    'Check': () => <CheckIcon />,
    'Clear': () => <ClearIcon />,
    'Delete': () => <DeleteOutlineIcon />,
    'DetailPanel': () => <ChevronRightIcon />,
    'Edit': () => <EditIcon />,
    'Export': () => <SaveAltIcon />,
    'Filter': () => <FilterListIcon />,
    'FirstPage': () => <FirstPageIcon />,
    'LastPage': () => <LastPageIcon />,
    'NextPage': () => <ChevronRightIcon />,
    'PreviousPage': () => <ChevronLeftIcon />,
    'ResetSearch': () => <ClearIcon />,
    'Search': () => <SearchIcon />,
    'SortArrow': () => <ArrowUpwardIcon />,
    'ThirdStateCheck': () => <RemoveIcon />,
    'ViewColumn': () => <ViewColumnIcon />,
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
                />
            }
        </Paper>
    );
}

export default Preview;