import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportJsonToExcel = (jsonData, fileName) => {
  // const exportToExcel = () => {
  // 1. Create a worksheet from the JSON data
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // 2. Create a new workbook
  const workbook = XLSX.utils.book_new();

  // 3. Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // 4. Write the workbook to a buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // 5. Create a Blob and save the file
  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(data, fileName + ".xlsx"); // Use file-saver to prompt download
};

// return (
//   <button className="ExportButton" onClick={exportToExcel}>
//     Export as Excel
//   </button>
// );
// };

export default exportJsonToExcel;
