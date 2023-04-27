import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  memo,
  useMemo,
} from "react";
import Input from "../input/Input";
import ButtonComponent from "../button/ButtonComponent";
import { useDispatch } from "react-redux";
import { setLabelName } from "../../Store/CartSlice";
import ApiComponents from "../../constant/ApiComponents";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import Image from "../../constant/Image";
import { Modal } from "@mui/material";
import "./AddItemProductStyle.css";
import { useAppDispatch } from "../../Store/Store";

const AddLabelModal = ({ onHandleAddItems, fn1, onHandleClose ,lables}: any) => {
  const dispatch = useAppDispatch();
  const [lableName, setLableName] = useState<any>("");
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [responsedata, setLableResponse] = useState<any>();
  const [error, setError] = useState<Record<string, string | any>>({});
  const handleSnackBar = () => {
    setOpen(false);
  };

  const handleClose = () => {
    onHandleAddItems(false);
    // setIsModal(false);
  };
  const LableAdd = () => {
    if (isValidated()) {
      const payload = {
        labelNames: lableName.trim(),
      };
      // dispatch(LabelName(lableName));
      ApiComponents.LabelAdd(payload).then((res: any) => {
        if(res?.success){
          setOpen(true);
          setMessage(res?.message);
          setTimeout(()=>{
            onHandleClose();
            lables(true)
          },500)
        } else{
          setOpen(true);
          setMessage(res?.response?.data?.message);
        }
        // else {
        //   setLableResponse(res?.data);
        //   dispatch(setLabelName(lableName));
        //   onHandleClose();
        //   // onHandleAddItems(false);
        // }
      });
    }
  };
  useEffect(() => {
    if (responsedata) {
      ApiComponents.getLable().then((res: any) => {
        fn1(res?.data);
      });
    }
  }, [responsedata]);

  /**
   * validation...
   */
  const isValidated = () => {
    let isValid = true;
    let updateError = { ...error };
    if (!lableName) {
      updateError.lableName = "This field is required.";
      isValid = false;
    }
    else if (lableName.trim().length === 0) {
      updateError.lableName = "This field is required.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };
  const handleCancal = () => {
    onHandleClose();
  };
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          width: "40%",
          position: "absolute",
          top: "30%",
          left: "30%",
          backgroundColor: "#fff",
          boxShadow: "24",
          height: "36%",

          // width: 60%;
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          // background-color: #fff;
          // box-shadow: 24;
          // margin-top: 5%;
        }}
      >
        <div
          style={{
            background: "#313131",
            position: "relative",
            padding: "10px",
            textAlign: "center",
            color: "#FFFFFF",
            fontSize: "20px",
          }}
        >
          <h4>Add Label</h4>
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "5px",
              cursor: "pointer",
            }}
          >
            <img src={Image.cross} alt="" onClick={() => onHandleClose()} />
          </div>
        </div>
        <div className="lablediv" style={{ marginTop: "20px" }}>
          {open && (
            <CustomizedSnackbars
              openBar={open}
              message={message}
              handleSnackBar={() => handleSnackBar()}
            />
          )}
          <Input
            label="Lable Name"
            value={lableName}
            name="lableName"
            onHandleChange={(e: any) => {
              setLableName(e?.target?.value);
              setError((prev: any) => ({ ...prev, lableName: "" }));
            }}
            error={error.lableName}
          />
          <div
            style={{
              justifyContent: "space-between",
              marginTop: "4%",
              marginLeft: "3%",
              width: "50%",
            }}
          >
            <ButtonComponent
              type="button"
              title="CANCEL"
              onClick={handleCancal}
              customStyles={{
                background: "white",
                border: "1px solid #F8D40C !important",
                marginRight: "49px",
              }}
            />
            <ButtonComponent
              type="button"
              title="SAVE"
              onClick={() => LableAdd()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default memo(AddLabelModal);
