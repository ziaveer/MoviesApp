import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paging(props) {
    // const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    window.scroll(0,0);
    props.onChangehandle(value);
  };
  const classes = useStyles();
  return (
    <Grid item container justifyContent="center" className={classes.root}>
      <Pagination count={props.count}  page={props.page}  hideNextButton hidePrevButton color='secondary' size="large" onChange={handleChange} />
      
      </Grid>
  );
}