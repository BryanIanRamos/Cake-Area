import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required')
    .min(3, 'Name must be at least 3 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .min(0, 'Price cannot be negative'),
  category: Yup.string()
    .required('Category is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  stock: Yup.number()
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
  image: Yup.mixed()
    .required('Product image is required'),
}); 