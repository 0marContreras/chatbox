import React, { useEffect, useState } from 'react';
import EventModal from './EventModal'; // Asegúrate de que la ruta sea correcta

const DateTable = () => {
    const [tableDate, setTableDate] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        _id: '',
        Nombre: '',
        Fecha_limite: '',
        Hora: '',
        Lugar: ''
    });

    const fetchData = async () => {
        try {
            const response = await fetch('/api/events', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTableDate(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`/api/events/`, {
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

    const saveEvent = async () => {
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch('/api/events', {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentItem),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setIsModalOpen(false);
            setCurrentItem({
                _id: '',
                Nombre: '',
                Fecha_limite: '',
                Hora: '',
                Lugar: ''
            });
            fetchData();
        } catch (error) {
            console.error("Error saving event: ", error);
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
            Fecha_limite: '',
            Hora: '',
            Lugar: ''
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Date Table
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={handleAddClick}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Event
                    </button>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Event name</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Hour</th>
                            <th className="py-3 px-6">Place</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableDate.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Fecha_limite}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Hora}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Lugar}</td>
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
                <EventModal
                    isEditing={isEditing}
                    currentItem={currentItem}
                    handleChange={handleChange}
                    saveEvent={saveEvent}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default DateTable;
