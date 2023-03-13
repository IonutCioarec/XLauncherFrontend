import React from 'react';
import PropTypes from 'prop-types';

export const Tooltip = ({ text, children, color, backgroundColor }) => {
    const [show, setShow] = React.useState(false);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
                style={{ display: 'inline-block' }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
            {show && (
                <div
                    style={{
                        position: 'absolute',
                        top: '110%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '0.5rem',
                        color: color || 'black',
                        backgroundColor: backgroundColor || 'white',
                        borderRadius: '4px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                        whiteSpace: 'nowrap',
                        fontSize: '14px'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderBottom: `10px solid ${backgroundColor || 'white'}`,
                            zIndex: 2,
                        }}
                    />
                    {text}
                </div>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
};
