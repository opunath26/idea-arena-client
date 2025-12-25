import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const Winner = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    const { data: trackings = [], isLoading } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return res.data;
        }
    });

    if (isLoading) return <div className="flex justify-center p-20"><span className="text-purple-600 loading loading-bars loading-lg"></span></div>;

    return (
        <div className='bg-white mx-auto p-8 max-w-4xl min-h-screen'>
            {/* Header Section */}
            <div className="mb-12 text-center">
                <h2 className='mb-2 font-extrabold text-gray-800 text-3xl md:text-4xl'>
                    Tracking ID: <span className="text-purple-600">#{trackingId}</span>
                </h2>
                <p className="text-gray-500 italic">Tracking progress and updates for your participation</p>
                <div className="mt-4 p-4 badge-outline font-semibold badge badge-secondary">
                    Total Logs: {trackings.length}
                </div>
            </div>

            {/* Timeline Section */}
            {trackings.length > 0 ? (
                <ul className="timeline timeline-vertical">
                    {trackings.map((log, index) => (
                        <li key={log._id}>
                            {index !== 0 && <hr className="bg-purple-500" />}
                            
                            <div className="font-semibold text-gray-400 text-sm timeline-start">
                                {new Date(log.createAt).toLocaleDateString()} <br />
                                {new Date(log.createAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>

                            <div className="timeline-middle">
                                <div className="bg-purple-600 shadow-lg p-1 rounded-full text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className={`timeline-end timeline-box border-none shadow-md p-4 mb-4 ${index === 0 ? 'bg-purple-50 border-l-4 border-purple-600' : 'bg-white border-l-4 border-gray-200'}`}>
                                <h3 className="font-bold text-gray-800">{log.status || "Status Update"}</h3>
                                <p className='mt-1 text-gray-600'>{log.details}</p>
                            </div>

                            
                            {index !== trackings.length - 1 && <hr className="bg-gray-200" />}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="bg-gray-50 py-20 border-2 border-dashed rounded-2xl text-center">
                    <p className="text-gray-400 text-xl">No tracking logs found for this ID.</p>
                </div>
            )}
        </div>
    );
};

export default Winner;