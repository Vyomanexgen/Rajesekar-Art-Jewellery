import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./PaymentsComponents.css";

export default function OrderDetailsPopup({ data, onClose }) {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.orderId}.pdf`);
  };

  return (
    <div className="od-overlay">
      <div className="od-popup">
        {/* Header */}
        <div className="od-header">
          <h2>RAJASEKHAR ART JEWELLERY</h2>
          <button className="od-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* PDF CONTENT */}
        <div className="od-body" ref={pdfRef}>
          <p>123 Jewellery Street, Mumbai, MH 400001</p>
          <p>GSTIN: 27AABCU1234A1Z5 | PAN: AABCR1234A</p>

          <hr />

          <h3>Bill To</h3>
          <p>{data.customer}</p>
          <p>Mumbai, Maharashtra - 400001</p>

          <h3>Description</h3>
          <p>Royal Emerald Necklace Set</p>

          <table className="od-table">
            <thead>
              <tr>
                <th>HSN</th>
                <th>QTY</th>
                <th>RATE</th>
                <th>GST</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>711319</td>
                <td>1</td>
                <td>₹38,999</td>
                <td>3%</td>
                <td>₹40,169</td>
              </tr>
            </tbody>
          </table>

          <p className="od-total">Total Amount: ₹40,169</p>
        </div>

        {/* Footer */}
        <div className="od-footer">
          <button className="od-btn secondary" onClick={onClose}>
            Close
          </button>
          <button className="od-btn primary" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
