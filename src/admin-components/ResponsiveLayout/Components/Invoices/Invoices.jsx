import "./Invoices.css";
import InvoicesCard from "./InvoicesComponents/InvoicesCard";
import InvoicesStats from "./InvoicesComponents/InvoicesStats";

function Invoices() {
  const invoiceStatsData = [
    {
      title: "Total Invoices",
      value: 4,
      icon: "fa-file-invoice", // Closest icon for invoice
      bg: "#e0f7fa", // Light background color (example)
      iconColor: "#00bcd4", // Blue icon color (example)
    },
    {
      title: "Paid",
      value: 2,
      icon: "fa-circle-check", // Checkmark/paid status
      bg: "#e8f5e9", // Light green background (example)
      iconColor: "#4caf50", // Green icon color (example)
    },
    {
      title: "Pending",
      value: 1,
      icon: "fa-hourglass-half", // Pending/waiting icon
      bg: "#fff8e1", // Light yellow background (example)
      iconColor: "#ffc107", // Yellow/Orange icon color (example)
    },
    {
      title: "Total Revenue",
      value: "₹73K",
      icon: "fa-sack-dollar", // Money/revenue icon
      bg: "#f3e5f5", // Light purple background (example)
      iconColor: "#9c27b0", // Purple icon color (example)
    },
  ];

  const invoices = [
    {
      id: 1,
      invoiceNo: "RJ/2024-25/001",
      status: "PAID",
      customer: "Priya Sharma",
      customerGST: "27AABCU9603R1ZM",
      orderId: "ORD-2024-1234",
      invoiceDate: "25/11/2024",
      dueDate: "10/12/2024",
      subtotal: "38,999",
      cgst: "585",
      sgst: "585",
      amount: "40,169",
    },
    {
      id: 2,
      invoiceNo: "RJ/2024-25/002",
      status: "PAID",
      customer: "Anita Reddy",
      customerGST: "27AACCR9603R2ZM",
      orderId: "ORD-2024-1235",
      invoiceDate: "26/11/2024",
      dueDate: "11/12/2024",
      subtotal: "31,553",
      cgst: "473",
      sgst: "473",
      amount: "32,500",
    },
    {
      id: 3,
      invoiceNo: "RJ/2024-25/003",
      status: "PENDING",
      customer: "Meera Kapoor",
      customerGST: "07AAACR5055K1ZS",
      orderId: "ORD-2024-1236",
      invoiceDate: "27/11/2024",
      dueDate: "12/12/2024",
      subtotal: "27,913",
      cgst: "837",
      sgst: "837",
      amount: "28,750",
    },
    {
      id: 4,
      invoiceNo: "RJ/2024-25/004",
      status: "OVERDUE",
      customer: "Kavita Singh",
      customerGST: "27AACCR5603Z1ZM",
      orderId: "ORD-2024-1237",
      invoiceDate: "20/11/2024",
      dueDate: "27/11/2024",
      subtotal: "15,532",
      cgst: "233",
      sgst: "233",
      amount: "15,999",
    },
  ];

  return (
    <div className="InvoicesContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Invoices & GST</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage invoices and GST compliance
          </p>
        </div>
      </div>
      <InvoicesStats data={invoiceStatsData} />
      <div>
        {invoices.map((item) => (
          <InvoicesCard invoice={item} key={item.id} />
        ))}
      </div>
      {/* <InvoicesCard /> */}
    </div>
  );
}

export default Invoices;
