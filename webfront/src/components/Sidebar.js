import React, { useState } from 'react';

import { BiCabinet } from "react-icons/bi";
import { MdSettingsInputAntenna } from "react-icons/md";
import { RiMailSettingsLine } from "react-icons/ri";
import { MdOutlineInfo } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

import { NavLink } from 'react-router-dom';

import './styles/sidebar.css';



const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"depot",
            icon:<BiCabinet/>
        },
        {
            path:"/Connection",
            name:"connection",
            icon:<MdSettingsInputAntenna/>
        },
        {
            path:"/MailSettings",
            name:"Mail settings",
            icon:<RiMailSettingsLine/>
        },
        {
            path:"/Info",
            name:"info",
            icon:<MdOutlineInfo/>
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "220px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">ELAB DEPOT</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="burger">
                       <FiMenu onClick={toggle} className="burger-img"/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;