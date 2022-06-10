import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SeacrhIcon } from "@mui/icons-material";
import { userDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useStyles from "./styles";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const handleKeyPress = () => {};
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SeacrhIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default Search;
