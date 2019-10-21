import React from 'react'
import { Paper, Grid, Typography, Button } from '@material-ui/core';

const properties = ['count', 'min', 'max', 'mean', 'freq', 'top', 'unique'];

function ClustersList({clusters}) {
    return(<div>
        {clusters.map(
            (cluster, index) => (
                <Paper style={{ padding: 12, marginBottom: 16 }}>
                    <Typography variant="h3">{index + 1}</Typography>
                    <Grid 
                        container
                        direction="row"
                        spacing={2}
                        wrap="nowrap"
                        style={{
                            overflowX: 'auto'
                        }}>
                            {Object.keys(cluster).map(
                                field => (
                                    <Grid item style={{ minWidth: 160 }}>
                                        <Typography style={{ fontWeight: 'bold' }}>{field}</Typography>
                                        {properties.map(
                                            proper => cluster[field][proper] 
                                                ? <Typography style={{ fontSize: '12px' }}>{proper}: {cluster[field][proper]}</Typography> 
                                                : ''
                                        )}
                                        <Button color="primary" size="small">Tải xuống</Button>
                                    </Grid>
                                )
                            )}
                    </Grid>
                </Paper>
            )
        )}
    </div>);
}

export default ClustersList;