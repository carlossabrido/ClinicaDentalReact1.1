import React from "react";
import "./Home.css"; // Asegúrate de que el nombre del archivo CSS sea correcto
import Carousel from "react-bootstrap/Carousel";

import "bootstrap/dist/css/bootstrap.min.css";
import img3 from "./img/foto.png";
import img1 from "./img/foto1.jpg";
import img2 from "./img/foto5.jpg";
import { Col, Container, Image, Row } from "react-bootstrap";
export const Home = () => {
  return (
    <div className="homeDesign">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="column mt-5">
              <img className="centerr" src={img1} alt="" />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="fix">
              <div className="column mt-5">
                <h3>Bienvenido a Dentarium, tu dentista de confianza</h3>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12} md={12}>
            <div className="contact">
              <h1>"Sonríe con confianza, cuidamos de tu salud dental"</h1>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12} md={3}>
            <div className="column  "></div>
          </Col>
          <Col xs={12} md={6}>
            <div className="column m-5 ">
              <img className="centerr" src={img2} alt="" />
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="column  "></div>
          </Col>
        </Row>
        <Row>
          
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div className="map-container mb-5">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938176.6139781189!2d-71.06477461331923!3d18.415539166157043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8933aea253d45%3A0x65ab3a86290193d7!2sCoco%20Bongo%20Punta%20Cana!5e0!3m2!1ses!2ses!4v1684596764816!5m2!1ses!2ses"
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
