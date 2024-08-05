import React from 'react';

const Modal = ({ isEditing, currentItem, handleChange, saveItem, setIsModalOpen }) => {
    const handleCostChange = (e) => {
        const value = e.target.value;
        
        if (!isNaN(value) && /^-?\d*\.?\d*$/.test(value)) {
            handleChange(e);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); saveItem(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            name="Nombre"
                            type="text"
                            value={currentItem.Nombre}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Cost
                        </label>
                        <input
                            name="Costo"
                            type="text"
                            value={currentItem.Costo}
                            onChange={handleCostChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Currency
                        </label>
                        <select
                            name="Moneda"
                            value={currentItem.Moneda}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Currency</option>
                            <option value="USD">USD</option>
                            <option value="MXN">MXN</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Limit Date
                        </label>
                        <input
                            name="Fecha_limite"
                            type="date"
                            value={currentItem.Fecha_limite}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Delivery Date
                        </label>
                        <input
                            name="Tiempo_entrega"
                            type="text"
                            value={currentItem.Tiempo_entrega}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Shipping method
                        </label>
                        <input
                            name="Medio_entrega"
                            type="text"
                            value={currentItem.Medio_entrega}
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
    );
};


export default Modal;
