import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const TablePrice = () => {
    const [tableItems, setTableItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        _id: '',
        Nombre: '',
        Costo: '',
        Moneda: '',
        Fecha_limite: '',
        Tiempo_entrega: '',
        Medio_entrega: ''
    });

    const fetchData = async () => {
        try {
            const response = await fetch('/api/items', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTableItems(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`/api/items/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "_id": id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchData();
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
    };

    const saveItem = async () => {
        
        const costoConMoneda = `${currentItem.Costo} ${currentItem.Moneda}`;

        const updatedItem = {
            ...currentItem, 
            Nombre: currentItem.Nombre.toLowerCase(),
            Costo: costoConMoneda
        };

        const url = isEditing ? `/api/items` : '/api/items';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setIsModalOpen(false);
            setCurrentItem({
                _id: '',
                Nombre: '',
                Costo: '',
                Moneda: '',
                Fecha_limite: '',
                Tiempo_entrega: '',
                Medio_entrega: ''
            });
            fetchData();
        } catch (error) {
            console.error("Error saving item: ", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setCurrentItem({
            _id: '',
            Nombre: '',
            Costo: '',
            Moneda: '',
            Fecha_limite: '',
            Tiempo_entrega: '',
            Medio_entrega: ''
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Items and products Table
                    </h3>
                    <p className="text-gray-600 mt-2">
                        In this table you can manage all the products and services managed by the institution.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={handleAddClick}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Cost</th>
                            <th className="py-3 px-6">Limit Date </th>
                            <th className="py-3 px-6">Delivery Date</th>
                            <th className="py-3 px-6">Shipping method</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Nombre[0].toUpperCase() + item.Nombre.slice(1)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Costo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Fecha_limite}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Tiempo_entrega}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Medio_entrega}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item._id)}
                                            className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <Modal
                    isEditing={isEditing}
                    currentItem={currentItem}
                    handleChange={handleChange}
                    saveItem={saveItem}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default TablePrice;
