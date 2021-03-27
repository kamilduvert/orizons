// == Import npm
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from 'src/containers/Header'; // REDUX
import Login from 'src/containers/Login'; // REDUX
import Register from 'src/containers/Register'; // REDUX
import Account from 'src/containers/Account'; // REDUX
import Page from 'src/components/Page';
import HomeDesktop from 'src/containers/HomeDesktop'; // REDUX
import HomeMobile from 'src/containers/HomeMobile'; // REDUX
import Trips from 'src/containers/Trips'; // REDUX
import AddTrip from 'src/containers/AddTrip'; // REDUX
import Profile from 'src/containers/Profile'; // REDUX
import Trip from 'src/containers/Trip'; // REDUX
import Results from 'src/containers/Results'; // REDUX

// == Dumb Components
import Footer from 'src/components/Footer';
import About from 'src/components/About';
import Legals from 'src/components/Legals';
import ContactForm from 'src/components/ContactForm';
import Lost404 from 'src/components/Lost404';

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

// == Composant

const App = ({ isLoggedIn, loadMember, loadTrips, loadCountries, loadCategories }) => {
  const [width] = useMediaQuery();
  useEffect(() => {
    loadTrips();
    loadCountries();
    loadCategories();
    if (isLoggedIn) {
      loadMember();
    }
  }, [isLoggedIn]);
  return (
    <div className="app">
      <Header />
      <ToastContainer
        position="bottom-right"
      />
      <Page>
        <Switch>
          <Route exact path="/accueil">
            {
              width > 767
                ? <HomeDesktop />
                : <HomeMobile />
            }
          </Route>
          <Route path="/inscription">
            <Register />
          </Route>
          <Route path="/connexion">
            <Login />
          </Route>
          <Route path="/contact">
            <ContactForm />
          </Route>
          <Route path="/a-propos">
            <About />
          </Route>
          <Route path="/mentions-legales">
            <Legals />
          </Route>
          <Route exact path="/exploration">
            <Trips />
          </Route>
          <Route path="/exploration/:id">
            <Trip />
          </Route>
          <Route path="/profil/:id">
            <Profile />
          </Route>
          <Route path="/ajouter-carnet">
            {isLoggedIn ? <AddTrip /> : <Redirect to="/connexion" />}
          </Route>
          <Route path="/compte">
            {isLoggedIn ? <Account /> : <Redirect to="/connexion" />}
          </Route>
          <Route path="/resultats">
            <Results />
          </Route>
          <Route path="/404">
            <Lost404 />
          </Route>
          <Route path="/">
            <Redirect to="/accueil" />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Page>
      <Footer />
    </div>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loadMember: PropTypes.func.isRequired,
  loadTrips: PropTypes.func.isRequired,
};
// == Export
export default App;
