export const validateStep = (step, formData) => {
  const errors = {};

  switch(step) {
    case 1:
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.email) errors.email = 'Email is required';
      // Add more validations
      break;
    case 2:
      if (!formData.phone) errors.phone = 'Phone number is required';
      // Add more validations
      break;
    // Add validations for other steps
  }

  return errors;
}; 