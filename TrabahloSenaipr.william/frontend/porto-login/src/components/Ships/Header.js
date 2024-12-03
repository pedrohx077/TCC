import React from 'react';
import './Ships.css'; 
const Header = () => {
  return (
    <div className="header-container">
      <div className="header-title">Milkspace</div>
      <div className="header-icons">
        <div className="header-icon icon-ship"></div>
        <div className="header-icon icon-phone"></div>
        <div className="header-icon icon-home"></div>
      </div>
    </div>
  );
};

export default Header;
