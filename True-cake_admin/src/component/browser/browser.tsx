import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Image from "../../constant/Image";
import { width } from "@mui/system";
import "./style.css"
import { isDisabled } from "@testing-library/user-event/dist/utils";
const Browser = (props: any) => {
  const { handleImage, disabled, customDisplay } = props;

  const hadleFile = (e: any) => {
    handleImage(e.target.files[0]);
  };
  return (
    <div>
      <Stack alignItems="center"  spacing={2}>
        <IconButton
          color="error"
          aria-label="upload picture"
          component="label"
          style={{ height: "44px",  margin:"0px" }}
        >
          <input
            style={{ height: "44px", margin:"0px" }}
            hidden
            accept="image/*"
            type="file"
            multiple
            onChange={(e: any) => hadleFile(e)}
            disabled={disabled}
          />
          <img src={Image.camera} alt="camera" />
        </IconButton>
        <Button
          variant="outlined"
          component="label"
          sx={{
            display: customDisplay ? "none" : "flex",
            color: "black",
            border: "2px solid black",
            margin:"0px"
          }}
        >
          Browse
          <input
            hidden
            accept="image/*"
            multiple
            style={{margin:"0px"}}
            type="file"
            onChange={(e: any) => hadleFile(e)}
            disabled={disabled}
          />
        </Button>
      </Stack>
    </div>
  );
};

export default Browser;
