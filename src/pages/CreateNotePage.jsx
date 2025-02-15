import React, { useState, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Space, Typography, message, Row, Col } from "antd";
import { HomeOutlined, SaveOutlined, ClearOutlined, CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const CreateNotePage = () => {
  const [title, setTitle] = useState(""); // 笔记标题
  const [content, setContent] = useState(""); // 富文本内容
  const navigate = useNavigate();

  // 从 localStorage 加载暂存的笔记草稿
  useEffect(() => {
    const draft = localStorage.getItem("draftNote");
    if (draft) {
      const { title: draftTitle, content: draftContent } = JSON.parse(draft);
      setTitle(draftTitle || "");
      setContent(draftContent || "");
    }
  }, []);

  // 保存内容（暂存到 localStorage）
  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      message.error("标题和内容都为空，无法保存！");
      return;
    }

    const draft = { title, content };
    localStorage.setItem("draftNote", JSON.stringify(draft));
    message.success("内容已暂存！");
  };

  // 清空内容
  const handleClear = () => {
    if (window.confirm("确定要清空当前内容吗？")) {
      setTitle("");
      setContent("");
      localStorage.removeItem("draftNote"); // 清除暂存草稿
    }
  };

  // 提交内容（写入虚拟数据库并跳转）
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("标题和内容不能为空！");
      return;
    }

    // 模拟虚拟数据库存储
    const storedData = JSON.parse(localStorage.getItem("mockData")) || { notes: [] };
    const newNote = {
      id: Date.now(), // 模拟唯一 ID
      title,
      content,
      date: new Date().toISOString().split("T")[0], // 添加创建日期
    };

    // 写入虚拟数据库
    storedData.notes.push(newNote);
    localStorage.setItem("mockData", JSON.stringify(storedData));

    // 清空草稿
    localStorage.removeItem("draftNote");

    alert("笔记已提交！");
    setTitle("");
    setContent("");

    // 跳转到主页
    navigate("/", { replace: true }); // 跳转到主页并触发重新渲染
  };

  return (
    <div className="homepage-content">
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={16} xl={14}>
          <Card>
            <Title level={2}>创建新笔记</Title>
            
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Input
                placeholder="输入笔记标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="large"
              />
              
              <RichTextEditor value={content} onChange={setContent} />
              
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={8}>
                  <Button 
                    icon={<SaveOutlined />} 
                    onClick={handleSave}
                    block
                  >
                    保存草稿
                  </Button>
                </Col>
                <Col xs={24} sm={8}>
                  <Button 
                    icon={<ClearOutlined />} 
                    onClick={handleClear}
                    danger
                    block
                  >
                    清空内容
                  </Button>
                </Col>
                <Col xs={24} sm={8}>
                  <Button 
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={handleSubmit}
                    block
                  >
                    提交笔记
                  </Button>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateNotePage;