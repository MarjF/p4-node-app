import React, { useState } from "react";

const SidebarItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidebar-item ${expanded ? "open" : ""}`}>
      <div className="sidebar-title" onClick={toggleDropdown}>
        <span>
          {item.icon && <img src={item.icon} alt="Icon" className="icon" />}
          <div>{item.title}</div>
        </span>
        {item.childrens && <div className="arrow-icon">&gt;</div>}
      </div>
      {expanded && item.childrens && (
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <div
              key={index}
              className={`s-child ${child.active ? "active" : ""}`}
            >
              <div className="sidebar-item">
                <div className="sidebar-title">
                  <span>
                    {child.icon && (
                      <img src={child.icon} alt="Icon" className="icon" />
                    )}
                    <div>{child.title}</div>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
