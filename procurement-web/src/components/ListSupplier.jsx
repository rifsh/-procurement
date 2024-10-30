import React, { useEffect, useState } from 'react'
import api from '../api/axiosInterceptor';
import SupplierCard from './SupplierCard';

const ListSupplier = ({setIsOpen}) => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await api.get('/supplier'); 
                setSuppliers(response.data.data); 
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch suppliers.');
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) return <p>Loading suppliers...</p>;
    if (error) return <p>{error}</p>;
  return (
    <div>
        <div className="w-full flex justify-between items-center  p-4  px-15">
    <h2 className="text-2xl font-bold text-secondary">Supplier List</h2>
    <button className="bg-secondary p-3 rounded-xl text-white hover:bg-secondary-dark transition-colors" onClick={() => setIsOpen(false)}>
        Create Item
    </button>
</div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
            {suppliers?.map((supplier) => (
                <SupplierCard key={supplier.supplierNo} supplier={supplier} />
            ))}
        </div>
    </div>
  )
}

export default ListSupplier