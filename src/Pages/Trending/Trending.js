import { Grid } from "@material-ui/core";
import Paging from "../../components/Paging";

import React, { useCallback, useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContet";
const Trending = () => {
  const [trendingSet, setTrendingSet] = useState([]);
  // const [totalPage, setTotalPage] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const handleChange =(value) =>{
    setCurrentPage(value);
    console.log(value);

  }
  
  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("invalid");
      }

      const {  results } = await response.json();
      // console.log(results);
      // setTotalPage(total_pages);
      setTrendingSet(results);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);
  // console.log(trendingSet);
  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);
  return (
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
 <Paging count={10} onChangehandle={handleChange} />
    </Grid>
  );
};
export default Trending;
