import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Space, Input } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Search } = Input;

function AppHeader() {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // 获取笔记数据
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/src/mockData.json");
        const data = await response.json();
        setNotes(data.notes || []);
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
    <AntHeader className="app-header">
      <div className="header-content">
        <Button 
          type="text" 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          className="home-button"
        >
          知识库
        </Button>

        <div 
          className="search-container" 
          onMouseLeave={() => {
            setIsSearchExpanded(false);
            setSearchQuery("");
          }}
        >
          <div className={`search-wrapper ${isSearchExpanded ? 'expanded' : ''}`}>
            <Search
              placeholder="搜索标题或内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: isSearchExpanded ? 300 : 0 }}
            />
            <Button 
              icon={<SearchOutlined />} 
              size="large"
              shape="circle"
              className="search-button"
              onMouseEnter={() => setIsSearchExpanded(true)}
            />
          </div>
          {isSearchExpanded && filteredNotes.length > 0 && (
            <div className="search-results">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id}
                  className="search-result-item"
                  onClick={() => {
                    navigate(`/notes/${note.id}`);
                    setIsSearchExpanded(false);
                    setSearchQuery("");
                  }}
                >
                  <h4>{note.title}</h4>
                  <p>{note.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AntHeader>
  );
}

export default AppHeader;
