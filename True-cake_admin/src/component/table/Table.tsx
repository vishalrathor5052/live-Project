import { FC, useEffect, useState, useCallback, memo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Image from "../../constant/Image";
import "./style.css";
import { Link } from "react-router-dom";
import ModalComponent from "../modalComponent/ModalComponent";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { add, ClosePopup } from "../../Store/CartSlice";
import { RowPerPage, Page } from "../../Store/CartSlice";
import { Modal, Box, Stack } from "@mui/material";
import ButtonComponent from "../button/ButtonComponent";
import ApiComponents from "../../constant/ApiComponents";
import moment from "moment";
import Loader from "../loader/Loader";
import CreateCategoryModal from "../createCategoryModal/CreateCategoryModal";
import BirthdaySpecialComponent from "../birthdayspecialcomponent/BirthdaySpecialComponent";
interface deleteProps {
  setDeleteCakeId: (Data: any) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: unknown) => void;
  spical?: any;
  newPopup?: any;
  setCancelOrder?: any;
  setConfirmPopUp?: any;
  pageSearch?: any;
  setIsSearch?: any;
  isSearch?: any;
  onHandleEdit?: any;
  DeleteHeader?: any;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--Gold)",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableComponent: FC<any | deleteProps> = (props: any) => {
  const {
    headerTable,
    data,
    isEditDelete,
    onHandleDelete,
    onHandleChangeSelect,
    selectedData,
    pagination,
    RowPerPageTable,
    PageTable,
    isUser,
    // orderCount,
    onhandleorderCount,
    onDataShow,
    setCancelOrder,
    setConfirmPopUp,
    pageSearch,
    setIsSearch,
    isSearch,
    setUpdateProductOnAddItems,
    onHandleEdit,
    DeleteHeader,
  } = props;
  const dispatch = useDispatch();
  const [birthdaySpecial, setbirthdaySpecial] = useState(false);
  const [cake, setCake] = useState<any>([]);
  const [orderCount, setOrderCount] = useState([]);
  const [page, setPage] = useState(pageSearch ? pageSearch : 0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});
  const [rowData, setRowData] = useState(data);
  const [isOpen, setIsOpen] = useState<Record<string, string | any>>({});
  const [showMore, setShowMore] = useState<number>(0);
  const [confirmation, setConfirmation] = useState<any>({ open: false });
  const [razorOrderDetails, setRazorOrderDetails] = useState<any>();
  const Additemsfn = useCallback(
    (boolean: boolean) => AddItem(boolean, "createCategory"),
    []
  );
  const birthdaySpecialDataShow = async (data: any) => {
    let limit: any = 100;
    const offset = 0;
    await ApiComponents?.getBirthdaySpical(data?.id, limit, offset).then(
      (res: any) => {
        setOrderCount(res?.countProducts);
        setCake(
          res.data.map((item: any) => ({
            ...item,
            productPrice: item.measurementDetails[0]?.productPrice,
          }))
        );
      }
    );
    setbirthdaySpecial(true);
  };

  useEffect(() => {
    setRowData(data);
    data &&
      data[0]?.razorOrderDeatails &&
      setRazorOrderDetails(data[0]?.razorOrderDeatails[0]);
    dispatch(ClosePopup("" as any));
  }, [data, confirmation]);
  /**
   * Edit button Functionality.....
   * @param data
   */
  // const onHandleEdit = (data: any) => {
  //   dispatch(ClosePopup(""));

  //   let openModal = { ...isOpen };
  //   if (data?.categoryName) {
  //     openModal.createCategory = true;

  //     setModalData(data);
  //   } else if (data?.type === 1) {
  //     openModal.addItemCreateProduct = true;
  //   } else if (data?.offerCode) {
  //     openModal.createOffer = true;
  //   } else if (data?.customername) {
  //     openModal.orderDetails = true;
  //     // getOrderDeatial(data?.id);
  //   } else {
  //     openModal.addonsballoons = true;
  //   }
  //   setModalData(data);
  //   setIsOpen(openModal);

  //   dispatch(add(data));
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    isSearch && setIsSearch(false);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const AddItem = (boolean: boolean, modal: any) => {
    setIsOpen({ [modal]: boolean });
  };
  dispatch(RowPerPage(rowsPerPage as any));
  dispatch(Page(page));
  RowPerPageTable(rowsPerPage);
  PageTable(page);

  const handleConfirmed = () => {
    if (confirmation?.action === "delete") {
      onHandleDelete(confirmation?.data);
    }
    if (confirmation?.action === "status") {
      onHandleChangeSelect(confirmation?.dropDownStatus, confirmation?.data);
    }
    setConfirmation({ open: false });
  };

  const handleConfirmationPopUp = (data: any, action: any, e: any) => {
    setConfirmation({
      data: data,
      action: action,
      open: true,
      dropDownStatus: e,
    });
  };

  const handleClose = () => {
    setbirthdaySpecial(false);
    // setIsOpen({ createCategory: false });
  };
  useEffect(() => {
    if (page > 1) {
      if (rowData?.length < 1) {
        setPage(page - 1);
      } else {
        setPage(page);
      }
    }
  }, [rowData]);
  return (
    <>
      <div className="table-wrapper">
        {/* <TableContainer component={Paper}> */}
        <div
          className="table-upper-box"
          style={{
            minWidth: 900,
            height: "65%",
            overflow: "auto",
            maxHeight: "650px",
          }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: 1000, width: "100%" }}
            aria-label="customized table"
          >
            <TableHead className="table-header-div">
              <TableRow>
                {headerTable.map((elm: any, idx: Number) => {
                  return (
                    <StyledTableCell
                      sx={{ minWidth: elm.minWidth }}
                      key={elm.id}
                    >
                      {elm.label}
                    </StyledTableCell>
                  );
                })}
                {isEditDelete && (
                  <>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            {/* <div style={{ minWidth: 900, height: "60%" }}> */}
            {rowData?.length > 0 ? (
              <TableBody>
                {rowData?.map((rowData: any) => (
                  <StyledTableRow key={rowData?.name}>
                    {headerTable?.map((elm: any, idx: any) => {
                      return (
                        <StyledTableCell key={idx}>
                          {elm?.key === "dateOfOrder" ? (
                            <>
                              {/* <Moment format="DD/MMM/YYYY">
                                {rowData[elm?.key]}
                              </Moment> */}
                              {moment(rowData[elm?.key]).format("YYYY-MM-DD")}
                            </>
                          ) : elm?.key === "status" ? (
                            <>
                              {isUser && selectedData[rowData?.id] == 2 ? (
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Source Sans Pro",
                                    color: "#313131",
                                    fontWeight: "bold",
                                    backgroundColor: "var(--Red)",
                                    borderRadius: "4px",
                                    width: "100px",
                                    height: "20px",
                                    textAlign: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  Banned
                                </p>
                              ) : (
                                <select
                                  className={
                                    selectedData[rowData?.id] == 1
                                      ? "active-class"
                                      : "inactive-class"
                                  }
                                  value={selectedData[rowData?.id]}
                                  onChange={
                                    (e: any) => {
                                      handleConfirmationPopUp(
                                        rowData?.id,
                                        "status",
                                        e.target?.value
                                      );
                                    }
                                    // onHandleChangeSelect(e, rowData)
                                  }
                                >
                                  <option value={1} className="active-class">
                                    Active
                                  </option>
                                  <option value={2} className="inactive-class">
                                    {isUser ? "Banned" : "Inactive"}
                                  </option>
                                </select>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="t-1">
                                {elm?.isImage && (
                                  <>
                                    {isUser ? (
                                      <img
                                        src={Image?.UserProfile}
                                        alt="addion"
                                        style={{
                                          height: "22px",
                                          width: "22px",
                                          marginRight: "20px",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={`http://34.200.195.34/upload/${rowData?.image}`}
                                        alt="addion"
                                        style={{
                                          height: "22px",
                                          width: "22px",
                                          marginRight: "20px",
                                        }}
                                      />
                                    )}
                                  </>
                                )}
                                {elm?.key === "productDescription" ? (
                                  <>
                                    {rowData[elm?.key] && (
                                      <p
                                        style={{
                                          textAlign: "justify",
                                          overflow: "auto",
                                        }}
                                      >
                                        {showMore === rowData?.id
                                          ? rowData[elm?.key]
                                          : `${rowData[elm?.key]?.substring(
                                              0,
                                              20
                                            )}...`}
                                        <Link
                                          to={""}
                                          className="readMoreDiscreption"
                                          onClick={() => {
                                            setShowMore(
                                              showMore === rowData?.id
                                                ? 0
                                                : rowData?.id
                                            );
                                          }}
                                        >
                                          {showMore === rowData?.id
                                            ? "Read less"
                                            : "Read more"}
                                        </Link>
                                      </p>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {elm?.key === "orderCount" ? (
                                      <Link
                                        to={""}
                                        onClick={() => {
                                          onhandleorderCount(rowData);
                                        }}
                                      >
                                        {rowData[elm?.key]}
                                      </Link>
                                    ) : (
                                      <>
                                        {elm?.key === "count" ? (
                                          <Link
                                            to={""}
                                            style={{
                                              borderStyle: "none",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              // onhandleorderCount(rowData);
                                              // setOrderCount(rowData);
                                              // setOrderCount(rowData);

                                              birthdaySpecialDataShow(rowData);
                                            }}
                                          >
                                            {rowData[elm?.key]}
                                          </Link>
                                        ) : (
                                          <>
                                            {elm?.key == "paymentStatus" ? (
                                              <div
                                                className={
                                                  rowData[elm?.key] == 2
                                                    ? "paid-Classes"
                                                    : "unpaid-Classes"
                                                }
                                              >
                                                {rowData[elm?.key] == 1
                                                  ? "Paid"
                                                  : "Unpaid"}
                                              </div>
                                            ) : (
                                              <>
                                                {elm?.key == "orderStatus" ? (
                                                  <select
                                                    className={
                                                      selectedData[
                                                        rowData?.id
                                                      ] == 1
                                                        ? "orderPlaced-class"
                                                        : selectedData[
                                                            rowData?.id
                                                          ] == 2
                                                        ? "orderConfirm-class"
                                                        : selectedData[
                                                            rowData?.id
                                                          ] == 3
                                                        ? "orderprocessed-class"
                                                        : selectedData[
                                                            rowData?.id
                                                          ] == 4
                                                        ? "readyToPickup-class"
                                                        : "cancalOrder-class"
                                                    }
                                                    value={
                                                      selectedData[
                                                        rowData?.id
                                                      ] ||
                                                      selectedData[rowData?.id]
                                                    }
                                                    onChange={(e: any) => {
                                                      handleConfirmationPopUp(
                                                        rowData,
                                                        "status",
                                                        e.target?.value
                                                      );
                                                      dispatch(add(" " as any));
                                                      setModalData({});
                                                    }}
                                                  >
                                                    <option
                                                      value={1}
                                                      className="orderPlaced-class"
                                                    >
                                                      Order Placed
                                                    </option>
                                                    <option
                                                      value={2}
                                                      className="orderConfirm-class"
                                                    >
                                                      Order Confirmed
                                                    </option>
                                                    <option
                                                      value={3}
                                                      className="orderprocessed-class"
                                                    >
                                                      Order Processed
                                                    </option>
                                                    <option
                                                      value={4}
                                                      className="readyToPickup-class"
                                                    >
                                                      Ready to Pickup
                                                    </option>
                                                    <option
                                                      value={5}
                                                      className="cancalOrder-class"
                                                    >
                                                      Order Cancaled
                                                    </option>
                                                  </select>
                                                ) : (
                                                  <>
                                                    {elm?.key ==
                                                    "measurementDetails" ? (
                                                      <p className="ml-3">
                                                        {
                                                          rowData[elm?.key][0]
                                                            ?.productPrice
                                                        }
                                                      </p>
                                                    ) : (
                                                      <p className="ml-3">
                                                        {elm?.key ===
                                                        "deliveryDateAndTime" ? (
                                                          <>
                                                            {rowData[
                                                              elm?.key
                                                            ] &&
                                                              moment(
                                                                rowData[
                                                                  elm?.key
                                                                ]?.slice(0, 24)
                                                              ).format(
                                                                "YYYY-MM-DD"
                                                              ) +
                                                                " " +
                                                                rowData[
                                                                  elm?.key
                                                                ]
                                                                  ?.replace(
                                                                    /2.*m/,
                                                                    " "
                                                                  )
                                                                  .replace(
                                                                    /t.*M/,
                                                                    ""
                                                                  )}
                                                          </>
                                                        ) : (
                                                          <p>
                                                            {elm?.key ===
                                                            "userLimit" ? (
                                                              <p>{`${
                                                                rowData?.offerUse
                                                              }/${
                                                                rowData[
                                                                  elm?.key
                                                                ]
                                                              }`}</p>
                                                            ) : (
                                                              <p>
                                                                {elm?.key ===
                                                                "productName" ? (
                                                                  <div>
                                                                    <div>
                                                                      {
                                                                        rowData[
                                                                          elm
                                                                            ?.key
                                                                        ]
                                                                      }
                                                                    </div>
                                                                    <div>
                                                                      {rowData?.optionCount && (
                                                                        <p>
                                                                          {`+${rowData?.optionCount}
                                                                            `}
                                                                        </p>
                                                                      )}
                                                                    </div>
                                                                  </div>
                                                                ) : (
                                                                  rowData[
                                                                    elm?.key
                                                                  ]
                                                                )}
                                                              </p>
                                                            )}
                                                          </p>
                                                        )}
                                                      </p>
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </StyledTableCell>
                      );
                    })}

                    {isEditDelete && (
                      <>
                        <StyledTableCell>
                          <Link
                            to=""
                            onClick={() => {
                              onHandleEdit(rowData);
                            }}
                          >
                            <img src={Image.EditIcon} alt="edit icon" />
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Link
                            to=""
                            onClick={() =>
                              handleConfirmationPopUp(rowData, "delete", "")
                            }
                          >
                            {/* onHandleDelete(rowData) setConfirmation(true) */}
                            <img src={Image.DeleteIcon} alt="delete icon" />
                          </Link>
                        </StyledTableCell>
                      </>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <div className="no-rec">No record found</div>
            )}
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={pagination}
          rowsPerPage={rowsPerPage}
          page={isSearch ? 0 : page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* {isOpen.createCategory && (
        <CreateCategoryModal
          onHandleClose={handleClose}
          data={modalData}
          setUpdateProductOnAddItems={setUpdateProductOnAddItems}
        />
      )} */}

      {/* <ModalComponent
          data={modalData}
          Children="createCategory"
          // CategoryState={setIsOpen}
          isModal={setIsModal}
          modaltitle="Create Category"
          addItems={Additemsfn}
          setConfirmPopUp={setConfirmPopUp}
        /> */}
      {/* {isOpen.addItemCreateProduct && (
        <ModalComponent
          Children="addItemCreateProduct"
          isModal={setIsModal}
          modaltitle="Add Item/Create Product"
          addItems={(boolean: boolean) =>
            AddItem(boolean, "addItemCreateProduct")
          }
        />
      )} */}
      {birthdaySpecial && (
        <BirthdaySpecialComponent
          onHandleClose={handleClose}
          data={{ data: cake, count: orderCount }}
        />
        // <ModalComponent
        //   Children="birthdaySpecial"
        //   isModal={setIsModal}
        //   Spical={setbirthdaySpecial}
        //   modaltitle="Birthday Spical: items(Cakes)"
        //   addItems={(boolean: boolean) => AddItem(boolean, "birthdaySpecial")}
        //   setConfirmPopUp={setConfirmPopUp}
        //   data={{ data: cake, count: orderCount }}
        // />
      )}
      {/* {isOpen.createOffer && (
        <ModalComponent
          Children="createOffer"
          isModal={setIsModal}
          modaltitle="Create Offer"
          addItems={(boolean: boolean) => AddItem(boolean, "createOffer")}
        />
      )}
      {isOpen.addonsballoons && (
        <ModalComponent
          Children="addonsballoons"
          isModal={setIsOpen}
          modaltitle="Addon"
          onDataShow={onDataShow}
          addItems={(boolean: boolean) => AddItem(boolean, "addonsballoons")}
        />
      )}
      {isOpen.orderDetails && (
        <ModalComponent
          Children="orderDetails"
          isModal={setIsOpen}
          modaltitle="Order Details"
          addItems={(boolean: boolean) => AddItem(boolean, "orderDetails")}
          data={modalData}
          setCancelOrder={setCancelOrder}
        />
      )} */}

      <Modal
        open={confirmation.open}
        onClose={() => setConfirmation({ open: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="confirmation-modal">
          <p>{DeleteHeader || "Are you sure you want to change it?"}</p>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "30px",
            }}
          >
            <ButtonComponent
              type="button"
              title="Yes"
              onClick={() => handleConfirmed()}
            />
            <ButtonComponent
              type="button"
              title="No"
              onClick={() => setConfirmation({ open: false })}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default memo(TableComponent);
