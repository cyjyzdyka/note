import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import mockData from "../mockData.json";

const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const users = mockData.users;
    const user = users.find(
      (u) => u.username === values.username && u.password === values.password
    );

    if (user) {
      alert("登录成功！");
      navigate("/home");
    } else {
      alert("用户名或密码错误！");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "40px 20px" }}>
      <Button 
        onClick={() => navigate("/")} 
        style={{ marginBottom: "20px" }}
      >
        返回主页
      </Button>

      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          登录
        </Title>
        <Form name="login" onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
              <Button onClick={() => navigate("/register")} size="large" block>
                注册新账号
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}