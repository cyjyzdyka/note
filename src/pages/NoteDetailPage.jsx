import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Space, Typography, Divider, message, Popconfirm } from "antd";
import { 
  HomeOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ArrowLeftOutlined 
} from "@ant-design/icons";
import { getNote, deleteNote } from "../utils/storage";

const { Title, Paragraph } = Typography;

function NoteDetailPage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const note = getNote(noteId);

  // 如果笔记不存在，重定向到笔记列表页
  if (!note) {
    message.error("笔记不存在！");
    navigate("/notes");
    return null;
  }

  // 删除笔记
  const handleDelete = () => {
    if (deleteNote(parseInt(noteId))) {
      message.success("笔记已删除！");
      navigate("/notes");
    } else {
      message.error("删除失败！");
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate("/notes")}
          >
            返回笔记列表
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
            <Title level={2}>{note.title}</Title>
            
            <div 
              className="note-content"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />

            <Divider />

            <Space direction="vertical" size="small">
              <Typography.Text type="secondary">
                创建时间：{new Date(note.createdAt).toLocaleString()}
              </Typography.Text>
              <Typography.Text type="secondary">
                最后修改：{new Date(note.lastModified).toLocaleString()}
              </Typography.Text>
            </Space>

            <Space>
              <Button 
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate(`/edit/${note.id}`)}
              >
                编辑笔记
              </Button>
              <Popconfirm
                title="删除笔记"
                description="确定要删除这篇笔记吗？此操作不可恢复。"
                onConfirm={handleDelete}
                okText="确定"
                cancelText="取消"
              >
                <Button 
                  danger
                  icon={<DeleteOutlined />}
                >
                  删除笔记
                </Button>
              </Popconfirm>
            </Space>
          </Space>
        </Card>
      </Space>
    </div>
  );
}

export default NoteDetailPage;