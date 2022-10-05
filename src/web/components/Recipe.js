import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
import globalStyles from "../../styles/global"

// TODO: web version of recipe page
const RecipeView = ({
  error,
  loading,
  recipes,
  recipeId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let recipe = null;
  if (recipeId && recipes) {
    recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
  }

  // Recipe not found
  if (!recipe) return <Error content={ErrorMessages.recipe404} />;

  // Build Language listing
  const languages = recipe.languages.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));

  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>
            {recipe.title}
          </h1>
          <p>
            {recipe.username}
          </p>
        </Col>
      </Row>
    </div>
  );
};

RecipeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
