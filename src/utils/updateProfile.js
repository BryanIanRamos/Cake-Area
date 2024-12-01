export const updateProfile = async (userId, updates) => {
  try {
    // Get the profile ID first
    const profileResponse = await fetch(
      `http://localhost:3000/profiles?user_id=${userId}`
    );
    const profiles = await profileResponse.json();
    const profileId = profiles[0].id;

    // Update profile
    const response = await fetch(
      `http://localhost:3000/profiles/${profileId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    // Update user email if it's changed
    if (updates.email) {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: updates.email }),
      });
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateBusiness = async (userId, updates) => {
  try {
    // Get the business ID first
    const businessResponse = await fetch(
      `http://localhost:3000/businesses?user_id=${userId}`
    );
    const businesses = await businessResponse.json();
    const businessId = businesses[0].id;

    const response = await fetch(
      `http://localhost:3000/businesses/${businessId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update business");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateSecurity = async (userId, updates) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: updates.newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update password");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
