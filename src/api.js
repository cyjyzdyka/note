import mockData from "./mockData";

// 模拟新建笔记接口
export const createNote = async (note) => {
  return new Promise((resolve) => {
    const newNote = { ...note, id: Date.now() }; // 模拟 ID
    mockData.notes.push(newNote);
    resolve(newNote); // 返回新建的笔记
  });
};

// 模拟获取所有笔记接口
export const fetchNotes = async () => {
  return new Promise((resolve) => {
    resolve(mockData.notes);
  });
};

// 模拟删除笔记接口
export const deleteNote = async (id) => {
  return new Promise((resolve) => {
    mockData.notes = mockData.notes.filter((note) => note.id !== id);
    resolve({ success: true });
  });
};