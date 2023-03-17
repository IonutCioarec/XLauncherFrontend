import "assets/css/staking.css";
import "assets/css/globals.css";
import React from "react";
import XLHLogo from "assets/images/logo.svg";
import Image from "react-bootstrap/Image";
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


export default function CompleteStakingCard({claimUnstake, methodCU, claimUnstakedAmount, claimUnstakedEntry}) {

    return (
        <div className="farming-card" style={{minHeight: '100px'}}>
            <div className="d-flex mb-4 align-items-center">
                <Image
                    width={42}
                    height={35}
                    alt="18x18"
                    src={XLHLogo}
                />
                <div className="ms-2">
                    <p className="farm-title">Claim Unstaked XLH</p>
                    <p className="locked-text">10 Days Locked</p>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-between align-items-end">
                    <p className="details-text">My Unstaked XLH:</p>
                    <p className="details-text text-white">{claimUnstakedAmount}</p>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <p className="details-text">Unlocking Date:</p>
                    <p className="details-text text-white">{claimUnstakedEntry}</p>
                </div>
            </div>
            <div className="light-divider" style={{ width: '100%', marginLeft: 0, marginBottom: '5px' }}> </div>

            <Row>
                <Col xs={12} md={12} lg={12} className="mt-2">
                    <Button
                        variant={claimUnstake.color}
                        size={claimUnstake.size}
                        className="btn btn-block farms-button"
                        style={{minWidth: "90px"}}
                        onClick={methodCU}
                        disabled={claimUnstake.disabled}
                    >
                        {claimUnstake.label}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
