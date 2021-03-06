import React from 'react';
import {
  Container, Row, Card, Button, Carousel, Image,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import anonyme from 'src/assets/user-icon-2098873_640.png';

import './homeMobile.scss';

const HomeMobile = ({ isLoggedIn, randomTrips, handleClick }) => (
  <Container fluid>
    <Row>
      <Card className="text-white home_banner-mobile">
        <Card.Img src="https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=375" className="home_banner-image" />
        <Card.ImgOverlay className="home_banner-mobile-overlay">
          <Card.Title className="home_banner-mobile-title">"Voyager vous laisse d'abord sans voix, avant de vous transformer en conteur" <br /> - Ibn Battuta
          </Card.Title>
          <div className="home-banner-mobile-buttons">
            <LinkContainer to="/ajouter-carnet">
              <Button className="home_banner-mobile-card-btn m-2">Publier</Button>
            </LinkContainer>
            <LinkContainer to="/exploration">
              <Button className="home_banner-mobile-card-btn m-2">Explorer</Button>
            </LinkContainer>

          </div>
        </Card.ImgOverlay>
      </Card>
    </Row>

    <Row>
      <h4 className="carousel-title">Des outils pratiques, pour sublimer vos histoires en quelques instants.</h4>
      <Carousel touch>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.discordapp.net/attachments/356888374092627968/806898627217063986/pexels-pixabay-163034.jpg?width=375&height=252"
            srcset="https://media.discordapp.net/attachments/356888374092627968/806898627217063986/pexels-pixabay-163034.jpg?width=375&height=252 375w,
            https://media.discordapp.net/attachments/356888374092627968/806898627217063986/pexels-pixabay-163034.jpg?width=414&height=280 414w"
            alt="photo first slide"
          />
          <Carousel.Caption className="carousel-caption-text">
            <h3>Des carnets de voyage ?? votre image</h3>
            <p>Organisez votre carnet gr??ce ?? des outils faciles d'utilisation</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.discordapp.net/attachments/356888374092627968/806898627912925204/pexels-leah-kelley-185933.jpg?width=375&height=252"
            srcset="https://media.discordapp.net/attachments/356888374092627968/806898627912925204/pexels-leah-kelley-185933.jpg?width=375&height=252 375w,
            https://media.discordapp.net/attachments/356888374092627968/806898627912925204/pexels-leah-kelley-185933.jpg?width=414&height=280 414w"
            alt="photo second slide"
          />

          <Carousel.Caption className="carousel-caption-text">
            <h3>Une carte interactive</h3>
            <p>qui ??volue au fil de vos p??r??grinations</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.discordapp.net/attachments/356888374092627968/806898626403500102/pexels-photo-3280130.jpeg?width=414&height=280"
            alt="photo third slide"
          />
          <Carousel.Caption className="carousel-caption-text">
            <h3>Une communaut?? de voyageurs</h3>
            <p>Suivez les aventures de vos voyageurs favoris !</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>

    </Row>

    <Row>
      <h4 className="carousel-title">En manque d'inspiration ?</h4>
      <Carousel touch>
        {
          randomTrips.map((trip) => (
            <Carousel.Item key={trip.id}>
              <div onClick={() => handleClick(trip.id)}>
                <img
                  className="d-block w-100"
                  src={trip.cover_trip}
                  alt={trip.title}
                />
                <Carousel.Caption className="carousel-caption-text">
                  <h3>{trip.title}</h3>
                  <p>by {trip.author[0].nickname}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </Row>

    <Row>
      <h4 className="carousel-title">O'rizons, ce sont nos voyageurs qui en parlent le mieux !</h4>
      <Carousel className="comments_carousel" controls={false} indicators={false} touch>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Kamil</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                C'est trop cool !
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Paul</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                J'adore partager mes voyages, et O'rizons est le meilleur site que je connaisse pour le faire !
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Juliette</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Super design, pratique ?? utiliser. C'est top !
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Armandine</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                La version mobile est super pratique pour partager ses aventures au jour le jour.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

      </Carousel>
    </Row>

  </Container>
);

export default HomeMobile;
