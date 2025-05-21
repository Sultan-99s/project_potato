export const sendMessageToChatbot = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
  
      return data.response;
    } catch (err) {
      console.error('Error sending message to chatbot:', err);
      return 'দুঃখিত, আমি আপনার বার্তা বুঝতে পারিনি। পরে আবার চেষ্টা করুন।';
    }
  };
  