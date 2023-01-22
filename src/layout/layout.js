import React from 'react';
import { Menu, MenuItem, SubMenu, useProSidebar, menuClasses} from "react-pro-sidebar";
import {Sidenav} from "sidenav/sidenav";
import 'assets/css/globals.css';

function Layout (children) {
    const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

    return (
        <div className='page-container'>
            <Sidenav/>

            <main>
                <div style={{ padding: '16px 24px', color: '#44596e' }}>
                    <div style={{ marginBottom: '16px' }}>
                        {broken && (
                            <button className="sb-button" onClick={() => toggleSidebar()}>
                                Toggle
                            </button>
                        )}
                    </div>
                    <div style={{ padding: '0 8px' }}>
                        <div style={{ marginBottom: 16 }}>
                            {/*<Switch*/}
                            {/*    id="collapse"*/}
                            {/*    checked={collapsed}*/}
                            {/*    onChange={() => collapseSidebar()}*/}
                            {/*    label="Menu"*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Layout;