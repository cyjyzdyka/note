// 存储键名
const STORAGE_KEY = 'knowledge_base_notes';

// 获取所有笔记
export const getNotes = () => {
  try {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
};

// 获取单个笔记
export const getNote = (id) => {
  try {
    const notes = getNotes();
    return notes.find(note => note.id === parseInt(id));
  } catch (error) {
    console.error('Error getting note:', error);
    return null;
  }
};

// 保存笔记（新建或更新）
export const saveNote = (note) => {
  try {
    const notes = getNotes();
    const index = notes.findIndex(n => n.id === note.id);
    
    if (index !== -1) {
      // 更新现有笔记
      notes[index] = { ...note, lastModified: new Date().toISOString() };
    } else {
      // 新建笔记
      notes.push({
        ...note,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error('Error saving note:', error);
    return false;
  }
};

// 删除笔记
export const deleteNote = (id) => {
  try {
    const notes = getNotes();
    const filteredNotes = notes.filter(note => note.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    return false;
  }
}; 