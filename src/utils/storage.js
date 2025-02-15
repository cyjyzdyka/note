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
export const saveNote = async (note) => {
  try {
    const notes = getNotes();
    const index = notes.findIndex(n => n.id === note.id);
    
    // 获取AI生成的摘要
    let summary = '';
    try {
      // 清理 HTML 标签
      const cleanContent = note.content.replace(/<[^>]*>/g, '');
      
      const response = await fetch('https://api.siliconflow.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SILICONFLOW_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3",
          messages: [
            {
              role: "user",
              content: `请用不超过三句话总结以下内容：\n${cleanContent}`
            }
          ],
          max_tokens: 512,
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      summary = data.choices[0].message.content;
    } catch (error) {
      console.error('获取AI摘要失败:', error);
      console.error('错误详情:', error.message);  // 添加更详细的错误日志
      summary = '无法生成摘要';
    }
    
    if (index !== -1) {
      // 更新现有笔记
      notes[index] = { 
        ...note, 
        summary,
        lastModified: new Date().toISOString() 
      };
    } else {
      // 新建笔记
      notes.push({
        ...note,
        summary,
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