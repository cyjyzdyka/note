import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function NoteDetailPage() {
  const { noteId } = useParams(); // 获取 URL 中的 noteId
  const [note, setNote] = useState(null);

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
    return <p>笔记未找到！</p>;
  }

  return (
    <div className="note-detail">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>创建日期：{note.date}</p>

      {/* 操作按钮 */}
      <div className="actions">
        <Link to={`/edit/${note.id}`} className="btn">
          编辑笔记
        </Link>
        <Link to="/notes" className="btn">
          返回所有笔记
        </Link>
      </div>
    </div>
  );
}

export default NoteDetailPage;