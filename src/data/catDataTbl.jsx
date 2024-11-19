import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

export let categoryData = loadFromLocalStorage('categoryData', {
  categories: [
    {
      cat_id: 1,
      name: "Cakes",
    },
    {
      cat_id: 2,
      name: "Bread",
    },
    {
      cat_id: 3,
      name: "Pastries",
    },
    {
      cat_id: 4,
      name: "Cookies",
    },
    {
      cat_id: 5,
      name: "Pies",
    },
    {
      cat_id: 6,
      name: "Cupcakes",
    },
    {
      cat_id: 7,
      name: "Tarts",
    },
    {
      cat_id: 8,
      name: "Donuts",
    },
    {
      cat_id: 9,
      name: "Rolls",
    },
    {
      cat_id: 10,
      name: "Specialty Desserts",
    },
    // {
    //   cat_id: 11,
    //   name: "Rolls1",
    // },
    // {
    //   cat_id: 12,
    //   name: "Rolls2",
    // },
    // {
    //   cat_id: 13,
    //   name: "Rolls3",
    // },
    // {
    //   cat_id: 14,
    //   name: "Rolls4",
    // },
    // {
    //   cat_id: 15,
    //   name: "Rolls5",
    // },
  ],
});

export const addCategory = (newCategory) => {
  const newId = Math.max(...categoryData.categories.map(c => c.cat_id)) + 1;
  categoryData.categories.push({
    cat_id: newId,
    name: newCategory,
  });
  saveToLocalStorage('categoryData', categoryData);
  return newId;
};

export const updateCategory = (catId, newName) => {
  const index = categoryData.categories.findIndex(c => c.cat_id === catId);
  if (index !== -1) {
    categoryData.categories[index].name = newName;
    saveToLocalStorage('categoryData', categoryData);
  }
};
