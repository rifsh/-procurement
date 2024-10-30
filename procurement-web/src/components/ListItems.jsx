import React, { useEffect, useState } from 'react'
import api from '../api/axiosInterceptor';
import ItemCard from './ItemCard';

const ListItems = ({setIsOpen}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get('/items');
                setItems(response.data.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);
console.log(items)
    const handleDelete = async (id) => {
        try {
            await api.delete(`/items/${id}`);
            setItems(items.filter(item => item._id !== id)); // Update state to remove deleted item
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        // Implement your edit logic here, maybe redirect to an edit page or open a modal
        console.log('Edit item:', item);
    };
  return (
    <div className="p-6 bg-gray-100">
        <div className="w-full flex justify-between items-center  p-4">
    <h2 className="text-2xl font-bold text-secondary">Items List</h2>
    <button className="bg-secondary p-3 rounded-xl text-white hover:bg-secondary-dark transition-colors" onClick={() => setIsOpen(false)}>
        Create Item
    </button>
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                    <ItemCard key={item._id} item={item} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>
        </div>
  )
}

export default ListItems