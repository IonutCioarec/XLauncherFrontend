import React from "react";
import Layout from 'layout/layout';
import DefaultProjectCard from "cards/DefaultProjectCard";
import profile1 from "assets/images/zero2InfinityMini.jpeg";
import profile2 from "assets/images/estarGamesMini.png";
import profile3 from "assets/images/vestaXFinancesMini2.png";
import profile3b from "assets/images/vestaXFinancesMini.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Projects() {

    let imgSrc = profile3b;
    if (window.innerWidth < 1680) {
        imgSrc = profile3b;
    } else {
        imgSrc = profile3;
    }

    return (
        <Layout>
            <p className="text-white font-bold mt-4 ms-2" style={{fontSize: '40px'}}>Projects</p>
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <div className="project-card mt-4">
                        <DefaultProjectCard
                            image={profile1}
                            label="project #1"
                            title="Zero 2 Infinity"
                            description="
                                Zero 2 Infinity mission: enable people with a project and a passion to place themselves above the Earth
                                in order to collect rich data, take high definition images, manage communications and more, much more.
                            "
                            action={{
                                type: "internal",
                                route: "/projects/zero-2-infinity",
                                color: "white",
                                label: "view",
                            }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <div className="project-card mt-4">
                        <DefaultProjectCard
                            image={profile2}
                            label="project #2"
                            title="Estar.Games"
                            description="
                                ESTAR.GAMES project is aiming to create a vibrant ecosystem of games that shares between
                                them the tokenomics with the central piece being the $ESTAR Token.
                            "
                            action={{
                                type: "internal",
                                route: "/projects/estar-games",
                                color: "white",
                                label: "view",
                            }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <div className="project-card mt-4">
                        <DefaultProjectCard
                            image={imgSrc}
                            label="project #3"
                            title="VestaX.Finance"
                            description= "
                              VestaX.Finance is a community-driven liquid staking DEFI service provider for MultiverseX.
                              VestaX.Finance allows users to stake the native EGLD token and earn staking rewards without locking assets.
                            "
                            action={{
                                type: "internal",
                                route: "/projects/vestax-finance",
                                color: "white",
                                label: "view",
                            }}
                            action2={{
                                route: "https://demiourgos.synaps.me/signup",
                                color: "white",
                                label: "KYC"
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default Projects;