export default () => {

    const tableDate = [
        {
            nameEvent: "Beggining of quarter",
            date: "oct-Jan 2024",
            hour: "7:00 AM",
            place: "UTCH BIS",
        },

    ]

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
                    <a
                        href=""
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add Event       
                    </a>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"> Event name:</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Hour</th>
                            <th className="py-3 px-6">Place </th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableDate.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.nameEvent}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.hour}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.place}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </a>
                                        <button href="" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
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
    )
}