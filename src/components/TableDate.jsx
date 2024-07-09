import React, { useEffect, useState } from 'react';

export default () => {
    const [tableDate, setTableDate] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        Nombre: '',
        Fecha_limite: '',
        Hora: '',
        Lugar: ''
    });
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        const url = selectedEvent ? `/api/events/${selectedEvent._id}` : '/api/events';
        const method = selectedEvent ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setIsModalOpen(false);
            setNewEvent({
                Nombre: '',
                Fecha_limite: '',
                Hora: '',
                Lugar: ''
            });
            setSelectedEvent(null);
            fetchData();
        } catch (error) {
            console.error("Error saving event: ", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setNewEvent({
            Nombre: event.Nombre,
            Fecha_limite: event.Fecha_limite,
            Hora: event.Hora,
            Lugar: event.Lugar
        });
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
                        onClick={() => {
                            setSelectedEvent(null);
                            setNewEvent({
                                Nombre: '',
                                Fecha_limite: '',
                                Hora: '',
                                Lugar: ''
                            });
                            setIsModalOpen(true);
                        }}
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{selectedEvent ? 'Edit Event' : 'Add New Event'}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); saveEvent(); }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Event Name
                                </label>
                                <input
                                    name="Nombre"
                                    type="text"
                                    value={newEvent.Nombre}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Date
                                </label>
                                <input
                                    name="Fecha_limite"
                                    type="date"
                                    value={newEvent.Fecha_limite}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Hour
                                </label>
                                <input
                                    name="Hora"
                                    type="time"
                                    value={newEvent.Hora}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Place
                                </label>
                                <input
                                    name="Lugar"
                                    type="text"
                                    value={newEvent.Lugar}
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
