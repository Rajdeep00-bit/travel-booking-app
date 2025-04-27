import React from 'react';

function StayCard({ stay, onBook }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={stay.image} alt={stay.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{stay.name}</h2>
        <p className="text-gray-600">{stay.location}</p>
        <p className="text-blue-500 font-semibold">${stay.price} / night</p>
        <p className="text-gray-700 mt-2">{stay.description}</p>
        <button 
          onClick={() => onBook(stay)} 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default StayCard;
