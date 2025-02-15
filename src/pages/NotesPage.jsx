import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NotesPage() {
  const [notes, setNotes] = useState([]); // 所有笔记数据

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
      <h1>所有笔记</h1>
      <p>以下是你知识库中的所有笔记。</p>

      {/* 笔记列表 */}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>
              {note.title} - {note.date}
            </Link>
          </li>
        ))}
      </ul>

      {/* 快速操作 */}
      <div className="quick-actions">
        <Link to="/create" className="btn">
          创建新笔记
        </Link>
        <Link to="/" className="btn">
          返回主页
        </Link>
      </div>
    </div>
  );
}

export default NotesPage;