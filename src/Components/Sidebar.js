import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import './SidebarLayout.css';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    const handleSignOut = () => {
        localStorage.removeItem('tokenUser');
        setShowLogoutConfirm(false);
        navigate('/login');
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }
    }, [isOpen]);

    return (
        <>
            {/* Top Navbar */}
            <nav className="navbar navbar-dark bg-dark px-3 fixed-top" style={{ zIndex: 1020 }}>
                <button className="btn btn-dark" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <span className="navbar-brand ms-2">RabbitXQ</span>
            </nav>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span className="sidebar-logo">RabbitXQ</span>
                    <button className="close-btn" onClick={closeSidebar}><FaTimes /></button>
                </div>
                <ul>
                    <Link to="/home" className="text-white text-decoration-none"><li><FaHome className='me-2 fs-3 text-purple' />Home</li></Link>
                    <Link to="/rabbit-release" className="text-white text-decoration-none"><li><IoRocket className='me-2 fs-3 text-purple' />Rabbit Releases</li></Link>
                    <Link to="/group" className="text-white text-decoration-none"><li><MdGroups className='me-2 fs-3 text-purple' />Group</li></Link>
                    <Link to="/leaderboard" className="text-white text-decoration-none"><li><MdLeaderboard className='me-2 fs-3 text-purple' />LeaderBoard</li></Link>
                    <Link to="/profile" className="text-white text-decoration-none"><li><IoSettings className='me-2 fs-3 text-purple' />Setting</li></Link>
                    <Link to="#" className="text-white text-decoration-none"><li><FaQuestionCircle className='me-2 fs-3 text-purple' />FAQ</li></Link>
                    <span className="text-white text-decoration-none" onClick={() => setShowLogoutConfirm(true)}>
                        <li><FaSignOutAlt className='me-2 fs-3 text-purple' />Sign Out</li>
                    </span>
                </ul>
            </div>

            {/* Backdrop */}
            {isOpen && <div className="backdrop" onClick={closeSidebar}></div>}

            {/* Main Content */}
            <div className={`main-content ${isOpen ? 'blur' : ''}`}>
                {children}
            </div>

            {/* Logout Confirmation Popup */}
            {showLogoutConfirm && (
                <div className="logout-popup d-flex flex-column justify-content-center align-items-center text-white">
                    <div className="popup-inner p-3 text-center">
                        <p className="mb-2 fw-bold">Are you sure you want to sign out?</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-sm btn-light" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                            <button className="btn btn-sm btn-danger" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
