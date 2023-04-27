import React, { FC, useState } from "react";
import Image from "../../constant/Image";
import "./style.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

interface SearchProps {
  handleClick: (Data: any) => void;
}
const Search: FC<SearchProps> = ({ handleClick }) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      className="search-main"
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <img src={Image.search} alt="search" />
      </IconButton>
      <form>
        <InputBase
          sx={{ ml: 1, flex: 1,width:"355px !important",padding:"0 1px" }}
          // value={}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e: any) => handleClick(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
      </form>
    </Paper>
  );
};

export default Search;
