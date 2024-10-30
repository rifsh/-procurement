import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import useFetchData from '../hook/useSupplier';
import { FaImage, FaTimes } from 'react-icons/fa';
import handleFileUpload from '../utils/handleFileUpload';
import api from '../api/axiosInterceptor';
import ListItems from '../components/ListItems';

const CreateItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '',
        sockeUnit: 'Unit',
        unitPrice: '',
        itemImages: [],
        status: 'Enabled',
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [isOpen,setIsOpen]=useState(true)
    const { data, isLoading, isError } = useFetchData();
    console.log(data, 'data');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            itemImages: [...prev.itemImages, ...files]
        }));


        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        const updatedFiles = formData.itemImages.filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);
        setFormData({ ...formData, itemImages: updatedFiles });
    };


   
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadedImageUrls = await Promise.all(
                formData.itemImages.map(file => handleFileUpload(file))
            );

            const formDataToSend = {
                ...formData,
                itemImages: uploadedImageUrls,
            };

            const response = await api.post('/items', formDataToSend);
            console.log('Item created successfully:', response.data);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };
    return (
        <div className='h-screen flex overflow-hidden w-full'>
            <div>
                <Sidebar />
            </div>
            <div className='w-full overflow-y-auto'>
                {isOpen?<ListItems setIsOpen={setIsOpen}/>:(
                <div className="p-6 bg-white rounded-lg shadow-lg mt-8">
                    <div className='flex justify-between items-center '>
                    <h2 className="text-2xl font-bold mb-6 text-secondary">Add New Item</h2>
                    <button className='bg-secondary p-3 rounded-xl text-white' onClick={()=>setIsOpen(true)}> Show Items</button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Item Name */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                value={formData.itemName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Inventory Location */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Inventory Location</label>
                            <input
                                type="text"
                                name="inventoryLocation"
                                value={formData.inventoryLocation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Supplier */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Supplier</label>
                            <select
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            >
                                <option value="">Select a Supplier</option>
                                {isLoading && <option>Loading...</option>}
                                {isError && <option>Error loading suppliers</option>}
                                {data && data.map(supplier => (
                                    <option className='text-black' key={supplier._id} value={supplier._id}>
                                        {supplier.supplierName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Socke Unit */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Unit of Measure</label>
                            <select
                                name="sockeUnit"
                                value={formData.sockeUnit}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            >
                                <option value="Unit">Unit</option>
                                <option value="Kg">Kg</option>
                                <option value="Litre">Litre</option>
                            </select>
                        </div>

                        {/* Unit Price */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Unit Price</label>
                            <input
                                type="number"
                                name="unitPrice"
                                value={formData.unitPrice}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Item Images */}
                        <div>
                        <label className="flex items-center font-semibold text-black mb-1">
                                <FaImage className="mr-2 text-gray-600" />
                                Item Images
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="itemImages"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    id="file-upload"
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('file-upload').click()}
                                    className="px-4 py-2 bg-primary hover:text-white rounded-lg font-semibold hover:bg-secondary"
                                >
                                    Upload Images
                                </button>
                                </div>
                            {/* Image Preview */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative">
                                        <img src={src} alt="Preview" className="w-20 h-20 object-cover rounded" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                                        >
                                            <FaTimes /> 
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block font-semibold text-black mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full py-2 bg-primary text-black hover:text-white rounded-lg font-semibold hover:bg-secondary">
                            Add Item
                        </button>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
};

export default CreateItem;
