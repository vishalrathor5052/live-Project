import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { Message } from "@material-ui/icons";
interface CustomizedSnackbarsProps {
  // positionOnRight:any
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
export default function ToastAlert({
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
              message === "Address added Successfully" ||
              // message === "Please Fill All Details" ||
              message === "payment! done" ||
              // message === "Please Select Location" ||
              // message === "Opps! Something wrong" ||
              // message === "Please enter valid mobile number" ||
              message === "Password changed successfullys" ||
              message === "payment! done" ||
              message === "order! done" ||
              message === "offer id is updated"
                ? "success"
                : "error"
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

// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Toast from "react-bootstrap/Toast";
// import ToastContainer from "react-bootstrap/ToastContainer";

// function ToastAlert(props: any) {
//   const [position, setPosition] = useState<string>("top-start");
//   const [showA, setShowA] = useState(true);

//   const toggleShowA = () => {
//     setShowA(!showA);
//   };
//   return (
//     <>
//       <div
//         aria-live="polite"
//         aria-atomic="true"
//         className="position-relative"
//         style={{ minHeight: "100px" }}
//       >
//         <ToastContainer className="p-3" position={"top-start"}>
//           <Toast show={showA} onClose={toggleShowA} >
//             <Toast.Header closeButton={true}>
//               {/* <img
//                 src="holder.js/20x20?text=%20"
//                 className="rounded me-0"
//                 alt=""
//               /> */}
//               <strong className="me-auto"></strong>
//               <small></small>
//             </Toast.Header>
//             <Toast.Body>Address already exists</Toast.Body>
//           </Toast>
//         </ToastContainer>
//       </div>
//     </>
//   );
// }

// export default ToastAlert;
