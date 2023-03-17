import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function DefaultProjectCard({ image, label, title, description, action, action2 }) {

    return (
        <Card className="border-0" style={{backgroundColor: 'transparent', color: 'white'}}>
            <Card.Img variant="top" src={image} style={{ borderRadius: "15px", height: "250px" }} />

            <div style={{ minHeight: "200px", backgroundColor: 'transparent', textAlign: 'justify' }}>
                <p className="font-size-xxs mb-2 mt-3 text-white opacity-50 text-capitalize">{label}</p>
                <h5>{title}</h5>
                <p className="text-justify opacity-50 font-size-sm mt-3" style={{ minHeight: "135px" }}>
                    {description}
                </p>

                <div className="d-flex align-items-center mt-auto">
                    {action.type === "internal" ? (
                        <Link to={action.route}>
                            <Button className="btn btn-outline-light text-uppercase font-regular" style={{minWidth: '120px'}} size="sm">{action.label}</Button>
                        </Link>
                    ) : (
                        <a href={action.route} target="_blank" rel="noreferrer">
                            <Button className="btn btn-outline-light" style={{minWidth: '120px'}} size="sm">{action.label}</Button>
                        </a>
                    )}

                    {action2 ? (
                        <a href={action2.route} target="_blank" rel="noreferrer">
                            <Button className="btn btn-outline-light ms-2" style={{minWidth: '120px'}} size="sm">{action2.label}</Button>
                        </a>
                    ) : null}
                </div>
            </div>
        </Card>
    );
}
