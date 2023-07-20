document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle-sidebar');
  const closeUser = document.getElementById('closeUser');
  const sidebar = document.querySelector('.sidebar');
  const userButton = document.getElementById('userButton');
  const userTab = document.querySelector('.userTab');
  const messageContainer = document.querySelector('.message-container');
  const sendButton = document.getElementById('sendButton');
  const inputElement = document.getElementById('messageInput');
  const settingsButton = document.getElementById('gearButton');
  const settingsTab = document.querySelector('.settingsTab');
  const closeSettings = document.getElementById('closeSettings');

  // Function to toggle the settings tab
  settingsButton.addEventListener('click', function() {
    settingsTab.classList.toggle('active');
  });

  // Function to close the settings tab
  closeSettings.addEventListener('click', function() {
    settingsTab.classList.toggle('active');
  });

  // Function to toggle the settings tab with the "s" key
  document.addEventListener('keydown', function(event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 's' && !focusedElements.length && document.activeElement !== inputElement) {
      settingsButton.click();
    }
  });

  // Function to toggle the sidebar
  toggleButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    userTab.classList.toggle('push');
    settingsTab.classList.toggle('push');
    adjustMessageContainer();
  });

  document.addEventListener('keydown', function(event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 'm' && !focusedElements.length && document.activeElement !== inputElement) {
      toggleButton.click();
    }
  });

  // Function to toggle the user settings tab
  userButton.addEventListener('click', function() {
    userTab.classList.toggle('active');
  });

  // Function to close the user settings tab
  closeUser.addEventListener('click', function() {
    userTab.classList.toggle('active');
  });

  // Function to toggle the user settings tab with the "u" key
  document.addEventListener('keydown', function(event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 'u' && !focusedElements.length && document.activeElement !== inputElement) {
      userButton.click();
    }
  });

  sendButton.addEventListener('click', async function(event) {
    event.preventDefault();
    sendMessage();
  });
  
  inputElement.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Function to send a message to the AI API
  async function sendMessageToAI(messageText) {
    try {
      const response = await fetch('localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if required
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      return data.message; // Assuming the AI API returns the response in the 'message' field
    }   catch (error) {
      console.error('Error sending message to AI:', error);
      return 'Error: Failed to get AI response.';
    }
  }

  function sendMessageToFirebase(messageText) {
    messageCollection.add({
      text: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      sentByCurrentUser: true // This indicates that the message was sent by the current user
    });
  }
  
  messageCollection.orderBy('timestamp').onSnapshot((snapshot) => {
    messageContainer.innerHTML = ''; // Clear the existing messages
  
    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageText = messageData.text;
      const className = messageData.sentByCurrentUser ? 'sent' : 'received';
      const messageElement = createMessageElement(messageText, className);
      messageContainer.appendChild(messageElement);
    });
  
    scrollToBottom(); // Scroll to the bottom after new messages arrive
  });

  async function sendMessage() {
    const messageText = inputElement.value.trim();
    if (messageText !== '') {
      const aiResponse = await sendMessageToAI(messageText); // Send message to AI API
      sendMessageToFirebase(aiResponse); // Save the AI response to Firebase

      inputElement.value = '';
      adjustInputHeight();
    }
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

  function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
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

    // Adjust message container height based on other elements
    const headerHeight = document.querySelector('header').offsetHeight;
    const inputContainerHeight = inputContainer.offsetHeight;
    const messageContainerHeight = chatContainer.offsetHeight - headerHeight - inputContainerHeight;
    messageContainer.style.height = `${messageContainerHeight}px`;
    scrollToBottom();
  }

  inputElement.addEventListener('input', adjustInputHeight);

  // Adjust message container height on initial page load
  adjustMessageContainer();

});