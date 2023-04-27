import React, { useEffect, useState } from "react";
import Search from "../../component/search/Search";
import "./style.css";
import TableComponent from "../../component/table/Table";
import { userTableHeader } from "../../constant/String";
import ApiComponents from "../../constant/ApiComponents";
import Loader from "../../component/loader/Loader";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import ModalComponent from "../../component/modalComponent/ModalComponent";
const User = () => {
  // const [user, setUser] = useState<any>();
  const [search, setSearch] = useState<any>("");
  const [filterdata, setFilterData] = useState();
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<Record<string, string | any>>({});
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(true);
  const [isModal, setIsModal] = useState(false);
  const [orderCount, setOrderCount] = useState<any>();
  const [isSearch, setIsSearch] = useState<any>(false);
  // const [newAsValue, setNewAsValue] = useState<number>(0);

  // useEffect(() => {
  //   const filterData = user?.filter((elm: any) => {
  //     if (search === "") {
  //       return elm;
  //     } else if (
  //       elm?.firstName?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  //     ) {
  //       return elm;
  //     } else if (
  //       elm?.email?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  //     ) {
  //       return elm;
  //     } else if (elm?.mobileNo.toString().includes(search)) {
  //       return elm;
  //     } else if (
  //       elm?.address?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  //     ) {
  //       return elm;
  //     }
  //   });

  //   setFilterData(filterData);
  // }, [search]);

  const SearchData = (e: any) => {
    setSearch(e);
  };

  // useEffect(() => {
  //   const offsets: number = page * rowPerPage;
  //   const updatedStatus = { ...status };
  //   ApiComponents.getUser(rowPerPage, offsets).then((res: any) => {
  //     res.rows?.map(
  //       (a: any) =>
  //         (a.deliveryDateAndTime = a?.orderDetals[0]?.deliveryDateAndTime
  //           ? a?.orderDetals[0]?.deliveryDateAndTime
  //           : 0)
  //     );
  //     res.rows.map(
  //       (elm: any) => (updatedStatus[elm?.id] = elm.status)
  //     );
  //     setStatus(updatedStatus);
  //     setTotalPage(res?.count);
  //     setUser(res?.rows);
  //     setFilterData(res?.rows);
  //     setLoader(false);
  //   });
  // }, [page,message]);

  /**
   * Deleted User
   */
  const handleChangeSelect = (e: any, data: any) => {
    setMessage("");
    const payload = {
      id: data,
    };
    ApiComponents?.deleteUser(payload).then((res: any) => {
      setMessage(res.message);
      setOpen(true);
    });
  };
  const handleorderCount = (data: any) => {
    setOrderCount("");
    setOrderCount(data);
    setIsModal(true);
  };
  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };
  /**
   * Search User
   */

  const searchUser = (payload: any) => {
    let offsets: number = page * rowPerPage;
    // let RowData: number = rowPerPage;
    const updatedStatus = { ...status };
    // if (offsets > 5) {
    //   setNewAsValue(offsets);
    // } else {
    //   setNewAsValue(0);
    // }

    offsets = isSearch ? 0 : page * rowPerPage;
    // RowData = search ? 0 : RowData;
    ApiComponents?.searchUser(rowPerPage, offsets, payload).then((res: any) => {
      res?.rows?.map(
        (a: any) =>
          (a.deliveryDateAndTime = a?.orderDetals[0]?.deliveryDateAndTime
            ? a?.orderDetals[0]?.deliveryDateAndTime
            : 0)
      );
      res?.rows?.map((elm: any) => (updatedStatus[elm?.id] = elm?.status));
      setStatus(updatedStatus);
      setTotalPage(res?.count);
      // setUser(res?.rows);
      setFilterData(res?.rows);
      setLoader(false);
    });
  };
  useEffect(() => {
    const payload = {
      user: search,
      offset: 0,
    };
    const timeOut = setTimeout(() => {
      searchUser(payload);
    }, 1500);
    return () => clearTimeout(timeOut);
  }, [page, search, message]);

  return (
    <>
      {message && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => setOpen(false)}
        />
      )}

      <div className="user-main-div">
        <div className="user-top-div">
          <div className="user-left-section">
            <Search
              handleClick={(e) => {
                setIsSearch(true);
                SearchData(e);
              }}
            />
          </div>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="user-bottom-div">
            <TableComponent
              headerTable={userTableHeader}
              selectedData={status}
              data={filterdata}
              pagination={totalPage}
              RowPerPageTable={(e: any) => setRowPerPage(e)}
              onHandleChangeSelect={handleChangeSelect}
              PageTable={(e: any) => setPage(e)}
              isUser={true}
              onhandleorderCount={(data: any) => handleorderCount(data)}
              pageSearch={search && 0}
              setIsSearch={setIsSearch}
              isSearch={isSearch}
            />
          </div>
        )}
      </div>
      {isModal && (
        <ModalComponent
          Children="orderNumber"
          isModal={setIsModal}
          modaltitle="Order No"
          addItems={(boolean: boolean) => AddItem(boolean)}
          data={orderCount}
        />
      )}
    </>
  );
};

export default User;
