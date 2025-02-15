import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Card, Space, message, Typography } from "antd";
import { HomeOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import { getNote, saveNote } from "../utils/storage";

const { Title } = Typography;

export default function NoteEditorPage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalNote, setOriginalNote] = useState(null);

  // 加载笔记内容
  useEffect(() => {
    const loadNote = () => {
      const note = getNote(noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setOriginalNote(note);
      } else {
        message.error("笔记不存在！");
        navigate("/notes");
      }
    };

    loadNote();
  }, [noteId, navigate]);

  // 保存笔记
  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      message.error("标题和内容不能为空！");
      return;
    }

    const updatedNote = {
      ...originalNote,
      title: title.trim(),
      content: content.trim(),
    };

    if (saveNote(updatedNote)) {
      message.success("笔记已保存！");
      navigate(`/notes/${noteId}`);
    } else {
      message.error("保存笔记失败！");
    }
  };

  // 自动保存功能
  useEffect(() => {
    const autoSave = () => {
      if (originalNote && (title.trim() || content.trim())) {
        const updatedNote = {
          ...originalNote,
          title: title.trim(),
          content: content.trim(),
        };
        if (saveNote(updatedNote)) {
          console.log('自动保存成功');
        }
      }
    };

    const timer = setInterval(autoSave, 30000); // 每30秒自动保存一次

    return () => clearInterval(timer);
  }, [title, content, originalNote]);

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(`/notes/${noteId}`)}
          >
            返回笔记
          </Button>
          <Button 
            icon={<HomeOutlined />} 
            onClick={() => navigate("/")}
          >
            返回主页
          </Button>
        </Space>

        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={2}>编辑笔记</Title>
            
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

            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              size="large"
            >
              保存笔记
            </Button>
          </Space>
        </Card>
      </Space>
    </div>
  );
}