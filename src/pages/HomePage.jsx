import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, List, Typography, Space, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getNotes } from "../utils/storage";
import { stripHtml } from "../utils/htmlUtils";

const { Title, Paragraph } = Typography;

function Homepage() {
  const navigate = useNavigate();
  const notes = getNotes();
  
  // 获取最近的5条笔记
  const recentNotes = notes
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .slice(0, 5);

  return (
    <div className="homepage">
      <div className="homepage-content">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title level={2}>欢迎使用知识库</Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/create")}
                size="large"
              >
                创建新笔记
              </Button>
            </Space>
          </Card>

          <Card
            title="最近笔记"
            extra={
              <Button type="link" onClick={() => navigate("/notes")}>
                查看全部
              </Button>
            }
          >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={recentNotes}
              renderItem={(note) => (
                <List.Item>
                  <Card
                    hoverable
                    onClick={() => navigate(`/notes/${note.id}`)}
                    style={{ height: "100%" }}
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
    </div>
  );
}

export default Homepage;