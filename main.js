const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // 添加用户消息
  appendMessage('user', message);
  userInput.value = '';

  // 调用后端API
  try {
    const response = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    appendMessage('ai', data.reply);
  } catch (error) {
    appendMessage('ai', '错误：无法连接到AI服务');
  }

  // 滚动到底部
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendMessage(role, content) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
}

// 回车发送
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});