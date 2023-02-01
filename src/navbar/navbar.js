import React from "react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account";
import { logout, getIsLoggedIn } from '@multiversx/sdk-dapp/utils';
import { useGetPendingTransactions} from '@multiversx/sdk-dapp/hooks/transactions';
import { ExtensionLoginButton, WalletConnectLoginButton, LedgerLoginButton, WebWalletLoginButton} from "@multiversx/sdk-dapp/UI";
import { useProSidebar } from "react-pro-sidebar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BarChart } from 'assets/svg/BarChart';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {Account} from "utils/multiversX";

export function Navbar() {
    const { toggleSidebar, broken } = useProSidebar();

    let connectSection =
        <Container>
            <Row>
                <Col xs={12} lg={{offset: 4, span: 4}}>
                    <div className="farm-card" >
                        <Button className="float-end">
                            sdsd
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    ;

    if(Account().isLoggedIn){
        return ('');
    }else{
        return (
            broken? (
                <Row>
                    <Col xs={6}>
                        <Button variant="outline-light" size="sm" className="btn btn-block" onClick={() => toggleSidebar()}>
                            <FontAwesomeIcon icon="fa-wallet" style={{marginRight: '5px'}} size={"sm"}/>
                            Menu
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="outline-light" size="sm" className="btn btn-block" onClick={() => toggleSidebar()}>
                            <FontAwesomeIcon icon="fa-wallet" style={{marginRight: '5px'}} size={"sm"}/>
                            Connect
                        </Button>
                    </Col>
                    {connectSection}
                </Row>
            ) : (
                <Container>
                    <Row>
                        <Col lg={{offset: 10, span: 2}}>
                            <Button variant="outline-light" size="sm" className="btn btn-block" onClick={() => toggleSidebar()}>
                                <FontAwesomeIcon icon="fa-wallet" style={{marginRight: '5px'}} size={"sm"}/>
                                Connect
                            </Button>
                        </Col>
                    </Row>
                    {connectSection}
                </Container>
            )
        );
    }
}