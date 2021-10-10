import React, { useState } from 'react';
import { Menu, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const SideMenu = () => {
    const [activeTab, setActiveTab] = useState('1');
    const onChangeTab = (e: any) => {
        setActiveTab(e.key);
    };
    return (
        <Menu
            theme={'dark'}
            onClick={onChangeTab}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[activeTab]}
            mode="inline"
        >
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="OCR Results">
                <Menu.Item key="list-ocr-instances">List Instances</Menu.Item>
                <Menu.Item key="new-ocr-test">Test</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Classifications">
                <Menu.Item key="9">Option 9</Menu.Item>
            </SubMenu>
        </Menu>
    );
};
export default SideMenu;
