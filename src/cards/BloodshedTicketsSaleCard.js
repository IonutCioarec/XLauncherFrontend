import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus, faShop, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Card } from "react-bootstrap";
import image from "assets/images/bloodshed3.jpg";
import imageTitle from "assets/images/bloodshed_title.png";
import logoTitle from "assets/images/zalmoxis_logo.png";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import {openInNewTab} from "utils/utilities";

export default function BloodshedTicketsSaleCard({
  buyTickets,
  disabledVar,
  vegldBalance,
  totalNumberOfTicketsForAddress,
  isWhitelisted
}) {
  const [ticketsNumber, setTicketsNumber] = React.useState(1);
  const isLoggedIn = useGetIsLoggedIn();
  //slider
  const handleSliderChangeS = (event) => {
    setTicketsNumber(event.target.value);
  };

  //input
  const handleInputChangeS = (event) => {
    setTicketsNumber(event.target.value);
  };

  //+/- buttons
  const increaseAmount = (amount) => {
    let newValue = ticketsNumber + amount;
    setTicketsNumber(newValue);
  };

  const decreaseAmount = (amount) => {
    let newValue = ticketsNumber - amount;
    if (newValue > 0) {
      setTicketsNumber(newValue);
    }
  };

  // let label = "Tickets";
  // if(ticketsNumber === 1) label = "Ticket";
  const getBuyButton = () => {
    if (vegldBalance > ticketsNumber) {
      return (
        <Button
          className="btn btn-block btn-sm btn-info mt-3"
          style={{ minWidth: "90px" }}
        >
          Insufficient vEGLD
        </Button>
      );
    } else {
      return (
        <Button
          className="btn btn-block btn-sm btn-info mt-3"
          style={{ minWidth: "90px" }}
          onClick={() => buyTickets(ticketsNumber)}
        >
          Buy Tickets
        </Button>
      );
    }
  };

  return (
    <div className="farm-card">
      <Row>
        <Col xs={12}>
          <Card.Img variant="top" src={imageTitle} />
          <Card.Img
            variant="top"
            src={"https://bloodshed.gg/sold.jpg"}
            style={{ borderRadius: "15px", height: "250px" }}
          />
          <Card.Img
            variant="top"
            src={logoTitle}
            style={{ height: "70px", width: "140px", marginTop: "-80px" }}
          />
        </Col>
        <Col xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <p className="h3 text-white mt-3">
              {ticketsNumber} Ticket{ticketsNumber > 1 ? "s" : ""}
            </p>
          </Box>
        </Col>
        <Col xs={12}>
          <div
            className="light-divider"
            style={{ width: "100%", marginLeft: 0 }}
          >
            {" "}
          </div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <p className="h4 text-white">{ticketsNumber} vEGLD</p>
          </Box>
        </Col>

        <Col xs={1}> </Col>
        <Col xs={10}>
          <div className="light-divider"> </div>
          <Input
            value={ticketsNumber}
            size="small"
            placeholder="Mint Amount"
            onChange={handleInputChangeS}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            disableUnderline
            // disabled={disabledVar}
            className="text-white ps-3 pe-5 pt-1 b-r-md"
            style={{ border: "0.5px solid rgb(74, 85, 104)", width: "100%" }}
          />
          <Slider
            value={ticketsNumber}
            onChange={handleSliderChangeS}
            step={1}
            min={1}
            max={500}
            // disabled={disabledVar}
          />
        </Col>
        <Col xs={1}> </Col>

        <Col xs={{ offset: 1, span: 10 }}>
          <Box mb={3}>
            <div
              className="light-divider"
              style={{ width: "100%", marginLeft: 0 }}
            >
              {" "}
            </div>
          </Box>
          <Col xs={12}>
            <Button
              variant="success"
              className="btn btn-sm btn-block"
              // disabled={disabledVar}
              onClick={() => increaseAmount(1)}
            >
              <FontAwesomeIcon fontSize={"medium"} icon={faAdd} color="white" />
              <span className="ms-2">Buy more</span>
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              variant="danger"
              className="btn btn-sm btn-block mt-1"
              // disabled={disabledVar}
              onClick={() => decreaseAmount(1)}
            >
              <FontAwesomeIcon
                fontSize={"medium"}
                icon={faMinus}
                color="white"
                style={{ marginLeft: "-9px" }}
              />
              <span className="ms-2">Buy less</span>
            </Button>
          </Col>
          <Col xs={12}>
            <Button
                variant="info"
                className="btn btn-sm btn-block mt-1"
                // disabled={disabledVar}
                onClick={() => openInNewTab("https://vegld.vestax.finance/")}
            >
              <FontAwesomeIcon fontSize={"medium"} icon={faShoppingCart} color="white" />
              <span className="ms-2">Get vEGLD</span>
            </Button>
          </Col>
        </Col>
        <Col xs={1}> </Col>

        <Col xs={12} mt={1}>
          <Box mt={2} mb={2}>
            <div
              className="light-divider"
              style={{ width: "100%", marginLeft: 0 }}
            >
              {" "}
            </div>
          </Box>
        </Col>
        <Col xs={12}>
          <p className="font-bold text-white text-uppercase">You can buy one time only</p>
        </Col>
        {(totalNumberOfTicketsForAddress <= 0 && isWhitelisted) && <Col xs={12}>{getBuyButton()}</Col>}
        {!isLoggedIn && <Col xs={12}>
          <Button
              className="btn btn-block btn-sm btn-info mt-3"
              style={{ minWidth: "90px" }}
              disabled={true}
          >
            You are not logged in
          </Button>
        </Col>}
      </Row>
    </div>
  );
}
