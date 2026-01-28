import React, { useState } from "react";
import { FaStar, FaEllipsisV } from "react-icons/fa";
// import { useEffect } from "react";

import "./Products.css";

// import ProductContainerHeader from "./ProductComponents/ProductContainerHeader";
import exportJsonToExcel from "../../../ExportExcelToJson";

import productsData from "./productsData";

function Products() {
  const [products, setProducts] = useState(productsData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSku, setEditingSku] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [isOpen, setIsOpen] = useState(false);

  // NEW: Form state to add products
  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    price: "",
    mrp: "",
    category: "",
    stock: "",
    status: "Active",
    seller: "Rajasekhar",
    img: "https://via.placeholder.com/45",
    rating: null,
  });

  const emptyProduct = {
    sku: "",
    name: "",
    price: "",
    mrp: "",
    category: "",
    stock: "",
    status: "Active",
    seller: "Rajasekhar",
    img: "https://via.placeholder.com/45",
    rating: null,
  };

  const [preview, setPreview] = useState(null);
  const [productImg, setProductImg] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setProductImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || product.status === statusFilter;

    let matchesStock = true;
    const stock = product.stock;

    if (stockFilter !== "All") {
      if (stockFilter === "Out of Stock") {
        matchesStock = stock === 0;
      } else if (stockFilter === "Low Stock") {
        matchesStock = stock > 0 && stock < 10;
      } else if (stockFilter === "In Stock") {
        matchesStock = stock >= 10;
      }
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  const itemsPerPage = 10;
  const totalProducts = filteredProducts.length;

  const [selectedSkus, setSelectedSkus] = useState(new Set());

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visible = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchQuery, categoryFilter, stockFilter]);

  // --- HELPER FUNCTIONS ---

  // Checks if a given SKU is in the selectedSkus set
  const isSelected = (sku) => selectedSkus.has(sku);

  // Checks if ALL visible products are selected
  const isAllSelected = visible.every((item) => selectedSkus.has(item.sku));

  // --- HANDLER FUNCTIONS ---

  /**
   * 2. Handles individual checkbox clicks (in <td>)
   * @param {string} sku The SKU of the product to select/deselect
   */
  const handleCheckboxChange = (sku) => {
    setSelectedSkus((prevSkus) => {
      const newSkus = new Set(prevSkus);
      if (newSkus.has(sku)) {
        newSkus.delete(sku); // Deselect
      } else {
        newSkus.add(sku); // Select
      }
      return newSkus;
    });
  };

  /* 3. Handles the "Select All" checkbox click (in <th>) */
  const handleSelectAll = () => {
    // ✅ FIX: Use the SKUs of the currently 'visible' (paginated) products
    const visibleSkus = filteredProducts.map((item) => item.sku);

    setSelectedSkus((prevSkus) => {
      const newSkus = new Set(prevSkus);

      if (isAllSelected) {
        // Deselect all visible products
        visibleSkus.forEach((sku) => newSkus.delete(sku));
      } else {
        // Select all visible products
        visibleSkus.forEach((sku) => newSkus.add(sku));
      }
      return newSkus;
    });
  };

  // --- CALCULATE SELECTED DATA ---

  // 4. Get the full product objects for all selected SKUs
  const selectedProducts = filteredProducts.filter((p) =>
    selectedSkus.has(p.sku)
  );

  const showSelectedHeader = selectedProducts.length > 0;

  // NEW: Handle input update
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (!newProduct.sku || !newProduct.name) {
      alert("SKU and Product Name are required!");
      return;
    }

    if (isEditMode) {
      // ✏️ UPDATE PRODUCT
      setProducts((prev) =>
        prev.map((item) =>
          item.sku === editingSku
            ? {
              ...newProduct,
              img: productImg || newProduct.img,
              stock: Number(newProduct.stock),
            }
            : item
        )
      );
    } else {
      // ➕ ADD PRODUCT
      setProducts((prev) => [
        ...prev,
        {
          ...newProduct,
          img: productImg || newProduct.img || "https://via.placeholder.com/45",
          stock: Number(newProduct.stock),
        },
      ]);
    }

    // 🔄 Reset state
    setNewProduct({
      sku: "",
      name: "",
      price: "",
      mrp: "",
      category: "",
      stock: "",
      status: "Active",
      seller: "Rajasekhar",
      img: "https://via.placeholder.com/45",
      rating: null,
    });

    setPreview(null);
    setProductImg("");
    setEditingSku(null);
    setIsEditMode(false);
    setIsOpen(false);
  };

  // const handleSaveProduct = () => {
  //   if (!newProduct.sku || !newProduct.name) {
  //     alert("SKU and Product Name are required!");
  //     return;
  //   }

  //   if (isEditMode) {
  //     // ✏️ UPDATE PRODUCT
  //     setProducts((prev) =>
  //       prev.map((item) =>
  //         item.sku === editingSku
  //           ? {
  //               ...newProduct,
  //               img: productImg || newProduct.img,
  //               stock: Number(newProduct.stock),
  //             }
  //           : item
  //       )
  //     );
  //   } else {
  //     // ➕ ADD PRODUCT
  //     setProducts((prev) => [
  //       ...prev,
  //       {
  //         ...newProduct,
  //         img: productImg || newProduct.img || "https://via.placeholder.com/45",
  //         stock: Number(newProduct.stock),
  //       },
  //     ]);
  //   }

  //   // 🔄 Reset state
  //   setNewProduct({
  //     sku: "",
  //     name: "",
  //     price: "",
  //     mrp: "",
  //     category: "",
  //     stock: "",
  //     status: "Active",
  //     seller: "Rajasekhar",
  //     img: "https://via.placeholder.com/45",
  //     rating: null,
  //   });

  //   setPreview(null);
  //   setProductImg("");
  //   setEditingSku(null);
  //   setIsEditMode(false);
  //   setIsOpen(false);
  // };

  const handleEditProduct = (product) => {
    setNewProduct({
      sku: product.sku,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      category: product.category,
      stock: product.stock,
      status: product.status,
      seller: product.seller,
      img: product.img,
      rating: product.rating,
    });

    setPreview(product.img);
    setProductImg(product.img);

    setEditingSku(product.sku);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleRemoveItem = (sku) => {
    const updatedProducts = products.filter((item) => item.sku !== sku);
    setProducts(updatedProducts);
  };

  return (
    <div className="ProductsContainer">
      <div className="ProductsHeaderContainer">
        <div className="ProductsHeaderTextSection">
          <h2 className="ProductsHeaderTitle">Products</h2>
          <p className="ProductsHeaderSubtitle">Manage your product catalog</p>
        </div>

        <div className="ProductsHeaderControls">
          <button
            className="ProductsHeaderExport"
            onClick={() => {
              setNewProduct(emptyProduct);
              setPreview(null);
              setProductImg("");
              setIsEditMode(false);
              setEditingSku(null);
              setIsOpen(true);
            }}
          >
            Add Products
          </button>
        </div>
      </div>

      {/* ----------- POPUP MODAL ----------- */}
      {isOpen && (
        <>
          <div className="order-overlay" onClick={() => setIsOpen(false)}></div>

          <div className="order-popup">
            {/* <h2>Add Product</h2> */}
            {/* <h2>{isEditMode ? "Edit Product" : "Add Product"}</h2> */}
            <div className="popup-header">
              <h2>{isEditMode ? "Edit Product" : "Add Product"}</h2>

              <button
                className="popup-close"
                onClick={() => {
                  setIsOpen(false);
                  setIsEditMode(false);
                  setEditingSku(null);
                  setNewProduct(emptyProduct);
                  setPreview(null);
                  setProductImg("");
                }}
              >
                ✕
              </button>
            </div>

            <div className="order-form">
              <input
                name="sku"
                placeholder="SKU"
                value={newProduct.sku}
                onChange={handleInputChange}
              />
              <div className="image-upload">
                <label>Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {preview && (
                  <img src={preview} alt="Preview" className="preview-img" />
                )}
              </div>
              <input
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <input
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <input
                name="mrp"
                placeholder="MRP"
                value={newProduct.mrp}
                onChange={handleInputChange}
              />
              <input
                name="stock"
                placeholder="Stock"
                type="number"
                value={newProduct.stock}
                onChange={handleInputChange}
              />

              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Bangles">Bangles</option>
                <option value="Rings">Rings</option>
              </select>

              <select
                name="status"
                value={newProduct.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* <button className="save-btn" onClick={handleAddProduct}>
              Save Product
            </button> */}

            <button className="save-btn" onClick={handleAddProduct}>
              {isEditMode ? "Update Product" : "Save Product"}
            </button>

            <button
              className="close-btn"
              onClick={() => {
                setIsOpen(false);
                setIsEditMode(false);
                setEditingSku(null);
                setNewProduct({
                  sku: "",
                  name: "",
                  price: "",
                  mrp: "",
                  category: "",
                  stock: "",
                  status: "Active",
                  seller: "Rajasekhar",
                  img: "https://via.placeholder.com/45",
                  rating: null,
                });
                setPreview(null);
                setProductImg("");
              }}
            >
              Close
            </button>
          </div>
        </>
      )}

      <div className="ProductFilterBarContainer">
        <input
          type="text"
          placeholder=" 🔍 Search by SKU , Product Name... "
          className="ProductFilterBarSearch"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Necklaces">Necklaces</option>
          <option value="Earrings">Earrings</option>
          <option value="Bangles">Bangles</option>
          <option value="Rings">Rings</option>
        </select>

        <select
          className="FilterBarPaymentMethods"
          id="stockDropdown"
          name="selectedOption"
          value={stockFilter} // Bind value to state
          onChange={(e) => setStockFilter(e.target.value)} // Update state on change
        >
          <option value="All">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      {/* <ProductsTable /> */}
      {/* <ProdTable /> */}

      <div className="product-table-container">
        {/* 6. Selection Information and Export Button */}
        {showSelectedHeader && (
          <div className="SelectedHeaderBar">
            <span className="selection-count">
              <span className="selected-number">{selectedProducts.length}</span>{" "}
              selected
            </span>
            <button className="header-button">
              <i className="fa-solid fa-print"></i> Print Invoices
            </button>
            <button className="header-button">
              <i className="fa-solid fa-truck"></i> Mark as Shipped
            </button>
            <button
              className="header-button"
              onClick={() =>
                exportJsonToExcel(selectedProducts, "selectedProductsData")
              }
            >
              <i className="fa-solid fa-download"></i> Export Selected
            </button>
          </div>
        )}
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  // 🟢 Use the isAllSelected helper function
                  checked={isAllSelected}
                  // 🟢 Use the handleSelectAll function
                  onChange={handleSelectAll}
                  // Add a visual cue if some but not all are selected (indeterminate state)
                  ref={(el) => {
                    if (el) {
                      const selectedVisibleCount = visible.filter((item) =>
                        selectedSkus.has(item.sku)
                      ).length;
                      el.indeterminate =
                        selectedVisibleCount > 0 &&
                        selectedVisibleCount < visible.length;
                    }
                  }}
                />
              </th>
              <th>SKU</th>
              <th>PRODUCT</th>
              {/* <th>STATUS</th> */}
              <th>PRICE</th>
              <th>MRP</th>
              <th>STOCK</th>
              <th>CATEGORY</th>
              <th>RATING</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((item, idx) => (
              <tr
                key={idx}
                className={isSelected(item.sku) ? "selected-row" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.sku}`} // Use item.sku instead of products.sku
                    className="InputBox"
                    // 🟢 The state tracks whether this box should be checked
                    checked={isSelected(item.sku)}
                    // 🟢 Handle the click event to update the state
                    onChange={() => handleCheckboxChange(item.sku)} // Pass item.sku
                  />
                </td>

                <td>{item.sku}</td>

                {/* PRODUCT COLUMN (Rest of the columns remain the same) */}
                <td>
                  <div className="product-infos">
                    <img src={item.img} alt="img" />
                    <div>
                      <p className="product-name">{item.name}</p>
                      <span className="seller">{item.seller}</span>
                    </div>
                  </div>
                </td>

                {/* STATUS */}
                {/* <td>
                  <span className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td> */}

                {/* PRICE */}
                <td className="price">{item.price}</td>

                {/* MRP */}
                <td className="mrp">{item.mrp}</td>

                {/* STOCK */}
                <td
                  className={`stock ${item.stock === 0
                      ? "red"
                      : item.stock < 10
                        ? "orange"
                        : "green"
                    }`}
                >
                  {item.stock}
                </td>

                {/* CATEGORY */}
                <td>{item.category}</td>

                {/* RATING */}
                <td>
                  {item.rating ? (
                    <div className="rating">
                      <FaStar className="star-icon" />
                      {item.rating}
                    </div>
                  ) : (
                    <span className="no-review">No reviews</span>
                  )}
                </td>

                <td
                  className="actions"
                  style={{
                    margin: "0px",
                    borderBottom: "0px",
                    padding: "0px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10px",
                  }}
                >
                  <button
                    className="edit"
                    onClick={() => handleEditProduct(item)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleRemoveItem(item.sku)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION SECTION */}

        <div className="pagination footer-pagination">
          <span className="showing-info">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, totalProducts)} of{" "}
            {totalProducts}
          </span>

          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {totalPages > 0 &&
            [...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isFirst = page === 1;
              const isLast = page === totalPages;
              const isCurrent = page === currentPage;
              // Pages to display: First page, Last page, and pages within 1 of current page
              const isNearCurrent =
                page >= currentPage - 1 && page <= currentPage + 1;

              // Only display page 1, the last page, or pages near the current page
              if (isFirst || isLast || isCurrent || isNearCurrent) {
                // If it's the first page or the last page, and it's far from the current page,
                // we need to check if an ellipsis should precede it.
                if (isFirst && currentPage > 3) {
                  return (
                    <>
                      {/* Always show Page 1 */}
                      <button
                        key={1}
                        className={`page-number ${currentPage === 1 ? "active" : ""
                          }`}
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </button>
                      {/* Show leading ellipsis */}
                      <span key="start-ellipsis" className="ellipsis">
                        ...
                      </span>
                    </>
                  );
                }

                if (isLast && currentPage < totalPages - 2) {
                  // Show trailing ellipsis before the last page
                  return (
                    <>
                      <span key="end-ellipsis" className="ellipsis">
                        ...
                      </span>
                      <button
                        key={totalPages}
                        className={`page-number ${isCurrent ? "active" : ""}`}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  );
                }

                // Skip rendering pages if they are not near the current page and are not 1 or totalPages
                if (!isNearCurrent && !isFirst && !isLast) {
                  return null;
                }

                // Render the page button
                return (
                  <button
                    key={page}
                    className={`page-number ${isCurrent ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }
              return null; // Don't render pages outside the desired range
            })}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
