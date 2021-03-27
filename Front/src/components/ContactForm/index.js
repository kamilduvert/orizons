import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { LinkContainer } from 'react-router-bootstrap';

import { Form, Button, Container, Jumbotron } from 'react-bootstrap';
import Title from 'src/components/PageTitle';

import './contactForm.scss';

//handle submit is not defined
const ContactForm = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const { name, email, message } = values;

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const [state, handleSubmit] = useForm("xaylrdkr");
  if (state.succeeded) {
    return (
      <div className="background-image-contact">
        <Jumbotron className="form-contact-success">
          <h2>Merci pour votre message !</h2>
          <i className="fas fa-paper-plane form-contact-success-icon" />
          <p className="form-contact-success-text">Nous vous répondrons <br />dans les plus brefs délais.</p>
          <LinkContainer to="/">
            <a className="form-contact-btn">Retour à l'accueil</a>
          </LinkContainer>
        </Jumbotron>
      </div >
    )
  }

  return (
    <div className="background-image-contact">
      <Container>
        <Title texte="Gardons le contact ;)" />
        <div className="contact_form">

          <Form
            className="form-contact"
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xaylrdkr"
            method="POST"
          >
            <Form.Group controlId="name">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                defaultValue={name}
                type="text"
                onChange={handleInputChange}
                placeholder="Entrez votre nom"
                name="name"
              />

              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="form-contact-error"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre adresse email"
                onChange={handleInputChange}
                defaultValue={email}
                name="email"

              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="form-contact-error"
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Entrez votre message ici ..."
                onChange={handleInputChange}
                defaultValue={message}
                name="message"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="form-contact-error"
              />
            </Form.Group>
            <Button className="form-contact-btn" type="submit" disabled={state.submitting}>Envoyer</Button>
          </Form>
        </div>
      </Container>
    </div>

  );
};

export default ContactForm;
