import { Grid } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainMenu from "./components/MainMenu";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <>
      <Header />

      <div className="content">
        <Grid container>
          <Grid item md={1} sm={1}/>
          <Grid item xs={12} sm={10} md={10}>
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/movies" component={Movies}  />
              <Route path="/series" component={Series} />
              <Route path="/" component={Search} />
            </Switch>
          </Grid>

          <Grid item md={1} sm={1} />
        </Grid>
      </div>
      <MainMenu />
    </>
  );
}

export default App;
