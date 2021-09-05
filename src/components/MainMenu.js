import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";
import MovieIcon from "@material-ui/icons/Movie";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    position: "fixed",
    bottom: 0,
    backgroundColor: "rgb(124, 121, 121)",
    zIndex: 100,
    
    
  },
  menu: {
    color: "whiteSmoke",
  },
});

const MainMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (value === 0) {
      history.push("/");
    }
    else if(value === 1){
      history.push('/movies');
    }
    else if(value === 2){
      history.push('/series');
    }
    else if(value === 3){
      history.push('/search');
    }
  }, [history, value]);
  return (
    <BottomNavigation
      value={value}
      showLabels
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.menu}
        label="Trending"
        
        icon={<TrendingUpIcon />}
      />

      <BottomNavigationAction
        className={classes.menu}
        label="Movies"
        
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        className={classes.menu}
        label="TV "
        
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        className={classes.menu}
        label="Search"
        
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
};
export default MainMenu;
