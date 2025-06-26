import React, { useState, useEffect, useRef } from 'react';
import { FaBolt, FaUsers, FaRocket } from 'react-icons/fa';
import Sidebar from '../Components/Sidebar';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [miningStartTime, setMiningStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [coins, setCoins] = useState(0);
    const [coinChangeAnim, setCoinChangeAnim] = useState(false);
    const navigate = useNavigate();
    const socketRef = useRef(null);
    const prevCoinsRef = useRef(coins);

    // ✅ Fetch mining session status
    useEffect(() => {
        const checkSessionStatus = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("https://crypto-api-production-7139.up.railway.app/api/user/session-status", {
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

    // ✅ Socket.io connection & listeners
    useEffect(() => {
        const socket = io("https://crypto-api-production-7139.up.railway.app");
        socketRef.current = socket;

        const userId = localStorage.getItem("userId");
        if (userId) {
            console.log("📡 Joining room:", userId);
            socket.emit("join", userId);
        }

        socket.on("coin_updated", (data) => {
            if (data.userId?.toString() === userId) {
                const newCoins = parseFloat(data.coins?.$numberDecimal || data.coins || 0);

                if (newCoins > prevCoinsRef.current) {
                    setCoinChangeAnim(true);
                    setTimeout(() => setCoinChangeAnim(false), 200);
                }

                setCoins(newCoins);
                prevCoinsRef.current = newCoins;
            }
        });

        socket.on("session_ended", () => {
            setMiningStartTime(null);
            localStorage.removeItem("miningStartTime");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // ✅ Countdown Timer
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

    // ✅ Start mining button action
    const startMining = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("https://crypto-api-production-7139.up.railway.app/api/user/start-session", {}, {
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
            }
        } catch (err) {
            console.error("Error starting mining:", err);
        }
    };

    return (
        <div className="home-container d-flex flex-column text-white">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="home-content flex-grow-1 mt-5 mb-1">
                <div className="text-center mt-4">
                    <h1 className={`fw-bold display-6 ${coinChangeAnim ? 'coin-animated' : ''}`}>
                        {parseFloat(coins).toFixed(4)}
                    </h1>
                    <div className="dropdown mt-2">
                        <button className="btn btn-dark dropdown-toggle" type="button">
                            ATP BlockDAG Server
                        </button>
                    </div>
                    <div className="text-white small mt-1">0.05 BDAG/h</div>
                </div>

                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div className="power-circle d-flex justify-content-center align-items-center">
                        <FaBolt size={48} color="white" />
                    </div>
                </div>

                <div className="text-center mt-4">
                    {miningStartTime ? (
                        <button className="btn mt-4 btn-success px-5 rounded-pill" disabled>
                            {timeLeft || "Mining..."}
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-primary_2 px-5 mt-5 rounded-pill" onClick={startMining}>
                                Start Mining
                            </button>
                        </>
                    )}
                </div>
            </div>

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
        </div>
    );
};

export default Home;
