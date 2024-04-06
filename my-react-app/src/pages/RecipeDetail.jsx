import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Divider, Button, Input, Rate } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;

const RecipeDetail = () => {
  const location = useLocation();
  const recipeData = location.state.recipeData;

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleAddComment = () => {
    setShowCommentInput(true);
  };

  const handleSubmitComment = () => {
    // Add your code to handle submitting a comment here
    console.log(recipeData[0].recipeID, comment, rating);

    const data = {
    recipe_id: recipeData[0].recipeID,
    comment: comment,
    rate: rating
    };

    fetch('http://localhost/CodingChallengeSpring/api/createComment.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
    console.log('Success:', data);
    alert('Comment submitted!');
    })
    .catch((error) => {
    console.error('Error:', error);
    });
};

  return (
    <Card style={{ width: 300, marginTop: 16 }}>
      <Meta
        title={`Recipe ID: ${recipeData[0].recipeID}, Ingredients: ${recipeData[0].Ingredients}`}
        description={
          <>
            <Divider type="horizontal" />
            Time: {recipeData[0].time} <br />
            Cost: {recipeData[0].cost} <br />
            Number of Servings: {recipeData[0].numServe} <br />
            Allergy ID: {recipeData[0].allergyID} <br />
            Food: {recipeData[0].food} <br />
            <Divider type="horizontal" />
            {recipeData.map((item, index) => (
              <div key={index}>
                Step Number: {item.stepNum} <br />
                Description: {item.description} <br />
                <Divider type="horizontal" />
              </div>
            ))}
            <Button onClick={handleAddComment}>Add Comment</Button>
            {showCommentInput && (
              <>
                <TextArea rows={4} value={comment} onChange={e => setComment(e.target.value)} />
                <Rate value={rating} onChange={setRating} />
                <Button onClick={handleSubmitComment}>Submit Comment</Button>
              </>
            )}
          </>
        }
      />
    </Card>
  );
};

export default RecipeDetail;