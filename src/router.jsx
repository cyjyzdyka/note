import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NoteEditorPage from "./pages/NoteEditorPage";
import CreateNotePage from "./pages/CreateNotePage";
import NotesPage from "./pages/NotesPage"; // 引入 NotesPage
import NoteDetailPage from "./pages/NoteDetailPage"; // 引入 NoteDetailPage（笔记详情页）

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create" element={<CreateNotePage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:noteId" element={<NoteDetailPage />} />
      <Route path="/edit/:noteId" element={<NoteEditorPage />} />
    </Routes>
  );
}