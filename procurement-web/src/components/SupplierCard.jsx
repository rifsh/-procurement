import React from 'react';

const SupplierCard = ({ supplier }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-secondary mb-2">{supplier.supplierName}</h3>
            <p className="text-gray-600 mb-1">
                <strong>Address:</strong> {supplier.address.fristLine}, {supplier.address.secountLine || 'N/A'}, {supplier.address.pinCode}
            </p>
            <p className="text-gray-600 mb-1">
                <strong>Mobile:</strong> {supplier.mobileNumber}
            </p>
            <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {supplier.email}
            </p>
            <p className={`text-sm font-semibold ${supplier.status === 'Active' ? 'text-green-500' : supplier.status === 'Inactive' ? 'text-yellow-500' : 'text-red-500'}`}>
                Status: {supplier.status}
            </p>
            <button className="mt-4 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary-dark transition-colors">
                View Details
            </button>
        </div>
    );
};

export default SupplierCard;
