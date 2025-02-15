import React, { useState, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Space, Typography, message } from "antd";
import { HomeOutlined, SaveOutlined, ClearOutlined } from "@ant-design/icons";
import { saveNote } from "../utils/storage";

const { Title } = Typography;

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  // 提交内容
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      message.error("标题和内容不能为空！");
      return;
    }

    const newNote = {
      title: title.trim(),
      content: content.trim(),
    };

    const loading = message.loading('正在保存并生成摘要...', 0);
    
    try {
      if (await saveNote(newNote)) {
        loading();
        message.success("笔记创建成功！");
        localStorage.removeItem("draftNote"); // 清除暂存的草稿
        navigate("/notes"); // 跳转到笔记列表页
      } else {
        loading();
        message.error("笔记创建失败！");
      }
    } catch (error) {
      loading();
      message.error("操作失败！");
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space>
          <Button 
            icon={<HomeOutlined />} 
            onClick={() => navigate("/")}
          >
            返回主页
          </Button>
        </Space>

        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={2}>创建新笔记</Title>
            
            <Input
              placeholder="笔记标题"
              value={title}
              onChange={e => setTitle(e.target.value)}
              size="large"
            />

            <RichTextEditor
              value={content}
              onChange={setContent}
            />

            <Space>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSubmit}
                size="large"
              >
                提交笔记
              </Button>
              <Button
                icon={<SaveOutlined />}
                onClick={handleSave}
                size="large"
              >
                暂存草稿
              </Button>
              <Button
                icon={<ClearOutlined />}
                onClick={handleClear}
                size="large"
              >
                清空内容
              </Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default CreateNotePage;