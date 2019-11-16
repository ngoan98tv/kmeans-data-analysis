import React, { useState } from 'react'
import { Paper, Typography, makeStyles, Button, CircularProgress } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
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
            <Typography className={classes.title}>CHỌN FILE</Typography>

            <label htmlFor="fileInput" style={{marginBottom: 12, display: 'flex', justifyContent: 'flex-end'}}>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    type="submit" 
                    disabled={selectedFile === null || isLoading} 
                    variant="contained" 
                    color="primary"
                    startIcon={isLoading ? <CircularProgress size={24} /> : <PublishIcon/>}
                >Tải lên</Button>
            </div>
        </Paper>
    );
}

export default UploadForm;