import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipePage from '../components/RecipePage';

const RecipeRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/recipe" component={RecipePage} />
        {/* Add more routes if needed */}
      </Switch>
    </Router>
  );
};

export default RecipeRoutes;
