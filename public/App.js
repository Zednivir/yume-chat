addEventListener('DOMContentLoaded', function() {
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
  const uploadButton = document.getElementById('uploadButton');
  const avatarFileInput = document.getElementById('avatarFile');
  const imgElement = document.querySelector('.loginTab img');
  const userAvatarElement = document.querySelector('.userAvatar');
  const bugButton = document.getElementById('bugButton');
  const debugTab = document.querySelector('.debugTab');
  
   // Declare userDisplayName and openAIKey variables
   let userDisplayName = 'User'; // Default display name
   let openAIKey = null;
 
   // Function to save the OpenAI key
   function saveOpenAIKey() {
     const openAIKeyInput = document.getElementById('openAIKey');
     openAIKey = openAIKeyInput.value.trim();
     settingsTab.classList.remove('active'); // Close the settings tab
   }
 
   // Function to send user's message to OpenAI and receive bot's reply
   async function sendToOpenAI(messageText) {
     const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';
     const prompt = userDisplayName + ': ' + messageText;
     const maxTokens = 150;
     const temperature = 1;
 
     const headers = {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + openAIKey,
     };
 
     const data = JSON.stringify({
       'prompt': prompt,
       'max_tokens': maxTokens,
       'temperature': temperature,
     });
 
     const response = await fetch(endpoint, {
       method: 'POST',
       headers: headers,
       body: data,
     });
 
     const result = await response.json();
     return result.choices[0].text.trim();
   }

  function adjustMessageContainer() {
    const chatContainer = document.querySelector('.chat-container');
    const inputContainer = document.querySelector('.input-container');
    const sent = document.querySelector('.sent');

    if (debugTab.classList.contains('active') && sidebar.classList.contains('active')) {
      // If both debug-tab and sidebar are active, do something different
      messageContainer.style.width = '68.34%';
      messageContainer.style.marginLeft = '410px';
      inputContainer.style.marginLeft = '211px';
    } else if (debugTab.classList.contains('active')) {
      // If only debug-tab is active
      messageContainer.style.width = '84.15%';
      messageContainer.style.marginLeft = '205px';
      inputContainer.style.marginLeft = '0px';
    } else if (sidebar.classList.contains('active')) {
      // If only sidebar is active
      messageContainer.style.width = '84.15%';
      messageContainer.style.marginLeft = '205px';
      inputContainer.style.marginLeft = '211px';
    } else {
      // If neither is active
      messageContainer.style.width = '100%';
      messageContainer.style.marginLeft = '0';
      inputContainer.style.marginLeft = '0';
    }

    const headerHeight = document.querySelector('header').offsetHeight;
    const inputContainerHeight = inputContainer.offsetHeight;
    const messageContainerHeight = chatContainer.offsetHeight - headerHeight - inputContainerHeight;
    messageContainer.style.height = `${messageContainerHeight}px`;
    scrollToBottom();
  }

  // Function to toggle the debug tab
  bugButton.addEventListener('click', function() {
    debugTab.classList.toggle('active');
    userTab.classList.toggle('double');
    settingsTab.classList.toggle('double');
    adjustMessageContainer(); 
  });

  // Function to close the debug tab
  document.getElementById('closeDebug').addEventListener('click', function() {
    debugTab.classList.remove('active');
    adjustMessageContainer(); 
  });

  // Function to toggle the debug tab with the "d" key
  document.addEventListener('keydown', function(event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 'd' && !focusedElements.length) {
      bugButton.click();
    }
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imgElement.src = e.target.result; // Update the login avatar's image
        userAvatarElement.src = e.target.result; // Update the user avatar's image above messages
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Get the username input element
  const usernameInput = document.getElementById('Username');

  // Function to update the user's display name
  usernameInput.addEventListener('input', function() {
    const newUsername = usernameInput.value.trim();
    userDisplayName = newUsername; // Update the user's display name
  });

  uploadButton.addEventListener('click', function() {
    avatarFileInput.click();
  });

  avatarFileInput.addEventListener('change', handleFileUpload);

  // Add event listener to handle file selection and upload
  avatarFileInput.addEventListener('change', handleFileUpload);

  // Function to toggle the settings tab
  settingsButton.addEventListener('click', function() {
    if (userTab.classList.contains('active')) {
      userTab.classList.remove('active');
    }
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
    debugTab.classList.toggle('push');
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
    if (settingsTab.classList.contains('active')) {
      settingsTab.classList.remove('active');
    }
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

  // Function to handle bot's replies
  async function handleBotReply(messageText) {
    if (!openAIKey) {
      alert('Please enter your OpenAI key before using the bot.');
      return;
    }

    // Add a rate limiting mechanism to avoid making requests too frequently
    if (handleBotReply.isSendingRequest) {
      return;
    }

    handleBotReply.isSendingRequest = true;

    try {
      const botReply = await sendToOpenAI(messageText);

      if (botReply) {
        const className = 'received'; // CSS class for the bot's message
        const botAvatar = 'avatars/bot/bot.png'; // Bot's profile picture
        const messageElement = createMessageElement(botReply, className, botAvatar);
        messageContainer.appendChild(messageElement);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending request to OpenAI:', error);
    } finally {
      // Release the rate limiting after a certain delay (e.g., 2 seconds)
      setTimeout(() => {
        handleBotReply.isSendingRequest = false;
      }, 2000);
    }
  }

  // Function to send user's message
  function sendMessage() {
    const messageText = inputElement.value.trim();

    if (messageText !== '') {
      const className = 'sent'; // CSS class for the user's message
      const userAvatar = 'avatars/user/user.png'; // User's profile picture
      const messageElement = createMessageElement(messageText, className, userAvatar, userDisplayName);
      messageContainer.appendChild(messageElement);
      inputElement.value = '';
      adjustInputHeight();

      // Send user's message to OpenAI for bot's reply
      handleBotReply(messageText);
    }
  }


  // Function to create the message element
  function createMessageElement(text, className, avatarSrc, username) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);

    // Create a separate div for the user info (avatar and username)
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');

    // Create and add the avatar image to the user info div
    const avatarElement = document.createElement('img');
    avatarElement.src = (className === 'sent') ? userAvatarElement.src : avatarSrc;
    avatarElement.classList.add('avatar');
    avatarElement.style.width = '40px'; // Adjust the width as needed
    avatarElement.style.height = '40px'; // Adjust the height as needed
    userInfoDiv.appendChild(avatarElement);

    // Get the username from the data-username attribute of the userAvatarElement
    const usernameText = document.createElement('span');
    usernameText.textContent = username;
    usernameText.id = 'message-username'; // Add ID to the username element
    userInfoDiv.appendChild(usernameText);

    // Append the user info div to the messageElement
    messageElement.appendChild(userInfoDiv);

    // Create the message text element
    const pElement = document.createElement('p');
    const lines = text.split('\n'); // Split the text by line breaks

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

  inputElement.addEventListener('input', adjustInputHeight);

  // Adjust message container height on initial page load
  adjustMessageContainer();

  // Event listener for saving the OpenAI key
  document.getElementById('saveOpenAIKey').addEventListener('click', saveOpenAIKey);

});
