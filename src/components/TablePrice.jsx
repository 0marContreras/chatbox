import React, { useEffect, useState } from 'react';

export default () => {
    const [tableItems, setTableItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        Nombre: '',
        Costo: '',
        Fecha_limite: '',
        Tiempo_entrega: '',
        Medio_entrega: ''
    });
    const [selectedItem, setSelectedItem] = useState(null);

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
        const url = selectedItem ? `/api/items/${selectedItem._id}` : '/api/items';
        const method = selectedItem ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setIsModalOpen(false);
            setNewItem({
                "Nombre": '',
                "Costo": '',
                "Fecha_limite": '',
                "Tiempo_entrega": '',
                "Medio_entrega": ''
            });
            setSelectedItem(null);
            fetchData();
        } catch (error) {
            console.error("Error saving item: ", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setNewItem(item);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Price Table
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={() => {
                            setSelectedItem(null);
                            setNewItem({
                                Nombre: '',
                                Costo: '',
                                Fecha_limite: '',
                                Tiempo_entrega: '',
                                Medio_entrega: ''
                            });
                            setIsModalOpen(true);
                        }}
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
                            <th className="py-3 px-6">Date Límite</th>
                            <th className="py-3 px-6">Delivery date</th>
                            <th className="py-3 px-6">Shipping method</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Nombre}</td>
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{selectedItem ? 'Edit Item' : 'Add New Item'}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); saveItem(); }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nombre
                                </label>
                                <input
                                    name="Nombre"
                                    type="text"
                                    value={newItem.Nombre}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Costo
                                </label>
                                <input
                                    name="Costo"
                                    type="text"
                                    value={newItem.Costo}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Fecha Límite
                                </label>
                                <input
                                    name="Fecha_limite"
                                    type="date"
                                    value={newItem.Fecha_limite}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tiempo de Entrega
                                </label>
                                <input
                                    name="Tiempo_entrega"
                                    type="text"
                                    value={newItem.Tiempo_entrega}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Medio de Entrega
                                </label>
                                <input
                                    name="Medio_entrega"
                                    type="text"
                                    value={newItem.Medio_entrega}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
