import React, { useState } from 'react'
import { Paper, Typography, makeStyles, Button, ButtonGroup, CircularProgress, TextField } from '@material-ui/core'
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
    w120: {
        maxWidth: 120
    },
    form: {
        padding: 12,
    },
    title: {
        marginBottom: 12,
        fontWeight: 'bold'
    },
    loading: {
        marginLeft: '12px'
    },
}))

function UploadForm({onResponse}) {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('uploaded', selectedFile);
        Axios.post("/upload", formData)
            .then(({data}) => {
                setIsLoading(false);
                onResponse(data.datafields);
            })
            .catch((error) => { 
                setIsLoading(false);
                console.log(error.response);
            })
    }

    return (
        <Paper component="form" onSubmit={handleSubmit} className={classes.form}>
            <Typography className={classes.title}>TẢI LÊN</Typography>

            <label htmlFor="fileInput" style={{marginBottom: 12}}>
                <Button
                    variant="outlined"
                    component="div" 
                    role="div"
                    fullWidth
                    style={{ textTransform: 'none', marginBottom: 12 }} 
                >
                    {selectedFile ? selectedFile.name : 'Chọn file để phân tích'}
                </Button>
            </label>
            
            <input 
                id="fileInput" 
                hidden 
                name="data" 
                onChange={e => setSelectedFile(e.target.files[0])} 
                type="file" 
                accept=".xlsx" 
                style={{marginBottom: 12}}
            />
            
            <Button 
                type="submit" 
                disabled={selectedFile === null || isLoading} 
                variant="contained" 
                color="primary"
                endIcon={isLoading ? <CircularProgress size={24} /> : ''}
            >
                Submit
            </Button>
            
        </Paper>
    );
}

export default UploadForm;