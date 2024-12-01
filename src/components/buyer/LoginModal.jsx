import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, closeModal, onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage("Logging in...");

    try {
      // Get all users and find matching email (case-insensitive)
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(
        (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
      );

      // Simulate network delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        setLoginMessage("Invalid email or password");
        setIsLoading(false);
        onLogin(email, password);
        return;
      }

      // Check if the password matches
      if (user.password !== password) {
        // Direct comparison since we're using the full hashed password
        setLoginMessage("Invalid email or password");
        setIsLoading(false);
        onLogin(email, password);
        return;
      }

      if (user.role === 1) {
        setLoginMessage("Admin login not allowed here");
        setIsLoading(false);
        onLogin(email, password);
        return;
      }

      if (user.role === 2) {
        setLoginMessage("Welcome back, baker!");

        try {
          // Get baker's business information
          const businessResponse = await fetch(
            `http://localhost:3000/businesses?user_id=${user.id}`
          );
          const businesses = await businessResponse.json();
          const bakerBusiness = businesses[0]; // Get first business associated with baker

          // Update user login status
          await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_Login: true }),
          });

          // Store business_id in localStorage if it exists
          if (bakerBusiness) {
            localStorage.setItem("business_id", bakerBusiness.id);
          }

          onLogin(email, password);
          await new Promise((resolve) => setTimeout(resolve, 500));
          closeModal();
          navigate("/dashboard");
          return;
        } catch (error) {
          console.error("Error fetching baker business:", error);
          setLoginMessage("Error loading baker information");
          setIsLoading(false);
          return;
        }
      }

      // For regular customers
      setLoginMessage("Login successful!");
      // Update user login status
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_Login: true }),
      });

      onLogin(email, password); // This will trigger success feedback
      closeModal();
    } catch (error) {
      console.error("Login error:", error);
      setLoginMessage("An error occurred during login");
      onLogin(email, password); // This will trigger error feedback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="border w-[73vw] sm:w-[53vw] md:w-[43vw] lg:w-[35vw] h-fit p-4 sm:p-5 md:p-6 lg:p-7 bg-white">
        <div className="border-[3px] border-primary h-full p-2 md:p-3 lg:p-4 relative">
          <button
            className="absolute right-1 md:right-2 lg:right-3 top-1 md:top-2 lg:top-3 text-[3.6vw] sm:text-[3vh] md:text-[2.6vw] lg:text-[1.6vw] text-primary hover:text-red-400"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <Icon icon="icon-park-solid:close-one" />
          </button>

          <div className="text-center">
            <h2 className="w-full text-[3.6vw] sm:text-[2.5vw] md:text-[2.1vw] lg:text-[1.6vw] font-semibold text-primary">
              Login to Your Account
            </h2>
            {/* Show loading message */}
            {isLoading && (
              <div className="text-primary text-[1.8vw] sm:text-[1.3vw] lg:text-[0.9vw] text-gray-600">
                {loginMessage}
              </div>
            )}
            <form className="mt-4 space-y-4 px-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 p-2 rounded text-[2vw] sm:text-[1.5vw] lg:text-[1vw]"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded text-[2vw] sm:text-[1.5vw] lg:text-[1vw] w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      className="text-[2vw] sm:text-[1.5vw] lg:text-[1vw]"
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-[1.8vw] sm:text-[1.3vw] lg:text-[0.9vw] text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" className="text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 text-[2vw] sm:text-[1.5vw] lg:text-[1vw]"
              >
                Login
              </button>
              <p className="text-[1.8vw] sm:text-[1.3vw] lg:text-[0.9vw] text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={closeModal}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
