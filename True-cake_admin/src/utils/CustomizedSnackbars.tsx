import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { Message } from "@material-ui/icons";

interface CustomizedSnackbarsProps {
  handleSnackBar: any;
  openBar: any;
  message: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  handleSnackBar,
  openBar,
  message,
}: CustomizedSnackbarsProps) {
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          autoHideDuration={2000}
          open={openBar}
          onClose={handleSnackBar}
        >
          <Alert
            onClose={handleSnackBar}
            severity={
              message === "Please Enter Correct Email" ||
              message === "Wrong Otp ! Please Enter Currect Otp" ||
              message === "Invalid Password !" ||
              message === "Your New Password Must Be Different" ||
              message === "Invalid Password!" ||
              message === "Opps,Something went wrong!" ||
              message === "Category Already Exist" ||
              message === "Product Already Exist" ||
              message === "labels Already have it" ||
              message === "Something wrong! Please try later" ||
              message === "Opps! Something wrong" ||
              message === "Something Went Wrong. Please Try Again Later." ||
              message === "Option Already Exists" ||
              message === "Somthing wrong! Please try later"||
              message === "Labels Already Have It" || 
              message === "Something Wrong! Please Try Again Later" 
                ? // message === "admin loging successfully" ||
                  // message === "Add Product Category in database successfully" ||
                  // message === "updated Product Category" ||
                  // message === "Add Product successfully" ||
                  // message === "Updated Product" ||
                  // message === "File uploaded successfully" ||
                  // message === "Password changed successfullys" ||
                  // message === "created Offers" ||
                  // message === "Password changed successfully" ||
                  // message === "offer id is updated" ||
                  // message === "order id is updated" ||
                  // message === "message upadated" ||
                  // message === "ADD Option details Successfully" ||
                  // message === "created Offers " ||
                  // message === "admin registered successfully" ||
                  // message === "Add Product Category successfully" ||
                  // message === "updated" ||
                  // message === "Logo added successfully"
                  "error"
                : "success"
            }
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
