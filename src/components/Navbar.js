import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlasmacLogoMini from '../images/PlasmacLogoMini.png';
import AppIconMain5 from '../images/App_Icon_Main_5.png';
import AppIconMain9 from '../images/App_Icon_Main_9.png';
import AppIconMain10 from '../images/App_Icon_Main_10.png';
import AppIconMain12 from '../images/App_Icon_Main_12.png';
import AppIconMain13 from '../images/App_Icon_Main_13.png';
import AppIconMain11 from '../images/App_Icon_Main_11.png';

const Navbar = ({ activeTab, setActiveTab }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setMenuOpen(false); // Close the menu on tab selection
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://syncro-group.com/plasmac/">
                    <img src={PlasmacLogoMini} alt="Logo" style={{ width: '30px', height: '30px', backgroundColor: 'transparent' }} />
                    <span className="navbar-text" style={{ color: '#88c1ea', fontFamily: 'Korataki, sans-serif', fontSize: '18px', marginLeft: '10px' }}>
                        PLASMAC WebSupervisor
                    </span>
                </a>

                
                <button className="navbar-toggler mr-auto" type="button" onClick={handleMenuToggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    
                    <ul className="navbar-nav"> {/* ml-auto sposta gli elementi a destra */}
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activeTab === 'home' ? 'active' : ''}`}
                                style={{ backgroundColor: 'transparent', color: '#fff' }}
                                onClick={() => handleTabChange('home')}
                            >
                                <img src={AppIconMain5} alt="Home" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activeTab === 'read' ? 'active' : ''}`}
                                style={{ backgroundColor: 'transparent', color: '#fff' }}
                                onClick={() => handleTabChange('read')}
                            >
                                <img src={AppIconMain9} alt="Read" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activeTab === 'write' ? 'active' : ''}`}
                                style={{ backgroundColor: 'transparent', color: '#fff' }}
                                onClick={() => handleTabChange('write')}
                            >
                                <img src={AppIconMain10} alt="Write" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activeTab === 'config' ? 'active' : ''}`}
                                style={{ backgroundColor: 'transparent', color: '#fff' }}
                                onClick={() => handleTabChange('config')}
                            >
                                <img src={AppIconMain12} alt="Config" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activeTab === 'web' ? 'active' : ''}`}
                                style={{ backgroundColor: 'transparent', color: '#fff' }}
                                onClick={() => handleTabChange('web')}
                            >
                                <img src={AppIconMain13} alt="Web" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activeTab === 'cloud' ? 'active' : ''}`}
                                style={{ backgroundColor: 'transparent', color: '#fff' }}
                                onClick={() => handleTabChange('cloud')}
                            >
                                <img src={AppIconMain11} alt="Cloud" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar
