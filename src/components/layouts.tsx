import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileTextOutlined, FormOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

const Layouts: React.FC<{ children: any }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const { location } = useHistory();

    console.log(location);

    const onCollapse = useCallback(() => {
        setCollapsed((collapsed) => !collapsed);
    }, []);

    return (
        <Layout className="base" style={{ height: '100vh', overflow: 'hidden' }}>
            <Header>{/* <img src={LogoText} alt="logo" /> */}</Header>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{ background: '#fff' }}
                    className="sidebar-left"
                    onCollapse={onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item key="/listOCR">
                            <Link to="/listOCR">
                                <div>
                                    <UnorderedListOutlined />
                                    <span>Paper List</span>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/demoOCR">
                            <Link to="/demoOCR">
                                <div>
                                    <FileTextOutlined />
                                    <span>OCR Demo</span>
                                </div>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            padding: 24,
                            height: '100vh',
                            overflowY: 'scroll',
                            background: '#FAFAFA',
                        }}
                        className={collapsed ? 'collapsed mainContnet ' : 'mainContnet'}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Layouts;
