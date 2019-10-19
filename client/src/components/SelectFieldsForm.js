import React, { useState } from 'react'
import { Grid, Paper, Typography, makeStyles, Button, CircularProgress } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import Axios from 'axios'

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
    },
    filterItem: {
        textTransform: 'none',
        padding: '0px 6px',
        minWidth: '24px'
    }
}))

function SelectFieldsForm({fields}) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        Axios.post('/preview', {
            fields: selectedFields
        }).then(({data}) => {
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.log(err.response);
        })
    }

    return (
        <Paper component="form" className={classes.container} onSubmit={handleSubmit}>
            <Typography className={classes.title}>CÁC THUỘC TÍNH CỦA DỮ LIỆU ({fields.length})</Typography>
            <Grid container spacing={1}>
                {fields.map((field, index) => 
                    <Grid item key={field + index}>
                        <Button 
                            className={classes.filterItem} 
                            variant='contained'
                            size={'small'}
                            color={selectedFields.includes(field) ? 'primary' : 'default'}
                            endIcon={<CheckIcon/>}
                            onClick={() => {
                                const currIndex = selectedFields.indexOf(field);
                                if (selectedFields.includes(field)) {
                                    setSelectedFields([
                                        ...selectedFields.slice(0, currIndex),
                                        ...selectedFields.slice(currIndex +1, fields.length)
                                    ]);
                                } else {
                                    setSelectedFields([
                                        ...selectedFields,
                                        field
                                    ]);
                                }
                            }}>{field}</Button>
                    </Grid>
                )}
            </Grid>
            <Typography 
                style={{ margin: "12px 0px" }}
                color={selectedFields.length > 6 ? 'error' : 'textPrimary'}>
                    <em>Đã chọn {selectedFields.length} thuộc tính{selectedFields.length > 6 ? ", quá nhiều rồi" + '!'.repeat(selectedFields.length - 6) : ""}</em>
            </Typography>
            <Button 
                type="submit" 
                disabled={selectedFields.length === 0 || isLoading} 
                variant="contained" 
                endIcon={isLoading ? <CircularProgress size={24}/> : ''}
                color="primary" >Xem trước</Button>
        </Paper>
    );
}

export default SelectFieldsForm;