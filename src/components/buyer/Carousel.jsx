import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const Data = [
    { id: 1, title: "Cake 1", details: "Delicious chocolate cake." },
    { id: 2, title: "Cake 2", details: "Rich vanilla sponge cake." },
    {
      id: 3,
      title: "Cake 3",
      details: "Moist red velvet cake with cream cheese.",
    },
    { id: 4, title: "Cake 4", details: "Fresh fruit tart with custard." },
    {
      id: 5,
      title: "Cake 5",
      details: "Classic cheesecake topped with berries.",
    },
    {
      id: 6,
      title: "Cake 6",
      details: "Lemon drizzle cake with a zesty glaze.",
    },
    { id: 7, title: "Cake 7", details: "Decadent chocolate fudge cake." },
    {
      id: 8,
      title: "Cake 8",
      details: "Carrot cake with cream cheese frosting.",
    },
  ];

  useEffect(() => {
    setItems(Data);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(items.length / itemsPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(items.length / itemsPerPage)) %
        Math.ceil(items.length / itemsPerPage)
    );
  };

  // Calculate the displayed items based on the current index
  const displayedItems = items.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="relative px-10">
      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="bg-primary px-5 py-3 text-white rounded-full"
        >
          ❮
        </button>
        <div className="overflow-hidden w-full">
          <div className={`flex transition-transform duration-500 ease-in-out`}>
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[200px]"
              >
                <div className="font-bold">{item.title}</div>
                <div>{item.details}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="bg-primary px-5 py-3 text-white rounded-full"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
