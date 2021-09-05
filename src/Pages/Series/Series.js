import React from "react";
import {  useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContet";
import Paging from "../../components/Paging";
import { Grid } from "@material-ui/core";
import useHttps from "../../hooks/use-http";
import Loading from "../../components/Loading";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const response = useHttps();
  const { isLoading, error, sendRequest } = response;

  const handlePageChange = (value) => {
    setCurrentPage(value);
    // console.log(value);
  };

  
  
  useEffect(() => {
    const transformedData = (data) => {
      const { total_pages, results } = data;
      setTotalPage(total_pages);
      setSeries(results);
    };
    sendRequest(
      {
        url: `  
      https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`,
      },
      transformedData
    );
    
  }, [currentPage, sendRequest]);
  

  return (
    <Grid item>
        {isLoading && <Loading/>}
        {error && <p>Failed To Fetch</p>}
      <Grid item container spacing={1} justifyContent="center">
        {!error && series.map((d) => {
          return (
            <SingleContent
              key={d.id}
              title={d.name}
              date={d.release_date}
              media_type="Tv"
              poster={d.poster_path}
              vote_average={d.vote_average}
            />
          );
        })}
      </Grid>

      {series.length > 0 && !error&&!isLoading && (
        <Paging count={totalPage} page={currentPage} onChangehandle={handlePageChange} />
      )}
    </Grid>
  );
};
export default Series;
