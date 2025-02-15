import React from "react";
import { Layout } from "antd";
import AppRouter from "./router";
import "./App.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" />
        <h1 style={{ color: 'white', margin: 0 }}>知识库系统</h1>
      </Header>
      <Content style={{ padding: '50px', minHeight: 'calc(100vh - 134px)' }}>
        <AppRouter />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Knowledge Base ©{new Date().getFullYear()} Created by Your Name
      </Footer>
    </Layout>
  );
}