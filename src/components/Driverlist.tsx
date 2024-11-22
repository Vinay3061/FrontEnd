// 'use client';

// import { useState, useEffect } from 'react';

// interface Driver {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
// }

// export default function DriverList() {
//   const [drivers, setDrivers] = useState<Driver[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   // State for sorting and filtering
//   const [filterQuery, setFilterQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState<{ key: keyof Driver; direction: 'asc' | 'desc' } | null>(null);

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch drivers');
//       }
//       const data = await response.json();
//       setDrivers(data);
//       setLoading(false);
//     } catch (err) {
//       setError('Error fetching drivers. Please try again later.');
//       setLoading(false);
//     }
//   };

//   // Filter drivers based on the filter query
//   const filteredDrivers = drivers.filter((driver) => {
//     const fullData = `${driver.id} ${driver.first_name} ${driver.last_name} ${driver.email}`.toLowerCase();
//     return fullData.includes(filterQuery.toLowerCase());
//   });

//   // Sort drivers based on the sort configuration
//   const sortedDrivers = [...filteredDrivers].sort((a, b) => {
//     if (sortConfig !== null) {
//       const { key, direction } = sortConfig;
//       const valueA = a[key];
//       const valueB = b[key];
//       if (typeof valueA === 'string' && typeof valueB === 'string') {
//         return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
//       } else if (typeof valueA === 'number' && typeof valueB === 'number') {
//         return direction === 'asc' ? valueA - valueB : valueB - valueA;
//       }
//     }
//     return 0;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(sortedDrivers.length / rowsPerPage);
//   const currentDrivers = sortedDrivers.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSort = (key: keyof Driver) => {
//     setSortConfig((prevConfig) => {
//       if (prevConfig && prevConfig.key === key) {
//         // Toggle direction
//         return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
//       }
//       // Default to ascending
//       return { key, direction: 'asc' };
//     });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">Driver Details</h1>

//       {/* Filter Input */}
//       <div className="mb-4 flex justify-end">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={filterQuery}
//           onChange={(e) => setFilterQuery(e.target.value)}
//           className="border px-4 py-2 rounded text-black "
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-black-800">
//           <thead>
//             <tr className="bg-gray-100">
//               <th
//                 className="py-2 px-4 border-b text-left text-black cursor-pointer"
//                 onClick={() => handleSort('id')}
//               >
//                 ID {sortConfig?.key === 'id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
//               </th>
//               <th
//                 className="py-2 px-4 border-b text-left text-black cursor-pointer"
//                 onClick={() => handleSort('first_name')}
//               >
//                 First Name {sortConfig?.key === 'first_name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
//               </th>
//               <th
//                 className="py-2 px-4 border-b text-left text-black cursor-pointer"
//                 onClick={() => handleSort('last_name')}
//               >
//                 Last Name {sortConfig?.key === 'last_name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
//               </th>
//               <th
//                 className="py-2 px-4 border-b text-left text-black cursor-pointer"
//                 onClick={() => handleSort('email')}
//               >
//                 Email {sortConfig?.key === 'email' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentDrivers.map((driver) => (
//               <tr key={driver.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b text-black">{driver.id}</td>
//                 <td className="py-2 px-4 border-b text-black">{driver.first_name}</td>
//                 <td className="py-2 px-4 border-b text-black">{driver.last_name}</td>
//                 <td className="py-2 px-4 border-b text-black">{driver.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-black">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';

export default function Driverlist() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiResponse();
  }, []);

  const fetchApiResponse = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch the API response');
      }
      const data = await response.text(); // Parse as text instead of JSON
      setApiResponse(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching API response. Please try again later.');
      setLoading(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">API Response:{apiResponse}</h1>
    </div>
  );
}
