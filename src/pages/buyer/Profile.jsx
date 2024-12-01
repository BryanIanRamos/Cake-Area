import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buyer/Button";
import HideContact from "../../components/buyer/HideContact";
import RadioOption from "../../components/buyer/RadioOption";
import NameChangeModal from "../../components/buyer/NameChangeModal";

import DummyProfile from "../../assets/Dummy_Profile.png";
import dataAddress from "../../data/address.json";

const Profile = ({ isLoggedIn, userName }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    dateOfBirth: false,
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    sex: "",
  });
  const gender = ["Male", "Female", "Prefer not to say"];
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Fetch user data
      fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setFormData((prev) => ({ ...prev, email: data.email }));
        });

      // Fetch profile data
      fetch(`http://localhost:3000/profiles?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setUserProfile(data[0]);
            setSelectedGender(data[0].sex || "");
            setFormData((prev) => ({
              ...prev,
              first_name: data[0].first_name || "",
              last_name: data[0].last_name || "",
              phone_number: data[0].phone_number || "",
              date_of_birth: data[0].date_of_birth || "",
              sex: data[0].sex || "",
            }));
            if (data[0].img && data[0].img !== "dummy_profile_url") {
              setImage(data[0].img);
            }
          }
        });
    }
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      // Update user data (email)
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      // Update profile data
      const profileResponse = await fetch(
        `http://localhost:3000/profiles?user_id=${userId}`
      );
      const profiles = await profileResponse.json();
      if (profiles.length > 0) {
        await fetch(`http://localhost:3000/profiles/${profiles[0].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            date_of_birth: formData.date_of_birth,
            sex: selectedGender,
          }),
        });
      }

      // Reset editing states
      setIsEditing({
        name: false,
        email: false,
        phone: false,
        dateOfBirth: false,
      });

      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleBack = () => {
    navigate(-1);
    // The isLoggedIn state will be maintained because we're not changing it
  };

  const handleNameSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      // Update profile data
      const profileResponse = await fetch(`http://localhost:3000/profiles?user_id=${userId}`);
      const profiles = await profileResponse.json();
      
      if (profiles.length > 0) {
        await fetch(`http://localhost:3000/profiles/${profiles[0].id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name
          })
        });

        // Update local state
        setUserProfile(prev => ({
          ...prev,
          first_name: formData.first_name,
          last_name: formData.last_name
        }));
      }

      // Close modal
      setIsNameModalOpen(false);
      
      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="max-lg:hidden col-span-1 xl:col-span-2"></div>
      {/* Main Content of profile */}
      <div className="col-span-12 lg:col-span-10 xl:col-span-8 bg-trinary flex flex-col gap-4 px-10 pt-5">
        <div className="flex justify-end">
          <Button
            label="Back"
            paddingX={10}
            paddingY={2}
            onClick={handleBack}
          />
        </div>
        <div className="border bg-white p-7 ">
          <div className=" border-green-600">
            <div className="font-[oswald]">
              <div className="font-semibold text-[3vw] sm:text-[2.2vw] md:text-[2.1vw] lg:text-[1.9vw] xl:text-[1.8vw] 2xl:text-[1.6vw]">
                Profile
              </div>
              <div className="text-[1.3vw] text-gray-400">
                Manage and protect your account.
              </div>
            </div>
            {/* Line  */}
            <div className="">
              <div className="border border-gray-400 my-3 lg:my-5"></div>
            </div>

            {/* Information */}
            <div className="grid grid-cols-2">
              <div className="border-yellow-500 text-gray-400 font-[poppins] flex flex-col gap-4 text-[1.1vw]">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end col-span-1 text-gray-400">Name</p>
                  <div className="col-span-2 flex gap-4">
                    <div className="text-gray-400 flex-grow">
                      {userProfile
                        ? `${userProfile.first_name} ${userProfile.last_name}`
                        : ""}
                    </div>
                    <button
                      className="underline text-blue-500 hover:text-blue-300"
                      onClick={() => setIsNameModalOpen(true)}
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end text-gray-400">Email</p>
                  <div className="col-span-2 flex gap-4">
                    {isEditing.email ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border bg-gray-100 p-1 flex-grow"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <HideContact contact={userData?.email || ""} type={"email"} />
                      </div>
                    )}
                    <button 
                      className="underline text-blue-500 hover:text-blue-300"
                      onClick={() => toggleEdit('email')}
                    >
                      {isEditing.email ? 'Cancel' : 'Change'}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end text-gray-400">Phone Number</p>
                  <div className="col-span-2 flex gap-4">
                    {isEditing.phone ? (
                      <input
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => handleChange('phone_number', e.target.value)}
                        className="border bg-gray-100 p-1 flex-grow"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <HideContact contact={userProfile?.phone_number || ""} type={"phone"} />
                      </div>
                    )}
                    <button 
                      className="underline text-blue-500 hover:text-blue-300"
                      onClick={() => toggleEdit('phone')}
                    >
                      {isEditing.phone ? 'Cancel' : 'Change'}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end text-gray-400">Gender</p>
                  <div className="col-span-2 text-[0.9vw] text-gray-400">
                    <RadioOption
                      options={gender}
                      defaultValue={selectedGender}
                      onChange={(value) => {
                        setSelectedGender(value);
                        handleChange("sex", value);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end text-gray-400">Date of Birth</p>
                  <div className="col-span-2 flex gap-4">
                    {isEditing.dateOfBirth ? (
                      <input
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) =>
                          handleChange("date_of_birth", e.target.value)
                        }
                        className="border bg-gray-100 p-1 flex-grow"
                      />
                    ) : (
                      <div className="text-gray-400 flex-grow">
                        {userProfile?.date_of_birth || ""}
                      </div>
                    )}
                    <button
                      className="underline text-blue-500 hover:text-blue-300"
                      onClick={() => toggleEdit("dateOfBirth")}
                    >
                      {isEditing.dateOfBirth ? "Cancel" : "Change"}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center h-fit my-3">
                  <div></div>
                  <Button
                    label="Save"
                    paddingX={2}
                    paddingY={1}
                    onClick={handleSave}
                  />
                  <div></div>
                </div>
              </div>
              {/* Profile Image */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={image || DummyProfile}
                  alt="Profile"
                  className="w-[9vw] xl:w-[7.5vw] rounded-full object-cover border-2 border-gray-300"
                />
                <label
                  htmlFor="imageUpload"
                  className="mt-2 px-4 py-2 text-[1vw] xl:text-[0.7vw] hover:bg-primary cursor-pointer hover:text-white text-gray-600 border border-gray-600"
                >
                  Upload Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center text-gray-600 mt-2 text-[1vw] xl:text-[0.8vw]">
                  <p>File size: maximum 1 MB</p>
                  <p>File extemtsion: .JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Address  */}
        <div className="border bg-white p-10">
          <div className="grid grid-cols-2">
            <div>
              <h3 className="font-semibold text-[3vw] sm:text-[2.2vw] md:text-[2.1vw] lg:text-[1.9vw] xl:text-[1.8vw] 2xl:text-[1.6vw]">
                My Address
              </h3>
              <p className="">Set your address</p>
            </div>
            <div className="flex justify-end p-2">
              <Button label="Add" paddingY="2" paddingX="5" />
            </div>
          </div>
          <div className="border border-gray-400 my-5"></div>
          {dataAddress.map((info, index) => (
            <div key={index}>
              <div className="grid grid-cols-5">
                <div className="col-span-3">
                  <div className="flex gap-2">
                    <h3>{info.name}</h3>
                    <p>|</p>
                    <p>{info.phone}</p>
                  </div>
                  <p>{info.address.line1}</p>
                  <p>{info.address.line2}</p>
                </div>
                <div className="grid grid-rows-2 justify-end  text-start">
                  <button className="text-[13px] underline text-blue-500 hover:text-blue-300">
                    Change
                  </button>
                  <button className="text-[13px] underline text-red-500 hover:text-red-300">
                    Delete
                  </button>
                </div>
              </div>
              <div className="border border-gray-400 my-5"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-lg:hidden col-span-1 xl:col-span-2"></div>
      <NameChangeModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        firstName={formData.first_name}
        lastName={formData.last_name}
        onFirstNameChange={(value) => handleChange('first_name', value)}
        onLastNameChange={(value) => handleChange('last_name', value)}
        onSave={handleNameSave}
      />
    </div>
  );
};

export default Profile;
