import React from "react";
import { useCallback, useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContet";
import Paging from "../../components/Paging";
import { Grid } from "@material-ui/core";
import Generes from "../../components/Generes";
const Movies = () => {
  const [trendingSet, setTrendingSet] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [genresUrl, setGenresUrl] = useState("");

  const handleChange = (value) => {
    setCurrentPage(value);
    // console.log(value);
  };

  const fetchGeneres = (val) => {
    // console.log("check gen");
    const genresIdUrl = val.map((item) => item.id).toString();
    // console.log(genresIdUrl);

    setGenresUrl(genresIdUrl);
  };

  const fetchHandler = useCallback(async () => {
    try {
      // console.log("mobi");

      const response = await fetch(
        `  
https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genresUrl}`
      );
      if (!response.ok) {
        throw new Error("invalid");
      }
      // const data = await response.json();
      const { total_pages, results } = await response.json();
      // console.log(data);
      // console.log(results);
      setTotalPage(total_pages);
      setTrendingSet(results);
      // setIsLoading(!isLoading);
    } catch (error) {
      // console.log(error);
    }
  }, [currentPage, genresUrl]);
  // console.log(genresUrl);
  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <Grid item>
      <Generes onFetchGeneres={fetchGeneres} />
      <Grid item container spacing={1} justifyContent="center">
        {trendingSet.map((d) => {
          return (
            <SingleContent
              key={d.id}
              title={d.original_title}
              date={d.release_date}
              media_type={d.media_type}
              poster={d.poster_path}
              vote_average={d.vote_average}
            />
          );
        })}
      </Grid>

      {trendingSet.length > 1 && (
        <Paging
          count={totalPage}
          page={currentPage}
          onChangehandle={handleChange}
        />
      )}
    </Grid>
  );
};
export default Movies;
