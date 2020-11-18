import React from "react";
import { Card } from "react-bootstrap";

function Ingredients(props) {
  return (
    <div className="container">
      <h2>Ingredients:</h2>
      <Card>
        <div className="flex col">
          {props.ingredients.map((ingredient, index) => (
            <div className="line" key={index}>
              <div className="flex">
                <div className="flex col">
                  <div className="kind">{ingredient.kind}:</div>
                  <div className="flex">
                    <div className="flex col">
                      {ingredient.types.map((type, index) => (
                      <div className={(Object.values(type) <1) ? "ingredient strike-out" : "ingredient"} key={index} onClick={() => props.onAddToBasket(ingredient.kind, Object.keys(type))}>
                        {Object.keys(type)}
                      </div>
                      ))}
                    </div>
                    <div><img className="ingredient-img" src={ingredient.picture} alt="" /></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Ingredients;
