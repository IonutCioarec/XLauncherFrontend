import { ReactComponent as XLauncherLogo } from "assets/images/logo.svg";
import 'assets/css/sidenavHeader.css';
import React from "react";

export const SidenavHeader = ({ children, ...rest }) => {
    return (
        <div className='styled_sidebar_header' {...rest}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '24px 32px 8px'
            }}>
                <XLauncherLogo className="logo"/>
                <p className="logo-text">
                    XLauncher
                </p>
            </div>
        </div>
    );
};