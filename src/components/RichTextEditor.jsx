import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align"; // 引入 TextAlign 扩展

const RichTextEditor = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Link.configure({
        openOnClick: true,
      }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"], // 允许对齐的节点类型
      }),
    ],
    content: value, // 初始内容
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML()); // 内容更新时回调父组件
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      {/* 工具栏 */}
      <div className="menu-bar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </button>
        <button
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
        >
          Insert Table
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#ff0000").run()}
        >
          Red Text
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setImage({ src: "https://via.placeholder.com/150" }).run()
          }
        >
          Insert Image
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear Marks
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          Align Left
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          Align Center
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          Align Right
        </button>
      </div>

      {/* 编辑器内容 */}
      <EditorContent editor={editor} />
    </div>
  );
};


export default RichTextEditor;