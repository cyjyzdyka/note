import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, Card, Typography, Space, Spin } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { getNotes } from "../utils/storage";
import { stripHtml } from "../utils/htmlUtils";

const { Title } = Typography;

function NotesPage() {
  const navigate = useNavigate();
  const notes = getNotes();

  // 按最后修改时间排序
  const sortedNotes = notes.sort((a, b) => 
    new Date(b.lastModified) - new Date(a.lastModified)
  );

  return (
    <div className="container">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space wrap className="button-group">
          <Button 
            icon={<HomeOutlined />} 
            onClick={() => navigate("/")}
          >
            返回主页
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/create")}
          >
            创建新笔记
          </Button>
        </Space>

        <Card title="全部笔记">
          <List
            grid={{
              gutter: 16,
              xs: 1,    // <576px
              sm: 1,    // ≥576px
              md: 2,    // ≥768px
              lg: 3,    // ≥992px
              xl: 3,    // ≥1200px
              xxl: 3,   // ≥1600px
            }}
            dataSource={sortedNotes}
            renderItem={(note) => (
              <List.Item>
                <Card
                  hoverable
                  className="note-card"
                  onClick={() => navigate(`/notes/${note.id}`)}
                >
                  <Card.Meta
                    title={note.title}
                    description={
                      <Space direction="vertical" size={0}>
                        <Typography.Paragraph 
                          ellipsis={{ rows: 2 }} 
                          style={{ marginBottom: 8 }}
                        >
                          {note.summary === undefined ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Spin size="small" />
                              <span>正在生成摘要...</span>
                            </div>
                          ) : note.summary || '暂无摘要'}
                        </Typography.Paragraph>
                        <Typography.Text type="secondary">
                          创建时间：{new Date(note.createdAt).toLocaleDateString()}
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          最后修改：{new Date(note.lastModified).toLocaleDateString()}
                        </Typography.Text>
                      </Space>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </div>
  );
}

export default NotesPage;