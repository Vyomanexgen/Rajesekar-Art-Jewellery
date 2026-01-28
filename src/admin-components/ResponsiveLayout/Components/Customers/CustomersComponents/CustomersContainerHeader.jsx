import "./CustomersComponents.css";
import exportJsonToExcel from "../../../../ExportExcelToJson";

const CustomersContainerHeader = ({ customers }) => {
  return (
    <div className="CustomersHeadingContainer">
      <div className="CustomersHeadingLeftContainer">
        <h1 className="CustomersHeadingContainerHead">Customers</h1>
        <p className="CustomersHeadingContainerDescription">
          Manage customer relationships and profiles
        </p>
      </div>
      <div className="CustomersHeadingRightContainer">
        <button
          className="CustomersExportButton"
          onClick={() => exportJsonToExcel(customers, "CustomersData")}
        >
          {" "}
          Export Data
        </button>
        {/* <ExcelExportButton jsonData={customers} fileName="UserData" />{" "} */}
        <button className="CustomersButton"> + Manual Order </button>
      </div>
    </div>
  );
};

export default CustomersContainerHeader;
