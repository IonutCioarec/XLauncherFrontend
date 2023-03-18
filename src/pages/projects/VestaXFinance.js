import React from "react";
import Layout from "layout/layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "assets/css/globals.css";
import ProjectCard from "cards/ProjectCard";

import banner from "assets/images/vestaXFinances.png";

const details = [
    {
        title: "COMPANY",
        desc: "SC DEMIOURGOS HOLDINGS SA is a company with shareholders in Bucharest, Romania. Own Coding Division is the first blockchain coding company funded and owned by NFT owners on the Elrond Blockchain."
    },
    {
        title: "INTRODUCTION",
        desc: "VestaX.Finance is a community driven liquid staking DEFI service provider for MultiverseX. VestaX.Finance allows users to stake the native EGLD token and earn staking rewards without locking assets. Staking through VestaX.Finance will allow users to unlock the staked EGLD tokens, making them a spendable asset."
    },
    {
        title: "LIQUID-INDEX",
        desc: "Staked EGLD represents a locked asset, which can be unlocked through VestaX.Finance. Users staking EGLD via VestaX.Finance get consumable vEGLD according to vEGLD/EGLD ratio in Liquid-Staking SC, called Liquid-Index."
    },
    {
        title: "SERVICES",
        desc: "Having a free and liquid asset to use anytime without loosing EGLD staking rewards, will unlock an unprecedented amount of liquidity for users, further empowering the MultiverseX economy. This will be a range of services from providing DEX Aggregator services, to minting synthetic stable coins, etc. (e.g. minting synthetic stable coins via vEGLD staking)."
    },
    {
        title: "GOALS",
        desc: "VestaX.Finance aims to enable users to make more efficient use of their capital by rewarding them with liquid EGLD (vEGLD), when staking for the MultiverseX Protocol without losing staking rewards (which are included in Liquid-Index). VestaX.Finance gives users more freedom and flexibility for their funds rather than manually staking with Stake Providers."
    }
];

export default function VestaXFinance() {
    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={{offset: 2, span:8}}>
                    <ProjectCard
                        date="20.01.2023"
                        banner={banner}
                        website="https://vestax.finance/"
                        collections="https://vegld.vestax.finance/"
                        twitter="https://twitter.com/DemiourgosH"
                        telegram="https://t.me/demiourgosRomania"
                        whitepaper="http://vestax.finance/VestaXFinance_whitepaper.pdf"
                        youtube="https://www.youtube.com/c/CarpathianPictures"
                        discord="https://discord.gg/GKKAmPKKNe"
                        details={details}
                    />
                </Col>
            </Row>
        </Layout>
    );
}