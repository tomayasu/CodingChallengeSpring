import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Divider, Button, Input, Rate } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;

const RecipeDetail = () => {
  const location = useLocation();
  const recipeData = location.state.recipeData;

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState([]);

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
    useEffect(() => {
        fetch(`http://localhost/CodingChallengeSpring/api/readComment.php?recipe_id=${recipeData[0].recipeID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
        setComments(data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }, [recipeData]);
    console.log(recipeData[0].image);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Card style={{ width: 500, marginTop: 16, marginLeft: 80 }}>
      <Meta
        title={`Recipe ID: ${recipeData[0].recipeID}`}
        style={{color: 'black', fontSize: '15px'}}
        description={
          <>
            <Divider type="horizontal" />
            <img src={`/${recipeData[0].image}`} style={{ width: '150px'}} alt="Recipe" /> <br />
            <div style={{fontSize: '20px', color: 'black'}}>{recipeData[0].title} </div><br />
            Rate: {recipeData[0].avg_rate ? `${recipeData[0].avg_rate.toFixed(2)} / 5 ` : 'No rate'}
            {recipeData[0].avg_rate && <Rate disabled allowHalf value={Math.round(recipeData[0].avg_rate * 2) / 2} />} <br />
            Ingredients: {recipeData[0].Ingredients} <br />
            Time: {recipeData[0].time} <br />
            Cost: {recipeData[0].cost} <br />
            Number of Servings: {recipeData[0].numServe} <br />
            Allergies Food: {recipeData[0].food ? items[0].food : 'None'} <br />
            <Divider type="horizontal" />
            {recipeData.map((item, index) => (
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
    <div style={{ width: '600px'}}>
    {comments.map((comment, index) => (
      <div key={index}>
        <p>{comment.comment}</p>
        <Rate disabled value={comment.rate} />
        <p>Date posted: {comment.date}</p>
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
  </div>
</div>
  );
};

export default RecipeDetail;