import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';
import CakeSample from "../assets/CakeSample.png";
import sampleBG from "../assets/Cake_BG.png";

export let imagesData = loadFromLocalStorage('imagesData', {
  images: [
    // Product 1
    {
      image_id: 1,
      link: CakeSample,
      prod_id: 1,
    },
    {
      image_id: 2,
      link: CakeSample,
      prod_id: 1,
    },
    {
      image_id: 3,
      link: CakeSample,
      prod_id: 1,
    },

    // Product 2
    {
      image_id: 4,
      link: CakeSample,
      prod_id: 2,
    },
    {
      image_id: 5,
      link: CakeSample,
      prod_id: 2,
    },
    {
      image_id: 6,
      link: CakeSample,
      prod_id: 2,
    },

    // Continue this pattern for products 3-17
    // Each product gets 3 sequential image_ids

    // Product 17
    {
      image_id: 49,
      link: CakeSample,
      prod_id: 17,
    },
    {
      image_id: 50,
      link: CakeSample,
      prod_id: 17,
    },
    {
      image_id: 51,
      link: CakeSample,
      prod_id: 17,
    },

    // Product 18
    {
      image_id: 52,
      link: CakeSample,
      prod_id: 18,
    },
    {
      image_id: 53,
      link: CakeSample,
      prod_id: 18,
    },
    {
      image_id: 54,
      link: CakeSample,
      prod_id: 18,
    },

    // Product 19
    {
      image_id: 55,
      link: CakeSample,
      prod_id: 19,
    },
    {
      image_id: 56,
      link: CakeSample,
      prod_id: 19,
    },
    {
      image_id: 57,
      link: CakeSample,
      prod_id: 19,
    },

    // Product 20
    {
      image_id: 58,
      link: CakeSample,
      prod_id: 20,
    },
    {
      image_id: 59,
      link: CakeSample,
      prod_id: 20,
    },
    {
      image_id: 60,
      link: CakeSample,
      prod_id: 20,
    },

    // Product 21
    {
      image_id: 61,
      link: CakeSample,
      prod_id: 21,
    },
    {
      image_id: 62,
      link: CakeSample,
      prod_id: 21,
    },
    {
      image_id: 63,
      link: CakeSample,
      prod_id: 21,
    },

    // Product 22
    {
      image_id: 64,
      link: CakeSample,
      prod_id: 22,
    },
    {
      image_id: 65,
      link: CakeSample,
      prod_id: 22,
    },
    {
      image_id: 66,
      link: CakeSample,
      prod_id: 22,
    },

    // Product 23
    {
      image_id: 67,
      link: CakeSample,
      prod_id: 23,
    },
    {
      image_id: 68,
      link: CakeSample,
      prod_id: 23,
    },
    {
      image_id: 69,
      link: CakeSample,
      prod_id: 23,
    },

    // Product 24
    {
      image_id: 70,
      link: CakeSample,
      prod_id: 24,
    },
    {
      image_id: 71,
      link: CakeSample,
      prod_id: 24,
    },
    {
      image_id: 72,
      link: CakeSample,
      prod_id: 24,
    },

    // Product 25
    {
      image_id: 73,
      link: CakeSample,
      prod_id: 25,
    },
    {
      image_id: 74,
      link: CakeSample,
      prod_id: 25,
    },
    {
      image_id: 75,
      link: CakeSample,
      prod_id: 25,
    },

    // Product 26
    {
      image_id: 76,
      link: CakeSample,
      prod_id: 26,
    },
    {
      image_id: 77,
      link: CakeSample,
      prod_id: 26,
    },
    {
      image_id: 78,
      link: CakeSample,
      prod_id: 26,
    },

    // Product 27
    {
      image_id: 79,
      link: CakeSample,
      prod_id: 27,
    },
    {
      image_id: 80,
      link: CakeSample,
      prod_id: 27,
    },
    {
      image_id: 81,
      link: CakeSample,
      prod_id: 27,
    },

    // Product 28
    {
      image_id: 82,
      link: CakeSample,
      prod_id: 28,
    },
    {
      image_id: 83,
      link: CakeSample,
      prod_id: 28,
    },
    {
      image_id: 84,
      link: CakeSample,
      prod_id: 28,
    },

    // Product 29
    {
      image_id: 85,
      link: CakeSample,
      prod_id: 29,
    },
    {
      image_id: 86,
      link: CakeSample,
      prod_id: 29,
    },
    {
      image_id: 87,
      link: CakeSample,
      prod_id: 29,
    },

    // Product 30
    {
      image_id: 88,
      link: CakeSample,
      prod_id: 30,
    },
    {
      image_id: 89,
      link: sampleBG,
      prod_id: 30,
    },
    {
      image_id: 90,
      link: CakeSample,
      prod_id: 30,
    },

    // Product 31
    {
      image_id: 91,
      link: CakeSample,
      prod_id: 31,
    },
    {
      image_id: 92,
      link: CakeSample,
      prod_id: 31,
    },
    {
      image_id: 93,
      link: CakeSample,
      prod_id: 31,
    },

    // Product 32
    {
      image_id: 94,
      link: CakeSample,
      prod_id: 32,
    },
    {
      image_id: 95,
      link: CakeSample,
      prod_id: 32,
    },
    {
      image_id: 96,
      link: CakeSample,
      prod_id: 32,
    },

    // Product 33
    {
      image_id: 97,
      link: CakeSample,
      prod_id: 33,
    },
    {
      image_id: 98,
      link: CakeSample,
      prod_id: 33,
    },
    {
      image_id: 99,
      link: CakeSample,
      prod_id: 33,
    },

    // Product 34
    {
      image_id: 100,
      link: CakeSample,
      prod_id: 34,
    },
    {
      image_id: 101,
      link: CakeSample,
      prod_id: 34,
    },
    {
      image_id: 102,
      link: CakeSample,
      prod_id: 34,
    },

    // Product 35
    {
      image_id: 103,
      link: CakeSample,
      prod_id: 35,
    },
    {
      image_id: 104,
      link: CakeSample,
      prod_id: 35,
    },
    {
      image_id: 105,
      link: CakeSample,
      prod_id: 35,
    },

    // Product 36
    {
      image_id: 106,
      link: CakeSample,
      prod_id: 36,
    },
    {
      image_id: 107,
      link: CakeSample,
      prod_id: 36,
    },
    {
      image_id: 108,
      link: CakeSample,
      prod_id: 36,
    },

    // Product 37
    {
      image_id: 109,
      link: CakeSample,
      prod_id: 37,
    },
    {
      image_id: 110,
      link: CakeSample,
      prod_id: 37,
    },
    {
      image_id: 111,
      link: CakeSample,
      prod_id: 37,
    },

    // Product 38
    {
      image_id: 112,
      link: CakeSample,
      prod_id: 38,
    },
    {
      image_id: 113,
      link: CakeSample,
      prod_id: 38,
    },
    {
      image_id: 114,
      link: CakeSample,
      prod_id: 38,
    },

    // Product 39
    {
      image_id: 115,
      link: CakeSample,
      prod_id: 39,
    },
    {
      image_id: 116,
      link: CakeSample,
      prod_id: 39,
    },
    {
      image_id: 117,
      link: CakeSample,
      prod_id: 39,
    },

    // Product 40
    {
      image_id: 118,
      link: CakeSample,
      prod_id: 40,
    },
    {
      image_id: 119,
      link: CakeSample,
      prod_id: 40,
    },
    {
      image_id: 120,
      link: CakeSample,
      prod_id: 40,
    },

    // Product 41
    {
      image_id: 121,
      link: CakeSample,
      prod_id: 41,
    },
    {
      image_id: 122,
      link: CakeSample,
      prod_id: 41,
    },
    {
      image_id: 123,
      link: CakeSample,
      prod_id: 41,
    },

    // Product 42
    {
      image_id: 124,
      link: CakeSample,
      prod_id: 42,
    },
    {
      image_id: 125,
      link: CakeSample,
      prod_id: 42,
    },
    {
      image_id: 126,
      link: CakeSample,
      prod_id: 42,
    },

    // Product 43
    {
      image_id: 127,
      link: CakeSample,
      prod_id: 43,
    },
    {
      image_id: 128,
      link: CakeSample,
      prod_id: 43,
    },
    {
      image_id: 129,
      link: CakeSample,
      prod_id: 43,
    },

    // Product 44
    {
      image_id: 130,
      link: CakeSample,
      prod_id: 44,
    },
    {
      image_id: 131,
      link: CakeSample,
      prod_id: 44,
    },
    {
      image_id: 132,
      link: CakeSample,
      prod_id: 44,
    },

    // Product 45
    {
      image_id: 133,
      link: CakeSample,
      prod_id: 45,
    },
    {
      image_id: 134,
      link: CakeSample,
      prod_id: 45,
    },
    {
      image_id: 135,
      link: CakeSample,
      prod_id: 45,
    },

    // Product 46
    {
      image_id: 136,
      link: CakeSample,
      prod_id: 46,
    },
    {
      image_id: 137,
      link: CakeSample,
      prod_id: 46,
    },
    {
      image_id: 138,
      link: CakeSample,
      prod_id: 46,
    },

    // Product 47
    {
      image_id: 139,
      link: CakeSample,
      prod_id: 47,
    },
    {
      image_id: 140,
      link: CakeSample,
      prod_id: 47,
    },
    {
      image_id: 141,
      link: CakeSample,
      prod_id: 47,
    },
  ],
});

export const updateImages = (productId, newImages) => {
  // Remove existing images
  imagesData.images = imagesData.images.filter(img => img.prod_id !== productId);
  
  // Add new images
  const lastId = Math.max(...imagesData.images.map(img => img.image_id), 0);
  const newEntries = newImages.map((image, index) => ({
    image_id: lastId + index + 1,
    link: image.link || URL.createObjectURL(image),
    prod_id: productId
  }));
  
  imagesData.images.push(...newEntries);
  saveToLocalStorage('imagesData', imagesData);
  return newEntries;
};
