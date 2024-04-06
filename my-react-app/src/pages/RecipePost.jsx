import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Posts = ({ data }) => {
  const navigate = useNavigate();

  // Group data by recipe ID
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.recipeID]) {
      acc[item.recipeID] = [];
    }
    acc[item.recipeID].push(item);
    return acc;
  }, {});

  const handleCardClick = (recipeID) => {
    const recipeData = groupedData[recipeID];
    navigate(`/recipeDetail/${recipeID}`, { state: { recipeData } });
  };

  return (
    <>
      {Object.values(groupedData).map((items, index) => (
        <Col span={6} key={index}>
          <Card style={{ width: 300, marginTop: 16 }} onClick={() => handleCardClick(items[0].recipeID)}>
            <Meta
              title={`Recipe ID: ${items[0].recipeID}, Ingredients: ${items[0].Ingredients}`}
              description={
                <>
                  <Divider type="horizontal" />
                  Time: {items[0].time} <br />
                  Cost: {items[0].cost} <br />
                  Number of Servings: {items[0].numServe} <br />
                  Allergy ID: {items[0].allergyID} <br />
                  Food: {items[0].food} <br />
                  <Divider type="horizontal" />
                  {items.map((item, index) => (
                    <div key={index}>
                      Step Number: {item.stepNum} <br />
                      Description: {item.description} <br />
                      <Divider type="horizontal" />
                    </div>
                  ))}
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </>
  );
};

const RecipePost = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/CodingChallengeSpring/api/readRecipes.php')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <Row gutter={16}>
      <Posts data={data} />
    </Row>
  );
};

export default RecipePost;