import React, {  useState, useEffect } from "react";
import ButtonComponent from "../../component/button/ButtonComponent";
import Search from "../../component/search/Search";
import TableComponent from "../../component/table/Table";
import { addonTableHeader } from "../../constant/String";
import ApiComponents from "../../constant/ApiComponents";
import "./style.css";
import Loader from "../../component/loader/Loader";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { useSelector, useDispatch } from "react-redux";
import { AddCategory, } from "../../Store/CartSlice";
import AddonBalloonsModal from "../../component/addonsBalloonsModal/AddonBalloonsModal";
const Addons = () => {
  const { addCategory, } = useSelector(
    (State: any) => State?.trueCake
  );
  const dispatch = useDispatch();
  const [Addon, setAddon] = useState<any>();
  const [isModal, setIsModal] = useState(false);
  const [search, setSearch] = useState<any>("");
  const [filterdata, setFilterData] = useState<any>();
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<any>(false);
  const [editAddon, setEditAddon] = useState<any>();
  const [updateOption, setUpdateOption] = useState<any>(false);
  const handleSnackBar = () => {
    setOpen(false);
  };
  useEffect(() => {
    const filterData = Addon?.filter((elm: any) => {
      if (search === "") {
        return elm;
      } else if (
        elm?.productName
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return elm;
      } else if (
        elm?.productPrice
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return elm;
      }
    });

    setFilterData(filterData);
  }, [search]);

  const SearchData = (e: any) => {
    setSearch(e);
  };

  const handledelete = (data: any) => {
    setMessage("");
    let newArray: any = [];
    const remainingData = Addon?.filter(
      (rowData: any) => rowData.id !== data.id
    );
    setFilterData(remainingData);

    if (data?.productOptionDetails.length > 0) {
      for (let elm of data?.productOptionDetails) {
        newArray.push(elm.id);
      }
    }
    ApiComponents.OptionDelete(newArray).then((res: any) => {
      if (res?.status == 200) {
        setOpen(true);
        setMessage(res);
      }
    });
    ApiComponents.productDelete(data?.id).then((res: any) => {
      setOpen(true);
      setMessage(res);
    });
  };

  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };

  /**
   * Search Addons And option
   *
   */

  const searchAddon = (payload: any) => {
    setMessage("");
    let offsets: number = page * rowPerPage;
    offsets = isSearch ? 0 : page * rowPerPage;
    ApiComponents.searchAddon(rowPerPage, offsets, payload).then((res: any) => {
      setAddon(res?.data);
      setTotalPage(res?.countProducts);
      setFilterData(res?.data);
      // setUpdateOption(false);
      setLoader(false);
      setOpen(false);

      // if (dataOnMoreBallon) {
      //   setMessage(dataOnMoreBallon);
      //   setOpen(true);

      //   setdataOnMoreBallon("");

      // }
    });
  };

  // const onReciveMessage = (message: any) => {
  //   setdataOnMoreBallon(message);
  // };

  const getAddonList = () => {
    let offsets: number = page * rowPerPage;
    offsets = isSearch ? 0 : page * rowPerPage;

    ApiComponents.getAddon(rowPerPage, offsets).then((res: any) => {
      setAddon(res?.rows);
      setTotalPage(res?.count);
      setFilterData(res?.rows);
      setUpdateOption(false);
      setOpen(false);
      setLoader(false);

      if (addCategory) {
        setMessage(addCategory);
        setOpen(true);
        setMessage("");
        dispatch(AddCategory("" as any));
      }
      // if (dataOnMoreBallon) {
      //   setMessage(dataOnMoreBallon);
      //   setOpen(true);

      //   setdataOnMoreBallon("");
      //   setOpen(false);

      // }
      // if (closePopup) {
      //   dispatch(ClosePopup(""));
      // }
    });
  };
  useEffect(() => {
    if (addCategory) {
      setOpen(true);
      setMessage(addCategory);
    }
    const payload = {
      product: search,
    };
    const timeOut = setTimeout(() => {
      if (search) {
        searchAddon(payload);
      } else {
        getAddonList();
      }
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search, page, message, addCategory]);

  const onHandleEdit = (data: any) => {
    setEditAddon(data);
    setIsModal(true);
  };

  const handleClose = () => {
    if (addCategory) {
      setOpen(true);
      setMessage(addCategory);
    }
    setEditAddon("");
    setIsModal(false);

    updateOption && getAddonList();
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
      {isModal && (
        <AddonBalloonsModal
          onHandleClose={handleClose}
          data={editAddon ? editAddon : ""}
          setUpdateOption={setUpdateOption}
        />
      )}
      {/* {isModal && (
        <ModalComponent
          Children="addonsballoons"
          onDataShow={onReciveMessage}
          isModal={setIsModal}
          addItems={(boolean: boolean) => AddItem(boolean)}
          modaltitle="Addon"
        />
      )} */}
      <div className="addon-main">
        <div className="addon-top-section">
          <div className="addon-top-left-section">
            <Search
              handleClick={(e) => {
                setIsSearch(true);
                SearchData(e);
              }}
            />
          </div>
          <div className="addon-top-right-section">
            <ButtonComponent
              type="button"
              title="ADDONS"
              onClick={() => AddItem(true)}
            />
          </div>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="addon-table-div-main">
            <TableComponent
              headerTable={addonTableHeader}
              data={filterdata}
              isEditDelete={true}
              onHandleDelete={handledelete}
              pagination={totalPage}
              RowPerPageTable={(e: any) => setRowPerPage(e)}
              PageTable={(e: any) => setPage(e)}
              // onDataShow={onReciveMessage}
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

export default Addons;
