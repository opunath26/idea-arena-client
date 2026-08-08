import React, { useEffect, useState } from "react";
import { FaTrophy, FaMedal, FaCrown, FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import useAxios from "../../../hooks/useAxios";

const Leaderboard = () => {
  const axiosPublic = useAxios();
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/winners")
      .then((res) => {
        setWinners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard data:", err);
        setLoading(false);
      });
  }, [axiosPublic]);

  const top1 = winners[0];
  const top2 = winners[1];
  const top3 = winners[2];
  const remainingWinners = winners.slice(3);

  return (
    <div className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="space-y-12 mx-auto max-w-6xl">
        
        {/* 1. Header Banner */}
        <div className="relative space-y-3 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 shadow-xl p-8 sm:p-12 rounded-3xl overflow-hidden text-white text-center">
          <div className="-top-10 -right-10 absolute bg-white/10 blur-2xl rounded-full w-40 h-40"></div>
          <div className="-bottom-10 -left-10 absolute bg-white/10 blur-2xl rounded-full w-40 h-40"></div>
          
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md mb-2 px-4 py-1.5 rounded-full font-semibold text-yellow-300 text-sm uppercase tracking-wide">
            <FaTrophy className="text-yellow-300" /> Champions Arena
          </div>
          <h1 className="font-extrabold text-3xl sm:text-5xl tracking-tight">
            Contest Leaderboard
          </h1>
          <p className="mx-auto max-w-2xl text-purple-100 text-sm sm:text-base">
            Celebrating the brightest minds and innovative ideas! Here are the top winners of our contest challenges.
          </p>
        </div>

        {/* Loading Spinner / Skeleton */}
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-4 py-20">
            <span className="text-purple-600 loading loading-spinner loading-lg"></span>
            <p className="font-medium text-slate-500">Fetching champions data...</p>
          </div>
        ) : winners.length === 0 ? (
          /* Empty State */
          <div className="bg-white shadow-sm p-12 border border-slate-200 rounded-2xl text-center">
            <MdOutlineLeaderboard className="mx-auto mb-4 size-16 text-slate-300" />
            <h3 className="mb-1 font-bold text-slate-700 text-xl">No Winners Announced Yet</h3>
            <p className="mx-auto max-w-md text-slate-500 text-sm">
              The contests are currently underway. Winner results and rankings will appear here once finalized.
            </p>
          </div>
        ) : (
          <>
            {/* 2. Top 3 Podium Cards */}
            <div className="items-end gap-6 grid grid-cols-1 md:grid-cols-3 pt-6">
              
              {/* 2nd Place */}
              {top2 && (
                <div className="relative flex flex-col items-center order-2 md:order-1 bg-white shadow-md p-6 border-2 border-slate-200 rounded-2xl text-center">
                  <div className="-top-6 absolute bg-slate-200 shadow-md p-3 border-2 border-white rounded-full text-slate-700">
                    <FaMedal className="size-6 text-slate-500" />
                  </div>
                  <div className="mt-4 mb-3">
                    {top2.submittedByPhoto ? (
                      <img
                        src={top2.submittedByPhoto}
                        alt={top2.submittedByName}
                        className="shadow border-4 border-slate-200 rounded-full w-20 h-20 object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-slate-100 border-4 border-slate-200 rounded-full w-20 h-20">
                        <FaUser className="size-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <span className="bg-slate-100 mb-2 px-3 py-1 rounded-full font-bold text-slate-700 text-xs uppercase tracking-wider">
                    2nd Place
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg">{top2.submittedByName || "Anonymous"}</h3>
                  <p className="mt-1 font-semibold text-purple-600 text-xs">{top2.contestTitle || "Contest Winner"}</p>
                  <p className="mt-2 text-slate-500 text-xs">Prize: <span className="font-bold text-slate-700">${top2.prizeMoney || 0}</span></p>
                </div>
              )}

              {/* 1st Place (Winner) */}
              {top1 && (
                <div className="relative flex flex-col items-center order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white shadow-xl p-8 border-2 border-amber-300 rounded-2xl text-center md:-translate-y-4">
                  <div className="-top-7 absolute bg-amber-400 shadow-lg p-3.5 rounded-full ring-4 ring-amber-100 text-white">
                    <FaCrown className="size-7 text-yellow-100" />
                  </div>
                  <div className="relative mt-4 mb-3">
                    {top1.submittedByPhoto ? (
                      <img
                        src={top1.submittedByPhoto}
                        alt={top1.submittedByName}
                        className="shadow-lg border-4 border-amber-400 rounded-full w-24 h-24 object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-amber-100 border-4 border-amber-400 rounded-full w-24 h-24">
                        <FaUser className="size-10 text-amber-500" />
                      </div>
                    )}
                    <span className="right-0 bottom-0 absolute bg-amber-500 shadow px-2 py-0.5 rounded-full font-bold text-white text-xs">
                      #1
                    </span>
                  </div>
                  <span className="bg-amber-100 mb-2 px-3.5 py-1 rounded-full font-extrabold text-amber-800 text-xs uppercase tracking-wider">
                    1st Winner
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-xl">{top1.submittedByName || "Anonymous"}</h3>
                  <p className="mt-1 font-bold text-purple-700 text-xs">{top1.contestTitle || "Contest Winner"}</p>
                  <div className="bg-amber-100/80 mt-3 px-4 py-1.5 rounded-xl">
                    <p className="font-medium text-amber-900 text-xs">Prize Money: <span className="font-black text-amber-700 text-sm">${top1.prizeMoney || 0}</span></p>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {top3 && (
                <div className="relative flex flex-col items-center order-3 bg-white shadow-md p-6 border-2 border-amber-100 rounded-2xl text-center">
                  <div className="-top-6 absolute bg-amber-700 shadow-md p-3 border-2 border-white rounded-full text-white">
                    <FaMedal className="size-6 text-amber-200" />
                  </div>
                  <div className="mt-4 mb-3">
                    {top3.submittedByPhoto ? (
                      <img
                        src={top3.submittedByPhoto}
                        alt={top3.submittedByName}
                        className="shadow border-4 border-amber-200 rounded-full w-20 h-20 object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-amber-50 border-4 border-amber-200 rounded-full w-20 h-20">
                        <FaUser className="size-8 text-amber-600" />
                      </div>
                    )}
                  </div>
                  <span className="bg-amber-50 mb-2 px-3 py-1 rounded-full font-bold text-amber-800 text-xs uppercase tracking-wider">
                    3rd Place
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg">{top3.submittedByName || "Anonymous"}</h3>
                  <p className="mt-1 font-semibold text-purple-600 text-xs">{top3.contestTitle || "Contest Winner"}</p>
                  <p className="mt-2 text-slate-500 text-xs">Prize: <span className="font-bold text-slate-700">${top3.prizeMoney || 0}</span></p>
                </div>
              )}

            </div>

            {/* 3. Full Ranking Table */}
            {remainingWinners.length > 0 && (
              <div className="bg-white shadow-sm mt-8 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100/70 px-6 py-4 border-slate-200 border-b">
                  <h3 className="font-bold text-slate-700 text-lg">Honorable Champions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="border-slate-200 border-b text-slate-500">
                        <th className="px-6 py-4">Rank</th>
                        <th>Winner</th>
                        <th>Contest Title</th>
                        <th>Prize Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remainingWinners.map((winner, index) => (
                        <tr key={winner._id || index} className="hover:bg-slate-50/80 border-slate-100 border-b transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-600">
                            #{index + 4}
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              {winner.winnerImage ? (
                                <img
                                  src={winner.submittedByPhoto}
                                  alt={winner.submittedByName}
                                  className="rounded-full w-10 h-10 object-cover"
                                />
                              ) : (
                                <div className="flex justify-center items-center bg-purple-100 rounded-full w-10 h-10 font-bold text-purple-600">
                                  {winner.submittedByName?.charAt(0) || "U"}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-slate-800">{winner.submittedByName || "Anonymous"}</p>
                                <p className="text-slate-400 text-xs">{winner.submittedByEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="font-medium text-slate-600">{winner.contestTitle}</td>
                          <td className="font-bold text-emerald-600">${winner.prizeMoney || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* 4. Contact Notice / Support Footer Section */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-6 bg-gradient-to-r from-slate-900 to-indigo-950 shadow-lg p-6 sm:p-8 rounded-2xl text-white">
          <div className="space-y-2 md:text-left text-center">
            <h3 className="flex justify-center md:justify-start items-center gap-2 font-bold text-yellow-400 text-xl">
              <FaTrophy /> Claiming Your Prize or Have Questions?
            </h3>
            <p className="max-w-xl text-slate-300 text-sm">
              If you are one of the winners and haven't received your reward details or if you notice any discrepancy in the rankings, please reach out to our admin team immediately.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-3 w-full md:w-auto">
            <a
              href="mailto:support@ideaarena.com"
              className="flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-md px-5 py-2.5 rounded-xl font-medium text-white text-sm transition-all"
            >
              <FaEnvelope /> Contact Support
            </a>
            <a
              href="tel:+880123456789"
              className="flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-2.5 border border-slate-700 rounded-xl font-medium text-slate-200 text-sm transition-all"
            >
              <FaPhoneAlt /> Helpline
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;