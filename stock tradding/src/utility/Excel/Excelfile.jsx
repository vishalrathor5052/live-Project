import FileSaver from "file-saver";
import * as XLSX from "xlsx";
//heading = array
const ExportToExcel = ({
  csvData,
  fileName,
  wscols,
  heading,
  headerKeys,
  bodyKeys,
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName, wscols) => {
    const ws = XLSX.utils.json_to_sheet(heading, {
      header: headerKeys,
      skipHeader: true,
      origin: 0, //ok
    });
    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: bodyKeys,
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <button
        onClick={(e) => exportToCSV(csvData, fileName, wscols)}
        className="download-button"
        style={{ borderStyle: "none" }}
      >
        download
      </button>
    </>
  );
};
export default ExportToExcel;
