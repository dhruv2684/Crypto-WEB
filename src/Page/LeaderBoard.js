import '../css/Group.css';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaRocket } from 'react-icons/fa';
import { TbCoinFilled } from 'react-icons/tb';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);


    return (
        <div className="home-container d-flex flex-column text-white">

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="text-center mt-5 pt-3">
                <p className='px-3 fs-6 text-white'>
                    Top 10 RabbitXQ User
                </p>
            </div>

            <div className="d-flex justify-content-center mt-3 mx-3">
                <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rank-circle  fw-bold">#3</div>
                        <span className="text-white fw-semibold">Lintest</span>
                    </div>
                    <div className="text-white fw-semibold">8663.090 <span className="text-info">BDAG</span></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 mx-3">
                <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rank-circle  fw-bold">#3</div>
                        <span className="text-white fw-semibold">Lintest</span>
                    </div>
                    <div className="text-white fw-semibold">8663.090 <span className="text-info">BDAG</span></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 mx-3">
                <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rank-circle  fw-bold">#3</div>
                        <span className="text-white fw-semibold">Lintest</span>
                    </div>
                    <div className="text-white fw-semibold">8663.090 <span className="text-info">BDAG</span></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 mx-3">
                <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rank-circle  fw-bold">#3</div>
                        <span className="text-white fw-semibold">Lintest</span>
                    </div>
                    <div className="text-white fw-semibold">8663.090 <span className="text-info">BDAG</span></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 mx-3">
                <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rank-circle  fw-bold">#3</div>
                        <span className="text-white fw-semibold">Lintest</span>
                    </div>
                    <div className="text-white fw-semibold">8663.090 <span className="text-info">BDAG</span></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 mx-3">
                <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rank-circle  fw-bold">#3</div>
                        <span className="text-white fw-semibold">Lintest</span>
                    </div>
                    <div className="text-white fw-semibold">8663.090 <span className="text-info">BDAG</span></div>
                </div>
            </div>


            {/* Fixed Bottom Navigation */}
            <div className="fixed-bottom  py-md-3 py-1 d-flex justify-content-between bg-black">
                <div className="text-center bg-dark_1" onClick={() => navigate('/group')}>
                    <FaUsers size={24} />
                    <span className="d-block">Group</span>
                </div>
                {/* <div className="center-icon">
                                <div className="icon-wrapper">
                                    <TbCoinFilled className="fs-2" />
                                </div>
                            </div> */}
                <div className="text-center bg-dark_2 .text-pulple fw-bold" onClick={() => navigate('/leaderboard')}>
                    <FaRocket size={24} />
                    <span className="d-block">Board</span>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard
