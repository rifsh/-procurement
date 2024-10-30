import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ItemCard = ({ item, onDelete, onEdit }) => {
    const [hoveredImage, setHoveredImage] = useState(item.itemImages[0]);
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap gap-2 mb-4">
                <img
                    src={hoveredImage}
                    alt={item.itemName}
                    className="w-full h-48 object-cover rounded mb-4 transition-transform transform hover:scale-105"
                />
                
                {/* Thumbnail images for hover effect */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {item.itemImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${item.itemName} thumbnail ${index + 1}`}
                            className="w-16 h-16 object-cover rounded cursor-pointer"
                            onMouseEnter={() => setHoveredImage(img)} 
                        />
                    ))}
                </div>
                </div>

                <h3 className="text-lg font-semibold text-secondary">{item.itemName}</h3>
                <p className="text-gray-600">Brand: {item.brand}</p>
                <p className="text-gray-600">Location: {item.inventoryLocation}</p>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-gray-600">Supplier: {item.supplier}</p>
                <p className="text-gray-600">Unit: {item.sockeUnit}</p>
                <p className="text-gray-600">Price: ${item.unitPrice}</p>
                <p className={`text-${item.status === 'Enabled' ? 'green' : 'red'}-600`}>
                    Status: {item.status}
                </p>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                    onClick={() => onEdit(item)}
                >
                    <FaEdit /> Edit
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => onDelete(item._id)}
                >
                    <FaTrash /> Delete
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
