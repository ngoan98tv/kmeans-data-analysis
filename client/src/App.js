import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import Dashboard from './components/Dashboard';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#123456",
        color: "white",
        padding: 16,
        '& h1': {
            fontSize: 24
        }
    },
    content: {
        maxWidth: 920,
        margin: 12
    }
}))


function App() {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "#dedede", minHeight: '110vh'}}>
      <div className={classes.header}>
          <Typography variant="h1">Data Analysis</Typography>
      </div>
      <Grid container justify="center" >
          <Grid item className={classes.content}>
              <Dashboard />
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
