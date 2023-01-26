import React from 'react';
import { Menu, MenuItem, SubMenu, useProSidebar, menuClasses} from "react-pro-sidebar";
import {Sidenav} from "sidenav/sidenav";
import 'assets/css/globals.css';

function Layout(props) {
    const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

    return (
        <div className='page-container'>
            <Sidenav/>
            <main>
                <div style={{ marginBottom: '16px', marginLeft: '300px'}}>
                    <button className="sb-button" onClick={() => toggleSidebar()}>
                        Toggle
                    </button>
                </div>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;