import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, List, Button, Row, Col, Typography, Space } from "antd";
import { 
  PlusOutlined, 
  UnorderedListOutlined, 
  ClockCircleOutlined,
  SearchOutlined 
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Search } = Input;

function Homepage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]); // 所有笔记数据
  const [recentNotes, setRecentNotes] = useState([]); // 最近笔记
  const [searchQuery, setSearchQuery] = useState(""); // 搜索关键词
  const [filteredNotes, setFilteredNotes] = useState([]); // 搜索结果

  // 模拟从虚拟数据库中获取最近笔记
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/src/mockData.json"); // 假设虚拟数据库路径
        const data = await response.json();
        setNotes(data.notes || []);
        setRecentNotes(data.notes.slice(0, 5)); // 假设最近笔记是最新的5条
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // 搜索功能
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes([]);
    } else {
      const results = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(results);
    }
  }, [searchQuery, notes]);

  return (
    <div className="homepage">
      <div className="homepage-content">
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Link to="/create">
              <Button type="primary" icon={<PlusOutlined />} size="large" block>
                创建新笔记
              </Button>
            </Link>
          </Col>
          <Col span={12}>
            <Link to="/notes">
              <Button icon={<UnorderedListOutlined />} size="large" block>
                查看所有笔记
              </Button>
            </Link>
          </Col>
        </Row>

        <Card 
          title={
            <Space>
              <ClockCircleOutlined />
              <span>最近笔记</span>
            </Space>
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
                        <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
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
        </Card>
      </div>
    </div>
  );
}

export default Homepage;