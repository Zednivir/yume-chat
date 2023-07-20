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
  const uploadButton = document.getElementById('uploadButton');
  const avatarFileInput = document.getElementById('avatarFile');
  const imgElement = document.querySelector('.loginTab img');
  const userAvatarElement = document.querySelector('.userAvatar');

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
  
  const usernameInput = document.getElementById('Username');
  usernameInput.addEventListener('input', function() {
    const newUsername = usernameInput.value.trim();
    userAvatarElement.setAttribute('data-username', newUsername);
  });

  uploadButton.addEventListener('click', function() {
    avatarFileInput.click();
  });

  avatarFileInput.addEventListener('change', handleFileUpload);

  // Add event listener to handle file selection and upload
  avatarFileInput.addEventListener('change', handleFileUpload);
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

  function simulateBotReply() {
    const replyText = "Received"; // Text for the bot's reply
    const className = 'received'; // CSS class for the bot's message
    const botAvatar = 'avatars/bot/bot.png'; // Bot's profile picture
    const messageElement = createMessageElement(replyText, className, botAvatar);
    messageContainer.appendChild(messageElement);
    scrollToBottom();
  }

  function sendMessage() {
    const messageText = inputElement.value.trim();
    const usernameInput = document.getElementById('Username');
    let username = usernameInput.value.trim();
  
    // Use a default username if the username input is empty
    if (username === '') {
      username = 'User';
    }
  
    if (messageText !== '') {
      const className = 'sent'; // CSS class for the user's message
      const userAvatar = 'avatars/user/user.png'; // User's profile picture
      const messageElement = createMessageElement(messageText, className, userAvatar, username);
      messageContainer.appendChild(messageElement);
      scrollToBottom();
  
      inputElement.value = '';
      adjustInputHeight();
  
      // Simulate bot reply after a delay (e.g., 1 second)
      setTimeout(simulateBotReply, 1000);
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