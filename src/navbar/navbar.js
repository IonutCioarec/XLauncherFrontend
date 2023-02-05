import React, { useState } from "react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account";
import { logout } from '@multiversx/sdk-dapp/utils';
import { useGetPendingTransactions} from '@multiversx/sdk-dapp/hooks/transactions';
import { ExtensionLoginButton, WalletConnectLoginButton, LedgerLoginButton, WebWalletLoginButton} from "@multiversx/sdk-dapp/UI";
import { useProSidebar } from "react-pro-sidebar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {Account} from "utils/multiversX";
import Modal from 'react-bootstrap/Modal';
import "assets/css/navbar.css";

export function Navbar() {
    //Used to detect mobile screen
    const { toggleSidebar, broken } = useProSidebar();

    // Get the user address
    const { address, account } = useGetAccountInfo();
    const isLoggedIn = Boolean(address);

    //Used for "my account" modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Copy to Clipboard Utility
    const [isCopied, setIsCopied] = React.useState(false);
    function CopyToClipboard(text) {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

    //Show the connect area if user is not logged in
    const [timeToConnect, setTimeToConnect] = React.useState(false);
    let connectSection = timeToConnect ? (
        <Container>
            <Row className="justify-content-start">
                <Col xs={12} lg={{offset: 4, span: 4}} className="text-center">
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
                                    loginButtonText="Maiar"
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
        >
            <Modal.Body>
                <Container className="modal-container">
                    <Row>
                        <Col xs={6}>
                            <p className="h5"> Account Details</p>
                        </Col>
                        <Col xs={6}>
                            <Button
                                size="sm"
                                variant="danger"
                                className="float-end b-r-sm"
                                onClick={handleClose}
                                style={{marginTop: '-20px', marginRight: '-15px'}}
                            >
                                <FontAwesomeIcon icon="fa-xmark" size="sm" />
                            </Button>
                        </Col>
                    </Row>
                    <Container>
                    <Row>
                        <Col xs={12}>
                            <p className="h6 font-medium text-primary text-center mt-2">
                                Address:
                            </p>
                            <div className="light-divider" style={{width: '100%', marginLeft: 0}}> </div>
                            <Row>
                                <Col xs={10}>
                                    <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
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
                                            <Col xs={6}>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                            </Col>
                                            <Col xs={6} >
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <p className="h6 font-medium text-primary text-center mt-4">
                                    NFTS:
                                </p>
                                <div className="light-divider" style={{width: '100%', marginLeft: 0}}> </div>
                                <Row>
                                    <Col xs={12} className="overflow-item" style={{height: '100%'}}>
                                        <Row>
                                            <Col xs={6}>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                            </Col>
                                            <Col xs={6} >
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                                <p className="font-size-xs font-lighter">{address.slice(0,20)} ... {address.slice(50,62)}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
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
                            <Col lg={{offset: 10, span: 2}}>
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
                            <Col lg={{offset: 10, span: 2}}>
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