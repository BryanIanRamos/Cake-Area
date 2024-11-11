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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Step 1 - Personal Info
  const renderStep1 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
    </div>
  );

  // Step 2 - Additional Info
  const renderStep2 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          id="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          className="border-2 py-1 px-2 border-tertiary rounded-md"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <label>Gender</label>
        <RadioOption
          options={["Male", "Female", "Prefer not to say"]}
          selected={formData.gender}
          onChange={(value) => setFormData({ ...formData, gender: value })}
        />
      </div>
    </div>
  );

  // Step 3 - Business Details
  const renderStep3 = () => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="businessName">Business Name</label>
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
        <label htmlFor="registrationNumber">Registration Number</label>
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
        <label htmlFor="businessEmail">Business Email</label>
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
        <label htmlFor="cityBarangay">City, Barangay</label>
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
        <label htmlFor="postalCode">Postal Code</label>
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
        <label htmlFor="streetBuilding">Street name, Building name</label>
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
        <label className="mb-1">Business Location Type</label>
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
    console.log("Form Data:", formData);
    // Handle form submission
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
                onClick={() => {
                  if (step < 4) {
                    setStep(step + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                className="w-full rounded-md bg-primary text-white font-semibold text-center py-2 px-3 text-[1.1vw] hover:bg-primary/90 transition-colors"
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