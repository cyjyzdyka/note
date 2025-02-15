import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../mockData.json";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = mockData.users;
    if (!Array.isArray(users)) {
        console.log('Type of users:', typeof users);
        console.error('mockData.users is not an array');
        return;
    }
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      alert("登录成功！"); 
      navigate("/home");
    } else {
      alert("用户名或密码错误！");
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登录</button>
      <p>
        没有账号？ <button onClick={() => navigate("/register")}>注册</button>
      </p>
    </div>
  );
}