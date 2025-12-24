// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const Search = () => {
//     const [search, setSearch] = useState('');
//     const axiosSecure = useAxiosSecure();

//     const { data: contests = [], isLoading } = useQuery({
//         queryKey: ['contests', search],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/contests?search=${search}`);
//             return res.data;
//         }
//     });

//     const handleSearch = (e) => {
//         e.preventDefault();
//         const form = e.target;
//         const searchText = form.searchField.value;
//         setSearch(searchText);
//     };

//     return (
//         <div className="mx-auto px-4 pb-20 container">
//             {/* Search Input Section */}
//             <div className="z-30 relative flex justify-center -mt-10">
//                 <form 
//                     onSubmit={handleSearch}
//                     className="flex bg-white shadow-2xl p-2 border-2 border-purple-100 focus-within:border-purple-400 rounded-full w-full max-w-2xl transition-all"
//                 >
//                     <input
//                         name="searchField"
//                         type="text"
//                         placeholder="Search by Contest Name or Type (e.g. Article, Design)..."
//                         className="flex-grow p-4 rounded-l-full focus:outline-none text-gray-800"
//                     />
//                     <button 
//                         type="submit"
//                         className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-full font-bold text-white active:scale-95 transition duration-300 transform"
//                     >
//                         Search
//                     </button>
//                 </form>
//             </div>

//             {/* Results Header */}
//             <div className="mt-16 text-center">
//                 <h2 className="mb-2 font-extrabold text-gray-800 text-3xl md:text-4xl">
//                     {search ? `Results for "${search}"` : "Discover Exciting Contests"}
//                 </h2>
//                 <div className="bg-purple-500 mx-auto mb-10 rounded-full w-24 h-1"></div>
//             </div>

//             {/* Content Section */}
//             {isLoading ? (
//                 <div className="flex justify-center items-center min-h-[200px]">
//                     <span className="text-purple-600 loading loading-bars loading-lg"></span>
//                 </div>
//             ) : (
//                 <>
//                     {contests.length > 0 ? (
//                         <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                             {contests.map((contest) => (
//                                 <div 
//                                     key={contest._id} 
//                                     className="group bg-base-100 shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300 card"
//                                 >
//                                     <figure className="relative h-52 overflow-hidden">
//                                         <img 
//                                             src={contest.contestImage || "https://via.placeholder.com/400x250"} 
//                                             alt={contest.contestTitle} 
//                                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                         />
//                                         <div className="top-4 right-4 absolute">
//                                             <div className="shadow-lg px-4 py-3 font-semibold badge badge-primary">
//                                                 {contest.contestType}
//                                             </div>
//                                         </div>
//                                     </figure>

//                                     <div className="card-body">
//                                         <h2 className="font-bold text-gray-800 group-hover:text-purple-600 text-xl transition-colors card-title">
//                                             {contest.contestTitle}
//                                         </h2>
//                                         <p className="text-gray-500 text-sm line-clamp-3">
//                                             {contest.contestDescription}
//                                         </p>
                                        
//                                         <div className="flex justify-between items-center mt-4">
//                                             <div className="flex flex-col">
//                                                 <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider">Status</span>
//                                                 <span className="font-medium text-green-600 text-sm">{contest.submitStatus || 'Active'}</span>
//                                             </div>
//                                             <Link 
//                                                 to={`/contests/${contest._id}`}
//                                                 className="hover:bg-purple-600 px-6 border-purple-600 rounded-full btn-outline text-purple-600 btn btn-primary btn-sm"
//                                             >
//                                                 View Details
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="bg-gray-50 py-20 border-2 border-gray-200 border-dashed rounded-3xl text-center">
//                             <div className="mb-4 text-6xl">🔍</div>
//                             <h3 className="font-semibold text-gray-400 text-2xl">No contests found!</h3>
//                             <p className="mt-2 text-gray-400">Try searching for something else or check back later.</p>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default Search;