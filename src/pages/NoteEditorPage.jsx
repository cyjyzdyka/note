import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Card, Space, message, Typography, Spin } from "antd";
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
  const [loading, setLoading] = useState(true);

  // 加载笔记内容
  useEffect(() => {
    const loadNote = () => {
      setLoading(true);
      const note = getNote(parseInt(noteId));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setOriginalNote(note);
      } else {
        message.error("笔记不存在！");
        navigate("/notes");
      }
      setLoading(false);
    };

    if (noteId) {
      loadNote();
    }
  }, [noteId, navigate]);

  // 保存笔记
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      message.error("标题和内容不能为空！");
      return;
    }

    const updatedNote = {
      ...originalNote,
      title: title.trim(),
      content: content.trim(),
    };

    const loading = message.loading('正在保存并生成摘要...', 0);

    try {
      if (await saveNote(updatedNote)) {
        loading();
        message.success("笔记已保存！");
        navigate(`/notes/${noteId}`);
      } else {
        loading();
        message.error("保存笔记失败！");
      }
    } catch (error) {
      loading();
      message.error("操作失败！");
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
    <div className="editor-container">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space wrap className="button-group">
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title level={2}>编辑笔记</Title>
              
              <Input
                placeholder="笔记标题"
                value={title}
                onChange={e => setTitle(e.target.value)}
                size="large"
              />

              <div className="rich-text-editor">
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                />
              </div>

              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                size="large"
                block
              >
                保存笔记
              </Button>
            </Space>
          )}
        </Card>
      </Space>
    </div>
  );
}