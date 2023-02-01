import { ReactComponent as XLauncherLogo } from "assets/images/logo.svg";
import { useProSidebar } from "react-pro-sidebar";
import 'assets/css/sidenavHeader.css';
import 'assets/css/globals.css';
import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SidenavHeader = () => {
    const { toggleSidebar, broken } = useProSidebar();
    return (
        <React.Fragment>
            <div className='styled-sidebar-header'>
                <div className='styled-sidebar-header-div'>
                    <XLauncherLogo className="logo"/>
                    <p className='logo-text'>
                        XLauncher
                    </p>
                </div>
                {broken ? (
                    <Button variant="link" size="sm" style={{width: '40px', marginLeft: '-20px'}} onClick={() => toggleSidebar()}>
                        <FontAwesomeIcon icon="fa-circle-xmark" />
                    </Button>
                ):(
                    ''
                )}
            </div>
            <div className='light-divider'> </div>
        </React.Fragment>
    );
};