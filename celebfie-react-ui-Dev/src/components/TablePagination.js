import React from 'react'

export default function TablePagination() {
  return (
    <>
        <div className="flex items-center flex-wrap mt-6">
            <div className="basis-full sm:basis-2/3">
                <div className="table-pagination">
                    <ul className="pagination flex justify-center sm:justify-start space-x-2">
                        <li className="paginate_button page-item previous disabled">
                            <a href="#" className="page-link bg-neutral-100 rounded flex justify-center items-center h-9 min-w-[36px] text-gray-400 transition hover:bg-green-400 hover:text-white px-6">Prev</a>
                        </li>
                        <li className="paginate_button page-item active">
                            <a href="#" className="page-link bg-neutral-100 rounded flex justify-center items-center h-9 min-w-[36px] text-gray-400 transition hover:bg-green-400 hover:text-white">1</a>
                        </li>
                        <li className="paginate_button page-item">
                            <a href="#" className="page-link bg-neutral-100 rounded flex justify-center items-center h-9 min-w-[36px] text-gray-400 transition hover:bg-green-400 hover:text-white">2</a>
                        </li>
                        <li className="paginate_button page-item next">
                            <a href="#" className="page-link bg-neutral-100 rounded flex justify-center items-center h-9 min-w-[36px] text-gray-400 transition hover:bg-green-400 hover:text-white px-6">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="basis-full sm:basis-1/3">
                <div className="text-center sm:text-right text-sm pt-3 sm:pt-0">1 -5 of 7</div>
            </div>
        </div>
    </>
  )
}
