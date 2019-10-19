import React, { useState } from 'react'
import { Grid, Typography, makeStyles} from '@material-ui/core'
import UploadForm from './UploadForm';
import SelectFieldsForm from './SelectFieldsForm';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 12
    },
    header: {
        backgroundColor: "#123456",
        color: "white",
        padding: 16,
        '& h1': {
            fontSize: 24
        }
    },
    body: {
        padding: 16
    },
    footer: {
        padding: 16
    }
}))

function Home() {
    const classes = useStyles();
    const [fields, setFields] = useState([]);

    return (<div>
        <div className={classes.header}>
            <Typography variant="h1">Panasonic Data Analysis</Typography>
        </div>
        <Grid container spacing={1} className={classes.body}>
            <Grid item xs={12} lg={4}>
                <UploadForm onResponse={(data) => setFields(data)}  />
            </Grid>
            <Grid item xs={12} lg={8}>
                <SelectFieldsForm fields={fields} />
            </Grid>
        </Grid>
    </div>);
}

export default Home;