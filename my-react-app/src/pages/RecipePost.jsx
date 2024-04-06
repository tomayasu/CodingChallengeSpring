import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, Input, Select, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // or use fetch API

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

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
    <Row gutter={25}>
      {Object.values(groupedData).map((items, index) => (
        <Col xs={24} sm={18} md={12} lg={10} xl={8} key={index}>
          <Card style={{ width: '100%', marginTop: 25 }} onClick={() => handleCardClick(items[0].recipeID)}>
            <Meta
              title={`Recipe ID: ${items[0].recipeID}`}
              style={{color: 'black', fontSize: '15px'}}
              description={
                <>
                  <Divider type="horizontal" />
                  <img src={items[0].image} style={{ width: '150px'}} alt="Recipe" /> <br />
                  Rate: {items[0].avg_rate ? `${items[0].avg_rate.toFixed(2)} / 5 ` : 'No rate'}
                  {items[0].avg_rate && <Rate disabled allowHalf value={Math.round(items[0].avg_rate * 2) / 2} />} <br />
                  <div style={{fontSize: '20px', color: 'black'}}>Title: {items[0].title} </div><br />
                  Ingredients: {items[0].Ingredients} <br />
                  Time: {items[0].time} <br />
                  Cost: {items[0].cost} <br />
                  Number of Servings: {items[0].numServe} <br />
                  Allergies Food: {items[0].food ? items[0].food : 'None'} <br />
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const RecipePost = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [allergyFilter, setAllergyFilter] = useState([]); 

  useEffect(() => {
    fetch('http://localhost/CodingChallengeSpring/api/readRecipes.php')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data);
      });
  }, []);

  const filterByAllergies = (data, allergyFilter) => {
    return data.filter(item => !allergyFilter.includes(item.food));
  };

  let filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredData = filterByAllergies(filteredData, allergyFilter);

  useEffect(() => {
      //console.log('RecipeCreate component mounted'); // Add this line
      const fetchAllergies = async () => {
        try {
          const response = await axios.get('http://localhost/CodingChallengeSpring/api/allergies.php'); // replace with your API endpoint
          setAllergies(response.data);
          console.log('Allergies:', response.data);
        } catch (error) {
          console.error('Failed to fetch allergies:', error);
        }
      };
      fetchAllergies();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Search
          placeholder="Search recipes by title"
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16, position: 'sticky', top: 50}}
        />
        <Select
          placeholder="Exclude allergies"
          mode="multiple"
          allowClear
          onChange={key => setAllergyFilter(key)}
          style={{ width: '100%', marginBottom: 16, position: 'sticky', top: 100 }}
        >
          {/*<Select
              mode="multiple"
              size="large"
              placeholder="Select Allergies"
              allowClear
              style={{ width: 200 }}
              onChange={setSelectedAllergies}
  >*/}
              {Array.isArray(allergies) && allergies.map((allergy) => (
              <Option key={allergy.allergyID} value={allergy.food}>{allergy.food}</Option>
              ))}
          </Select>
      </Col>
      <Col span={18}>
        <Posts data={filteredData} />
      </Col>
    </Row>
  );
};

export default RecipePost;