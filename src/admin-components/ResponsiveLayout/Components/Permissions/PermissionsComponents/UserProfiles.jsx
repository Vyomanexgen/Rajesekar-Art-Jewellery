import { useState } from "react";
import "./PermissionsComponents.css";
import "./UserProfilesStyles.css";

/**
 * UserProfiles Component
 * Displays a list of users with their details and provides Add/Edit/Delete functionality
 */

const initialUsers = [
    {
        id: "u-001",
        name: "John Doe",
        email: "john.doe@artjewellery.com",
        phone: "+91 98765 43210",
        role: "Super Admin",
        status: "Active",
        createdAt: "2024-01-15",
    },
    {
        id: "u-002",
        name: "Sarah Smith",
        email: "sarah.smith@artjewellery.com",
        phone: "+91 98765 43211",
        role: "Vendor",
        status: "Active",
        createdAt: "2024-02-20",
    },
    {
        id: "u-003",
        name: "Mike Johnson",
        email: "mike.johnson@artjewellery.com",
        phone: "+91 98765 43212",
        role: "Vendor",
        status: "Inactive",
        createdAt: "2024-03-10",
    },
];

export default function UserProfiles() {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Filter users based on search
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery)
    );

    const handleAddUser = () => {
        setEditingUser(null);
        setShowPopup(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowPopup(true);
    };

    const handleDeleteUser = (userId) => {
        console.log("Deleting user:", userId);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setEditingUser(null);   // 🔥 IMPORTANT
        setShowPopup(false);    // 🔥 IMPORTANT
        console.log("User deleted successfully");
        // if (window.confirm("Are you sure you want to delete this user?")) {

        // }
    };

    const handleSaveUser = (userData) => {
        if (editingUser) {
            // Update existing user
            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u))
            );
        } else {
            // Add new user
            const newUser = {
                id: `u-${Date.now()}`,
                ...userData,
                createdAt: new Date().toISOString().split("T")[0],
            };
            setUsers((prev) => [...prev, newUser]);
        }
        setShowPopup(false);
        setEditingUser(null);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setEditingUser(null);
    };

    return (
        <div className="user-profiles-container">
            {/* Header with Search and Add Button */}
            <div className="user-profiles-header">
                <div className="user-search-wrapper">
                    <i className="fa-solid fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search users by name, email, or phone..."
                        className="user-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="add-user-btn" onClick={handleAddUser}>
                    <i className="fa-solid fa-user-plus"></i>
                    Add User
                </button>
            </div>

            {/* User Count */}
            <div className="user-count-info">
                <p>
                    Showing {filteredUsers.length} of {users.length} users
                </p>
            </div>

            {/* User Cards Grid */}
            <div className="user-cards-grid">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="user-card">
                        <div className="user-card-header">
                            <div className="user-avatar">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="user-basic-info">
                                <h3 className="user-name">{user.name}</h3>
                                <span
                                    className={`user-status-badge ${user.status === "Active" ? "status-active" : "status-inactive"
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </div>
                        </div>

                        <div className="user-card-details">
                            <div className="user-detail-item">
                                <i className="fa-solid fa-envelope"></i>
                                <span>{user.email}</span>
                            </div>
                            <div className="user-detail-item">
                                <i className="fa-solid fa-phone"></i>
                                <span>{user.phone}</span>
                            </div>
                            <div className="user-detail-item">
                                <i className="fa-solid fa-shield-halved"></i>
                                <span className="user-role-badge">{user.role}</span>
                            </div>
                            <div className="user-detail-item">
                                <i className="fa-solid fa-calendar"></i>
                                <span>Joined {user.createdAt}</span>
                            </div>
                        </div>

                        <div className="user-card-actions">
                            <button
                                className="user-action-btn edit-btn"
                                onClick={() => handleEditUser(user)}
                            >
                                <i className="fa-solid fa-edit"></i>
                                Edit
                            </button>
                            <button
                                className="user-action-btn delete-btn"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                <i className="fa-solid fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="user-empty-state">
                    <i className="fa-solid fa-users"></i>
                    <h3>No Users Found</h3>
                    <p>Try adjusting your search or add a new user</p>
                </div>
            )}

            {/* User Profile Popup */}
            {showPopup && (
                <UserProfilePopup
                    user={editingUser}
                    onSave={handleSaveUser}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}

// UserProfilePopup Component (inline for now, can be separated later)
function UserProfilePopup({ user, onSave, onClose }) {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        phone: user?.phone || "",
        role: user?.role || "Vendor",
        status: user?.status || "Active",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!user && !formData.password) {
            newErrors.password = "Password is required for new users";
        } else if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const dataToSave = { ...formData };
            // Don't include password in update if it's empty (edit mode)
            if (user && !formData.password) {
                delete dataToSave.password;
            }
            onSave(dataToSave);
        }
    };

    return (
        <>
            <div className="user-popup-overlay" onClick={onClose}></div>
            <div className="user-popup">
                <div className="user-popup-header">
                    <h2>{user ? "Edit User" : "Add New User"}</h2>
                    <button className="popup-close-btn" onClick={onClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                <form className="user-popup-form" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">
                            Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className={errors.name ? "error" : ""}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="user@example.com"
                            className={errors.email ? "error" : ""}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password {!user && <span className="required">*</span>}
                            {user && <span className="optional">(Leave blank to keep current)</span>}
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className={errors.password ? "error" : ""}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    {/* Phone Field */}
                    <div className="form-group">
                        <label htmlFor="phone">
                            Phone Number <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={errors.phone ? "error" : ""}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    {/* Role Field */}
                    <div className="form-group">
                        <label htmlFor="role">
                            Role <span className="required">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Manager">Manager</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>

                    {/* Status Field */}
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <div className="status-toggle">
                            <button
                                type="button"
                                className={`status-option ${formData.status === "Active" ? "active" : ""}`}
                                onClick={() => setFormData((prev) => ({ ...prev, status: "Active" }))}
                            >
                                <i className="fa-solid fa-check-circle"></i>
                                Active
                            </button>
                            <button
                                type="button"
                                className={`status-option ${formData.status === "Inactive" ? "active" : ""}`}
                                onClick={() => setFormData((prev) => ({ ...prev, status: "Inactive" }))}
                            >
                                <i className="fa-solid fa-times-circle"></i>
                                Inactive
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            <i className="fa-solid fa-save"></i>
                            {user ? "Update User" : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
