import React, { useState, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { useNavigate } from "react-router-dom";

const CreateNotePage = () => {
  const [title, setTitle] = useState(""); // 笔记标题
  const [content, setContent] = useState(""); // 富文本内容
  const navigate = useNavigate();

  // 从 localStorage 加载暂存的笔记草稿
  useEffect(() => {
    const draft = localStorage.getItem("draftNote");
    if (draft) {
      const { title: draftTitle, content: draftContent } = JSON.parse(draft);
      setTitle(draftTitle || "");
      setContent(draftContent || "");
    }
  }, []);

  // 保存内容（暂存到 localStorage）
  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      alert("标题和内容都为空，无法保存！");
      return;
    }

    const draft = { title, content };
    localStorage.setItem("draftNote", JSON.stringify(draft)); // 暂存到 localStorage
    alert("内容已暂存！");
  };

  // 清空内容
  const handleClear = () => {
    if (window.confirm("确定要清空当前内容吗？")) {
      setTitle("");
      setContent("");
      localStorage.removeItem("draftNote"); // 清除暂存草稿
    }
  };

  // 提交内容（写入虚拟数据库并跳转）
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("标题和内容不能为空！");
      return;
    }

    // 模拟虚拟数据库存储
    const storedData = JSON.parse(localStorage.getItem("mockData")) || { notes: [] };
    const newNote = {
      id: Date.now(), // 模拟唯一 ID
      title,
      content,
      date: new Date().toISOString().split("T")[0], // 添加创建日期
    };

    // 写入虚拟数据库
    storedData.notes.push(newNote);
    localStorage.setItem("mockData", JSON.stringify(storedData));

    // 清空草稿
    localStorage.removeItem("draftNote");

    alert("笔记已提交！");
    setTitle("");
    setContent("");

    // 跳转到主页
    navigate("/", { replace: true }); // 跳转到主页并触发重新渲染
  };

  return (
    <div>
      <h1>创建新笔记</h1>
      <div>
        <label>
          笔记标题：
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入标题"
          />
        </label>
      </div>
      <RichTextEditor value={content} onChange={setContent} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSave}>保存</button>
        <button onClick={handleClear}>清空</button>
        <button onClick={handleSubmit}>提交</button>
      </div>
    </div>
  );
};

export default CreateNotePage;