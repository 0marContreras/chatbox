import React, { useEffect, useState } from 'react';

export default () => {
    const [tableItems, setTableItems] = useState([]);

    useEffect(() => {
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

        fetchData();
    }, []);

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            
            setTableItems((prevItems) => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
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
                    <a
                        href=""
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Item
                    </a>
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
                                        <a href="" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </a>
                                        <button
                                            onClick={() => deleteItem(item.id)}
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
        </div>
    );
}
