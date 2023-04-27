import React, { useEffect, useState } from "react";
import TableComponent from "../table/Table";
import { OrderNumberHeader } from "../../constant/String";

import "./style.css";
import ApiComponents from "../../constant/ApiComponents";
const OrderNumberModal = ({ onHandleAddItems, data }: any) => {
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [orderNumber, setOrderNumber] = useState<any>();
  useEffect(() => {
    const offsets: number = page * rowPerPage;
    ApiComponents.getOrderNumber(data?.id, rowPerPage, offsets).then(
      (res: any) => {
        setTotalPage(res?.count);
        setOrderNumber(res?.rows);
      }
    );
  }, [page]);

  return (
    <div className="order-number-modal-container">
      <TableComponent
        data={orderNumber}
        headerTable={OrderNumberHeader}
        RowPerPageTable={(e: any) => setRowPerPage(e)}
        PageTable={(e: any) => setPage(e)}
        pagination={totalPage}
      />
    </div>
  );
};

export default OrderNumberModal;
