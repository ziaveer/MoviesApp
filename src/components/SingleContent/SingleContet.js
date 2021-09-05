import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {  Grid } from "@material-ui/core";
import Rating from "./Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    "&:hover": {
      background: "#424242",
    },
  },
  media: {
    height: 200,
    paddingTop: "60%", // 16:9
    borderRadius: 3,
  },
}));
const SingleContent = (props) => {
  
  const classes = useStyles();
   
  

  return (
    <Grid item xs={6} sm={4} md={3} >
      <Card className={classes.root} onClick={()=>{console.log(props)}}>
        <CardMedia
          className={classes.media}
          image={ props.poster ? ` https://image.tmdb.org/t/p/w300/${props.poster}`: "https://www.movienewz.com/img/films/poster-holder.jpg"}
          title={`${props.title}`}
        />
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          
          <Typography noWrap variant="caption" color="secondary" component="span">
            {props.title }
          </Typography>
          <Typography variant="caption" color="secondary" component="p">
            {props.media_type==='Tv' ? 'Tv':'Movie'}
          </Typography>
          <Rating rating={props.vote_average}/>

          
        </CardContent>
      </Card>
    </Grid>
  );
};
export default SingleContent;
