import React from 'react';

const SweetCard = ({ sweet, onPurchase, onDelete, isAdmin }) => {
  const disabled = !sweet.quantity || sweet.quantity <= 0;

  return (
    <div className="border rounded p-3 w-60 bg-white shadow-sm">
      <img src={sweet.image || '/default-sweet.png'} alt={sweet.name} className="w-full h-36 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lg">{sweet.name}</h3>
      <div className="text-sm text-gray-600">Category: {sweet.category}</div>
      <div className="text-sm text-gray-600">Price: {sweet.price}</div>
      <div className="text-sm text-gray-600">Qty: {sweet.quantity}</div>
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
