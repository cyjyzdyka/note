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
import TextAlign from "@tiptap/extension-text-align";
import { Button, Space, Tooltip, Divider } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  CodeOutlined,
  TableOutlined,
  PictureOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('输入图片 URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('输入链接 URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Tooltip title="加粗">
        <Button
          type={editor.isActive('bold') ? 'primary' : 'default'}
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
      </Tooltip>

      <Tooltip title="斜体">
        <Button
          type={editor.isActive('italic') ? 'primary' : 'default'}
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
      </Tooltip>

      <Tooltip title="下划线">
        <Button
          type={editor.isActive('underline') ? 'primary' : 'default'}
          icon={<UnderlineOutlined />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
      </Tooltip>

      <Tooltip title="删除线">
        <Button
          type={editor.isActive('strike') ? 'primary' : 'default'}
          icon={<StrikethroughOutlined />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
      </Tooltip>

      <Divider type="vertical" />

      <Tooltip title="有序列表">
        <Button
          type={editor.isActive('orderedList') ? 'primary' : 'default'}
          icon={<OrderedListOutlined />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </Tooltip>

      <Tooltip title="无序列表">
        <Button
          type={editor.isActive('bulletList') ? 'primary' : 'default'}
          icon={<UnorderedListOutlined />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
      </Tooltip>

      <Divider type="vertical" />

      <Tooltip title="左对齐">
        <Button
          type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
          icon={<AlignLeftOutlined />}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
      </Tooltip>

      <Tooltip title="居中对齐">
        <Button
          type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
          icon={<AlignCenterOutlined />}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
      </Tooltip>

      <Tooltip title="右对齐">
        <Button
          type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
          icon={<AlignRightOutlined />}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
      </Tooltip>

      <Divider type="vertical" />

      <Tooltip title="代码块">
        <Button
          type={editor.isActive('codeBlock') ? 'primary' : 'default'}
          icon={<CodeOutlined />}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
      </Tooltip>

      <Tooltip title="插入表格">
        <Button
          icon={<TableOutlined />}
          onClick={addTable}
        />
      </Tooltip>

      <Tooltip title="插入图片">
        <Button
          icon={<PictureOutlined />}
          onClick={addImage}
        />
      </Tooltip>

      <Tooltip title="插入链接">
        <Button
          type={editor.isActive('link') ? 'primary' : 'default'}
          icon={<LinkOutlined />}
          onClick={addLink}
        />
      </Tooltip>
    </Space>
  );
};

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
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  return (
    <div className="rich-text-editor">
      <MenuBar editor={editor} />
      <div 
        style={{ 
          border: "1px solid #d9d9d9", 
          borderRadius: "6px",
          padding: "16px",
          minHeight: "200px"
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;