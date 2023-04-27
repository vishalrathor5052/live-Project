import { FC } from "react";
import ReactPaginate from "react-paginate";
interface PaginationProps {
  onPageChangeClick: (Data: number) => void;
  countPage: number;
}
const Pagination: FC<PaginationProps> = ({ onPageChangeClick, countPage }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="....."
        pageCount={countPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        onPageChange={(pageEvent: any) => {
          onPageChangeClick(pageEvent);
        }}
      />
    </div>
  );
};
export default Pagination;
