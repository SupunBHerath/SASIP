import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles by default
import NewsFeedT from './Table/NewsFeedT';
import { Color } from '../CSS/Css';
import NewsHandle from './Table/NewsHandle';

const { TabPane } = Tabs;

function NewsTabs() {
    return (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Create News" key="1">
                <div className="text-center">
                    <h3></h3>
                    <h2 style={{ color: Color.PrimaryColor, fontWeight: 'bolder' }}>Create News Form</h2>
                </div>
                <NewsFeedT />
            </TabPane>
            <TabPane tab="News Handle" key="2">
            <div className="text-center">
                    <h3></h3>
                    <h2 style={{ color: Color.PrimaryColor, fontWeight: 'bolder' }}>News Handle</h2>
                </div>
                <NewsHandle />
            </TabPane>
        </Tabs>
    );
}

export default NewsTabs;
