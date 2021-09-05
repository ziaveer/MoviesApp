import { Chip, Grid } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import React from "react";
const Generes = (props) => {
  const [genres, setgenres] = useState([]);
  const [selectedGenres, setselectedGenres] = useState([]);

  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `  
            https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      if (!response.ok) {
        throw new Error("invalid");
      }
      // const data = await response.json();
      const { genres } = await response.json();
      setgenres(genres);
      //   console.log(genres);
      //   console.log(results);
      //   setTotalPage(total_pages);
      //   setTrendingSet(results);
    } catch (error) {
      // console.log(error);
    }
  }, []);
  // console.log(trendingSet);
  useEffect(() => {
    fetchHandler();
    // console.log("ss");
  }, [fetchHandler]);
  
  useEffect(() => {
    props.onFetchGeneres(selectedGenres);
    // console.log("selectedGenres,genres");
    
  }, [selectedGenres, genres, props]);

  const handleClick = (genre) => {
    setselectedGenres([...selectedGenres, genre]);
    setgenres(
      genres.filter((g) => {
        return g.id !== genre.id;
      })
    );
    // props.onFetchGeneres(selectedGenres);
  };
  const deleteClick = (genre) => {
    setgenres([genre, ...genres]);
    setselectedGenres(
      selectedGenres.filter((sGenres) => {
        return sGenres.id !== genre.id;
      })
    );
  };
  //   console.info(selectedGenres);

  return (
    <Grid item style={{ margin: 10 }} container>
      {selectedGenres.map((sGenres) => {
        return (
          <Chip
            key={sGenres.id}
            size="small"
            label={sGenres.name}
            clickable
            color="secondary"
            onDelete={() => {
              deleteClick(sGenres);
            }}
            onClick={() => {
              deleteClick(sGenres);
            }}
          />
        );
      })}
      {genres.map((genre) => {
        return (
          <Chip
            style={{ margin: 1, padding: 3 }}
            key={genre.id}
            size="small"
            label={genre.name}
            clickable
            onClick={() => handleClick(genre)}
          />
        );
      })}
    </Grid>
  );
};
export default Generes;
