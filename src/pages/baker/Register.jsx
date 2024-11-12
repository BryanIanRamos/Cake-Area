import React, { useState } from "react";
import RadioOption from "../../components/buyer/RadioOption";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2 - Additional Info
    phone: "",
    birthDate: "",
    gender: "",

    // Step 3 - Business Details
    businessName: "",
    registrationNumber: "",
    businessEmail: "",
    description: "",

    // Step 4 - Address Details
    cityBarangay: "",
    postalCode: "",
    streetBuilding: "",
    locationType: "", // 'home' or 'work'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    number: false,
    upper: false,
    lower: false,
    symbol: false,
    match: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const RequiredIndicator = () => <span className="text-red-500 ml-1">*</span>;

  const validateForm = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!formData.email.endsWith("@gmail.com")) {
        newErrors.email = "Please use a Gmail address (@gmail.com)";
      }

      if (formData.password.trim()) {
        if (!Object.values(passwordErrors).every(Boolean)) {
          newErrors.password = "Please meet all password requirements";
        }
      } else {
        newErrors.password = "Password is required";
      }
    } else if (step === 2) {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!validatePhoneNumber(formData.phone)) {
        newErrors.phone = "Please enter a valid Philippine mobile number";
      }
      if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    } else if (step === 3) {
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!formData.businessEmail.trim())
        newErrors.businessEmail = "Business email is required";
    } else if (step === 4) {
      if (!formData.cityBarangay.trim())
        newErrors.cityBarangay = "City and Barangay are required";
      if (!formData.postalCode.trim())
        newErrors.postalCode = "Postal code is required";
      if (!formData.streetBuilding.trim())
        newErrors.streetBuilding = "Street and building are required";
      if (!formData.locationType)
        newErrors.locationType = "Location type is required";
    }

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      // Only allow numbers and limit to 11 digits
      const cleanValue = value.replace(/\D/g, "").slice(0, 11);
      setFormData((prev) => ({ ...prev, [id]: cleanValue }));
    } else {
      setFormData((prev) => {
        const newData = { ...prev, [id]: value };
        if (id === "password" || id === "confirmPassword") {
          validatePassword(
            id === "password" ? value : newData.password,
            id === "confirmPassword" ? value : newData.confirmPassword
          );
        }
        return newData;
      });
    }

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const validatePassword = (password, confirmPassword) => {
    const errors = {
      length: password.length >= 8,
      number: /\d/.test(password),
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword,
    };
    setPasswordErrors(errors);
    return Object.values(errors).every(Boolean);
  };

  const renderStep1 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
        <label htmlFor="firstName">
          First Name
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className={`border-2 py-1 px-2 rounded-md ${
            errors.firstName ? "border-red-500" : "border-tertiary"
          }`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
        <label htmlFor="lastName">
          Last Name
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1 relative">
        <label htmlFor="email">
          Email
          <RequiredIndicator />
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            className={`w-full border-2 py-1 px-2 rounded-md ${
              formData.email && formData.email.endsWith("@gmail.com")
                ? "border-green-500"
                : formData.email
                ? "border-red-500"
                : "border-tertiary"
            }`}
          />
        </div>

        {/* Email requirements feedback */}
        {isEmailFocused && (
          <div className="absolute left-full ml-4 top-0 w-48 bg-white p-3 rounded-md shadow-lg border text-sm">
            <h4 className="font-semibold mb-2">Email requirements:</h4>
            <ul className="space-y-1">
              <li
                className={`flex items-center gap-2 ${
                  formData.email.endsWith("@gmail.com")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formData.email.endsWith("@gmail.com") ? "✓" : "×"} Must end
                with @gmail.com
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-2 flex flex-col gap-1 relative">
        <label htmlFor="password">
          Password
          <RequiredIndicator />
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            className={`w-full border-2 py-1 px-2 rounded-md pr-10 ${
              formData.password &&
              Object.values({ ...passwordErrors, match: true }).every(Boolean)
                ? "border-green-500"
                : formData.password
                ? "border-red-500"
                : "border-tertiary"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        {/* Password requirements feedback */}
        {isPasswordFocused && (
          <div className="absolute left-full ml-4 top-0 w-48 bg-white p-3 rounded-md shadow-lg border text-sm">
            <h4 className="font-semibold mb-2">Password must have:</h4>
            <ul className="space-y-1">
              <li
                className={`flex items-center gap-2 ${
                  passwordErrors.length ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordErrors.length ? "✓" : "×"} 8+ characters
              </li>
              <li
                className={`flex items-center gap-2 ${
                  passwordErrors.number ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordErrors.number ? "✓" : "×"} One number
              </li>
              <li
                className={`flex items-center gap-2 ${
                  passwordErrors.upper ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordErrors.upper ? "✓" : "×"} One uppercase
              </li>
              <li
                className={`flex items-center gap-2 ${
                  passwordErrors.lower ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordErrors.lower ? "✓" : "×"} One lowercase
              </li>
              <li
                className={`flex items-center gap-2 ${
                  passwordErrors.symbol ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordErrors.symbol ? "✓" : "×"} One special character
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="confirmPassword">
          Confirm Password
          <RequiredIndicator />
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full border-2 py-1 px-2 rounded-md pr-10 ${
              formData.confirmPassword && passwordErrors.match
                ? "border-green-500"
                : formData.confirmPassword
                ? "border-red-500"
                : "border-tertiary"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {formData.confirmPassword && !passwordErrors.match && (
          <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
        )}
      </div>
    </div>
  );

  // Step 2 - Additional Info
  const renderStep2 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="phone">
          Phone Number
          <RequiredIndicator />
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="09XXXXXXXXX"
          className={`border-2 py-1 px-2 rounded-md ${
            formData.phone && validatePhoneNumber(formData.phone)
              ? "border-green-500"
              : formData.phone
              ? "border-red-500"
              : "border-tertiary"
          }`}
        />
        {formData.phone && !validatePhoneNumber(formData.phone) && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid Philippine mobile number (09XXXXXXXXX)
          </p>
        )}
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="birthDate">
          Birth Date
          <RequiredIndicator />
        </label>
        <input
          type="date"
          id="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label>
          Gender
          <RequiredIndicator />
        </label>
        <RadioOption
          options={["Male", "Female", "Prefer not to say"]}
          selected={formData.gender}
          onChange={(value) => {
            console.log("Selected Gender:", value);
            setFormData((prev) => ({
              ...prev,
              gender: value,
            }));
          }}
        />
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
        )}
      </div>
    </div>
  );

  // Step 3 - Business Details
  const renderStep3 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="businessName">
          Business Name
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter your business name"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="registrationNumber">
          Registration Number
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter business registration number"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="businessEmail">
          Business Email
          <RequiredIndicator />
        </label>
        <input
          type="email"
          id="businessEmail"
          value={formData.businessEmail}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter business email"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="description">Business Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          className="border-2 py-1 px-2 border-tertiary rounded-md resize-none"
          placeholder="Describe your business..."
        />
      </div>
    </div>
  );

  // Step 4 - Address Details
  const renderStep4 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="cityBarangay">
          City, Barangay
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="cityBarangay"
          value={formData.cityBarangay}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter city and barangay"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="postalCode">
          Postal Code
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter postal code"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="streetBuilding">
          Street name, Building name
          <RequiredIndicator />
        </label>
        <input
          type="text"
          id="streetBuilding"
          value={formData.streetBuilding}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter street and building name"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1 mt-2">
        <label className="mb-1">
          Business Location Type
          <RequiredIndicator />
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md border-2 transition-colors duration-200 
              ${
                formData.locationType === "home"
                  ? "border-primary bg-primary text-white"
                  : "border-tertiary text-gray-600 hover:bg-gray-50"
              }`}
            onClick={() => setFormData({ ...formData, locationType: "home" })}
          >
            Home
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md border-2 transition-colors duration-200 
              ${
                formData.locationType === "work"
                  ? "border-primary bg-primary text-white"
                  : "border-tertiary text-gray-600 hover:bg-gray-50"
              }`}
            onClick={() => setFormData({ ...formData, locationType: "work" })}
          >
            Work
          </button>
        </div>
      </div>
    </div>
  );

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  // Render left side content based on current step
  const renderLeftContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="h-full flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to BakeHub</h2>
            <p className="text-center text-lg">
              Create your account and start your journey as a baker
            </p>
          </div>
        );
      case 2:
        return (
          <div className="h-full flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Personal Details</h2>
            <p className="text-center text-lg">
              Help us get to know you better
            </p>
          </div>
        );
      case 3:
        return (
          <div className="h-full flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Business Information</h2>
            <p className="text-center text-lg">
              Tell us about your baking business
            </p>
          </div>
        );
      case 4:
        return (
          <div className="h-full flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Location Details</h2>
            <p className="text-center text-lg">
              Let customers know where to find you
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleProceed = () => {
    console.log("Current step:", step);
    console.log("Form validation result:", validateForm());

    if (validateForm()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  // Add this function to check if current step is valid
  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.firstName.trim() !== "" &&
          formData.lastName.trim() !== "" &&
          formData.email.endsWith("@gmail.com") &&
          formData.password.trim() !== "" &&
          Object.values(passwordErrors).every(Boolean)
        );
      case 2:
        return (
          // console.log("formData.phone:", formData.phone),
          // console.log("formData.birthDate:", formData.birthDate),
          // console.log("formData.gender:", formData.gender),
          validatePhoneNumber(formData.phone) &&
          formData.birthDate !== "" &&
          formData.gender !== ""
        );
      case 3:
        return (
          formData.businessName.trim() !== "" &&
          formData.businessEmail.trim() !== ""
        );
      case 4:
        return (
          formData.cityBarangay.trim() !== "" &&
          formData.postalCode.trim() !== "" &&
          formData.streetBuilding.trim() !== "" &&
          formData.locationType !== ""
        );
      default:
        return false;
    }
  };

  // Add this function to validate Philippine phone numbers
  const validatePhoneNumber = (phone) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, "");
    // Check if it starts with 09 and has 11 digits total
    return /^09\d{9}$/.test(cleanPhone);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-[1200px] min-h-[600px] border-2 bg-white grid grid-cols-1 lg:grid-cols-2 shadow-md">
        <div className="bg-primary hidden lg:block relative overflow-hidden">
          {renderLeftContent()}
          {/* Optional: Add step indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  step === num ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center p-4">
          <div className="w-full max-w-[500px]  p-6">
            <h3 className="text-xl sm:text-2xl font-bold">
              Create your account
            </h3>
            <p className="text-md text-gray-600">
              {step === 1 && "Please fill in the details below to get started"}
              {step === 2 && "Just a few more details needed"}
              {step === 3 && "Tell us about your business"}
              {step === 4 && "Where is your business located?"}
            </p>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            <div className="w-full mt-6">
              <button
                onClick={handleProceed}
                disabled={!isStepValid()}
                className={`w-full rounded-md font-semibold text-center py-2 px-3 text-[1.1vw] transition-colors ${
                  isStepValid()
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {step === 4 ? "Submit" : "Proceed"}
              </button>

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-full mt-2 rounded-md border border-primary text-primary font-semibold text-center py-2 px-3 text-[1.1vw] hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
