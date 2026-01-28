import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Auth.css";

function GoogleSignIn() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        // TODO: Add your Google authentication logic here
        console.log("Initiating Google Sign In...");

        // Simulate authentication process
        setTimeout(() => {
            setIsLoading(false);
            alert("Google Sign-in functionality will be implemented with backend");
        }, 1500);
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
                        <FcGoogle style={{ fontSize: "3rem" }} />
                    </div>
                    <h1 className="AuthTitle">Continue with Google</h1>
                    <p className="AuthSubtitle">
                        Sign in quickly and securely with your Google account
                    </p>
                </div>

                <div className="AuthForm">
                    <div
                        style={{
                            background: "#f7fafc",
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "20px",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#2d3748",
                                marginBottom: "15px",
                            }}
                        >
                            Why use Google Sign-In?
                        </h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "12px",
                                    color: "#4a5568",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <FaCheckCircle style={{ color: "#48bb78", fontSize: "1.2rem" }} />
                                <span>Quick and secure authentication</span>
                            </li>
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "12px",
                                    color: "#4a5568",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <FaCheckCircle style={{ color: "#48bb78", fontSize: "1.2rem" }} />
                                <span>No need to remember another password</span>
                            </li>
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "12px",
                                    color: "#4a5568",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <FaCheckCircle style={{ color: "#48bb78", fontSize: "1.2rem" }} />
                                <span>Access your account from any device</span>
                            </li>
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    color: "#4a5568",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <FaCheckCircle style={{ color: "#48bb78", fontSize: "1.2rem" }} />
                                <span>Enhanced security with Google protection</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        type="button"
                        className="SubmitButton"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                    >
                        {isLoading ? (
                            <>
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        border: "3px solid rgba(255, 255, 255, 0.3)",
                                        borderTop: "3px solid white",
                                        borderRadius: "50%",
                                        animation: "spin 1s linear infinite",
                                    }}
                                />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <FcGoogle style={{ fontSize: "1.5rem" }} />
                                <span>Sign in with Google</span>
                            </>
                        )}
                    </button>

                    <div className="AuthDivider">
                        <span>OR</span>
                    </div>

                    <button
                        type="button"
                        className="GoogleButton"
                        onClick={() => navigate("/auth/email")}
                    >
                        Sign in with Email
                    </button>
                </div>

                <div className="AuthFooter">
                    Don't have an account?
                    <a href="#">Sign up</a>
                </div>

                <div
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        background: "#edf2f7",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        color: "#718096",
                        textAlign: "center",
                    }}
                >
                    By continuing, you agree to our{" "}
                    <a
                        href="#"
                        style={{
                            color: "#667eea",
                            textDecoration: "none",
                            fontWeight: "600",
                        }}
                    >
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        style={{
                            color: "#667eea",
                            textDecoration: "none",
                            fontWeight: "600",
                        }}
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

export default GoogleSignIn;
