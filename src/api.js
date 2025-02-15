import mockData from "./mockData";

// 获取AI摘要
export const getAISummary = async (content) => {
  try {
    const response = await fetch('https://api.siliconflow.com/v1/text/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SILICONFLOW_API_KEY}`
      },
      body: JSON.stringify({
        text: content,
        max_sentences: 3,
        language: 'zh'
      })
    });
    
    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('获取AI摘要失败:', error);
    return '无法生成摘要';
  }
};

// 模拟新建笔记接口（更新版本）
export const createNote = async (note) => {
  return new Promise(async (resolve) => {
    const summary = await getAISummary(note.content);
    const newNote = { 
      ...note, 
      id: Date.now(),
      summary 
    };
    mockData.notes.push(newNote);
    resolve(newNote);
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

// 模拟更新笔记接口
export const updateNote = async (id, note) => {
  return new Promise(async (resolve) => {
    const summary = await getAISummary(note.content);
    const updatedNote = { ...note, id, summary };
    const index = mockData.notes.findIndex(n => n.id === id);
    if (index !== -1) {
      mockData.notes[index] = updatedNote;
      resolve(updatedNote);
    } else {
      resolve(null);
    }
  });
};