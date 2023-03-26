import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { BarChart } from 'assets/svg/BarChart';
import { Stake } from "assets/svg/Stake";
import { Cubes } from "assets/svg/Cubes";
import { ShoppingCart } from 'assets/svg/ShoppingCart';
import { Users } from 'assets/svg/Users';
import { MicroBlog } from 'assets/svg/MicroBlog';
import { FilePen } from "assets/svg/FilePen";
import { SidenavHeader } from 'sidenav/components/sidenavHeader';
import { SidenavFooter } from 'sidenav/components/sidenavFooter';
import FilterIcon from '@mui/icons-material/Filter';
import 'assets/css/sidenav.css';


const sidenavColor = {
    sidebar: {
        backgroundColor: '#0b2948',
        color: 'white',
    },
    menu: {
        menuContent: '#082440',
        icon: '#59d0ff',
        hover: {
            backgroundColor: 'inherit',
            color: '#0075ff'
        },
        active: {
            backgroundColor: '#0C2959',
            color: 'white',
        },
        disabled: {
            color: '#3e5e7e',
        },
    }
}

export function Sidenav() {
    const menuItemStyles = {
        root: {
            fontSize: '0.875rem',
            fontWeight: 400,
            fontFamily: '"Plus Jakarta Display", Helvetica, Arial, sans-serif'
        },
        icon: {
            color: '#0075ff',
            boxShadow: '2px 2px 60px 0px #1a1f37 inset',
            borderRadius: '10px',
            marginLeft: '0.8rem',
        },
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: sidenavColor.menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: sidenavColor.menu.hover.backgroundColor,
                color: sidenavColor.menu.hover.color
            },
        }
    };

    return (
        <Sidebar
            breakPoint="lg"
            backgroundColor={'transparent'}
            className="sidebar"
            rootStyles={{
                border: 'none',
                position: 'sticky',
                top: '2.2%'
            }}
        >
            <div className='sidebar-container'>
                <SidenavHeader/>
                <div style={{ flex: 1}}>
                    <div className='sidebar-label-divider'>
                        <p> General </p>
                    </div>
                    <Menu menuItemStyles={menuItemStyles}>
                        {/*<MenuItem*/}
                        {/*    label="Dashboard"*/}
                        {/*    icon={<BarChart />}*/}
                        {/*    component={<Link to="/dashboard"/>}*/}
                        {/*    active={window.location.pathname === "/dashboard" || window.location.pathname === "/"}*/}
                        {/*>*/}
                        {/*    Dashboard*/}
                        {/*</MenuItem>*/}
                        <MenuItem
                            label="Staking"
                            icon={<Stake />}
                            component={<Link to="/staking"/>}
                            active={window.location.pathname === "/staking" || window.location.pathname === "/"}
                        >
                            Staking
                        </MenuItem>
                        <MenuItem
                            label="Projects"
                            icon={<Cubes />}
                            component={<Link to="/projects"/>}
                            active={window.location.pathname === "/projects"}
                        >
                            Projects
                        </MenuItem>
                        <MenuItem
                            icon={<FilterIcon />}
                            component={<a href="https://xoxno.com/collection/XLHO-5135c9?filters=%7B%22name%22%3A%22%22%2C%22order%22%3A%22Price%3A+Low+to+High%22%2C%22orderValue%22%3A%22saleInfoNft%2Fmin_bid_short+asc%22%2C%22tokens%22%3A%5B%5D%2C%22attributes%22%3A%5B%5D%2C%22saleType%22%3A%22Nft%22%2C%22tab%22%3A%22Staking%22%2C%22viewMode%22%3A%22cards%22%7D" target="_blank" rel="noreferrer"> </a>}
                        >
                            Stake NFTS
                        </MenuItem>
                        <MenuItem
                            label="Lottery"
                            icon={<ShoppingCart />}
                            component={<Link to="/lottery/bloodshed"/>}
                            active={window.location.pathname === "/presale/bloodshed"}
                        >
                            Lottery
                        </MenuItem>
                    </Menu>

                    <div className='sidebar-label-divider'>
                        <p style={{marginTop: '5px'}}> Extra </p>
                    </div>

                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem
                            icon={<FilePen />}
                            component={<a href="https://docs.google.com/forms/d/e/1FAIpQLSf69Ulfxxb6TErJJFpGIqtG0TG-ZM1o_CC0b4AR9GjyYA7T2Q/viewform" target="_blank" rel="noreferrer"> </a>}
                        >
                            Apply to us
                        </MenuItem>
                        <MenuItem
                            icon={<MicroBlog />}
                            component={<a href="https://medium.com/@xlauncher" target="_blank" rel="noreferrer"> </a>}
                        >
                            Blog
                        </MenuItem>
                        {/*<MenuItem*/}
                        {/*    label="Team"*/}
                        {/*    icon={<Users />}*/}
                        {/*    component={<Link to="/team"/>}*/}
                        {/*    active={window.location.pathname === "/team"}*/}
                        {/*>*/}
                        {/*    Team*/}
                        {/*</MenuItem>*/}
                    </Menu>
                </div>
                <SidenavFooter/>
            </div>
        </Sidebar>
  )
}
