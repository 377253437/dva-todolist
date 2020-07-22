import React from 'react';
import { Layout, Typography } from 'antd';
import Todolist from '@/components/Todolist';

import styles from './index.css';

const { Header, Content } = Layout;
function TodolistPage() {
  return (
    <Layout className={styles.layout}>
      <Header>
        <Typography.Title>
          <span className={styles.title}>Todolist</span>
        </Typography.Title>
      </Header>
      <Content className={styles.content}>
        <Todolist />
      </Content>
    </Layout>
  );
}

export default TodolistPage;
