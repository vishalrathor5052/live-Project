import React, { FC, memo, useCallback } from "react";
import "./style.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BirthSpecialComponent from "../birthdayspecialcomponent/BirthdaySpecialComponent";
import AddItemCreateProductModal from "../addItemCreateProductModal/AddItemCreateProductModal";
import CreateOfferComponentModal from "../createOfferComponent/CreateOfferComponentModal";
import AddonBalloonsModal from "../addonsBalloonsModal/AddonBalloonsModal";
import CancleOrderModal from "../cancleOrderModal/CancleOrderModal";
import CreateCategoryModal from "../createCategoryModal/CreateCategoryModal";
import OrderNumberModal from "../orderNumberModal/OrderNumberModal";
import OrderDetailModal from "../orderDetailsModal/OrderDetailModal";
import AddLabelModal from "../addItemCreateProductModal/AddLabelModal";
import AddonMoreBalloonsModal from "../addonsBalloonsModal/AddonMoreBalloonsModal";
import CakeItemModal from "../birthdayspecialcomponent/CakeItemModal";
import { add, ClosePopup, CrossClose } from "../../Store/CartSlice";
import { useDispatch } from "react-redux";

interface ModalComponentProps {
  ballonIdValue?: number;
  modaltitle?: string;
  customStyles?: React.CSSProperties | undefined;
  Children?: string;
  data?: any;
  isModal?: any;
  flag?: any;
  isOpen?: any;
  onclose?: () => void;
  addItems?: (boolean: boolean, type: string | undefined) => void | any;
  onDataShow?: (type: string | undefined) => void | any;
  CloseAll?: (boolean: boolean, type: string | undefined) => void | any;
  Spical?: any;
  CategoryState?: any;
  closePop?: any;
  apiCall?: any;
  birthdaySpecial?: any;
  setCancelOrder?: any;
  setConfirmPopUp?: any;
  crossPopup?: any;
  fn1?: any;
  ispopup?: any;
  isPopupLable?: any;
  addmore?: any;
  addon?: any;
  isadded?: any;
  isItem?: any;
}
const ModalComponent: FC<ModalComponentProps> = ({
  modaltitle,
  Children,
  data,
  isModal,
  flag,
  isOpen,
  ballonIdValue,
  addItems,
  onDataShow,
  CloseAll,
  Spical,
  CategoryState,
  closePop,
  apiCall,
  birthdaySpecial,
  setCancelOrder,
  setConfirmPopUp,
  crossPopup,
  fn1,
  ispopup,
  isPopupLable,
  addmore,
  addon,
  isadded,
  isItem,
}) => {
  const dispatch = useDispatch();
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={() => {
              setConfirmPopUp && setConfirmPopUp((p: any) => !p);
              setOpen(false);
              handleClose();
              onClose();
              addon();
              Spical && Spical(false);
              // addItems && addItems(boolean, children)
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  //  function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(() => {
    // dispatch(CrossClose("updated"));
    if (isadded) {
      addon();
    }
    if (isPopupLable) {
      ispopup(false);

      // addItems && addItems(false, Children);
    } else {
      addItems && addItems(false, Children);
      setOpen(false);
      // dispatch(ClosePopup("popup close"));
      dispatch(add("" as any));
      if (crossPopup == "updated") {
        dispatch(CrossClose(crossPopup));
      }
      isModal(false);
      addon();
      // addmore(false);
    }
    if (crossPopup == "updated") {
      dispatch(CrossClose(crossPopup));
    }
  }, [dispatch, open]);

  //   };
  return (
    <div className="modal-main-div">
      <BootstrapDialog
        sx={{ overflowY: "hidden" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: "paperCustomWidth" }}
      >
        <div className="modal-header-div">
          <BootstrapDialogTitle
            id="customized-dialog-title modal-header"
            onClose={handleClose}
          >
            {modaltitle}
          </BootstrapDialogTitle>
        </div>
        <div className="popup">
          <DialogContent dividers>
            {Children === "cakeitemmodal" && (
              <CakeItemModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "cakeitemmodal")
                }
                // data={data}
                isItem={isItem}
                onDataShow={onDataShow}
              />
            )}
            {Children === "birthdaySpecial" && (
              <BirthSpecialComponent
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "birthdaySpecial")
                }
                setConfirmPopUp={setConfirmPopUp}
                data={data}
              />
            )}
            {Children === "addItemCreateProduct" && (
              <AddItemCreateProductModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "")
                }
              />
            )}
            {Children === "createOffer" && (
              <CreateOfferComponentModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "")
                }
              />
            )}
            {Children === "addonsballoons" && (
              <AddonBalloonsModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "addonsballoons")
                }
                onDataShow={onDataShow}
              />
            )}
            {Children === "cancleOrder" && (
              <CancleOrderModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "cancleOrder")
                }
                data={data}
                close={CloseAll}
              />
            )}
            {Children === "createCategory" && (
              <CreateCategoryModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "")
                }
                onDataShow={onDataShow}
                isModals={isModal}
                setConfirmPopUp={setConfirmPopUp}
                data={data}
              />
            )}
            {Children === "orderNumber" && (
              <OrderNumberModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "")
                }
                data={data}
              />
            )}
            {Children === "orderDetails" && (
              <OrderDetailModal
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "")
                }
                data={data}
                setCancelOrder={setCancelOrder}
              />
            )}
            {Children === "addlabel" && (
              <AddLabelModal
                fn1={fn1}
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "")
                }
              />
            )}
            {Children === "addonMoreBalloonsModal" && (
              <AddonMoreBalloonsModal
                ballonIdValue={ballonIdValue}
                onHandleAddItems={(boolean: boolean) =>
                  addItems && addItems(boolean, "addonMoreBalloonsModal")
                }
                data={data}
                onDataShow={onDataShow}
              />
            )}
            {/* {Children === "conformMoal" && (
            <conformMoal closePop={closePop} apiCall={apiCall} />
          )} */}
          </DialogContent>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default memo(ModalComponent);
