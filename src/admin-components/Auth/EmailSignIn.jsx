import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Auth.css";

function EmailSignIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add your authentication logic here
        console.log("Sign in with:", formData);
        // For now, just log the data
        alert("Sign in functionality will be implemented with backend");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="AuthContainer">
            <Link to="/" className="BackToHome">
                <FaArrowLeft />
                <span>Back to Home</span>
            </Link>

            <div className="AuthCard">
                <div className="AuthHeader">
                    <div className="AuthLogo">
                        <FaEnvelope />
                    </div>
                    <h1 className="AuthTitle">Welcome Back</h1>
                    <p className="AuthSubtitle">Sign in to your account to continue</p>
                </div>

                <form className="AuthForm" onSubmit={handleSubmit}>
                    <div className="FormGroup">
                        <label htmlFor="email" className="FormLabel">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="FormInput"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="FormGroup">
                        <label htmlFor="password" className="FormLabel">
                            Password
                        </label>
                        <div className="PasswordInputWrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="FormInput"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="PasswordToggle"
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="FormOptions">
                        <label className="RememberMe">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="ForgotPassword">
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" className="SubmitButton">
                        Sign In
                    </button>
                </form>

                <div className="AuthDivider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="GoogleButton"
                    onClick={() => navigate("/auth/google")}
                >
                    <FcGoogle className="GoogleIcon" />
                    Continue with Google
                </button>

                <div className="AuthFooter">
                    Don't have an account?
                    <a href="#">Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default EmailSignIn;
