import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Input, List, Button, Row, Col, Typography } from "antd";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Search } = Input;

function Homepage() {
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
      <Typography>
        <Title level={1}>欢迎来到知识库</Title>
        <Paragraph>集中管理你的笔记、想法和知识。</Paragraph>
      </Typography>

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

      <Card title="搜索笔记" style={{ marginBottom: 24 }}>
        <Search
          placeholder="搜索标题或内容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          enterButton
        />
        {filteredNotes.length > 0 && (
          <List
            style={{ marginTop: 16 }}
            dataSource={filteredNotes}
            renderItem={(note) => (
              <List.Item>
                <Link to={`/notes/${note.id}`}>
                  {note.title} - {note.date}
                </Link>
              </List.Item>
            )}
          />
        )}
      </Card>

      <Card title="最近笔记">
        <List
          dataSource={recentNotes}
          renderItem={(note) => (
            <List.Item>
              <Link to={`/notes/${note.id}`}>
                {note.title} - {note.date}
              </Link>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Homepage;