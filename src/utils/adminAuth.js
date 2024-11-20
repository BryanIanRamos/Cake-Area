export const getAdminData = () => {
  try {
    const adminData = localStorage.getItem('adminData');
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const isAdminAuthenticated = () => {
  try {
    const adminData = getAdminData();
    return !!adminData;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const logoutAdmin = () => {
  try {
    localStorage.removeItem('adminData');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}; 