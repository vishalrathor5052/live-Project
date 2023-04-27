import React, {  useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../../component/button/ButtonComponent";
import Search from "../../component/search/Search";
import "./style.css";
import { itemTableHeader } from "../../constant/String";
import TableComponent from "../../component/table/Table";
import ApiComponents from "../../constant/ApiComponents";
import Loader from "../../component/loader/Loader";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { AddCategory } from "../../Store/CartSlice";
import AddItemCreateProductModal from "../../component/addItemCreateProductModal/AddItemCreateProductModal";
const ItemCake = () => {
  const { addCategory } = useSelector((State: any) => State?.trueCake);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>();
  const [isModal, setIsModal] = useState(false);
  const [search, setSearch] = useState<any>("");
  const [isSearch, setIsSearch] = useState<any>(false);
  const [filterdata, setFilterData] = useState();
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState<Record<string, string | any>>({});
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [message, setMessage] = useState<string>(addCategory);
  const [open, setOpen] = useState<boolean>(true);
  const [editproduct, setEditproduct] = useState<any>();
  const handleSnackBar = () => {
    setOpen(false);
  };

  const SearchData = (e: any) => {
    setSearch(e);
  };

  const handledelete = (data: any) => {
    setMessage("");
    const remainingData = product?.filter(
      (rowData: any) => rowData.id !== data.id
    );
    setFilterData(remainingData);

    ApiComponents.productDelete(data?.id).then((res: any) => {
      setMessage(res);
      setOpen(true);
    });
  };
  // const AddItem = (boolean: boolean) => {
  //   setIsModal(boolean);
  // };

  const handleEdit = (editPayload: any, id: any) => {
    setMessage("");
    ApiComponents.productUpdate(editPayload, id).then((res: any) => {
      setMessage(res);
      setOpen(true);
    });
  };
  const handleChangeSelect = (e: any, data: any) => {
    setStatus((prev) => ({ ...prev, [data.id]: e }));
    const payload = {
      status: +e,
    };
    handleEdit(payload, data);
  };
  const AdditemsChange = () => {
    setIsModal(true);
  };

  /**
   * Search Product................
   */
  const SearchProduct = async (payload: any) => {
    let offsets: number = page * rowPerPage;
    offsets = isSearch ? 0 : page * rowPerPage;
    const updatedStatus = { ...status };
    ApiComponents.Searchproduct(rowPerPage, offsets, payload).then(
      (res: any) => {
        setTotalPage(res?.countProducts);
        res?.data?.map((elm: any) => (updatedStatus[elm?.id] = elm?.status));
        setProduct(res?.data);
        setFilterData(res?.data);
        setLoader(false);
      }
    );

    setStatus(updatedStatus);
    if (addCategory) {
      dispatch(AddCategory("" as any));
      setMessage("");
    }
  };

  useEffect(() => {
    if (addCategory) {
      setMessage(addCategory);
      setOpen(true);
    }
    const payload = {
      product: search,
    };
    const timeOut = setTimeout(() => {
      SearchProduct(payload);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search, page, addCategory, message]);

  const onHandleEdit = (data: any) => {
    setEditproduct(data);
    setIsModal(true);
  };
  const handleClose = () => {
    setIsModal(false);
    setEditproduct("");
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
      <div className="item-cake-main">
        <div className="top-item-cake-div">
          <div className="left-item-cake-div">
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
              title="ADD ITEMS"
              onClick={() => AdditemsChange()}
            />
            {isModal && (
              <AddItemCreateProductModal
                onHandleClose={handleClose}
                data={editproduct ? editproduct : ""}
              />
            )}
            {/* {isModal && (
              <ModalComponent
                Children="addItemCreateProduct"
                isModal={setIsModal}
                modaltitle="Add Item/Create Product"
                addItems={(boolean: boolean) => AddItem(boolean)}
              />
            )} */}
          </div>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="item-cake-table-div">
            <TableComponent
              headerTable={itemTableHeader}
              data={filterdata}
              selectedData={status}
              isEditDelete={true}
              onHandleDelete={handledelete}
              onHandleChangeSelect={handleChangeSelect}
              pagination={totalPage}
              RowPerPageTable={(e: any) => setRowPerPage(e)}
              PageTable={(e: any) => setPage(e)}
              pageSearch={search && 0}
              DeleteHeader={"Are you sure about deleting this product?"} 
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

export default memo(ItemCake);
