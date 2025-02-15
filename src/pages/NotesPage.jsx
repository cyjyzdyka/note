import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, List, Card, Typography, Space, Row, Col } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function NotesPage() {
  const [notes, setNotes] = useState([]); // 所有笔记数据
  const navigate = useNavigate();

  // 模拟从虚拟数据库获取所有笔记
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/src/mockData.json"); // 假设虚拟数据库路径
        const data = await response.json();
        setNotes(data.notes || []); // 设置笔记列表
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-page">
      <div className="homepage-content">
        <Typography>
          <Title level={2}>所有笔记</Title>
          <Paragraph>以下是你知识库中的所有笔记。</Paragraph>
        </Typography>

        <List
          grid={{
            gutter: 16,
            xs: 1,    // <576px
            sm: 1,    // ≥576px
            md: 2,    // ≥768px
            lg: 3,    // ≥992px
            xl: 3,    // ≥1200px
            xxl: 4,   // ≥1600px
          }}
          dataSource={notes}
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
                      <Typography.Paragraph ellipsis={{ rows: 2 }}>
                        {note.content}
                      </Typography.Paragraph>
                      <Typography.Text type="secondary">
                        创建日期：{note.date}
                      </Typography.Text>
                    </Space>
                  }
                />
              </Card>
            </List.Item>
          )}
        />

        <Row justify="center">
          <Col xs={24} sm={24} md={12} lg={8}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              size="large"
              block
            >
              创建新笔记
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NotesPage;