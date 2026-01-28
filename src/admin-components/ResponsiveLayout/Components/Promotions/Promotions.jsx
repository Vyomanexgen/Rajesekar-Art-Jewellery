import { useState } from "react";
import "./Promotions.css";
import CampaignCard from "./PromotionsComponents/CampaignCard";
import PromotionsSummaryCard from "./PromotionsComponents/PromotionsSummaryCard";

function Promotions() {
  const CampaignData = [
    {
      id: 1,
      imageSrc:
        "https://res.cloudinary.com/dfehkiysk/image/upload/v1765100924/image1_xvb02r.jpg", // Placeholder/example image
      tag: "Festival",
      status: "active",
      title: "Diwali Dhamaka 2024",
      description: "Grand Diwali sale with up to 40% off on all jewellery",
      startDate: "2024-10-20",
      endDate: "2024-11-05",
      targetAudience: "All Customers",
      reach: "50K",
      stats: {
        views: 34.6,
        conv: 1234, // Stored as number for potential calculations
        cvr: "3.57%",
        roi: "11308.3%",
      },
      budget: {
        used: 32450, // Stored as number
        total: 50000, // Stored as number
        currency: "₹",
      },
    },
    {
      id: 2,
      imageSrc:
        "https://res.cloudinary.com/dfehkiysk/image/upload/v1765100924/image2_tyq38u.jpg", // Placeholder/example image
      tag: "Wedding",
      status: "active",
      title: "Wedding Season Specials",
      description:
        "Exclusive bridal jewellery collection for the wedding season",
      startDate: "2024-11-01",
      endDate: "2024-12-31",
      targetAudience: "Women 22-35",
      reach: "30K",
      stats: {
        views: 18.2,
        conv: 567,
        cvr: "3.11%",
        roi: "3680.0%",
      },
      budget: {
        used: 45000,
        total: 75000,
        currency: "₹",
      },
    },
    {
      id: 3,
      imageSrc:
        "https://res.cloudinary.com/dfehkiysk/image/upload/v1765100924/image3_fgh7s8.jpg", // Placeholder/example image
      tag: "Flash Sale",
      status: "active",
      title: "Flash Sale Friday",
      description: "24-hour mega flash sale every Friday",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      targetAudience: "All Customers",
      reach: "20K",
      stats: {
        views: 15.7,
        conv: 890,
        cvr: "5.68%",
        roi: "14332.4%",
      },
      budget: {
        used: 18500,
        total: 25000,
        currency: "₹",
      },
    },
    {
      id: 4,
      imageSrc:
        "https://res.cloudinary.com/dfehkiysk/image/upload/v1765100924/image4_klm9x2.jpg", // Placeholder/example image
      tag: "Seasonal",
      status: "inactive",
      title: "Summer Collection Launch",
      description: "New lightweight jewellery collection for summer",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      targetAudience: "All Customers",
      reach: "40K",
      stats: {
        views: 42.1,
        conv: 1567,
        cvr: "3.72%",
        roi: "7881.3%",
      },
      budget: {
        used: 58500,
        total: 60000,
        currency: "₹",
      },
    },
  ];

  const [data, setData] = useState(CampaignData); // store campaigns
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null); // stores the id of the promotion being edited
  const [isEditMode, setIsEditMode] = useState(false); // toggles modal mode
  const [preview, setPreview] = useState(null);
  const [inventoryImg, setInventoryImg] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setInventoryImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const emptyCampaign = {
    id: null,
    img: "https://via.placeholder.com/45",
    tag: "",
    status: "active",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    targetAudience: "",
    reach: "",
    stats: {
      views: "",
      conv: "",
      cvr: "",
      roi: "",
    },
    budget: {
      used: "",
      total: "",
      currency: "₹",
    },
  };

  const [newCampaign, setNewCampaign] = useState(emptyCampaign);

  const handleAddCampaign = () => {
    const newEntry = {
      ...newCampaign,
      id: Date.now(), // generate id only when adding
      // optionally convert numeric fields
      img: inventoryImg || "https://via.placeholder.com/45",
      budget: {
        ...newCampaign.budget,
        used: Number(newCampaign.budget.used) || 0,
        total: Number(newCampaign.budget.total) || 0,
        currency: newCampaign.budget.currency || "₹",
      },
      stats: {
        ...newCampaign.stats,
        conv: Number(newCampaign.stats.conv) || 0,
      },
    };

    setData((prev) => [...prev, newEntry]);
    setShowAddModal(false);
    setNewCampaign(emptyCampaign);
  };

  const handleUpdateCampaign = () => {
    const updatedData = data.map((item) =>
      item.id === editId
        ? { ...newCampaign, img: inventoryImg || newCampaign.img }
        : item
    );

    setData(updatedData);
    setShowAddModal(false);
    setIsEditMode(false);
    setEditId(null);
    setNewCampaign(emptyCampaign);
  };

  const handleEditClick = (campaign) => {
    setIsEditMode(true);
    setEditId(campaign.id);
    setNewCampaign({ ...campaign }); // pre-fill modal

    // Fix: Load existing image into preview
    setPreview(campaign.imageSrc || campaign.img);
    setInventoryImg(campaign.imageSrc || campaign.img);

    setShowAddModal(true); // open popup (same as Add)
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // Stats Card Functions

  const activeFunctionsLength = data.reduce((count, item) => {
    if (item.status.toLowerCase() == "active") return count + 1;
    return count;
  }, 0);

  const totalViews = data.reduce((total, item) => {
    return total + item.stats.views;
  }, 0);

  const totalConversions = data.reduce((total, item) => {
    return total + item.stats.conv;
  }, 0);

  const totalBudget = data.reduce((total, item) => {
    return total + item.budget.total;
  }, 0);

  const totalSpent = data.reduce((total, item) => {
    return total + item.budget.used;
  }, 0);

  return (
    <div className="PromotionsContainer">
      {/* <CampaignCard /> */}

      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Promotions</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage festival campaigns, seasonal sales, and promotional banners
          </p>
        </div>

        <div className="MainDashboardHeaderControls">
          <button
            className="MainDashboardHeaderExport"
            onClick={() => setShowAddModal(true)}
          >
            + Create Promotion
          </button>
        </div>
      </div>

      <div className="BrandsSearchBarContainer">
        <input
          type="text"
          placeholder=" 🔍 Search Promotions..."
          className="BrandsSearchBar"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="PricingAndDiscountsSummaryCard">
        <PromotionsSummaryCard title="Total Campaigns" value={data.length} />
        <PromotionsSummaryCard title="Active" value={activeFunctionsLength} />
        <PromotionsSummaryCard title="Total Views" value={totalViews} />
        <PromotionsSummaryCard title="Conversions" value={totalConversions} />
        <PromotionsSummaryCard title="Budget" value={totalBudget} />
        <PromotionsSummaryCard title="Spent" value={totalSpent} />
      </div>
      <div className="PromotionsCardContainer">
        {data.map((campaignItem) => (
          <CampaignCard
            key={campaignItem.id}
            campaign={campaignItem}
            onEdit={handleEditClick}
            onDelete={() => handleDelete(campaignItem.id)}
          />
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Create New Promotion</h2>

            <div className="modal-form">
              <label>Title</label>
              <input
                type="text"
                value={newCampaign.title}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, title: e.target.value })
                }
              />

              <label>Description</label>
              <textarea
                value={newCampaign.description}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    description: e.target.value,
                  })
                }
              />

              <label>Promotion Image</label>
              {/* <input
                type="text"
                value={newCampaign.imageSrc}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, imageSrc: e.target.value })
                }
              /> */}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {preview && (
                <img src={preview} alt="Preview" className="preview-img" />
              )}

              <label>Tag</label>
              <input
                type="text"
                value={newCampaign.tag}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, tag: e.target.value })
                }
              />

              <label>Target Audience</label>
              <input
                type="text"
                value={newCampaign.targetAudience}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    targetAudience: e.target.value,
                  })
                }
              />

              <label>Start Date</label>
              <input
                type="date"
                value={newCampaign.startDate}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, startDate: e.target.value })
                }
              />

              <label>End Date</label>
              <input
                type="date"
                value={newCampaign.endDate}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, endDate: e.target.value })
                }
              />

              <label>Reach</label>
              <input
                type="text"
                value={newCampaign.reach}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, reach: e.target.value })
                }
              />

              <label>Views</label>
              <input
                type="text"
                value={newCampaign.stats.views}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    stats: { ...newCampaign.stats, views: e.target.value },
                  })
                }
              />

              <label>Conversions</label>
              <input
                type="number"
                value={newCampaign.stats.conv}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    stats: { ...newCampaign.stats, conv: e.target.value },
                  })
                }
              />

              <label>Budget Used</label>
              <input
                type="number"
                value={newCampaign.budget.used}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    budget: { ...newCampaign.budget, used: e.target.value },
                  })
                }
              />

              <label>Budget Total</label>
              <input
                type="number"
                value={newCampaign.budget.total}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    budget: { ...newCampaign.budget, total: e.target.value },
                  })
                }
              />

              <div className="modal-btns">
                <button
                  className="cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="submit"
                  onClick={
                    isEditMode ? handleUpdateCampaign : handleAddCampaign
                  }
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Promotions;
