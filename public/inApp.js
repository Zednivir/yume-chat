document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-sidebar");
  const closeUser = document.getElementById("closeUser");
  const sidebar = document.querySelector(".sidebar");
  const userButton = document.getElementById("userButton");
  const userTab = document.querySelector(".userTab");
  const messageContainer = document.querySelector(".message-container");
  const sendButton = document.getElementById("sendButton");
  const inputElement = document.getElementById("messageInput");
  const settingsButton = document.getElementById("gearButton");
  const settingsTab = document.querySelector(".settingsTab");
  const closeSettings = document.getElementById("closeSettings")
  const userAvatarElement = document.querySelector(".userAvatar");
  const bugButton = document.getElementById("bugButton");
  const debugTab = document.querySelector(".debugTab");
  const aiSettingsButton = document.getElementById('aiSettings');
  const yumeSettingsButton = document.getElementById('yumeSettings');
  const yumeTab = document.querySelector('.yumeTab');
  const uiSettingsButton = document.getElementById('uiSettings');  
  const uiTab = document.querySelector('.uiTab');
  const hamburgerMenu = document.querySelector('.hamburgerMenu');
  const hamButton = document.querySelector('.hamburgerButton');
  const slider = document.getElementById("mySlider");
  const sliderValue = document.getElementById("sliderValue");
  const usernameInput = document.getElementById("Username");
  const botUsernameInput = document.getElementById("BotUsername");
  const avatarFileInput = document.getElementById("avatarFile");
  const imgElement = document.getElementById("AvatarPreview");
  const botAvatarFileInput = document.getElementById("botAvatarFile");
  const botImgElement = document.getElementById("BotAvatarPreview");

  function uploadBotAvatar(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        botImgElement.src = fileContent; // Update the bot's avatar preview image
      };
      reader.readAsDataURL(file);
    }
  }

  // Attach the event listener to the bot's avatar file input
  botAvatarFileInput.addEventListener("change", uploadBotAvatar);


  function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        imgElement.src = fileContent; // Update the preview image
      };
      reader.readAsDataURL(file);
    }
  }

  // Attach the event listener to the avatar file input
  avatarFileInput.addEventListener("change", uploadFile);

  // Function to set the bot display name
  function setBotDisplayName() {
    botDisplayName = botUsernameInput.value || "Bot";
  }

  // Listen for changes in the bot username input field
  botUsernameInput.addEventListener("input", setBotDisplayName);

  // Initialize bot display name
  let botDisplayName = botUsernameInput.value || "Bot";


  // Call the function to set initial bot display name
  setBotDisplayName();

  // Function to set the user display name
  function setUserDisplayName() {
    userDisplayName = usernameInput.value || "User";
  }

  // Listen for changes in the username input field
  usernameInput.addEventListener("input", setUserDisplayName);


  function updateValue() {
    sliderValue.value = slider.value;
  }

  slider.addEventListener("input", updateValue);

  sliderValue.addEventListener("input", () => {
    if (Number(sliderValue.value) < Number(slider.min)) {
      sliderValue.value = slider.min;
    } else if (Number(sliderValue.value) > Number(slider.max)) {
      sliderValue.value = slider.max;
    }
    slider.value = sliderValue.value;
  });

  updateValue();

  yumeSettingsButton.addEventListener('click', () => {
    yumeTab.classList.add('active');
    uiTab.classList.remove('active');
  });

  uiSettingsButton.addEventListener('click', () => {
    uiTab.classList.add('active');
    yumeTab.classList.remove('active');
  });

  aiSettingsButton.addEventListener('click', () => {
    yumeTab.classList.remove('active');
    uiTab.classList.remove('active');
  });

  settingsButton.addEventListener('click', function () {
    if (userTab.classList.contains("active")) {
      userTab.classList.remove("active");
      hamburgerMenu.classList.remove("active");
    }
    settingsTab.classList.toggle("active");
    hamburgerMenu.classList.remove("active");
  });

  closeSettings.addEventListener('click', function () {
    settingsTab.classList.toggle('active');
  });

  document.addEventListener('keydown', function (event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 's' && !focusedElements.length && document.activeElement !== inputElement) {
      settingsButton.click();
    }
  });

  hamButton.addEventListener('click', function () {
    hamburgerMenu.classList.toggle('active');
  });

  toggleButton.addEventListener('click', function () {
    sidebar.classList.toggle("active");
    //userTab.classList.toggle("push");
    //settingsTab.classList.toggle("push");
    hamburgerMenu.classList.toggle("push");
    debugTab.classList.toggle("push");
    hamburgerMenu.classList.remove("active");
    adjustMessageContainer();
  });

  document.addEventListener('keydown', function (event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 'm' && !focusedElements.length && document.activeElement !== inputElement) {
      toggleButton.click();
    }
  });

  bugButton.addEventListener("click", function () {
    debugTab.classList.toggle("active");
    //userTab.classList.toggle("double");
    //settingsTab.classList.toggle("double");
    hamburgerMenu.classList.remove("active");
    adjustMessageContainer();
  });

  document.getElementById("closeDebug").addEventListener("click", function () {
    debugTab.classList.remove("active");
    //userTab.classList.toggle("double");
    //settingsTab.classList.toggle("double");
    adjustMessageContainer();
  });

  document.addEventListener("keydown", function (event) {
    const inputElements = Array.from(document.getElementsByTagName("input"));
    const textareaElements = Array.from(document.getElementsByTagName("textarea"));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === "d" && !focusedElements.length) {
      bugButton.click();
    }
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgElement.src = e.target.result;
        userAvatarElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  userButton.addEventListener('click', function () {
    if (settingsTab.classList.contains("active")) {
      settingsTab.classList.remove("active");
      hamburgerMenu.classList.remove("active");
    }
    userTab.classList.toggle("active");
    hamburgerMenu.classList.remove("active");
  });

  closeUser.addEventListener('click', function () {
    userTab.classList.toggle('active');
  });

  document.addEventListener('keydown', function (event) {
    const inputElements = Array.from(document.getElementsByTagName('input'));
    const textareaElements = Array.from(document.getElementsByTagName('textarea'));
    const focusedElements = inputElements.concat(textareaElements).filter(element => element === document.activeElement);

    if (event.key === 'u' && !focusedElements.length && document.activeElement !== inputElement) {
      userButton.click();
    }
  });

  sendButton.addEventListener('click', function (event) {
    hamburgerMenu.classList.remove("active");
    event.preventDefault();
    sendMessage();
  });

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  let userDisplayName = "User";

  async function handleBotReply(messageText) {
    if (handleBotReply.isSendingRequest) {
      return;
    }
  
    handleBotReply.isSendingRequest = true;
  
    try {
      const botReply = await sendToCustomAPI(messageText);
  
      if (botReply) {
        const className = "received";
        const botAvatar = botImgElement.src; // Use the updated bot avatar URL
        const messageElement = createMessageElement(botReply, className, botAvatar, botDisplayName);
        messageContainer.appendChild(messageElement);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error sending request to the custom API:", error);
      const className = "received";
      const errorMessage = "Error, couldn't connect to API. Also sugma cock.";
      const botAvatar = botImgElement.src; // Use the updated bot avatar URL
      const messageElement = createMessageElement(errorMessage, className, botAvatar, botDisplayName);
      messageContainer.appendChild(messageElement);
      scrollToBottom();
    } finally {
      setTimeout(() => {
        handleBotReply.isSendingRequest = false;
      }, 2000);
    }
  }
  

  async function sendToCustomAPI(messageText) {
    try {
      const request = {
        prompt: messageText,
      };

      const response = await fetch("/api/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const responseBody = await response.json();
      return responseBody.text;
    } catch (error) {
      throw error;
    }
  }

  function sendMessage() {
    const messageText = inputElement.value.trim();
  
    if (messageText !== "") {
      const className = "sent";
      const userAvatar = userAvatarElement.src; // Use the updated user avatar URL
      const messageElement = createMessageElement(messageText, className, userAvatar, userDisplayName);
      messageContainer.appendChild(messageElement);
      inputElement.value = "";
      adjustInputHeight();
      handleBotReply(messageText);
    }
  }
  

  function createMessageElement(text, className, avatarSrc, username) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
  
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add(className === "sent" ? "user-info" : "bot-info");
  
    const avatarElement = document.createElement("img");
    avatarElement.src = avatarSrc;
    avatarElement.classList.add("avatar");
    avatarElement.style.width = "40px";
    avatarElement.style.height = "40px";
    userInfoDiv.appendChild(avatarElement);
  
    const usernameText = document.createElement("span");
    usernameText.textContent = username;
    usernameText.id = "message-username";
    userInfoDiv.appendChild(usernameText);
  
    messageElement.appendChild(userInfoDiv);
  
    const pElement = document.createElement("p");
  
    const formattingRules = [
      { pattern: /"([^"]*)"/g, style: 'color: #282a36;' },
      { pattern: /\*([^\*]*)\*/g, style: 'font-style: italic;' },
      { pattern: /\|([^|]*)\|/g, style: 'font-weight: bold;' },
      { pattern: /-([^-]*)-/g, style: 'text-decoration: line-through;' }
    ];
  
    const lines = text.split("\n");
    lines.forEach(line => {
      const lineElement = document.createElement("div");
      for (const rule of formattingRules) {
        line = line.replace(rule.pattern, `<span style="${rule.style}">$1</span>`);
      }
      lineElement.innerHTML = line;
      pElement.appendChild(lineElement);
    });
  
    messageElement.appendChild(pElement);
  
    if (className === "sent") {
      const createButton = (src, alt) => {
        const button = document.createElement("img");
        button.src = src;
        button.classList.add("delete-button");
        button.style.width = "20px";
        button.style.height = "20px";
        button.alt = alt;
        return button;
      };
  
      const deleteButton = createButton("img/bin.png", "Delete Message");
      deleteButton.addEventListener("click", () => {
        messageElement.remove();
      });
      userInfoDiv.appendChild(deleteButton);
  
      const editButton = createButton("img/pen.png", "Edit Message");
      const editElement = document.createElement("div");
      editElement.classList.add("editElement");
      editElement.style.display = "none";
      editElement.style.flex = "1";
      editButton.classList.add("edit-button")
      editButton.addEventListener("click", () => {
        editElement.style.display = editElement.style.display === "flex" ? "none" : "flex";
        if (editElement.style.display === "flex") {
          editElement.innerHTML = pElement.innerHTML;
        }
      });
      userInfoDiv.appendChild(editButton);
      messageElement.appendChild(editElement);
    }
  
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
    const chatContainer = document.querySelector(".chat-container");

    if (debugTab.classList.contains("active") && sidebar.classList.contains("active")) {
      messageContainer.style.width = "73%";
      messageContainer.style.marginLeft = "27%";
    } else if (debugTab.classList.contains("active")) {
      messageContainer.style.width = "100%";
      messageContainer.style.marginLeft = "0";
    } else {
      messageContainer.style.width = "100%";
      messageContainer.style.marginLeft = "0";
    }

    const headerHeight = document.querySelector("header").offsetHeight;
    const messageContainerHeight = chatContainer.offsetHeight - headerHeight;
    messageContainer.style.height = `${messageContainerHeight}px`;
    scrollToBottom();
  }

  inputElement.addEventListener('input', adjustInputHeight);

  adjustMessageContainer();
});
