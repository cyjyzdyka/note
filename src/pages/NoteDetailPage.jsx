import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Space, Divider } from "antd";
import { HomeOutlined, EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function NoteDetailPage() {
  const { noteId } = useParams(); // 获取 URL 中的 noteId
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  // 模拟从虚拟数据库获取单篇笔记
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch("/src/mockData.json");
        const data = await response.json();
        const foundNote = data.notes.find((n) => n.id === parseInt(noteId));
        setNote(foundNote || null);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  if (!note) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>笔记未找到！</div>;
  }

  return (
    <div className="note-detail">
      <div className="homepage-content">
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/notes")}
          >
            返回笔记列表
          </Button>
        </Space>

        <Card style={{ marginTop: 16 }}>
          <Typography>
            <Title level={2}>{note.title}</Title>
            <Paragraph>{note.content}</Paragraph>
            <Divider />
            <Paragraph type="secondary">创建日期：{note.date}</Paragraph>
          </Typography>

          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit/${note.id}`)}
          >
            编辑笔记
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default NoteDetailPage;