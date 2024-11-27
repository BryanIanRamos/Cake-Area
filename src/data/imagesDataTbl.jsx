import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";
import CakeSample from "../assets/CakeSample.png";
import sampleBG from "../assets/Cake_BG.png";

export let imagesData = loadFromLocalStorage("imagesData", {
  images: [
    // Product 1
    {
      image_id: 1,
      link: "../../public/assets/ClassicVanillaCelebrationCakev3.jpg",
      prod_id: 1,
    },
    {
      image_id: 2,
      link: "../../public/assets/ClassicVanillaCelebrationCakev2.jpg",
      prod_id: 1,
    },
    {
      image_id: 3,
      link: "../../public/assets/ClassicVanillaCelebrationCakev1.jpg",
      prod_id: 1,
    },

    // Product 2
    {
      image_id: 4,
      link: "../../public/assets/ChocolateDreamLayerCakev1.jpg",
      prod_id: 2,
    },
    {
      image_id: 5,
      link: "../../public/assets/ChocolateDreamLayerCakev2.jpg",
      prod_id: 2,
    },
    {
      image_id: 6,
      link: "../../public/assets/ChocolateDreamLayerCakev3.jpg",
      prod_id: 2,
    },

    // Product 3
    {
      image_id: 7,
      link: "../../public/assets/RedVelvetWeddingCakev1.jpg",
      prod_id: 3,
    },
    {
      image_id: 8,
      link: "../../public/assets/RedVelvetWeddingCakev2.jpg",
      prod_id: 3,
    },
    {
      image_id: 9,
      link: "../../public/assets/RedVelvetWeddingCakev3.jpg",
      prod_id: 3,
    },

    // Product 4
    {
      image_id: 10,
      link: "../../public/assets/LemonBlueberryLayerCakev1.jpg",
      prod_id: 4,
    },
    {
      image_id: 11,
      link: "../../public/assets/LemonBlueberryLayerCakev2.jpg",
      prod_id: 4,
    },
    {
      image_id: 12,
      link: "../../public/assets/LemonBlueberryLayerCakev3.jpg",
      prod_id: 4,
    },

    // Product 5
    {
      image_id: 13,
      link: "../../public/assets/CarrotSpiceCakev1.jpg",
      prod_id: 5,
    },
    {
      image_id: 14,
      link: "../../public/assets/CarrotSpiceCakev2.jpg",
      prod_id: 5,
    },
    {
      image_id: 15,
      link: "../../public/assets/CarrotSpiceCakev3.jpg",
      prod_id: 5,
    },

    // Product 6
    {
      image_id: 16,
      link: "../../public/assets/StrawberryShortcakeClassicv1.jpg",
      prod_id: 6,
    },
    {
      image_id: 17,
      link: "../../public/assets/StrawberryShortcakeClassicv2.jpg",
      prod_id: 6,
    },
    {
      image_id: 18,
      link: "../../public/assets/StrawberryShortcakeClassicv3.jpg",
      prod_id: 6,
    },

    // Product 7
    {
      image_id: 19,
      link: "../../public/assets/ClassicTiramisuv1.jpg",
      prod_id: 7,
    },
    {
      image_id: 20,
      link: "../../public/assets/ClassicTiramisuv2.jpg",
      prod_id: 7,
    },
    {
      image_id:21,
      link: "../../public/assets/ClassicTiramisuv3.jpg",
      prod_id: 7,
    },

    // Product 8
    {
      image_id: 22,
      link: "../../public/assets/BlackForestCakev1.jpg",
      prod_id: 8,
    },
    {
      image_id: 23,
      link: "../../public/assets/BlackForestCakev2.jpg",
      prod_id: 8,
    },
    {
      image_id: 24,
      link: "../../public/assets/BlackForestCakev3.jpg",
      prod_id: 8,
    },

    // Product 9
    {
      image_id: 25,
      link: "../../public/assets/CoconutLayerCakev1.jpg",
      prod_id: 9,
    },
    {
      image_id: 26,
      link: "../../public/assets/CoconutLayerCakev2.jpg",
      prod_id: 9,
    },
    {
      image_id: 27,
      link: "../../public/assets/CoconutLayerCakev3.jpg",
      prod_id: 9,
    },

    // Product 10
    {
      image_id: 28,
      link: "../../public/assets/ClassicCheesecakev1.jpg",
      prod_id: 10,
    },
    {
      image_id: 29,
      link: "../../public/assets/ClassicCheesecakev2.jpg",
      prod_id: 10,
    },
    {
      image_id: 30,
      link: "../../public/assets/ClassicCheesecakev3.jpg",
      prod_id: 10,
    },

    // Product 11
    {
      image_id: 31,
      link: "../../public/assets/ArtisanalBananaBreadv1.jpg",
      prod_id: 11,
    },
    {
      image_id: 32,
      link: "../../public/assets/ArtisanalBananaBreadv2.jpg",
      prod_id: 11,
    },
    {
      image_id: 33,
      link: "../../public/assets/ArtisanalBananaBreadv3.jpg",
      prod_id: 11,
    },

    // Product 12
    {
      image_id: 34,
      link: "../../public/assets/ClassicChocolateChipCookiesv1.jpg",
      prod_id: 12,
    },
    {
      image_id: 35,
      link: "../../public/assets/ClassicChocolateChipCookiesv2.jpeg",
      prod_id: 12,
    },
    {
      image_id: 36,
      link: "../../public/assets/ClassicChocolateChipCookiesv3.jpg",
      prod_id: 12,
    },

    // Product 13
    {
      image_id: 37,
      link: "../../public/assets/MixedBerryDanishv1.jpg",
      prod_id: 13,
    },
    {
      image_id: 38,
      link: "../../public/assets/MixedBerryDanishv2.jpg",
      prod_id: 13,
    },
    {
      image_id: 39,
      link: "../../public/assets/MixedBerryDanishv3.jpg",
      prod_id: 13,
    },

    // Product 14
    {
      image_id: 40,
      link: "../../public/assets/GlazedCinnamonRollsv1.jpg",
      prod_id: 14,
    },
    {
      image_id: 41,
      link: "../../public/assets/GlazedCinnamonRollsv2.jpg",
      prod_id: 14,
    },
    {
      image_id: 42,
      link: "../../public/assets/GlazedCinnamonRollsv3.jpg",
      prod_id: 14,
    },

    // Product 15
    {
      image_id: 43,
      link: "../../public/assets/ClassicApplePiev2.jpg",
      prod_id: 15,
    },
    {
      image_id: 44,
      link: "../../public/assets/ClassicApplePiev1.jpg",
      prod_id: 15,
    },
    {
      image_id: 45,
      link: "../../public/assets/ClassicApplePiev3.jpg",
      prod_id: 15,
    },

    // Product 16
    {
      image_id: 46,
      link: "../../public/assets/TraditionalSourdoughBreadv1.jpg",
      prod_id: 16,
    },
    {
      image_id: 47,
      link: "../../public/assets/TraditionalSourdoughBreadv2.jpg",
      prod_id: 16,
    },
    {
      image_id: 48,
      link: "../../public/assets/TraditionalSourdoughBreadv3.jpg",
      prod_id: 16,
    },

    // Continue this pattern for products 3-17
    // Each product gets 3 sequential image_ids

    // Product 17
    {
      image_id: 49,
      link: "../../public/assets/FrenchBaguettev1.jpg",
      prod_id: 17,
    },
    {
      image_id: 50,
      link: "../../public/assets/FrenchBaguettev2.jpg",
      prod_id: 17,
    },
    {
      image_id: 51,
      link: "../../public/assets/FrenchBaguettev3.jpg",
      prod_id: 17,
    },

    // Product 18
    {
      image_id: 52,
      link: "../../public/assets/ButterCroissantv1.jpg",
      prod_id: 18,
    },
    {
      image_id: 53,
      link: "../../public/assets/ButterCroissantv2.jpg",
      prod_id: 18,
    },
    {
      image_id: 54,
      link: "../../public/assets/ButterCroissantv3.jpg",
      prod_id: 18,
    },

    // Product 19
    {
      image_id: 55,
      link: "../../public/assets/MultigrainWheatBreadv1.jpg",
      prod_id: 19,
    },
    {
      image_id: 56,
      link: "../../public/assets/MultigrainWheatBreadv2.jpg",
      prod_id: 19,
    },
    {
      image_id: 57,
      link: "../../public/assets/MultigrainWheatBreadv3.jpg",
      prod_id: 19,
    },

    // Product 20
    {
      image_id: 58,
      link: "../../public/assets/ClassicRyeBreadv1.jpg",
      prod_id: 20,
    },
    {
      image_id: 59,
      link: "../../public/assets/ClassicRyeBreadv2.jpg",
      prod_id: 20,
    },
    {
      image_id: 60,
      link: "../../public/assets/ClassicRyeBreadv3.jpg",
      prod_id: 20,
    },

    // Product 21
    {
      image_id: 61,
      link: "../../public/assets/ItalianCiabattav1.jpg",
      prod_id: 21,
    },
    {
      image_id: 62,
      link: "../../public/assets/ItalianCiabattav2.jpg",
      prod_id: 21,
    },
    {
      image_id: 63,
      link: "../../public/assets/ItalianCiabattav3.jpg",
      prod_id: 21,
    },

    // Product 22
    {
      image_id: 64,
      link: "../../public/assets/ChocolateChipMuffinsv1.jpg",
      prod_id: 22,
    },
    {
      image_id: 65,
      link: "../../public/assets/ChocolateChipMuffinsv2.jpg",
      prod_id: 22,
    },
    {
      image_id: 66,
      link: "../../public/assets/ChocolateChipMuffinsv3.jpg",
      prod_id: 22,
    },

    // Product 23
    {
      image_id: 67,
      link: "../../public/assets/ArtisanalFocacciav1.jpg",
      prod_id: 23,
    },
    {
      image_id: 68,
      link: "../../public/assets/ArtisanalFocacciav2.jpg",
      prod_id: 23,
    },
    {
      image_id: 69,
      link: "../../public/assets/ArtisanalFocacciav3.jpg",
      prod_id: 23,
    },

    // Product 24
    {
      image_id: 70,
      link: "../../public/assets/ClassicBriochev1.jpg",
      prod_id: 24,
    },
    {
      image_id: 71,
      link: "../../public/assets/ClassicBriochev2.jpg",
      prod_id: 24,
    },
    {
      image_id: 72,
      link: "../../public/assets/ClassicBriochev3.jpg",
      prod_id: 24,
    },

    // Product 25
    {
      image_id: 73,
      link: "../../public/assets/RusticCountryLoafv1.jpg",
      prod_id: 25,
    },
    {
      image_id: 74,
      link: "../../public/assets/RusticCountryLoafv2.jpg",
      prod_id: 25,
    },
    {
      image_id: 75,
      link: "../../public/assets/RusticCountryLoafv3.jpg",
      prod_id: 25,
    },

    // Product 26
    {
      image_id: 76,
      link: "../../public/assets/ChocolateBabkav1.jpg",
      prod_id: 26,
    },
    {
      image_id: 77,
      link: "../../public/assets/ChocolateBabkav2.jpg",
      prod_id: 26,
    },
    {
      image_id: 78,
      link: "../../public/assets/ChocolateBabkav3.jpg",
      prod_id: 26,
    },

    // Product 27
    {
      image_id: 79,
      link: "../../public/assets/GarlicKnotsv1.jpg",
      prod_id: 27,
    },
    {
      image_id: 80,
      link: "../../public/assets/GarlicKnotsv2.jpg",
      prod_id: 27,
    },
    {
      image_id: 81,
      link: "../../public/assets/GarlicKnotsv3.jpg",
      prod_id: 27,
    },

    // Product 28
    {
      image_id: 82,
      link: "../../public/assets/PretzelRollsv1.jpg",
      prod_id: 28,
    },
    {
      image_id: 83,
      link: "../../public/assets/PretzelRollsv2.jpg",
      prod_id: 28,
    },
    {
      image_id: 84,
      link: "../../public/assets/PretzelRollsv3.jpg",
      prod_id: 28,
    },

    // Product 29
    {
      image_id: 85,
      link: "../../public/assets/ClassicFrenchCroissantv1.jpg",
      prod_id: 29,
    },
    {
      image_id: 86,
      link: "../../public/assets/ClassicFrenchCroissantv2.jpg",
      prod_id: 29,
    },
    {
      image_id: 87,
      link: "../../public/assets/ClassicFrenchCroissantv3.jpg",
      prod_id: 29,
    },

    // Product 30
    {
      image_id: 88,
      link: "../../public/assets/PainauChocolatv1.jpg",
      prod_id: 30,
    },
    {
      image_id: 89,
      link: "../../public/assets/PainauChocolatv2.jpg",
      prod_id: 30,
    },
    {
      image_id: 90,
      link: "../../public/assets/PainauChocolatv3.jpg",
      prod_id: 30,
    },

    // Product 31
    {
      image_id: 91,
      link: "../../public/assets/FruitDanishPastryv1.jpg",
      prod_id: 31,
    },
    {
      image_id: 92,
      link: "../../public/assets/FruitDanishPastryv2.jpg",
      prod_id: 31,
    },
    {
      image_id: 93,
      link: "../../public/assets/FruitDanishPastryv3.jpg",
      prod_id: 31,
    },

    // Product 32
    {
      image_id: 94,
      link: "../../public/assets/FreshFruitTartv1.jpg",
      prod_id: 32,
    },
    {
      image_id: 95,
      link: "../../public/assets/FreshFruitTartv2.jpg",
      prod_id: 32,
    },
    {
      image_id: 96,
      link: "../../public/assets/FreshFruitTartv3.jpg",
      prod_id: 32,
    },

    // Product 33
    {
      image_id: 97,
      link: "../../public/assets/ChocolateMousseCakev1.jpg",
      prod_id: 33,
    },
    {
      image_id: 98,
      link: "../../public/assets/ChocolateMousseCakev2.jpg",
      prod_id: 33,
    },
    {
      image_id: 99,
      link: "../../public/assets/ChocolateMousseCakev3.jpg",
      prod_id: 33,
    },

    // Product 34
    {
      image_id: 100,
      link: "../../public/assets/ClassicCreamPuffv1.jpg",
      prod_id: 34,
    },
    {
      image_id: 101,
      link: "../../public/assets/ClassicCreamPuffv2.jpg",
      prod_id: 34,
    },
    {
      image_id: 102,
      link: "../../public/assets/ClassicCreamPuffv3.jpg",
      prod_id: 34,
    },

    // Product 35
    {
      image_id: 103,
      link: "../../public/assets/AlmondCroissantv1.jpg",
      prod_id: 35,
    },
    {
      image_id: 104,
      link: "../../public/assets/AlmondCroissantv2.jpg",
      prod_id: 35,
    },
    {
      image_id: 105,
      link: "../../public/assets/AlmondCroissantv3.jpg",
      prod_id: 35,
    },

    // Product 36
    {
      image_id: 106,
      link: "../../public/assets/LemonMeringueTartv1.jpg",
      prod_id: 36,
    },
    {
      image_id: 107,
      link: "../../public/assets/LemonMeringueTartv2.jpg",
      prod_id: 36,
    },
    {
      image_id: 108,
      link: "../../public/assets/LemonMeringueTartv3.jpg",
      prod_id: 36,
    },

    // Product 37
    {
      image_id: 109,
      link: "../../public/assets/ChocolateTruffleTartv1.jpg",
      prod_id: 37,
    },
    {
      image_id: 110,
      link: "../../public/assets/ChocolateTruffleTartv2.jpg",
      prod_id: 37,
    },
    {
      image_id: 111,
      link: "../../public/assets/ChocolateTruffleTartv3.jpg",
      prod_id: 37,
    },

    // Product 38
    {
      image_id: 112,
      link: "../../public/assets/ClassicPalmierv1.jpg",
      prod_id: 38,
    },
    {
      image_id: 113,
      link: "../../public/assets/ClassicPalmierv2.jpg",
      prod_id: 38,
    },
    {
      image_id: 114,
      link: "../../public/assets/ClassicPalmierv3.jpg",
      prod_id: 38,
    },

    // Product 39
    {
      image_id: 115,
      link: "../../public/assets/ClassicMille-feuillev1.jpg",
      prod_id: 39,
    },
    {
      image_id: 116,
      link: "../../public/assets/ClassicMille-feuillev2.jpg",
      prod_id: 39,
    },
    {
      image_id: 117,
      link: "../../public/assets/ClassicMille-feuillev3.jpg",
      prod_id: 39,
    },

    // Product 40
    {
      image_id: 118,
      link: "../../public/assets/FrenchMacaronsv1.jpg",
      prod_id: 40,
    },
    {
      image_id: 119,
      link: "../../public/assets/FrenchMacaronsv2.jpg",
      prod_id: 40,
    },
    {
      image_id: 120,
      link: "../../public/assets/FrenchMacaronsv3.jpg",
      prod_id: 40,
    },

    // Product 41
    {
      image_id: 121,
      link: "../../public/assets/MixedFruitDanishv3.jpg",
      prod_id: 41,
    },
    {
      image_id: 122,
      link: "../../public/assets/MixedFruitDanishv2.jpg",
      prod_id: 41,
    },
    {
      image_id: 123,
      link: "../../public/assets/MixedFruitDanishv1.jpg",
      prod_id: 41,
    },

    // Product 42
    {
      image_id: 124,
      link: "../../public/assets/ChocolateProfiterolesv1.jpg",
      prod_id: 42,
    },
    {
      image_id: 125,
      link: "../../public/assets/ChocolateProfiterolesv2.jpg",
      prod_id: 42,
    },
    {
      image_id: 126,
      link: "../../public/assets/ChocolateProfiterolesv3.jpg",
      prod_id: 42,
    },

    // Product 43
    {
      image_id: 127,
      link: "../../public/assets/TraditionalBaklavav3.jpg",
      prod_id: 43,
    },
    {
      image_id: 128,
      link: "../../public/assets/TraditionalBaklavav2.png",
      prod_id: 43,
    },
    {
      image_id: 129,
      link: "../../public/assets/TraditionalBaklavav1.jpg",
      prod_id: 43,
    },

    // Product 44
    {
      image_id: 130,
      link: "../../public/assets/SicilianCannoliv1.jpg",
      prod_id: 44,
    },
    {
      image_id: 131,
      link: "../../public/assets/SicilianCannoliv2.jpg",
      prod_id: 44,
    },
    {
      image_id: 132,
      link: "../../public/assets/SicilianCannoliv3.jpg",
      prod_id: 44,
    },

    // Product 45
    {
      image_id: 133,
      link: "../../public/assets/OperaCakev1.jpg",
      prod_id: 45,
    },
    {
      image_id: 134,
      link: "../../public/assets/OperaCakev2.jpg",
      prod_id: 45,
    },
    {
      image_id: 135,
      link: "../../public/assets/OperaCakev3.jpg",
      prod_id: 45,
    },

    // Product 46
    {
      image_id: 136,
      link: "../../public/assets/ClassicParis-Brestv1.jpg",
      prod_id: 46,
    },
    {
      image_id: 137,
      link: "../../public/assets/ClassicParis-Brestv2.jpg",
      prod_id: 46,
    },
    {
      image_id: 138,
      link: "../../public/assets/ClassicParis-Brestv3.jpg",
      prod_id: 46,
    },

    // Product 47
    {
      image_id: 139,
      link: "../../public/assets/ClassicReligieusev1.jpg",
      prod_id: 47,
    },
    {
      image_id: 140,
      link: "../../public/assets/ClassicReligieusev2.jpg",
      prod_id: 47,
    },
    {
      image_id: 141,
      link: "../../public/assets/ClassicReligieusev3.jpg",
      prod_id: 47,
    },
  ],
});

export const updateImages = (productId, newImages) => {
  // Remove existing images
  imagesData.images = imagesData.images.filter(
    (img) => img.prod_id !== productId
  );

  // Add new images
  const lastId = Math.max(...imagesData.images.map((img) => img.image_id), 0);
  const newEntries = newImages.map((image, index) => ({
    image_id: lastId + index + 1,
    link: image.link || URL.createObjectURL(image),
    prod_id: productId,
  }));

  imagesData.images.push(...newEntries);
  saveToLocalStorage("imagesData", imagesData);
  return newEntries;
};
