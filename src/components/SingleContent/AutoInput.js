import React from "react";
import { useState } from "react";
import { InputBase } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const AutoInput = (props) => {
  const [currentSearch, setCurrentSearch] = useState("");
  return (
    <Grid item>
      <InputBase
        type="text"
        placeholder="Search"
        autoComplete="true"
        fullWidth
        autoFocus
        onChange={(e) => {
          setCurrentSearch(e.target.value);
          props.onChange(e.target.value);
        }}
        value={currentSearch}
        style={{marginBottom: 5 , border: "2px solid grey", padding: 2 }}
      />
    </Grid>
  );
};
export default AutoInput;
