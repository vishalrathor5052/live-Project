// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   IconButton,
//   Typography,
// } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ButtonComponent from "../button/ButtonComponent";

const ConfirmDialog = ({ apiCall, closePop }: any) => {
  const handleClose = () => {
    closePop(false);
  };
  return (
   <></>
  );
};

export default ConfirmDialog;
///..................................

// import ButtonComponent from "../button/ButtonComponent";
// import "./style.css";
// import { useDispatch } from "react-redux";
// import { memo } from "react";
// const ConfirmDialog = ({ apiCall, closePop }: any) => {
//   const handleClose = () => {
//     closePop(false);
//   };
//   return (
//     <div className="cancle-order-container-modal">
//       <div className="cancle-order-modal-contained">
//         <p className="cancle-order-pera">
//           Are you sure you want to cancel the order. The order value is and the
//           refund is accepted.
//         </p>
//         <div className="cancle-order-bottom-div">
//           <ButtonComponent
//             type="button"
//             title="CANCEL"
//             onClick={handleClose}
//             customStyles={{
//               background: "white",
//               border: "1px solid #F8D40C !important",
//               marginRight: "10px",
//             }}
//           />
//           <ButtonComponent
//             type="button"
//             title="Confirm"
//             onClick={() => {
//               closePop(false);
//               apiCall();
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default memo(ConfirmDialog);
