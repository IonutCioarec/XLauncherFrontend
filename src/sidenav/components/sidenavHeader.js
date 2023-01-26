import { ReactComponent as XLauncherLogo } from "assets/images/logo.svg";
import 'assets/css/sidenavHeader.css';
import 'assets/css/globals.css';
import React from "react";

export const SidenavHeader = () => {
    return (
        <>
        <div className='styled-sidebar-header'>
            <div className='styled-sidebar-header-div'>
                <XLauncherLogo className="logo"/>
                <p className='logo-text'>
                    XLauncher
                </p>
            </div>
        </div>
            <div className='light-divider'> </div>
        </>
    );
};