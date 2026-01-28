import React, { useState, useMemo } from "react";
import TrackingCard from "./TrackingCard";
import TrackingTimeline from "./TrackingTimeline";
import exportJsonToExcel from "../../../../ExportExcelToJson";
import "./ShipmentsComponents.css";

const TrackingDetails = ({ trackingData, partnerFilter }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [partnerFilterLocal, setPartnerFilterLocal] = useState(partnerFilter || "All");
    const [selectedTracking, setSelectedTracking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Filter tracking data
    const filteredTracking = useMemo(() => {
        return trackingData.filter((item) => {
            const matchesSearch =
                item.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.customer.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "All" || item.currentStatus === statusFilter;

            const matchesPartner =
                partnerFilterLocal === "All" ||
                item.shippingPartner === partnerFilterLocal;

            return matchesSearch && matchesStatus && matchesPartner;
        });
    }, [trackingData, searchQuery, statusFilter, partnerFilterLocal]);

    // Pagination
    const totalPages = Math.ceil(filteredTracking.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleTracking = filteredTracking.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Handlers
    const handleViewDetails = (tracking) => {
        setSelectedTracking(tracking);
    };

    const closeModal = () => {
        setSelectedTracking(null);
    };

    const handleExport = () => {
        exportJsonToExcel(filteredTracking, "TrackingData");
    };

    const handlePrintLabel = (tracking) => {
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(`
      <html>
        <head>
          <title>Shipping Label - ${tracking.trackingId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .label-container { border: 2px solid #000; padding: 20px; max-width: 600px; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            .section { margin: 15px 0; }
            .section h3 { margin: 5px 0; font-size: 14px; }
            .section p { margin: 3px 0; font-size: 12px; }
            .barcode { text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="label-container">
            <div class="header">
              <h1>SHIPPING LABEL</h1>
              <p>${tracking.shippingPartner}</p>
            </div>
            <div class="barcode">${tracking.trackingId}</div>
            <div class="section">
              <h3>FROM:</h3>
              <p>${tracking.origin}</p>
            </div>
            <div class="section">
              <h3>TO:</h3>
              <p><strong>${tracking.customer}</strong></p>
              <p>${tracking.destination}</p>
              <p>${tracking.customerPhone || ""}</p>
            </div>
            <div class="section">
              <h3>PACKAGE DETAILS:</h3>
              <p>Weight: ${tracking.weight}</p>
              <p>Dimensions: ${tracking.dimensions}</p>
              <p>Type: ${tracking.packageType}</p>
            </div>
            <div class="section">
              <h3>ORDER INFO:</h3>
              <p>Order ID: ${tracking.orderId}</p>
              <p>Payment: ${tracking.paymentMode}</p>
              ${tracking.notes ? `<p>Notes: ${tracking.notes}</p>` : ""}
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    return (
        <div className="tracking-details-container">
            {/* Search and Filters */}
            <div className="tracking-header">
                <input
                    type="text"
                    placeholder="🔍 Search by Tracking ID, Order ID, or Customer..."
                    className="tracking-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="tracking-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Failed">Failed</option>
                </select>

                <select
                    className="tracking-filter"
                    value={partnerFilterLocal}
                    onChange={(e) => setPartnerFilterLocal(e.target.value)}
                >
                    <option value="All">All Partners</option>
                    <option value="BlueDart Express">BlueDart Express</option>
                    <option value="DHL Express">DHL Express</option>
                    <option value="FedEx">FedEx</option>
                    <option value="DTDC">DTDC</option>
                </select>

                <button className="export-btn" onClick={handleExport}>
                    <i className="fa-solid fa-download"></i> Export
                </button>
            </div>

            {/* Results Count */}
            <div className="tracking-results-info">
                <p>
                    Showing {startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, filteredTracking.length)} of{" "}
                    {filteredTracking.length} shipments
                </p>
            </div>

            {/* Tracking Cards Grid */}
            {filteredTracking.length > 0 ? (
                <>
                    <div className="tracking-grid">
                        {visibleTracking.map((tracking) => (
                            <TrackingCard
                                key={tracking.trackingId}
                                data={tracking}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination tracking-pagination">
                            <button
                                className="page-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        className={`page-number ${currentPage === page ? "active" : ""
                                            }`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                className="page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="tracking-empty-state">
                    <i className="fa-solid fa-box-open"></i>
                    <h3>No Tracking Data Found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Detail Modal */}
            {selectedTracking && (
                <>
                    <div className="tracking-overlay" onClick={closeModal}></div>
                    <div className="tracking-modal">
                        <div className="modal-header">
                            <h2>Tracking Details</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="modal-info-grid">
                                <div className="info-item">
                                    <label>Tracking ID</label>
                                    <p>{selectedTracking.trackingId}</p>
                                </div>
                                <div className="info-item">
                                    <label>Order ID</label>
                                    <p>{selectedTracking.orderId}</p>
                                </div>
                                <div className="info-item">
                                    <label>Customer</label>
                                    <p>{selectedTracking.customer}</p>
                                </div>
                                <div className="info-item">
                                    <label>Shipping Partner</label>
                                    <p>{selectedTracking.shippingPartner}</p>
                                </div>
                                <div className="info-item">
                                    <label>Current Status</label>
                                    <p>
                                        <span
                                            className={`tracking-status-badge status-${selectedTracking.currentStatus
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                        >
                                            {selectedTracking.currentStatus}
                                        </span>
                                    </p>
                                </div>
                                <div className="info-item">
                                    <label>Est. Delivery</label>
                                    <p>
                                        {new Date(
                                            selectedTracking.estimatedDelivery
                                        ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="info-item">
                                    <label>Weight</label>
                                    <p>{selectedTracking.weight}</p>
                                </div>
                                <div className="info-item">
                                    <label>Shipping Cost</label>
                                    <p>{selectedTracking.shippingCost}</p>
                                </div>
                            </div>

                            {selectedTracking.notes && (
                                <div className="info-notes">
                                    <label>Notes</label>
                                    <p>{selectedTracking.notes}</p>
                                </div>
                            )}

                            <div className="modal-timeline-section">
                                <h3>Shipment Timeline</h3>
                                <TrackingTimeline timeline={selectedTracking.timeline} />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="modal-btn primary"
                                onClick={() => handlePrintLabel(selectedTracking)}
                            >
                                <i className="fa-solid fa-print"></i> Print Label
                            </button>
                            <button className="modal-btn secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TrackingDetails;
