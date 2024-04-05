import { Input, Button, Space } from "antd";
import './RecipeCreate.css';
import React, { useState } from 'react';
import { UploadOutlined, PlusSquareOutlined } from '@ant-design/icons';


const RecipeCreate = () => {

    const [title, setTitle] = useState('');
    const [hasAttemptedInput, setHasAttemptedInput] = useState(false);

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
            <Space direction="vertical">
                <Space>
                    <div>Title</div>
                    <Input 
                        size="large" 
                        placeholder="Title" 
                        status={hasAttemptedInput ? "error" : ""} 
                        allowClear 
                        onChange={onChange} 
                        onBlur={onBlur}
                        value={title}
                    />
                </Space>
                <Space>
                    <div>Estimated Time</div>
                    <Input 
                        size="large" 
                        placeholder="Estimated Time" 
                        allowClear 
                    />
                </Space>
                <Space>
                    <div>Estimated Cost</div>
                    <Input 
                        size="large" 
                        placeholder="Estimated Cost" 
                        allowClear 
                    />
                </Space>
                <Space>
                    <div>Number of Serving</div>
                    <Input 
                        size="large" 
                        placeholder="Number of Serving" 
                        allowClear 
                    />
                </Space>
                <Space>
                    <div>Ingredients</div>
                    <Input 
                        size="large" 
                        placeholder="Ingredients" 
                        allowClear 
                    />
                </Space>
                <Space>
                    <div>Allergies</div>
                    <Input 
                        size="large" 
                        placeholder="Allergies" 
                        allowClear 
                    />
                </Space>
                <Space>
                    <div>Categories</div>
                    <Input 
                        size="large" 
                        placeholder="Categories" 
                        allowClear 
                    />
                </Space>
                <Space direction="vertical">
                    {steps.map((step, index) => (
                        <Space key={index}>
                            <div>Step {index + 1}</div>
                            <Input
                                size="large" 
                                placeholder={`Step ${index + 1}`} 
                                allowClear 
                            />
                            <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
                        </Space>
                    ))}
                </Space>
                <Button type="primary" icon={<PlusSquareOutlined />} onClick={addStep}>Add a Step</Button>
                <Button type="primary" icon={<PlusSquareOutlined />}>Submit a Post</Button>
            </Space>
        </div>
    );
};

export default RecipeCreate;