import React, { useState } from "react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account";
import { logout } from '@multiversx/sdk-dapp/utils';
import { ExtensionLoginButton, WalletConnectLoginButton, LedgerLoginButton, WebWalletLoginButton} from "@multiversx/sdk-dapp/UI";
import { useProSidebar } from "react-pro-sidebar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';
import "assets/css/navbar.css";
import RustLogo from "assets/images/rockets/rust.png";
import BronzeLogo from "assets/images/rockets/bronze.png";
import SilverLogo from "assets/images/rockets/silver.png";
import GoldLogo from "assets/images/rockets/gold.png";
import PlatinumLogo from "assets/images/rockets/platinum.png";
import LegendaryLogo from "assets/images/rockets/legendary.png";
import XLHLogo from "assets/images/logo.svg";
import EGLDLogo from "assets/images/egld-logo.svg";
import Image from "react-bootstrap/Image";
import {multiplier, calc2} from "utils/utilities";
import {allTokens, customConfig, defaultWalletData, networkId} from "config/customConfig";
import {getAccountNFTS, getAccountTokens} from "utils/api";

export function Navbar() {
    //Used to detect mobile screen
    const {toggleSidebar, broken} = useProSidebar();

    //Set the config network
    const config = customConfig[networkId];
    const tokens = allTokens[networkId];

    //Get the user address
    const {address, account} = useGetAccountInfo();
    const isLoggedIn = Boolean(address);

    //Tokens + NFTS APIs
    const tokensAPI = config.apiLink + address + '/tokens?size=2000';
    const nftsAPI = config.apiLink + address + '/nfts?size=1000';

    const [walletData, setWalletData] = useState(defaultWalletData);
    const getWalletData = async () => {
        const newTokenList = await getAccountTokens(tokensAPI, tokens);
        const newNftsList = await getAccountNFTS(nftsAPI);
        setWalletData({
            tokens: newTokenList,
            nfts: newNftsList
        })
    }

    //Used for "my account" modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getWalletData();
    }

    //Copy to Clipboard Utility
    const [isCopied, setIsCopied] = React.useState(false);
    function CopyToClipboard(text) {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

    let accountBalance = 0.00;
    if(account.balance && account.balance !== "..." && !isNaN(account.balance)  && isLoggedIn){
        accountBalance = calc2(account.balance / multiplier);
    }

    //Show the connect area if user is not logged in
    const [timeToConnect, setTimeToConnect] = React.useState(false);
    let connectSection = timeToConnect ? (
            <Container>
                <Row className="justify-content-start">
                    <Col xs={12} md={{offset: 2, span: 6}} lg={{offset: 4, span: 4}} className="text-center">
                        <div className="farm-card" >
                            <Row>
                                <Col>
                                    <Button
                                        variant="light" size="sm"
                                        className="btn btn-light float-end"
                                        style={{width: '30px'}}
                                        onClick={() =>  setTimeToConnect(false)}
                                    >
                                        <FontAwesomeIcon icon="fa-xmark" />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="h6 text-white font-size-lg">Connect to a wallet</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <WebWalletLoginButton
                                        callbackRoute="/"
                                        loginButtonText="Web wallet"
                                        className="btn btn-sm dapp-primary font-size-sm w-60"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <LedgerLoginButton
                                        loginButtonText="Ledger"
                                        callbackRoute="/"
                                        className="btn btn-sm dapp-primary font-size-sm w-60"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <WalletConnectLoginButton
                                        callbackRoute="/"
                                        loginButtonText={"xPortal App"}
                                        isWalletConnectV2={true}
                                        className="btn btn-sm dapp-primary font-size-sm w-60"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <ExtensionLoginButton
                                        callbackRoute="/"
                                        loginButtonText="Extension"
                                        className="btn btn-block btn-sm dapp-primary font-size-sm w-60 mt-1"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        ): (
            ''
        )
    ;

    let accountModal =
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="sm"
        >
            <Modal.Body>
                <Container className="modal-container">
                    <Row>
                        <Col xs={6}>
                            <p className="h5" style={{marginLeft: '12px'}}> Account Details</p>
                        </Col>
                        <Col xs={6}>
                            <Button
                                size="sm"
                                variant="danger"
                                className="float-end b-r-sm"
                                onClick={handleClose}
                                style={{marginTop: '-10px', marginRight: '12px'}}
                            >
                                <FontAwesomeIcon icon="fa-xmark" size="sm" />
                            </Button>
                        </Col>
                    </Row>
                    <Container>
                        <Row>
                            <Col xs={12} className="text-center">
                                <p className="h6 font-medium text-primary text-center mt-2">
                                    Address:
                                </p>
                                <div className="light-divider" style={{width: '100%', marginLeft: 0}}> </div>
                                <Row>
                                    <Col xs={10}>
                                        <p className="font-size-sm font-lighter">{address.slice(0,17)} ... {address.slice(50,62)}</p>
                                    </Col>
                                    <Col xs={2}>
                                        {!isCopied ? (
                                            <Button
                                                variant="link"
                                                onClick={() => CopyToClipboard(address)}
                                                className="text-white m-t-n-sm"
                                            >
                                                <FontAwesomeIcon icon={faCopy} />
                                            </Button>
                                        ):(
                                            <Button
                                                variant="link"
                                                className="text-white m-t-n-sm"
                                            >
                                                <FontAwesomeIcon icon="fa-check" />
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <p className="h6 font-medium text-primary text-center mt-4">
                                    Tokens:
                                </p>
                                <div className="light-divider" style={{width: '100%', marginLeft: 0}}> </div>
                                <Row>
                                    <Col xs={12} className="overflow-item" style={{height: '100%'}}>
                                        <Row>
                                            <Col xs={{offset: 1, span: 5}}>
                                                <Image
                                                    width={18}
                                                    height={18}
                                                    alt="18x18"
                                                    src={XLHLogo}
                                                    style={{marginTop: '-3px', marginRight: '5px'}}
                                                />
                                                <p className="font-size-sm d-inline">XLH: {walletData.tokens.xlh}</p>
                                            </Col>
                                            <Col xs={{offset: 1, span: 5}}>
                                                <Image
                                                    width={16}
                                                    height={16}
                                                    alt="16x16"
                                                    src={EGLDLogo}
                                                    style={{marginTop: '-3px', marginRight: '5px'}}
                                                    className="inverted-icon"
                                                />
                                                <p className="font-size-sm d-inline">
                                                    EGLD: {accountBalance}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col xs={12} className="text-center">
                                        <p className="h6 text-primary text-center mt-5">
                                            XLH Origins NFTS ({Object.values(walletData.nfts.xlhOrigins).reduce((acc, val) => acc + val, 0)}):
                                        </p>
                                        <div className="light-divider" style={{width: '100%', marginLeft: 0}}> </div>
                                        <Row>
                                            <Col xs={4}>
                                                <Image
                                                    width={25}
                                                    height={26}
                                                    alt="25x26"
                                                    src={RustLogo}
                                                />
                                                <p className="font-size-sm">Rust: {walletData.nfts.xlhOrigins.rust}</p>
                                            </Col>
                                            <Col xs={4}>
                                                <Image
                                                    width={25}
                                                    height={26}
                                                    alt="25x26"
                                                    src={BronzeLogo}
                                                />
                                                <p className="font-size-sm">Bronze: {walletData.nfts.xlhOrigins.bronze}</p>
                                            </Col>
                                            <Col xs={4}>
                                                <Image
                                                    width={25}
                                                    height={26}
                                                    alt="25x26"
                                                    src={SilverLogo}
                                                />
                                                <p className="font-size-sm">Silver: {walletData.nfts.xlhOrigins.silver}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                                <Image
                                                    width={25}
                                                    height={26}
                                                    alt="25x26"
                                                    src={GoldLogo}
                                                />
                                                <p className="font-size-sm ">Gold: {walletData.nfts.xlhOrigins.gold}</p>
                                            </Col>
                                            <Col xs={4}>
                                                <Image
                                                    width={25}
                                                    height={26}
                                                    alt="25x26"
                                                    src={PlatinumLogo}
                                                />
                                                <p className="font-size-sm">Platinum: {walletData.nfts.xlhOrigins.platinum}</p>
                                            </Col>
                                            <Col xs={4}>
                                                <Image
                                                    width={25}
                                                    height={26}
                                                    alt="25x26"
                                                    src={LegendaryLogo}
                                                />
                                                <p className="font-size-sm">Legendary: {walletData.nfts.xlhOrigins.legendary}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col cs={12} className="mt-3 text-center">
                                <Button
                                    variant="primary"
                                    className="text-white btn-block"
                                    onClick={() => logout(`${window.location.origin}/`)}
                                >
                                    <FontAwesomeIcon icon={faPowerOff} style={{marginRight: '5px'}}/>
                                    Logout
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Modal.Body>
        </Modal>
    ;

    if(isLoggedIn){
        return (
            broken? (
                <React.Fragment>
                    <Row>
                        <Col xs={6}>
                            <Button
                                variant="outline-light"
                                size="sm"
                                className="btn btn-block"
                                onClick={() => toggleSidebar()}
                            >
                                <FontAwesomeIcon icon="fa-bars" style={{marginRight: '5px'}} size={"xs"}/>
                                Menu
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                variant="outline-light"
                                size="sm"
                                className="btn btn-block"
                                onClick={handleShow}
                            >
                                <FontAwesomeIcon icon="fa-user" style={{marginRight: '5px'}} size={"xs"}/>
                                My Account
                            </Button>
                        </Col>
                        <Col xs={12}>
                            {accountModal}
                        </Col>
                    </Row>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Container>
                        <Row>
                            <Col xs={{offset: 10, span: 2}}>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="btn btn-block"
                                    onClick={handleShow}
                                >
                                    <FontAwesomeIcon icon="fa-user" style={{marginRight: '5px'}} size={"xs"}/>
                                    My Account
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Col xs={12}>
                        {accountModal}
                    </Col>
                </React.Fragment>
            )
        );
    }else{
        return (
            broken? (
                <React.Fragment>
                    <Row>
                        <Col xs={6}>
                            <Button
                                variant="outline-light"
                                size="sm"
                                className="btn btn-block"
                                onClick={() => toggleSidebar()}
                            >
                                <FontAwesomeIcon icon="fa-bars" style={{marginRight: '5px'}} size={"xs"}/>
                                Menu
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                variant="outline-light"
                                size="sm"
                                className="btn btn-block"
                                onClick={() =>  setTimeToConnect(prevCheck => !prevCheck)}
                            >
                                <FontAwesomeIcon icon="fa-wallet" style={{marginRight: '5px'}} size={"xs"}/>
                                Connect
                            </Button>
                        </Col>
                        {connectSection}
                    </Row>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Container>
                        <Row>
                            <Col xs={{offset: 10, span: 2}}>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="btn btn-block"
                                    onClick={() =>  setTimeToConnect(prevCheck => !prevCheck)}
                                >
                                    <FontAwesomeIcon icon="fa-wallet" style={{marginRight: '5px'}} size={"xs"}/>
                                    Connect
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    {connectSection}
                </React.Fragment>
            )
        );
    }
}