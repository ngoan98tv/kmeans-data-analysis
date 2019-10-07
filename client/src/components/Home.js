import React, { useState } from 'react'
import { Grid, Paper, Typography, makeStyles, Button, FormGroup, FormControl, FormControlLabel, Input, ButtonGroup, CircularProgress } from '@material-ui/core'
import Axios from 'axios';

const serverUrl = "http://localhost:8000";

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
    },
    w120: {
        maxWidth: 120
    },
    form: {
        '& label, & button, & input': {
            marginBottom: 12
        }
    },
    title: {
        marginBottom: 12,
        fontSize: 18
    }
}))

function Home() {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('uploaded', selectedFile);
        Axios.post(serverUrl + "/upload", formData)
            .then((response) => {
                setIsLoading(false);
                console.log(response.body);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.message);
            })
    }

    return (<div style={{ backgroundColor: "#dedede", minHeight: '100vh' }}>
        <div className={classes.header}>
            <Typography variant="h1">Panasonic Data Analysis</Typography>
        </div>
        <Grid container spacing={1} className={classes.body}>
            <Grid item xs={12} lg={4}>
                <Paper className={classes.container}>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Typography className={classes.title}>TẢI LÊN</Typography>
                        <label htmlFor="fileInput">
                            <ButtonGroup fullWidth>
                                <Button variant="contained" className={classes.w120} disabled >Chọn file</Button>
                                <Button variant="outlined" disabled>{selectedFile ? selectedFile.name : ''}</Button>
                            </ButtonGroup>
                        </label>
                        <input id="fileInput" hidden name="data" onChange={e => setSelectedFile(e.target.files[0])} type="file" accept=".xlsx" />
                        
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                        {isLoading ? <CircularProgress size={24} /> : ''}
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
                <Paper className={classes.container}>
                    <Typography>Preview</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
        </Grid>
        <div className={classes.footer}>
            <Typography>Updated 6 Oct by Ngoan Tran</Typography>
        </div>
    </div>);
}

export default Home;