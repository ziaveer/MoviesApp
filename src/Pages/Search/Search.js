import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContet";
import useHttps from "../../hooks/use-http";
import { Grid, Typography } from "@material-ui/core";
import Paging from "../../components/Paging";
import Loading from "../../components/Loading";
import AutoInput from "../../components/SingleContent/AutoInput";


const Search = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [findData, setfindData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const response = useHttps();
  const { isLoading, error, sendRequest } = response;
  const onSearchHandler = (e) => {
    // console.log(e);
    setCurrentSearch(e);
  };
  const handleChange = (cPage) => {
    // console.log(cPage);
    setCurrentPage(cPage);
  };

  useEffect(() => {
    const transformData = (searchData) => {
      // console.log(searchData);
      const { results, total_pages } = searchData;
      // console.log(results);
      setfindData(results);
      setTotalPage(total_pages);
    };

    const identifier = setTimeout(() => {
      if (currentSearch.trim().length > 0) {
        sendRequest(
          {
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${currentSearch}&page=${currentPage}&include_adult=false`,
          },
          transformData
        );
      }
    }, 500);
    if (currentSearch.trim().length === 0) {
      setfindData([]);
      setCurrentPage(1);
    }

    return () => {
      // console.log("clear");
      clearTimeout(identifier);
    };
  }, [sendRequest, currentSearch, currentPage]);
  // console.log(currentSearch);
  return (
    <Grid item>
            {isLoading && <Loading />}
      <AutoInput onChange={onSearchHandler}  />

      
      <Grid item container spacing={1} justifyContent="center" >
        {currentSearch.trim().length === 0 && !error && <Typography variant="h5" style={{marginTop:10}}  >Search for movies and Tv</Typography>}
        
        {error && <Typography>please check connection</Typography>}
        {!isLoading && findData.length === 0 && currentSearch.includes('.') && <p>NO Movies Found Or Invalid Search</p>}

        {!isLoading &&
          currentSearch.trim().length > 0 &&
          findData.map((d) => {
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
      {findData.length > 0 && !isLoading && (
        <Paging
          count={totalPage}
          page={currentPage}
          onChangehandle={handleChange}
        />
      )}
    </Grid>
  );
};
export default Search;
