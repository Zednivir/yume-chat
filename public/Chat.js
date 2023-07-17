document.addEventListener('DOMContentLoaded', function() {
    const messageContainer = document.querySelector('.message-container');
    const sendButton = document.getElementById('sendButton');
    const inputElement = document.getElementById('messageInput');
  
    sendButton.addEventListener('click', function(event) {
      event.preventDefault();
      sendMessage();
    });
  
    inputElement.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  
    function sendBotReply() {
      const randomNumber = Math.floor(Math.random() * 10) + 1; // Generate random number between 1 and 10
      const receivedMessageElement = createMessageElement(randomNumber.toString(), 'received');
      messageContainer.appendChild(receivedMessageElement);
      scrollToBottom(); // Scroll to the bottom after receiving a message
    }
  
    function sendMessage() {
        const messageText = inputElement.value.trim();
        if (messageText !== '') {
          const sentMessageElement = createMessageElement(messageText, 'sent');
          messageContainer.appendChild(sentMessageElement);
    
          // Simulate bot reply after a short delay
          setTimeout(function() {
            sendBotReply();
          }, 200);
    
          inputElement.value = '';
          adjustInputHeight();
          scrollToBottom(); // Scroll to the bottom after sending a message
        }
    }
  
    function adjustInputHeight() {
        inputElement.style.height = 'auto';
        inputElement.style.height = `${inputElement.scrollHeight}px`;
        adjustMessageContainer();
    }
  
    function adjustMessageContainer() {
        const chatContainer = document.querySelector('.chat-container');
        const inputContainer = document.querySelector('.input-container');
    
        if (sidebar.classList.contains('active')) {
          messageContainer.style.width = 'calc(100% - 211px)';
          messageContainer.style.marginLeft = '211px';
          inputContainer.style.marginLeft = '211px';
        } else {
          messageContainer.style.width = '100%';
          messageContainer.style.marginLeft = '0';
          inputContainer.style.marginLeft = '0';
        }
    }
  
    function scrollToBottom() {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    function createMessageElement(text, className) {
        const pElement = document.createElement('p');
        const lines = text.split('\n'); // Split the text by line breaks
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
    
        lines.forEach((line, index) => {
          if (line === '' && index < lines.length - 1 && lines[index + 1] === '') {
            // Check for consecutive empty lines
            const emptyLineElement = document.createElement('div');
            pElement.appendChild(emptyLineElement);
          } else {
            const lineElement = document.createElement('div');
            lineElement.textContent = line;
            pElement.appendChild(lineElement);
          }
        });
    
        messageElement.appendChild(pElement);

        return messageElement;
    }
    
  
    // Adjust message container height on initial page load
    adjustMessageContainer();
});
  