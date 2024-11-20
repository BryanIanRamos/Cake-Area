// Export business verification data table
export const busVerificationData = {
  verificationRequests: [
    {
      verification_id: 1,
      bus_id: null, // null because business isn't created until verified
      user_id: 2, // References sarah.baker@email.com
      businessName: "Sarah's Sweet Creations",
      ownerName: "Sarah Baker",
      dateSubmitted: "2024-03-15",
      status: "Pending", // Status types: Pending, Approved, Rejected
      documents: {
        permit: "business-permit-sarah.jpg",
        license: "food-license-sarah.jpg",
        certification: "health-cert-sarah.jpg"
      },
      details: {
        address: "123 Baker Street, Cake City",
        phone: "+63 912 345 6789",
        email: "sarah.baker@email.com",
        businessType: "Home Bakery",
        yearsInOperation: "2",
        taxId: "TAX123456789"
      }
    },
    {
      verification_id: 2,
      bus_id: null,
      user_id: 6, // References lisa.baker@email.com
      businessName: "Lisa's Artisan Bakery",
      ownerName: "Lisa Baker",
      dateSubmitted: "2024-03-14",
      status: "Pending",
      documents: {
        permit: "business-permit-lisa.jpg",
        license: "food-license-lisa.jpg",
        certification: "health-cert-lisa.jpg"
      },
      details: {
        address: "456 Pastry Lane, Dessert Town",
        phone: "+63 923 456 7890",
        email: "lisa.baker@email.com",
        businessType: "Commercial Bakery",
        yearsInOperation: "3",
        taxId: "TAX987654321"
      }
    },
    {
      verification_id: 3,
      bus_id: null,
      user_id: 9, // References peter.baker@email.com
      businessName: "Peter's Pastry Paradise",
      ownerName: "Peter Baker",
      dateSubmitted: "2024-03-10",
      status: "Pending",
      documents: {
        permit: "business-permit-peter.jpg",
        license: "food-license-peter.jpg",
        certification: "health-cert-peter.jpg"
      },
      details: {
        address: "789 Bread Street, Pastry City",
        phone: "+63 934 567 8901",
        email: "peter.baker@email.com",
        businessType: "Specialty Bakery",
        yearsInOperation: "5",
        taxId: "TAX456789123"
      }
    }
  ]
};

// Helper function to update verification status
export const updateVerificationStatus = (verificationId, newStatus) => {
  const request = busVerificationData.verificationRequests.find(
    req => req.verification_id === verificationId
  );
  if (request) {
    request.status = newStatus;
    // In a real application, this would persist to a database
    return true;
  }
  return false;
};

// Helper function to get verification request by user ID
export const getVerificationByUserId = (userId) => {
  return busVerificationData.verificationRequests.find(
    req => req.user_id === userId
  );
};

// Helper function to get all pending verifications
export const getPendingVerifications = () => {
  return busVerificationData.verificationRequests.filter(
    req => req.status === "Pending"
  );
}; 