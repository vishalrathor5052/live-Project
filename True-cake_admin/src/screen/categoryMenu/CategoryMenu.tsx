import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import ButtonComponent from "../../component/button/ButtonComponent";
import Search from "../../component/search/Search";
import TableComponent from "../../component/table/Table";
import ApiComponents from "../../constant/ApiComponents";
import { categoriesTableHeader } from "../../constant/String";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/loader/Loader";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { AddCategory, CrossClose } from "../../Store/CartSlice";
import { ClosePopup } from "../../Store/CartSlice";
import CreateCategoryModal from "../../component/createCategoryModal/CreateCategoryModal";
/**
 * @desc setCategory Menu
 * @returns
 */
const CategoryMenu = () => {
  const { addCategory } = useSelector((State: any) => State?.trueCake);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<any>("");
  const [isModal, setIsModal] = useState(false);
  const [filterdata, setFilterData] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<any>(false);
  const [message, setMessage] = useState<string>(addCategory);
  const [open, setOpen] = useState<boolean>(true);
  const [updateProductOnAddItems, setUpdateProductOnAddItems] = useState(false);
  const [status, setStatus] = useState<Record<string, string | any>>({});
  const [editproduct, setEditproduct] = useState<any>();
  const { crossClose } = useSelector((State: any) => State.trueCake);
  const [page, setPage] = useState<number>(0);
  const [confirmPopup, setConfirmPopUp] = useState<any>(false);
  /**
   * pagination......
   * @param e
   */

  const SearchData = (e: any) => {
    setSearch(e);
  };

  /**
   * Search
   * @param payload
   */
  // useEffect(() => {
  //   if (filterdata?.length < 1) {

  //     setPage(page - 1)
  //     setRowPerPage(rowPerPage - 5)
  //   }
  // }, [message])

  const SearchCategory = async (payload: any) => {
    setConfirmPopUp(false);
    let offsets: number = page * rowPerPage;
    offsets = isSearch ? 0 : page * rowPerPage;
    const updatedStatus = { ...status };
    await ApiComponents.SearchCatogery(rowPerPage, offsets, payload).then(
      (res: any) => {
        setTotalPage(res?.totalCount);
        res?.data?.map(
          (a: any) =>
            (a.count = a?.categoryDetails[0]?.count
              ? a?.categoryDetails[0]?.count
              : 0)
        );
        res?.data?.map((elm: any) => (updatedStatus[elm.id] = elm.status));
        setFilterData(res?.data);
        setLoader(false);
      }
    );
    setIsModal(false);
    setStatus(updatedStatus);
    setMessage("");
    if (addCategory) {
      setMessage(addCategory);
      setOpen(true);
      setMessage("");
      dispatch(AddCategory("" as any));
    }
  };

  useEffect(() => {
    {
      if (addCategory) {
        setOpen(true);
        setMessage(addCategory);
      }
    }
    const payload = {
      category: search,
    };

    const timeOut = setTimeout(() => {
      SearchCategory(payload);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search, page, message, addCategory]);

  //Search.....................................close.............
  /**
   * Edit category...
   */
  const handleEdit = (editPayload: any, id: any) => {
    setMessage("");

    ApiComponents.categoryUpdate(editPayload, id).then((res: any) => {
      setMessage(res);
      setOpen(true);
    });
  };

  const handleChangeSelect = (e: any, data: any, actions: any) => {
    setStatus((prev) => ({ ...prev, [data.categoryName]: e }));
    const payload = {
      status: +e,
    };

    handleEdit(payload, data);
  };

  /**
   * @desc deleted category items
   * @param data
   */
  const handledelete = (data: any) => {
    setMessage("");
    ApiComponents.categoryDelete(data?.id).then((res: any) => {
      setMessage(res);
      setOpen(true);
    });
  };

  const createCategory = () => {
    setIsModal(true);
  };

  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };

  const handleClose = () => {
    setEditproduct("");
    setIsModal(false);
    const payload = {
      category: search,
    };
    updateProductOnAddItems && SearchCategory(payload);
  };
  // const handleorderCount = (data: any) => {
  //   setOrderCount(data);

  //   setBdySpical((prev) => !prev);
  // };

  const onHandleEdit = (data: any) => {
    setEditproduct(data);
    setIsModal(true);
  };

  return (
    <>
      {message && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => setOpen(false)}
        />
      )}
      <div className="category-menu-container">
        <div className="category-menu-top-view">
          <div className="category-menu-search-box-div">
            <Search
              handleClick={(e) => {
                setIsSearch(true);
                SearchData(e);
              }}
            />
          </div>
          <div className="category-menu-create-button-div">
            <ButtonComponent
              type="button"
              title="CREATE"
              // disabled={loader ? true : false}
              onClick={() => createCategory()}
            />

            {isModal && (
              <CreateCategoryModal
                onHandleClose={handleClose}
                setUpdateProductOnAddItems={setUpdateProductOnAddItems}
                data={editproduct ? editproduct : ""}
              />
            )}

            {/* <ModalComponent
                Children="createCategory"
                isModal={setIsModal}
                modaltitle="Create Category"
                addItems={SearchCategory}
              /> */}
          </div>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="category-menu-bottom-div">
            <TableComponent
              headerTable={categoriesTableHeader}
              data={filterdata}
              isEditDelete={true}
              selectedData={status}
              onHandleDelete={handledelete}
              onHandleChangeSelect={handleChangeSelect}
              // setConfirmPopUp={setConfirmPopUp}
              pagination={totalPage}
              RowPerPageTable={(e: any) => setRowPerPage(e)}
              PageTable={(e: any) => setPage(e)}
              // onhandleorderCount={(data: any) => {
              //   handleorderCount(data);
              // }}
              // Spical={"Hello"}
              pageSearch={search && 0}
              setIsSearch={setIsSearch}
              isSearch={isSearch}
              setUpdateProductOnAddItems={setUpdateProductOnAddItems}
              onHandleEdit={onHandleEdit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CategoryMenu);
