import React from "react";
import Layout from "layout/layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "assets/css/globals.css";
import ProjectCard from "cards/ProjectCard";

import banner from "assets/images/zero2Infinity.jpeg";
const images = [
    {
        original: "https://x-launcher.com/images/zero2Inf1.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf1.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf2.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf2.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf3.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf3.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf4.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf4.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf5.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf5.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf6.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf6.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf7.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf7.png",
        originalHeight: "450px"
    },
    {
        original: "https://x-launcher.com/images/zero2Inf8.png",
        thumbnail: "https://x-launcher.com/images/zero2Inf8.png",
        originalHeight: "450px"
    }
];

const details = [
    {
        title: "SPACE TRANSPORTATION",
        desc: "Zero 2 Infinity is a Zero Emissions space transportation company. It’s arguably the first NewSpace company in continental Europe. With the mission to facilitate access to Space for all, Z2I has developed unique Lighter-Than-Air solutions that meet the challenges of the 21st Century."
    },
    {
        title: "ELEVATE",
        desc: "Elevate is a stratospheric transportation service, offered by Zero 2 Infinity. By leveraging high altitude balloons, ELEVATE covers from launch to recovery to bring you equipment above 90% of the atmosphere."
    },
    {
        title: "BLOON",
        desc: "Z2I was the first organisation to propose a balloon flight to Near-Space as a commercial enterprise. In a 2002 paper, Jose outlined the feasibility of such a project which has resulted in the development of bloon. Bloon exists to unlock the huge potential of space tourism in a safe, affordable and clean way."
    },
    {
        title: "BLOOSTAR",
        desc: "Bloostar places your satellite in the orbit you want. We ensure you are ready to launch by testing your satellite in Near Space."
    }
];

export default function Zero2Infinity() {
    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={{offset: 2, span:8}}>
                    <ProjectCard
                        date="05.08.2022"
                        banner={banner}
                        images={images}
                        website="https://www.zero2infinity.space/"
                        linkedin="https://www.linkedin.com/company/zero2infinity/"
                        facebook="https://www.facebook.com/zero2infinity"
                        twitter="https://twitter.com/zero2infinity"
                        instagram="https://www.instagram.com/zero2infinity.space"
                        telegram="https://t.me/Zero2Infinity_Community"
                        whitepaper="https://x-launcher.com/files/Zero2InfinityWhitepaper.pdf"
                        details={details}
                    />
                </Col>
            </Row>
        </Layout>
    );
}