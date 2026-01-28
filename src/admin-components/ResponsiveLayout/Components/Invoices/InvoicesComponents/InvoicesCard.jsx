import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./InvoicesComponents.css";

const InvoiceTemplate = (invoice, ref) => (
  <div className="invoice-preview" ref={ref}>
    <h2>RAJASEKHAR ART JEWELLERY</h2>
    <p>123 Jewellery Street, Mumbai, MH 400001</p>
    <p>GSTIN: 27AABCU1234A1Z5 | PAN: AABCR1234A</p>

    <hr />

    <h3>Bill To:</h3>
    <p>{invoice.customer}</p>
    <p>Mumbai, Maharashtra - 400001</p>
    <p>GSTIN: {invoice.customerGST}</p>

    <h4>Description:</h4>
    <p>Royal Emerald Necklace Set</p>

    <table>
      <thead>
        <tr>
          <th>HSN</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>GST</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>711319</td>
          <td>1</td>
          <td>₹{invoice.subtotal}</td>
          <td>3%</td>
          <td>₹{invoice.amount}</td>
        </tr>
      </tbody>
    </table>

    <hr />
    <strong>Total Amount: ₹{invoice.amount}</strong>
  </div>
);

const InvoicesCard = ({ invoice }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const invoiceRef = useRef(null);

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoice.invoiceNo}.pdf`);
  };

  return (
    <>
      {/* ================= Invoice Card ================= */}
      <div className="invoice-card">
        <div className="invoice-left">
          <h4>{invoice.invoiceNo}</h4>
          <span className={`badge ${invoice.status.toLowerCase()}`}>
            {invoice.status}
          </span>
          <p className="customer">{invoice.customer}</p>
          <p className="sub-info">GSTIN: {invoice.customerGST}</p>

          <div className="pricing">
            <span>Subtotal: ₹{invoice.subtotal}</span>
            <span>CGST: ₹{invoice.cgst}</span>
            <span>SGST: ₹{invoice.sgst}</span>
          </div>
        </div>

        <div className="invoice-mid">
          <p>
            <strong>Order:</strong> {invoice.orderId}
          </p>
          <p>
            <strong>Invoice Date:</strong> {invoice.invoiceDate}
          </p>
          <p className={invoice.status === "OVERDUE" ? "overdue" : ""}>
            <strong>Due Date:</strong> {invoice.dueDate}
          </p>
        </div>

        <div className="invoice-right">
          <h3>₹{invoice.amount}</h3>

          <button className="preview-btn" onClick={() => setOpenPreview(true)}>
            👁️ Preview
          </button>

          <button className="download-btn" onClick={downloadPDF}>
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {/* ================= Modal Preview ================= */}
      {openPreview && (
        <div className="invoice-modal" onClick={() => setOpenPreview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {InvoiceTemplate(invoice, invoiceRef)}

            <div className="modal-actions">
              <button
                className="close-btn"
                onClick={() => setOpenPreview(false)}
              >
                Close
              </button>
              <button className="download-btn" onClick={downloadPDF}>
                ⬇ Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Hidden Invoice (for PDF) ================= */}
      <div className="pdf-hidden">{InvoiceTemplate(invoice, invoiceRef)}</div>
    </>
  );
};

export default InvoicesCard;
