import React from "react";
import Layout from "layout/layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card, Button } from "react-bootstrap";
import {openInNewTab} from "utils/utilities";
import "assets/css/globals.css";
import {Discord} from "assets/svg/Discord";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from '@mui/material/IconButton';
import WebsiteIcon from '@mui/icons-material/Public';
import FileIcon from '@mui/icons-material/PictureAsPdf';
import TelegramIcon from '@mui/icons-material/Telegram';
import StarIcon from '@mui/icons-material/Star';
import YoutubeIcon from "@mui/icons-material/YouTube";
import CollectionsIcon from '@mui/icons-material/Collections';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


export default function ProjectCard({date, banner, website, linkedin, twitter, facebook, instagram, telegram,
                                        whitepaper, collections, youtube, discord, details, images}) {

    return (
        <div className="project-card mt-4 overflow-hidden">
            <div className="text-center mb-3">
                <p className="text-white h1" color="white">
                    {date}
                </p>
                <Card.Img variant="top" src={banner} className="img-top" />
            </div>
            <div className="d-flex justify-content-center text-white mt-1 mb-3">
                {website ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(website)}>
                        <WebsiteIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {linkedin ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(linkedin)}>
                        <LinkedInIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {twitter ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(twitter)}>
                        <TwitterIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {facebook ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(facebook)}>
                        <FacebookIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {instagram ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(instagram)}>
                        <InstagramIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {telegram ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(telegram)}>
                        <TelegramIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {whitepaper ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(whitepaper)}>
                        <FileIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {collections ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(collections)}>
                        <CollectionsIcon fontSize="small" />
                    </IconButton>
                : ('')
                }
                {youtube ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab(youtube)}>
                        <YoutubeIcon fontSize="small" />
                    </IconButton>
                : ('')}
                {discord ?
                    <IconButton className="float-right text-white" onClick={()=> openInNewTab("https://discord.gg/GKKAmPKKNe")}>
                        <Discord />
                    </IconButton>
                : ('')}
            </div>

            <VerticalTimeline layout="1-column" animate={false}>
                {details.map((element, index) =>(
                    <VerticalTimelineElement
                        key={index}
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff'}}
                        icon={<StarIcon />}
                        style={{color: 'white', backgroundColor: 'transparent'}}
                        contentArrowStyle={{border: 0}}
                        date={false}
                    >
                        <p className="h5 font-bold font-size-sm">{element.title}</p>
                        <p className="mt-1 font-size-xs" style={{textAlign: 'justify'}}>
                            {element.desc}
                        </p>
                    </VerticalTimelineElement>
                ))}
                <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff'}}
                    icon={<StarIcon />}
                    style={{color: 'white', backgroundColor: 'transparent'}}
                    contentArrowStyle={{border: 0}}
                    date={false}
                />
            </VerticalTimeline>

            {images ?
                <Container>
                    <Row className="overflow-hidden">
                        <Col xs={12} className="mt-4">
                            <ImageGallery
                                items={images}
                                showBullets
                                showFullscreenButton={false}
                            />
                        </Col>
                    </Row>
                </Container>
            : ('')}
        </div>
    );
}