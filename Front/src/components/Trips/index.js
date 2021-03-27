import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  CardDeck, Card, Container, Image, Row, Col, Carousel
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Tag from 'src/containers/Tag';
import Title from '../PageTitle';

import './trips.scss';

// Custom hook for display according to screen size
function useMediaQuery() {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

const Trips = ({
  filteredTrips, categories, showMoreResults, loadTrips, loadCategories, handleClick,
}) => {
  useEffect(() => {
    loadTrips();
    loadCategories();
  }, []);

  const [width] = useMediaQuery();

  return (
    <Container>
      <Title texte="Filtrez et trouvez un carnet à explorer !" />
      <Row>
        {categories.map((category) => (
           <Tag key={category.id} category={category} />
        ))}
      </Row>

      <CardDeck>
        <Container>
          {filteredTrips.length == 0 && <p style={{ margin: `${1}rem` }}>Il n'y a rien dans cette catégorie. Pour le moment...</p>}

          <Row className="cards_trip_container">
            {filteredTrips.map((trip) => (
              <Col md={6} lg={4} xl={3} key={trip.id}>
                <LinkContainer to={`/exploration/${trip.id}`} style={{ cursor: 'pointer' }}>
                  <Card className="card_trips">
                    <Card.Img className="card_trips-img-top" variant="top" src={trip.cover_trip} />
                    <Card.Body className="card_trips-body">
                      <Card.Title className="card_trips-title">{trip.title}</Card.Title>
                      <Card.Text className="card_trips-duration">
                        <i className="fas fa-clock mr-2" />Durée : {trip.duration} {trip.duration > 1 ? 'jours' : 'jour'}
                      </Card.Text>
                      <Card.Text className="card_trips-text">
                        {trip.summary}
                      </Card.Text>

                      {/* <Card.Text className="card_trips-text">
                        {trip.categories.map(category => (
                            <Badge pill key={category.id} className="tag"
                             style={{backgroundColor: `${category.color}`}}>
                              {category.entitled}
                            </Badge>
                        ))}
                      </Card.Text> */}
                    </Card.Body>
                    <LinkContainer to={`/profil/${trip.author[0].id}`}>
                      <Card.Footer className="card_trips-footer">
                        <Image className="profile_photo m-2" src={trip.author[0].profile_photo} roundedCircle />
                        <small className="text-muted">Publié par </small><span text="">{trip.author[0].nickname}</span>
                      </Card.Footer>
                    </LinkContainer>
                  </Card>
                </LinkContainer>
              </Col>
            ))}
          </Row>
        </Container>
      </CardDeck>

      {/* <Row className="justify-content-md-center m-4">
          <Col md="auto">
            <Button variant="link" onClick={showMoreResults}>Afficher plus de carnets</Button>
          </Col>
        </Row> */}

    </Container>
  );
};

export default Trips;
