import React, { useState, useEffect } from "react";
import "./style.css";
import { offerTableHeader } from "../../constant/String";
import TableComponent from "../../component/table/Table";
import ButtonComponent from "../../component/button/ButtonComponent";
import Search from "../../component/search/Search";
import ApiComponents from "../../constant/ApiComponents";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/loader/Loader";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { AddCategory } from "../../Store/CartSlice";
import CreateOfferComponentModal from "../../component/createOfferComponent/CreateOfferComponentModal";
const Offers = () => {
  const { addCategory } = useSelector(
    (State: any) => State.trueCake
  );
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [filterdata, setFilterData] = useState();
  const [search, setSearch] = useState<any>("");
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState<Record<string, string | any>>({});
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [message, setMessage] = useState<string>(addCategory);
  const [open, setOpen] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<any>(false);
  const [editOffer, setEditOffer] = useState<any>();
  const handleSnackBar = () => {
    setOpen(false);
  };

  const SearchData = (e: any) => {
    setSearch(e);
  };

  const handledelete = (data: any) => {
    setMessage("");
    // const remainingData = offer?.filter(
    //   (rowData: any) => rowData.id !== data.id
    // );
    // setFilterData(remainingData);
    ApiComponents.deleteOffer(data?.id).then((res: any) => {
      setMessage(res?.message);
      setOpen(true);
    });
  };

  const handleEdit = (editPayload: any, id: any) => {
    setMessage("");
    ApiComponents.OfferUpdate(editPayload, id).then((res: any) => {
      setMessage(res);
      setOpen(true);
    });
  };

  const handleChangeSelect = (e: any, data: any) => {
    const payload = {
      id: data,
      status: +e,
    };
    handleEdit(payload, data);
    setStatus((prev) => ({ ...prev, [data.id]: e }));
  };

  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };
  /**
   * Search Offer............
   */

  const searchOffer = async (payload: any) => {
    let offsets: number = page * rowPerPage;
    offsets = isSearch ? 0 : page * rowPerPage;
    const updatedStatus = { ...status };
    await ApiComponents.searchOffer(rowPerPage, offsets, payload).then(
      (res: any) => {
        setTotalPage(res?.count);
        res?.rows.map((elm: any) => (updatedStatus[elm.id] = elm.status));
        // setOffer(res?.rows);
        setFilterData(res?.rows);
        setLoader(false);
      }
    );
    setStatus(updatedStatus);
    if (addCategory) {
      dispatch(AddCategory("" as any));
      setMessage("");
    }
  };

  // const handleSearch = useCallback(() => {
  //   const payload = {
  //     offer: search,
  //   };
  //   const timeOut = setTimeout(() => {
  //     searchOffer(payload);
  //   }, 800);
  //   return () => clearTimeout(timeOut);
  // }, []);
  useEffect(() => {
    if (addCategory) {
      setMessage(addCategory);
      setOpen(true);
    }
    // handleSearch();
    const payload = {
      offer: search,
    };
    const timeOut = setTimeout(() => {
      searchOffer(payload);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search, page, addCategory, message]);

  const onHandleEdit = (data: any) => {
    setEditOffer(data);
    setIsModal(true);
  };
  const handleClose = () => {
    setEditOffer("");
    setIsModal(false);
  };
  return (
    <>
      {message && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      )}
      <div className="offer-div-main">
        <div className="top-offer-div">
          <div className="left-offer-div">
            <Search
              handleClick={(e) => {
                setIsSearch(true);
                SearchData(e);
              }}
            />
          </div>
          <div className="right-item-cake-div">
            <ButtonComponent
              type="button"
              title="CREATE OFFER"
              onClick={() => AddItem(true)}
            />
            {isModal && (
              <CreateOfferComponentModal
                onHandleClose={handleClose}
                data={editOffer ? editOffer : ""}
              />
              /* {isModal && (
              <ModalComponent
                Children="createOffer"
                isModal={setIsModal}
                modaltitle="Create Offer"
                addItems={(boolean: boolean) => AddItem(boolean)}
              />
            )} */
            )}
          </div>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="offer-table-div">
            <TableComponent
              headerTable={offerTableHeader}
              data={filterdata}
              isEditDelete={true}
              onHandleDelete={handledelete}
              selectedData={status}
              onHandleChangeSelect={handleChangeSelect}
              pagination={totalPage}
              RowPerPageTable={(e: any) => setRowPerPage(e)}
              PageTable={(e: any) => setPage(e)}
              pageSearch={search && 0}
              setIsSearch={setIsSearch}
              isSearch={isSearch}
              onHandleEdit={onHandleEdit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Offers;
