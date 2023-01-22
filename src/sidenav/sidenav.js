import React from 'react';
import {Sidebar, Menu, MenuItem, SubMenu, useProSidebar, menuClasses} from "react-pro-sidebar";
import { Diamond } from 'assets/svg/Diamond';
import { BarChart } from 'assets/svg/BarChart';
import { Global } from 'assets/svg/Global';
import { InkBottle } from 'assets/svg/InkBottle';
import { ShoppingCart } from 'assets/svg/ShoppingCart';
import { Service } from 'assets/svg/Service';
import { SidenavHeader } from 'sidenav/components/sidenavHeader';
import { SidenavFooter } from 'sidenav/components/sidenavFooter';
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
            backgroundColor: '#0e3052',
            color: '#b6c8d9',
        },
        active: {
            backgroundColor: '#13395e',
            color: '#b6c8d9',
        },
        disabled: {
            color: '#3e5e7e',
        },
    }
}

export function Sidenav() {
    const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

    const menuItemStyles = {
        root: {
            fontSize: '14px',
            fontWeight: 400,
        },
        icon: {
            color: sidenavColor.menu.icon,
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: {
            backgroundColor: sidenavColor.menu.menuContent,
        },
        button: {
            [`&.${menuClasses.active}`]: {
                backgroundColor: sidenavColor.menu.active.backgroundColor,
                color: sidenavColor.menu.active.color,
            },
            [`&.${menuClasses.disabled}`]: {
                color: sidenavColor.menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: sidenavColor.menu.hover.backgroundColor,
                color: sidenavColor.menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    return (
        <Sidebar
            breakPoint="lg"
            backgroundColor={'transparent'}
            rootStyles={{
                color: 'white',
                margin: '1rem',
                background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
                borderRight: '0',
                borderRadius: '1.25rem',
                width: '15.625rem',
                height: 'calc(100vh - 2rem)',
                overflow: 'hidden',
                inset: '0px',
                backdropFilter: 'blur(120px)'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                inset: '0px',
                overflowX: 'hidden ',
                overflowY: 'scroll '
            }}>
                <SidenavHeader style={{marginBottom: '24px' }} />
                <div style={{ flex: 1, marginBottom: '32px' }}>
                    <div style={{ padding: '0 24px', marginBottom: '8px' }}>
                        <p
                            className="body2"
                            style={{fontWeight: 600, opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                        >
                            General
                        </p>
                    </div>
                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem
                            label="Dashboard"
                            icon={<BarChart />}
                        >
                            Dashboard
                        </MenuItem>
                        <MenuItem
                            label="Staking"
                            icon={<Diamond />}
                        >
                            Staking
                        </MenuItem>
                        <MenuItem
                            label="Projects"
                            icon={<Global />}
                        >
                            Projects
                        </MenuItem>
                        <MenuItem
                            label="Presale"
                            icon={<ShoppingCart />}
                        >
                            Presale
                        </MenuItem>
                    </Menu>

                    <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                        <p
                            className="body2"
                            style={{fontWeight: 600, opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                        >
                            Extra
                        </p>
                    </div>

                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem icon={<InkBottle />}>Blog</MenuItem>
                        <MenuItem icon={<Service />}> Team</MenuItem>
                    </Menu>
                </div>
                <SidenavFooter collapsed={collapsed}/>
            </div>
        </Sidebar>
  )
}
