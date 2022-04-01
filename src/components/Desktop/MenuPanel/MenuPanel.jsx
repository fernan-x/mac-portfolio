import React from "react";
import ClickAwayListener from "react-click-away-listener";

import "./MenuPanel.scss";

const MenuPanel = ({ isOpen, closePanel, openApplication }) => {
  return (
    isOpen && (
      <div className="menu-panel">
        <ClickAwayListener onClickAway={closePanel}>
          <div style={{ width: "100%" }}>
            <ul className="menu-panel__entries">
              <li
                className="menu-panel__entries-label"
                onClick={() => {
                  closePanel();
                  openApplication("about");
                }}
              >
                About This Mac
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li
                className="menu-panel__entries-label"
                onClick={() => {
                  closePanel();
                  openApplication("settings");
                }}
              >
                System Preferences
              </li>
              <li className="menu-panel__entries-label disabled">App Store</li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                Recent Items
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                Force Quit Finder
              </li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">Sleep</li>
              <li className="menu-panel__entries-label disabled">Restart</li>
              <li className="menu-panel__entries-label disabled">Shut Down</li>
            </ul>
            <ul className="menu-panel__entries">
              <li className="menu-panel__entries-label disabled">
                Lock Screen
              </li>
              <li className="menu-panel__entries-label disabled">
                Log Out Big Sur
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      </div>
    )
  );
};

export default MenuPanel;
