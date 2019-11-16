import React, { useState } from 'react'
import { Grid, Paper, Typography, makeStyles, Button, CircularProgress, TextField, Collapse, ButtonGroup } from '@material-ui/core'
import EyeIcon from '@material-ui/icons/RemoveRedEye'
import BubbleIcon from '@material-ui/icons/BubbleChart'
import Axios from 'axios'
import Preview from './Preview'
import FieldsList from './FieldsList'
import UploadForm from './UploadForm'
import ClustersList from './ClustersList'

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
        fontWeight: 'bold'
    },
    loading: {
        marginLeft: 12
    }
}))

function Dashboard() {
    const classes = useStyles();
    const [fields, setFields] = useState([]);
    const [previewData, setPreviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isClustering, setIsClustering] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [nClusters, setNClusters] = useState(3);
    const [nLoops, setNLoops] = useState(300);
    const [clusters, setClusters] = useState([]);

    const handlePreview = () => {
        setIsLoading(true);
        Axios.post('/preview', {
            fields: selectedFields,
            lines: [start, end]
        }).then(({data}) => {
            setPreviewData(JSON.parse(data));
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.log(err.response);
        });
    }

    const handleCluster = () => {
        setIsClustering(true);
        Axios.post('/cluster', {
            fields: selectedFields,
            numOfClusters: nClusters, 
            maxLoops: nLoops
        }).then(({data}) => {
            console.log(JSON.parse(data));
            setClusters(JSON.parse(data));
            setIsClustering(false);
        }).catch(err => {
            setIsClustering(false);
            console.log(err.response);
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
                <Collapse in={previewData.length > 0 && fields.length > 0 && clusters.length === 0}>
                    <Preview data={previewData} onBack={() => setPreviewData([])} />
                </Collapse>
                <Collapse in={previewData.length === 0 && fields.length > 0 && clusters.length === 0}>
                    <FieldsList fields={fields} selectedFields={selectedFields} onChange={(data) => setSelectedFields(data)} />
                </Collapse>
                <Collapse in={clusters.length > 0}>
                    <ClustersList clusters={clusters} />
                </Collapse>
            </Grid>
            <Grid item md={fields.length > 0 ? 4 : 12} xs={12}>
                <UploadForm onResponse={(data) => setFields(data)}  />
                <div style={{ height: 16 }} />
                <Collapse in={fields.length > 0}>
                    <Paper className={classes.container}>
                        <Typography style={{ marginBottom: 12 }}>Nhập số dòng để xem trước</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6} >
                                <TextField type="number" label="Bắt đầu" value={start} onChange={e => setStart(e.target.value)} fullWidth/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField type="number" label="Kết thúc" value={end} onChange={e => setEnd(e.target.value)} fullWidth/>
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'flex-end' }}>
                            <Button 
                                onClick={handlePreview}
                                disabled={selectedFields.length === 0 || isLoading || isClustering} 
                                variant="contained" 
                                startIcon={isLoading ? <CircularProgress size={24}/> : <EyeIcon/>}
                                color="primary">Xem trước</Button>
                        </div>
                    </Paper>
                    <div style={{ height: 16 }} />
                    <Paper className={classes.container}>
                        <Typography style={{ marginBottom: 12 }}>Tùy chọn gom nhóm</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6} >
                                <TextField type="number" label="Số nhóm" value={nClusters} onChange={e => setNClusters(e.target.value)} fullWidth/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField type="number" label="Số lần lặp" value={nLoops} onChange={e => setNLoops(e.target.value)} fullWidth/>
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'flex-end' }}>
                            <ButtonGroup>
                            <Button 
                                onClick={() => {
                                    setClusters([]);
                                    setPreviewData([]);
                                }}
                                disabled={selectedFields.length === 0 || isLoading || isClustering} 
                                color="primary" >Chọn lại</Button>
                            <Button 
                                onClick={handleCluster}
                                disabled={selectedFields.length === 0 || isLoading || isClustering} 
                                variant="contained" 
                                startIcon={isClustering ? <CircularProgress size={24}/> : <BubbleIcon/>}
                                color="primary" >Gom nhóm</Button>
                            </ButtonGroup>
                        </div>
                    </Paper>
                </Collapse>
            </Grid>
        </Grid>
    );
}

export default Dashboard;