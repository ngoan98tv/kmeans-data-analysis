import React from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'

function FieldsList({fields, selectedFields, onChange}) {
    return (
        <Paper style={{ padding: 12 }}>
            <Typography style={{ marginBottom: 12, fontWeight: 'bold' }}>CÁC THUỘC TÍNH CỦA DỮ LIỆU ({fields.length})</Typography>
            <Grid container spacing={1}>
                {fields.map((field, index) => 
                    <Grid item key={field + index}>
                        <Button 
                            style={{
                                textTransform: 'none',
                                padding: '0px 6px',
                                minWidth: '24px'
                            }} 
                            variant='contained'
                            size={'small'}
                            color={selectedFields.includes(field) ? 'primary' : 'default'}
                            endIcon={<CheckIcon/>}
                            onClick={() => {
                                const currIndex = selectedFields.indexOf(field);
                                if (selectedFields.includes(field)) {
                                    onChange([
                                        ...selectedFields.slice(0, currIndex),
                                        ...selectedFields.slice(currIndex +1, fields.length)
                                    ]);
                                } else {
                                    onChange([
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
        </Paper>
    );
}

export default FieldsList;