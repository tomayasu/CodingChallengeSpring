import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';

const Message = () => {

	return (

		<div>
			<Space>
				Message
				<Input placeholder="input search text" size="large" allowClear />
				<Button type="primary">
					<SendOutlined />
				</Button>
			</Space>
		</div>
	);
};

export default Message;