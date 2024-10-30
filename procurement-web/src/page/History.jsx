import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import api from '../api/axiosInterceptor';
import Sidebar from '../components/SideBar';

const History = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await api.get('/purchase');
                setPurchases(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching purchase data:', error);
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this purchase?')) {
            await api.delete(`/purchase/${id}`);
            setPurchases(purchases.filter(purchase => purchase._id !== id));
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(purchases);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases');
        XLSX.writeFile(workbook, 'Purchases.xlsx');
    };

    const handlePrint = () => {
        const doc = new jsPDF();
        doc.text('Purchase Report', 20, 10);
        purchases.forEach((purchase, index) => {
            doc.text(`Order No: ${purchase.orderNo}, Supplier: ${purchase.supplierName}, Total: ${purchase.itemTotal}`, 20, 20 + (index * 10));
        });
        doc.save('Purchases.pdf');
    };

    return (
        <div className='h-screen flex overflow-hidden w-full'>
        <Sidebar />
        <main className='w-full overflow-y-auto p-6'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Purchase History</h2>
                    {purchases?.length > 0 ? (
                        <>
                            <div className="mb-4 flex w-full justify-end">
                                <button 
                                    onClick={handleExportToExcel} 
                                    className="mr-2 px-4 py-2 bg-secondary text-white rounded" 
                                    aria-label="Export to Excel"
                                >
                                    Export to Excel
                                </button>
                                <button 
                                    onClick={handlePrint} 
                                    className="px-4 py-2 bg-secondary text-white rounded" 
                                    aria-label="Print"
                                >
                                    <FaPrint /> Print
                                </button>
                            </div>
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-primary text-black">
                                        <th className="py-2 px-4 border">Order No</th>
                                        <th className="py-2 px-4 border">Order Date</th>
                                        <th className="py-2 px-4 border">Supplier</th>
                                        <th className="py-2 px-4 border">Total</th>
                                        <th className="py-2 px-4 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map(purchase => (
                                        <tr key={purchase._id} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border">{purchase.orderNo}</td>
                                            <td className="py-2 px-4 border">{new Date(purchase.orderDate).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border">{purchase.supplierName.supplierName}</td>
                                            <td className="py-2 px-4 border">{purchase.itemTotal}</td>
                                            <td className="py-2 px-4 border">
                                                <button 
                                                    className="text-blue-500" 
                                                    onClick={() => console.log('Update', purchase._id)} 
                                                    aria-label={`Edit purchase ${purchase.orderNo}`}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                    className="text-red-500 ml-2" 
                                                    onClick={() => handleDelete(purchase._id)} 
                                                    aria-label={`Delete purchase ${purchase.orderNo}`}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>No purchases found.</p>
                    )}
                </>
            )}
        </main>
    </div>
);
};

export default History;