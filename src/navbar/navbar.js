import React from "react";
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
import {Account} from "utils/multiversX";


export function Navbar() {
    const { toggleSidebar, broken } = useProSidebar();
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
                                    loginButtonText={"Web wallet"}
                                    className="btn btn-sm dapp-primary font-size-sm w-60"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <LedgerLoginButton
                                    loginButtonText={"Ledger"}
                                    callbackRoute="/"
                                    className="btn btn-sm dapp-primary font-size-sm w-60"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <WalletConnectLoginButton
                                    callbackRoute="/"
                                    loginButtonText={"Maiar"}
                                    className="btn btn-sm dapp-primary font-size-sm w-60"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <ExtensionLoginButton
                                    callbackRoute="/"
                                    loginButtonText={"Extension"}
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

    if(Account().isLoggedIn){
        return (
            broken? (
                <React.Fragment>
                    <Row>p
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
                            >
                                <FontAwesomeIcon icon="fa-user" style={{marginRight: '5px'}} size={"xs"}/>
                                My Account
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
                                >
                                    <FontAwesomeIcon icon="fa-user" style={{marginRight: '5px'}} size={"xs"}/>
                                    My Account
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    {connectSection}
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