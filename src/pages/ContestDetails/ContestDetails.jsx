import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Countdown from "react-countdown";

const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/contests/${id}`)
            .then(res => setContest(res.data))
    }, [id, axiosSecure]);

    if (!contest) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="text-primary loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const handleJoinContest = () => {
        navigate(`/dashboard/payment/${contest._id}`);
    };

  
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="font-bold text-red-500 text-xl uppercase">Registration Closed!</span>;
        } else {
            return (
                <div className="gap-3 grid grid-flow-col auto-cols-max text-center">
                    <div className="flex flex-col bg-neutral p-2 rounded-box text-neutral-content">
                        <span className="font-mono text-2xl countdown">{days}</span> days
                    </div> 
                    <div className="flex flex-col bg-neutral p-2 rounded-box text-neutral-content">
                        <span className="font-mono text-2xl countdown">{hours}</span> hours
                    </div> 
                    <div className="flex flex-col bg-neutral p-2 rounded-box text-neutral-content">
                        <span className="font-mono text-2xl countdown">{minutes}</span> min
                    </div> 
                    <div className="flex flex-col bg-neutral p-2 rounded-box text-neutral-content">
                        <span className="font-mono text-2xl countdown">{seconds}</span> sec
                    </div>
                </div>
            );
        }
    };

   
    const isDeadlinePassed = new Date() > new Date(contest.contestDeadline);

    return (
        <div className="mx-auto px-4 py-12 container">
            <div className="bg-white shadow-lg mx-auto border rounded-2xl max-w-5xl overflow-hidden">
                <img 
                    src={contest.contestImage || "https://via.placeholder.com/800x400"} 
                    alt={contest.contestTitle} 
                    className="w-full h-96 object-cover" 
                />
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="font-bold text-4xl">{contest.contestTitle}</h1>
                        <span className="badge badge-lg badge-secondary">{contest.contestType}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                        <div className="bg-primary/10 px-4 py-2 rounded-lg">
                            <span className="font-bold text-primary text-xl">Fee: ${contest.contestPrice}</span>
                        </div>
                        <p className="text-gray-500 italic">Created at: {new Date(contest.createAt).toLocaleDateString()}</p>
                        
                       
                        <div className="ml-auto">
                            <p className="mb-1 font-semibold text-gray-600 text-sm">Time Remaining:</p>
                            <Countdown 
                                date={new Date(contest.contestDeadline)} 
                                renderer={renderer} 
                            />
                        </div>
                    </div>

                    <div className="divider">Description</div>
                    <p className="mb-10 text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                        {contest.contestDescription}
                    </p>

                    
                    {contest.contestTaskInstructions && (
                        <>
                            <div className="text-secondary divider">Task Instructions</div>
                            <p className="bg-gray-50 mb-10 p-4 border-secondary border-l-4 rounded-lg text-gray-600">
                                {contest.contestTaskInstructions}
                            </p>
                        </>
                    )}
                    
                    <div className="flex md:flex-row flex-col items-center gap-4 pt-8 border-t">
                        <button 
                            onClick={handleJoinContest}
                            disabled={isDeadlinePassed}
                            className={`px-12 w-full md:w-auto font-bold text-white btn btn-lg ${isDeadlinePassed ? 'btn-disabled bg-gray-400' : 'btn-primary'}`}
                        >
                            {isDeadlinePassed ? "Registration Closed" : "Join Contest Now"}
                        </button>
                        <p className="text-gray-500 text-sm italic">
                            {isDeadlinePassed 
                                ? "* This contest has reached its deadline." 
                                : "* By clicking join, you agree to our contest terms and conditions."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;