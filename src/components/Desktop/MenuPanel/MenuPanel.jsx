import React from "react";

import "./MenuPanel.scss";

const MenuPanel = () => {
  return (
    <div className="menu-panel">
      <ul className="menu-panel__entries">
        <li className="menu-panel__entries-label">About This Mac</li>
      </ul>
      <ul className="menu-panel__entries">
        <li className="menu-panel__entries-label">System Preferences</li>
        <li className="menu-panel__entries-label">App Store</li>
      </ul>
      <ul className="menu-panel__entries">
        <li className="menu-panel__entries-label">Recent Items</li>
      </ul>
      <ul className="menu-panel__entries">
        <li className="menu-panel__entries-label">Force Quit Finder</li>
      </ul>
      <ul className="menu-panel__entries">
        <li className="menu-panel__entries-label">Sleep</li>
        <li className="menu-panel__entries-label">Restart</li>
        <li className="menu-panel__entries-label">Shut Down</li>
      </ul>
      <ul className="menu-panel__entries">
        <li className="menu-panel__entries-label">Lock Screen</li>
        <li className="menu-panel__entries-label">Log Out Big Sur</li>
      </ul>
    </div>
  );
};

export default MenuPanel;
