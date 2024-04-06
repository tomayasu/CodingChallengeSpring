import { Input, Button, Space, Select } from "antd";
import './RecipeCreate.css';
import React, { useState, useEffect } from 'react';
import { UploadOutlined, PlusSquareOutlined } from '@ant-design/icons';
import axios from 'axios'; // or use fetch API


const RecipeCreate = () => {

    const { Option } = Select;
    const [allergies, setAllergies] = useState([]);
    const [styles, setStyles] = useState([]);
    const [title, setTitle] = useState('');
    const [hasAttemptedInput, setHasAttemptedInput] = useState(false);
    const [time, setTime] = useState('');
    const [cost, setCost] = useState('');
    const [numServe, setNumServe] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [categories, setCategories] = useState('');
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);


    const handleSubmit = async () => {
        if (!title || !time || !cost || !numServe || !ingredients) {
            alert('Please enter all required fields!');
            return;
        }

        console.log('Submitting form with the following values:', {
            title: title,
            time: time,
            cost: cost,
            numServe: numServe,
            Ingredients: ingredients,
            steps: steps,
            allergies: selectedAllergies, // Add this line
        });
        
        try {
            const response = await axios.post('http://localhost/CodingChallengeSpring/api/createRecipes.php', {
                title: title,
                time: time,
                cost: cost,
                numServe: numServe,
                Ingredients: ingredients,
                steps: steps,
                allergies: selectedAllergies, // Add this line
            });
            console.log('Response:', response.data);
            alert('Recipe Added!')

        } catch (error) {
            console.error('Failed to submit recipe:', error);
        }
    };

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

    useEffect(() => {
        //console.log('RecipeCreate component mounted'); // Add this line
        const fetchStyles = async () => {
          try {
            const response = await axios.get('http://localhost/CodingChallengeSpring/api/styles.php'); // replace with your API endpoint
            setStyles(response.data);
            console.log('Styles:', response.data);
          } catch (error) {
            console.error('Failed to fetch styles:', error);
          }
        };
        fetchStyles();
    }, []);

    const onChange = (e) => {
        setTitle(e.target.value);
        if (e.target.value !== '') {
            setHasAttemptedInput(false);
        }
    };

    const onBlur = () => {
        if (title === '') {
            setHasAttemptedInput(true);
        }
    };

    const [steps, setSteps] = useState([{}]);

    const addStep = () => {
        setSteps([...steps, {}]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>
                            <Input 
                                size="large" 
                                placeholder="Title" 
                                status={hasAttemptedInput ? "error" : ""} 
                                allowClear 
                                onChange={e => setTitle(e.target.value)}
                                onBlur={onBlur}
                                value={title}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Estimated Time</td>
                        <td>
                            <Input 
                                size="large" 
                                placeholder="Estimated Time" 
                                allowClear 
                                onChange={e => setTime(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Estimated Cost</td>
                        <td>
                            <Input 
                                size="large" 
                                placeholder="Estimated Cost" 
                                allowClear 
                                onChange={e => setCost(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Number of Serving</td>
                        <td>
                            <Input 
                                size="large" 
                                placeholder="Number of Serving" 
                                allowClear 
                                onChange={e => setNumServe(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Ingredients</td>
                        <td>
                            <Input 
                                size="large" 
                                placeholder="Ingredients" 
                                allowClear 
                                onChange={e => setIngredients(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Food Styles</td>
                        <td>
                            <Select
                                mode="multiple"
                                size="large"
                                placeholder="Select Styles"
                                allowClear
                                style={{ width: 200 }}
                                onChange={setSelectedStyles}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {Array.isArray(styles) && styles.map((style) => (
                                <Option key={style.styleID} value={style.styleID}>{style.style}</Option>
                                ))}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Allergies</td>
                        <td>
                            <Select
                                mode="multiple"
                                size="large"
                                placeholder="Select Allergies"
                                allowClear
                                style={{ width: 200 }}
                                onChange={setSelectedAllergies}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {Array.isArray(allergies) && allergies.map((allergy) => (
                                <Option key={allergy.allergyID} value={allergy.allergyID}>{allergy.food}</Option>
                                ))}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td>
                            <Input 
                                size="large" 
                                placeholder="Categories" 
                                allowClear 
                                onChange={e => setCategories(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Steps</td>
                        <td>
                            {steps.map((step, index) => (
                                <div key={index}>
                                    <div>Step {index + 1}</div>
                                    <Input
                                        size="large" 
                                        placeholder={`Step ${index + 1}`} 
                                        allowClear
                                        onChange={e => {
                                            const newSteps = [...steps];
                                            newSteps[index] = { stepNum: index + 1, description: e.target.value };
                                            setSteps(newSteps);
                                        }}
                                    />
                                    <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
                                </div>
                            ))}
                            <Button type="primary" icon={<PlusSquareOutlined />} onClick={addStep}>Add a Step</Button> <br />
                            <Button type="primary" icon={<PlusSquareOutlined />} onClick={handleSubmit}>Submit a Post</Button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default RecipeCreate;