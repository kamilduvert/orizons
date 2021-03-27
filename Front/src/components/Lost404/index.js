import React from 'react';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Title from 'src/components/PageTitle';

import './Lost404.scss';

const Lost404 = () => (
  <div className="background-image-lost404">
    <Title texte="Vous êtes perdu..?" />
    <LinkContainer to="/exploration">
      <Button className="home-banner-overlay-btn">Repartez à l'aventure !</Button>
    </LinkContainer>
  </div>
);

export default Lost404;
