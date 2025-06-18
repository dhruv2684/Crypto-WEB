import React, { useState } from 'react';
import { FaBolt, FaUsers, FaRocket } from 'react-icons/fa';
import { TbCoinFilled } from 'react-icons/tb';
import Sidebar from '../Components/Sidebar';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
     const navigate = useNavigate();

    return (
        <div className="home-container d-flex flex-column text-white">

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Scrollable Middle Section */}
            <div className="home-content flex-grow-1 mt-5 mb-5">
                {/* Top Info */}
                <div className="text-center mt-4">
                    <h1 className="fw-bold display-6">168.0341</h1>
                    <div className="dropdown mt-2">
                        <button className="btn btn-dark dropdown-toggle" type="button">
                            ATP BlockDAG Server
                        </button>
                    </div>
                    <div className="text-muted small mt-1">0.05 BDAG/h</div>
                </div>

                {/* Power Button */}
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div className="power-circle d-flex justify-content-center align-items-center">
                        <FaBolt size={48} color="white" />
                    </div>
                </div>

                {/* Fully Charged Button */}
                <div className="text-center mt-4">
                    <button className="btn btn-primary px-5 rounded-pill">Fully Charged</button>
                    <div className="small mt-1 text-secondary">
                        Once the clock hits 24, gear up for another mining run!
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Navigation */}
            <div className="fixed-bottom bg-dark py-md-3 py-1 d-flex justify-content-around">
                <div className="text-center" onClick={() => navigate('/group')}>
                    <FaUsers size={24} />
                    <span className="d-block">Group</span>
                </div>
                <div className="center-icon">
                    <div className="icon-wrapper">
                        <TbCoinFilled className="fs-2" />
                    </div>
                </div>
                <div className="text-center" onClick={() => navigate('/leaderboard')}>
                    <FaRocket size={24} />
                    <span className="d-block">LeaderBoard</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
