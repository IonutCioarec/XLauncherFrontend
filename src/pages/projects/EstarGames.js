import React from "react";
import Layout from "layout/layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "assets/css/globals.css";
import ProjectCard from "cards/ProjectCard";

import banner from "assets/images/estarGames.jpeg";
const images = [
    {
        original: "https://x-launcher.com/images/estar1.jpg",
        thumbnail: "https://x-launcher.com/images/estar1.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar2.jpg",
        thumbnail: "https://x-launcher.com/images/estar2.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar3.jpg",
        thumbnail: "https://x-launcher.com/images/estar3.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar4.jpg",
        thumbnail: "https://x-launcher.com/images/estar4.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar5.jpg",
        thumbnail: "https://x-launcher.com/images/estar5.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar6.jpg",
        thumbnail: "https://x-launcher.com/images/estar6.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar8.jpg",
        thumbnail: "https://x-launcher.com/images/estar8.jpg",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/estar8.jpg",
        thumbnail: "https://x-launcher.com/images/estar8.jpg",
        originalHeight: "450px"
    }
];

const details = [
    {
        title: "GAMING COMPANY",
        desc: "ESTAR is a Gaming company dedicated to the development of games on the blockchain. We aim to create the best framework that is easy to understand and replicate. The project is aiming to create a vibrant ecosystem of games that shares between them the tokenomics with the central piece being the $ESTAR Token."
    },
    {
        title: "INNOVATION",
        desc: "The first 2 games in the ecosystem, already in development, are EquiStar (horse racing) and EGoal(football manager). To achieve the full maturity of the games and assure the ongoing development, we are creating individual teams for each of them and having regular meetings to share knowledge between the teams."
    },
    {
        title: "TEAM",
        desc: "EquiStar Team - Ichim Edi (back-end) / Butco Constantin (graphic) / Stefana Farcasu (front-end) / Damian; EGoal Team - Damian ( blockchain dev) / Mateusz (front-end); CEO - Sitaru Alexandru; Advisor - Turea Andrei"
    },
    {
        title: "UNIQUE INVESTMENT OPPORTUNITY",
        desc: "A shared economy between games gives our investors a unique opportunity, if one of the games in the ecosystem is going to have a big impact creating hype around it, this is going to increase the overall value for everyone. With a fair distribution and fixed total supply, $ESTAR is going to empower a true revolution in blockchain gaming."
    }
];

export default function EstarGames() {
    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={{offset: 2, span:8}}>
                    <ProjectCard
                        date="29.09.2022"
                        banner={banner}
                        images={images}
                        website="https://equistar.estar.games/"
                        linkedin="https://www.linkedin.com/company/estar-games/"
                        twitter="https://twitter.com/EstarToken"
                        telegram="https://t.me/estartoken"
                        whitepaper="https://estar.games/whitepaper.pdf"
                        collections="https://www.frameit.gg/marketplace/EQUISTAR-3f393f/items"
                        details={details}
                    />
                </Col>
            </Row>
        </Layout>
    );
}