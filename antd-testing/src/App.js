import React, { useState } from 'react';
import { Menu, Layout, ConfigProvider, Button, Form, Input, InputNumber, message, DatePicker, Table, Radio, Switch } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './App.less';
import jaJP from 'antd/es/locale/ja_JP';
import enUS from 'antd/es/locale/en_US';
import { useTheme } from './theme/use-theme';

const { Sider, Header, Content } = Layout;

//Form 
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

//Table data
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 33; i++) {
  data.push({
    key: i,
    name: `King ${i}`,
    age: i,
    address: `London, Park Lane no. ${i}`,
  });
}

function App() {

  const [collapsed, setCollapsed] = useState(false);
  const [locale, setLocal] = useState(enUS);
  const [isDarkMode, setIsDarkMode] = useTheme()

  const onFinish = () => {
    message.success('Success!');
  };

  const changeLocale = (e) => {
    const localeValue = e.target.value;
    setLocal(localeValue);
  };

  return (
    <ConfigProvider locale={locale}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header className="header">
            <Radio.Group value={locale} onChange={changeLocale}>
              <Radio.Button key="en" value={enUS}>
                English
              </Radio.Button>
              <Radio.Button key="ja" value={jaJP}>
                Japan
              </Radio.Button>
            </Radio.Group>
            <Switch checked={isDarkMode} onChange={setIsDarkMode} style={{marginLeft: 15}} checkedChildren="Light" unCheckedChildren="Dark" defaultChecked />
          </Header>
          <Content className="content">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                  {
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'age']}
                label="Age"
                rules={[
                  {
                    type: 'number',
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item name={['user', 'birth']} label="Birth">
                <DatePicker />
              </Form.Item>
              <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Table dataSource={data} columns={columns} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;