import React from 'react';

const SweetCard = ({ sweet, onPurchase, onDelete, isAdmin }) => {
  const disabled = !sweet.quantity || sweet.quantity <= 0;

  return (
    <div className="border rounded p-3 w-full bg-white shadow-sm">
      <img src={sweet.image || '/default-sweet.png'} alt={sweet.name} className="w-full h-28 sm:h-36 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lg truncate">{sweet.name}</h3>
      <div className="text-sm text-gray-600 truncate">Category: {sweet.category}</div>
      <p className="text-sm text-gray-700 mt-1 max-h-14 overflow-hidden">{sweet.description || 'No description provided.'}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
        <div className="font-medium">₹{typeof sweet.price === 'number' ? sweet.price.toFixed(2) : sweet.price}</div>
        <div className="text-gray-600">Qty: {sweet.quantity}</div>
      </div>
      <div className="mt-3 flex items-center">
        <button onClick={() => onPurchase(sweet)} disabled={disabled} className={`px-3 py-1 rounded ${disabled ? 'bg-gray-300 text-gray-600' : 'bg-green-600 text-white'}`}>
          Purchase
        </button>
        {isAdmin && (
          <>
            
            <button className="ml-2 px-2 py-1 border rounded" onClick={() => onDelete(sweet)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
