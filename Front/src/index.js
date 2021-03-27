// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from 'src/store';

// == Import : local
// Composants
import App from 'src/containers/App';

import history from './utils/history';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
