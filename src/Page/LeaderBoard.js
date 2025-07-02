import '../css/Group.css';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaRocket } from 'react-icons/fa';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeaderBoard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchTopUsers();
        }
    }, [navigate]);

    const fetchTopUsers = async () => {
        try {
            const response = await fetch("https://crypto-api-production-b99e.up.railway.app/api/user/top-user");
            const data = await response.json();
            setTopUsers(data.topUsers);
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    };

    return (
        <div className="home-container d-flex flex-column text-white">

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="text-center mt-5 pt-3">
                <p className='px-3 fs-3 text-white'>
                    Top 20 DWebX User
                </p>
            </div>

            {/* Dynamically render top users */}
            <div className='mb-3'>
                {topUsers.map((user, index) => (
                    <div key={index} className="d-flex justify-content-center mt-3 mx-3 ">
                        <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                            <div className="d-flex align-items-center gap-3">
                                <div className="rank-circle fw-bold">#{index + 1}</div>
                                <span className="text-white fw-semibold">{user.username}</span>
                            </div>
                            <div className="text-white fw-semibold">
                                {parseFloat(user.coins.$numberDecimal).toFixed(4)} <span className="text-info">DWX</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fixed Bottom Navigation */}
            <div className="fixed-bottom py-md-3 py-1 d-flex justify-content-between bg-black mt-5">
                <div className="text-center bg-dark_1" onClick={() => navigate('/group')}>
                    <FaUsers size={24} />
                    <span className="d-block">Group</span>
                </div>
                <div className="text-center bg-dark_2 text-pulple fw-bold" onClick={() => navigate('/leaderboard')}>
                    <FaRocket size={24} />
                    <span className="d-block">Board</span>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
