import '../css/Group.css';
import React, { useState, useEffect } from 'react';
import { FaUsers, FaRocket } from 'react-icons/fa';
import { TbCoinFilled } from 'react-icons/tb';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Group = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [referralCode, setReferralCode] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [referredUsers, setReferredUsers] = useState([]);

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://crypto-api-production-7139.up.railway.app/api/user/get-refer-user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setReferralCode(response.data.referralCode);
                setReferredUsers(response.data.referredUsers);

                // 👇 Generate dynamic referral link
                const domain = window.location.origin;
                setReferralLink(`${domain}/signup?ref=${response.data.referralCode}`);
            } catch (error) {
                console.error('Failed to fetch referred users:', error);
            }
        };

        fetchReferralData();
    }, []);

    return (
        <div className="home-container d-flex flex-column text-white">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="text-center mt-5 pt-5">
                <p className='mb-1 text-white fw-semibold'>Referral Code :- {referralCode}</p>
                <p className='mb-1 text-white fw-semibold'>
                    Referral Link :- <span style={{ wordBreak: 'break-word' }}>{referralLink}</span>
                </p>
            </div>

            <div className="text-center mt-4">
                <p className='px-3 fs-6 text-warning'>
                    Invite friends using your referral link and earn rewards when they Join
                </p>
            </div>

            {referredUsers.map((user, index) => (
                <div className="d-flex justify-content-center mt-3 mx-3" key={user._id}>
                    <div className="leaderboard-card d-flex align-items-center justify-content-between px-3 py-2 rounded-4 shadow-sm w-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rank-circle fw-bold">#{index + 1}</div>
                            <span className="text-white fw-semibold">{user.username}</span>
                        </div>
                        <div className="text-white fw-semibold">
                            {user.coins?.$numberDecimal
                                ? `${parseFloat(user.coins.$numberDecimal).toFixed(4)}`
                                : '0.0000'} <span className="text-info">BDAG</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Fixed Bottom Navigation */}
            <div className="fixed-bottom  py-md-3 py-1 d-flex justify-content-between bg-black">
                <div className="text-center bg-dark_1 fw-bold text-pulple" onClick={() => navigate('/group')}>
                    <FaUsers size={24} />
                    <span className="d-block">Group</span>
                </div>
                {/* <div className="center-icon">
                                <div className="icon-wrapper">
                                    <TbCoinFilled className="fs-2" />
                                </div>
                            </div> */}
                <div className="text-center bg-dark_2" onClick={() => navigate('/leaderboard')}>
                    <FaRocket size={24} />
                    <span className="d-block">Board</span>
                </div>
            </div>
        </div>
    );
};

export default Group;
