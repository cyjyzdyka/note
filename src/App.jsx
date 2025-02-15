import React from "react";
import { Layout } from "antd";
import AppRouter from "./router";
import AppHeader from "./components/Header";
import "./App.css";

const { Content } = Layout;

export default function App() {
  return (
    <Layout className="layout">
      <AppHeader />
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  );
}