import React, { useState, useEffect, useRef } from 'react';
import { FaBolt, FaUsers, FaRocket } from 'react-icons/fa';
import Sidebar from '../Components/Sidebar';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';
import socket from '../utils/socket';
import releases from '../releaseData';
import { toast, ToastContainer } from 'react-toastify';
import Logo from '../image/logo-only-d-1.png'
import 'react-toastify/dist/ReactToastify.css';
import '../css/font.css';


const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [miningStartTime, setMiningStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [coins, setCoins] = useState(0);
    const [coinChangeAnim, setCoinChangeAnim] = useState(false);
    const [selectedRelease, setSelectedRelease] = useState(null);

    const navigate = useNavigate();
    const prevCoinsRef = useRef(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const checkSessionStatus = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("https://crypto-api-production-b99e.up.railway.app/api/user/session-status", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const startTime = res.data.sessionStartTime ? new Date(res.data.sessionStartTime) : null;
                setMiningStartTime(startTime);

                const coinValue = parseFloat(res.data.coins?.$numberDecimal || res.data.coins || "0");
                setCoins(coinValue);
                prevCoinsRef.current = coinValue;

                if (startTime) {
                    localStorage.setItem("miningStartTime", startTime.toISOString());
                } else {
                    localStorage.removeItem("miningStartTime");
                }
            } catch (error) {
                console.error("Error checking session status:", error);
            }
        };

        checkSessionStatus();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!socket.connected) {
            socket.connect();
        }

        if (userId) {
            socket.emit("join", userId);
        }

        const handleCoinUpdate = (data) => {
            if (data.userId?.toString() === userId) {
                const newCoins = parseFloat(data.coins?.$numberDecimal || data.coins || 0);

                if (newCoins > prevCoinsRef.current) {
                    setCoinChangeAnim(true);
                    setTimeout(() => setCoinChangeAnim(false), 200);
                }

                prevCoinsRef.current = coins;
                setCoins(newCoins);
            }
        };

        const handleSessionEnd = () => {
            setMiningStartTime(null);
            localStorage.removeItem("miningStartTime");
        };

        socket.on("coin_updated", handleCoinUpdate);
        socket.on("session_ended", handleSessionEnd);

        return () => {
            socket.off("coin_updated", handleCoinUpdate);
            socket.off("session_ended", handleSessionEnd);
        };
    }, [coins]);

    useEffect(() => {
        if (miningStartTime) {
            const interval = setInterval(() => {
                const now = new Date();
                const endTime = new Date(miningStartTime);
                endTime.setHours(endTime.getHours() + 24);
                const diff = endTime - now;

                if (diff <= 0) {
                    setMiningStartTime(null);
                    setTimeLeft(null);
                    localStorage.removeItem("miningStartTime");
                    clearInterval(interval);
                } else {
                    const hours = Math.floor(diff / 1000 / 60 / 60);
                    const minutes = Math.floor((diff / 1000 / 60) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [miningStartTime]);

    useEffect(() => {
        document.body.style.overflow = selectedRelease ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedRelease]);

    const startMining = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("https://crypto-api-production-b99e.up.railway.app/api/user/start-session", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.activeSession) {
                const now = new Date(res.data.sessionStartTime);
                setMiningStartTime(now);
                localStorage.setItem("miningStartTime", now.toISOString());

                const coinValue = parseFloat(res.data.coins?.$numberDecimal || res.data.coins || 0);
                setCoins(coinValue);
                prevCoinsRef.current = coinValue;

                toast.success("Mining started successfully!", {
                    style: {
                        background: '#1b70c5',
                        color: 'white',
                        fontWeight: 'bold',
                    },
                    icon: '⚡',
                    progressStyle: {
                        background: 'white',
                    },
                });
            }
        } catch (err) {
            console.error("Error starting mining:", err);
        }
    };

    return (
        <div className="home-container d-flex flex-column text-white">
            {/* ✅ Sidebar with coin props */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                coins={coins}
                coinChangeAnim={coinChangeAnim}
            />

            <div className="home-content flex-grow-1 mt-5 mb-1">
                {/* ✅ Removed coin display from center */}
                {/* ✅ Removed coin display from center */}
                <div className="home-content flex-grow-1 mt-5 mb-1">
                    <div className=" mt-2  text-center">
                        <div className="text-center title-text l-w fs-5">
                        ATP DWebX Server
                        </div>
                    </div>
                    <div className="text-white small mt-1 text-center title-text fs-6"><span className='fs-3'>0.05 </span> DWEBX / h</div>
                </div>

                {/* ⚡ Power button */}
                <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                    <div className="power-circle d-flex justify-content-center align-items-center">
                        {/* <FaBolt size={48} color="white" /> */}
                        <img src={Logo} className='image-logo ' alt="" />
                    </div>
                </div>

                {/* 🟢 Mining button */}
                <div className="text-center mtb-5">
                    {miningStartTime ? (
                        <button className="btn mt-4 btn-success px-5 rounded-pill title-text_2" disabled>
                            {timeLeft || "Mining..."}
                        </button>
                    ) : (
                        <button className="btn btn-primary_2 px-5 mt-5 rounded-pill title-text_2" onClick={startMining}>
                            Start Mining
                        </button>
                    )}
                </div>

                {/* 🐇 Rabbit Releases Section */}
                <div className="text-center mt-5 pt-3">
                    <div className="release-grid mt-3">
                        {releases.map((release, index) => (
                            <div key={index} className="release-card" onClick={() => setSelectedRelease(release)}>
                                <h5>{release.version}</h5>
                                <p><strong>{release.title}</strong></p>
                                <p className="date">{release.date}</p>
                                <p>{release.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 📜 Modal */}
                {selectedRelease && (
                    <div className="release-modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setSelectedRelease(null)}>&times;</span>
                            <h2>{selectedRelease.version} – {selectedRelease.title}</h2>
                            <p><strong>Date:</strong> {selectedRelease.date}</p>
                            <div className="details">
                                <pre>{selectedRelease.fullDetails}</pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ⬇️ Fixed bottom menu */}
            <div className="fixed-bottom py-md-3 py-1 d-flex justify-content-between bg-black">
                <div className="text-center bg-dark_1" onClick={() => navigate('/group')}>
                    <FaUsers size={24} />
                    <span className="d-block">Group</span>
                </div>
                <div className="text-center bg-dark_2" onClick={() => navigate('/leaderboard')}>
                    <FaRocket size={24} />
                    <span className="d-block">Board</span>
                </div>
            </div>

            {/* ✅ Toast Container */}
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
        </div>
    );
};

export default Home;
