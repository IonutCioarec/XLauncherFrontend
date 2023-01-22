import { Book } from 'assets/svg/Book';
import 'assets/css/sidenavFooter.css';
import React from "react";

const codeUrl =
    'https://x-launcher.com/files/Whitepaper.pdf';

export const SidenavFooter = ({ children, collapsed, ...rest }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '20px',
            }}
        >
            {collapsed ? (
                <a href={codeUrl} target="_blank" className='styled_collapsed_sidebar_footer' style={{marginTop: '141px'}}>
                    <Book size={28} />
                </a>
            ) : (
                <div className='styled_sidebar_footer' {...rest}>
                    <div style={{ marginBottom: '12px' }}>
                        <Book size={30} />
                    </div>
                    <p style={{fontWeight: 600}}>XLauncher</p>
                    <p className='caption' style={{ letterSpacing: 1, opacity: 0.7 }}>
                        Whitepaper
                    </p>
                    <div style={{ marginTop: '16px' }}>
                        <a href={codeUrl} target="_blank" className='styled_button'>
                            <p className='caption' style={{fontWeight: 600, color: "#607489"}}>
                                View file
                            </p>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};