import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function NoteEditorPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button 
        onClick={() => navigate("/")} 
        style={{ marginBottom: "20px" }}
      >
        返回主页
      </Button>
      <div>Note Editor Page</div>
    </div>
  );
}