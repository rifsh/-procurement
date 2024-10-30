import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import api from '../api/axiosInterceptor';

const CreatePurchase = () => {
    const [orderDate, setOrderDate] = useState(new Date().toISOString().slice(0, 10));
    const [supplierName, setSupplierName] = useState('');
    const [itemTotal, setItemTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [items, setItems] = useState([]);
    const [purchaseItems, setPurchaseItems] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliersAndItems = async () => {
            try {
                const supplierResponse = await api.get('/supplier');
                setSuppliers(supplierResponse.data.data);
                const itemResponse = await api.get('/items');
                setItems(itemResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSuppliersAndItems();
    }, []);

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...purchaseItems];
        newItems[index][name] = value;
        setPurchaseItems(newItems);
        calculateTotals(newItems);
    };

    const addItem = (item) => {
        setPurchaseItems([...purchaseItems, { ...item, orderQty: 0, discount: 0, itemAmount: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = purchaseItems.filter((_, i) => i !== index);
        setPurchaseItems(newItems);
        calculateTotals(newItems);
    };

    const calculateTotals = (items) => {
        let totalItemAmount = 0;
        let totalDiscount = 0;

        items.forEach(item => {
            const itemAmount = item.orderQty * item.unitPrice;
            const discountAmount = Number(item.discount) || 0;
            totalItemAmount += itemAmount;
            totalDiscount += discountAmount;
            item.itemAmount = itemAmount - discountAmount; 
        });

        setItemTotal(totalItemAmount);
        setDiscount(totalDiscount);
        setNetAmount(totalItemAmount - totalDiscount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const purchaseData = {
                orderDate,
                supplierName,
                itemTotal,
                discount,
                netAmount,
                items: purchaseItems
            };

            await api.post('/purchase', purchaseData);
            alert('Purchase created successfully!');
            resetForm();
        } catch (error) {
            console.error('Error creating purchase:', error);
        }
    };

    const resetForm = () => {
        setOrderDate(new Date().toISOString().slice(0, 10));
        setSupplierName('');
        setItemTotal(0);
        setDiscount(0);
        setNetAmount(0);
        setPurchaseItems([]);
    };

    return (
        <div className='w-full h-screen overflow-hidden flex'>
            <div>
                <Sidebar />
            </div>
            <div className='w-full overflow-y-auto'>
                <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Create Purchase</h2>
                    <div className="mb-4">
                        <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date:</label>
                        <input
                            type="date"
                            id="orderDate"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700">Supplier:</label>
                        <select
                            id="supplierName"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                        >
                            <option value="">Select a supplier</option>
                            {suppliers?.map(supplier => (
                                <option key={supplier._id} value={supplier._id}>{supplier.supplierName}</option>
                            ))}
                        </select>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Items</h3>
                    <select
                        className="mb-4 mt-4 border-gray-300 rounded-md"
                        onChange={(e) => {
                            const selectedItem = items.find(item => item._id === e.target.value);
                            if (selectedItem) {
                                addItem(selectedItem);
                            }
                        }}
                    >
                        <option value="">Select an item to add</option>
                        {items.map(item => (
                            <option key={item._id} value={item._id}>{item.itemName}</option>
                        ))}
                    </select>
                    {purchaseItems.map((item, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md border-gray-200 bg-gray-50">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Item Name:</label>
                                <span>{item.itemName}</span>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Packing Unit:</label>
                                <select
                                    name="packingUnit"
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                >
                                    <option value="">Select Packing Unit</option>
                                    {item.packingUnits?.map((unit, i) => (
                                        <option key={i} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`orderQty_${index}`} className="block text-sm font-medium text-gray-700">Order Quantity:</label>
                                <input
                                    type="number"
                                    name="orderQty"
                                    value={item.orderQty}
                                    onChange={(e) => handleItemChange(index, e)}
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Item Amount:</label>
                                <span>{item.itemAmount.toFixed(2)}</span>
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`discount_${index}`} className="block text-sm font-medium text-gray-700">Discount:</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={item.discount}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Net Amount:</label>
                                <span>{(item.itemAmount - item.discount).toFixed(2)}</span> {/* Display net amount */}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Remove Item
                            </button>
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Item Total:</label>
                        <input
                            type="text"
                            value={itemTotal.toFixed(2)}
                            readOnly
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Discount Total:</label>
                        <input
                            type="text"
                            value={discount.toFixed(2)}
                            readOnly
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Net Amount:</label>
                        <input
                            type="text"
                            value={netAmount.toFixed(2)}
                            readOnly
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Purchase
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePurchase;
