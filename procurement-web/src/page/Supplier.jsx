import React, { useState } from 'react'
import Sidebar from '../components/SideBar'
import CountryDropdown from '../components/CountryDropdown';
import axios from 'axios';
import api from '../api/axiosInterceptor';
import ListSupplier from '../components/ListSupplier';

const CreateSupplier = () => {
    const [formData, setFormData] = useState({
        supplierName: '',
        address: {
          fristLine: '',
          secountLine: '',
          pinCode: '',
        },
        taxNo: '',
        country: '',
        mobileNumber: '',
        email: '',
        status: 'Active', 
      });
    const [isOpen,setIsOpen]=useState(false)
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
          const [parent, child] = name.split('.');
          setFormData((prev) => ({
            ...prev,
            [parent]: { ...prev[parent], [child]: value },
          }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleCountryChange = (country) => {
        setFormData((prev) => ({ ...prev, country }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await api.post('/supplier', formData);
          alert('Supplier added successfully!');
        } catch (error) {
          console.error('Failed to add supplier:', error);
        }
      };
  return (
    <div className='h-screen w-full overflow-hidden flex'>
        <div>
            <Sidebar/>
        </div>
        <div className='w-full h-full overflow-y-auto'>
          {isOpen?<ListSupplier setIsOpen={setIsOpen}/>:(
        <div className=" p-6 bg-white shadow-lg rounded-lg">
          <div className="w-full flex justify-between items-center  p-4">
    <h2 className="text-2xl font-bold text-secondary">Add Supplier</h2>
    <button className="bg-secondary p-3 rounded-xl text-white hover:bg-secondary-dark transition-colors" onClick={() => setIsOpen(true)}>
        Show Suppliers
    </button>
</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block  font-semibold mb-2">Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <div>
          <label className="block  font-semibold mb-2">Address - First Line</label>
          <input
            type="text"
            name="address.fristLine"
            value={formData.address.fristLine}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <div>
          <label className="block  font-semibold mb-2">Address - Second Line</label>
          <input
            type="text"
            name="address.secountLine"
            value={formData.address.secountLine}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div>
          <label className="block  font-semibold mb-2">Pin Code</label>
          <input
            type="number"
            name="address.pinCode"
            value={formData.address.pinCode}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <div>
          <label className="block  font-semibold mb-2">Tax Number</label>
          <input
            type="number"
            name="taxNo"
            value={formData.taxNo}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <CountryDropdown selectedCountry={formData.country} onSelectCountry={handleCountryChange} />
        <div>
          <label className="block  font-semibold mb-2">Mobile Number</label>
          <input
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <div>
          <label className="block  font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <div>
          <label className="block  font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-black hover:text-white font-bold rounded hover:bg-secondary transition-colors"
        >
          Add Supplier
        </button>
      </form>
    </div>
    )}
        </div>
    </div>
  )
}

export default CreateSupplier