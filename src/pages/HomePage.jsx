import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1>欢迎来到知识库</h1>
      <p>集中管理你的笔记、想法和知识。</p>

      {/* 快速操作 */}
      <div className="quick-actions">
        <Link to="/create" className="btn">
          创建新笔记
        </Link>
        <Link to="/notes" className="btn">
          查看所有笔记
        </Link>
      </div>

      {/* 最近笔记预览 */}
      <div className="recent-notes">
        <h2>最近笔记</h2>
        <ul>
          {recentNotes.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>
                {note.title} - {note.date}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 搜索框 */}
      <div className="search-bar">
        <h2>搜索笔记</h2>
        <input
          type="text"
          placeholder="搜索标题或内容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 搜索结果 */}
      {filteredNotes.length > 0 && (
        <div className="search-results">
          <h2>搜索结果</h2>
          <ul>
            {filteredNotes.map((note) => (
              <li key={note.id}>
                <Link to={`/notes/${note.id}`}>
                  {note.title} - {note.date}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;