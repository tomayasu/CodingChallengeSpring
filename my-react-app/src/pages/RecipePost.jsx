import React, { useState } from 'react';
import { Card, Switch, Row, Col, Divider } from 'antd';

const { Meta } = Card;

// Posts.jsx
const Posts = ({ loading }) => {
    return (
      <>
        {loading.map((isLoading, index) => (
          <Col span={6} key={index}>
            <Card style={{ width: 300, marginTop: 16 }} loading={isLoading}>
            <Meta
                title="Card title: Pizza"
                description={
                    <>
                      <Divider type="horizontal" />
                      Image Here!
                      
                      {/* Add more content below the divider here */}
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
  const [loading, setLoading] = useState([true, true, true, true]);

  const onChange = (checked) => {
    setLoading(loading.map(() => !checked));
  };

  return (
    <>
      <Switch checked={!loading.includes(true)} onChange={onChange} />
      <Row gutter={16}>
        <Posts loading={loading} />
      </Row>
    </>
  );
};

export default RecipePost;