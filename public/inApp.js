addEventListener("DOMContentLoaded", function () {
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
    const closeSettings = document.getElementById("closeSettings");
    const uploadButton = document.getElementById("uploadButton");
    const avatarFileInput = document.getElementById("avatarFile");
    const imgElement = document.querySelector(".loginTab img");
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
    const fileButton = document.getElementById('fileButton');
    const slider = document.getElementById("mySlider");
    const sliderValue = document.getElementById("sliderValue");

    // Function to update the slider and text box value
  function updateValue() {
    sliderValue.value = slider.value;
  }

    // Event listener for slider input change
  slider.addEventListener("input", updateValue);

  // Event listener for text box input change
  sliderValue.addEventListener("input", () => {
    // Ensure the entered value is within the valid range
    if (Number(sliderValue.value) < Number(slider.min)) {
      sliderValue.value = slider.min;
    } else if (Number(sliderValue.value) > Number(slider.max)) {
      sliderValue.value = slider.max;
    }

    slider.value = sliderValue.value;
  });

  // Initialize the slider and text box value
  updateValue();

  function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        displayFileContent(fileContent);
      };
      reader.readAsText(file);
    }
  }
  
  function displayFileContent(content) {
    const messageElement = createMessageElement(content, 'sent');
    messageContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  fileButton.addEventListener('change', uploadFile);
    
  // Add a click event listener to the yumeSettings button
  yumeSettingsButton.addEventListener('click', () => {
    yumeTab.classList.add('active');
    uiTab.classList.remove('active');
  });
  
  // Add a click event listener to the uiSettings button
  uiSettingsButton.addEventListener('click', () => {
    uiTab.classList.add('active');
    yumeTab.classList.remove('active');
  });

  aiSettingsButton.addEventListener('click', () => {
    yumeTab.classList.remove('active');
    uiTab.classList.remove('active');
  });
  
    // Function to toggle the settings tab
    settingsButton.addEventListener('click', function() {
        if (userTab.classList.contains("active")) {
            userTab.classList.remove("active");
          }
          settingsTab.classList.toggle("active");
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

    hamButton.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
    });
  
    // Function to toggle the sidebar
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle("active");
        userTab.classList.toggle("push");
        settingsTab.classList.toggle("push");
        hamburgerMenu.classList.toggle("push");
        debugTab.classList.toggle("push");
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

    // Function to toggle the debug tab
  bugButton.addEventListener("click", function () {
    debugTab.classList.toggle("active");
    userTab.classList.toggle("double");
    settingsTab.classList.toggle("double");
    hamburgerMenu.classList.remove("active");
    adjustMessageContainer();
  });

  // Function to close the debug tab
  document.getElementById("closeDebug").addEventListener("click", function () {
    debugTab.classList.remove("active");    
    userTab.classList.toggle("double");
    settingsTab.classList.toggle("double");
    adjustMessageContainer();
  });

  // Function to toggle the debug tab with the "d" key
  document.addEventListener("keydown", function (event) {
    const inputElements = Array.from(document.getElementsByTagName("input"));
    const textareaElements = Array.from(
      document.getElementsByTagName("textarea")
    );
    const focusedElements = inputElements
      .concat(textareaElements)
      .filter((element) => element === document.activeElement);

    if (event.key === "d" && !focusedElements.length) {
      bugButton.click();
    }
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgElement.src = e.target.result; // Update the login avatar's image
        userAvatarElement.src = e.target.result; // Update the user avatar's image above messages
      };
      reader.readAsDataURL(file);
    }
  }
  
    // Function to toggle the user settings tab
    userButton.addEventListener('click', function() {
        if (settingsTab.classList.contains("active")) {
            settingsTab.classList.remove("active");
          }
          userTab.classList.toggle("active");
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

    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
        }
      });
    
    let userDisplayName = "User";
  
    // Function to handle bot's replies
  async function handleBotReply(messageText) {
    // Add a rate limiting mechanism to avoid making requests too frequently
    if (handleBotReply.isSendingRequest) {
      return;
    }
  
    handleBotReply.isSendingRequest = true;
  
    try {
      const botReply = await sendToCustomAPI(messageText);
  
      if (botReply) {
        const className = "received"; // CSS class for the bot's message
        const botAvatar = "avatars/bot/bot.png"; // Bot's profile picture
        const messageElement = createMessageElement(
          botReply,
          className,
          botAvatar
        );
        messageContainer.appendChild(messageElement);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error sending request to the custom API:", error);
      const className = "received"; // CSS class for the bot's message
      const errorMessage = "An error occurred while processing your message."; // Error message to display
      const botAvatar = "avatars/bot/bot.png"; // Bot's profile picture
      const messageElement = createMessageElement(
        errorMessage,
        className,
        botAvatar
      );
      messageContainer.appendChild(messageElement);
      scrollToBottom();
    } finally {
      // Release the rate limiting after a certain delay (e.g., 2 seconds)
      setTimeout(() => {
        handleBotReply.isSendingRequest = false;
      }, 2000);
    }
  }
  
  // Function to send the message to your custom API
  async function sendToCustomAPI(messageText) {
    try {
      const request = {
        prompt: messageText,
        // Add other request parameters as needed for your custom API
      };
  
      const response = await fetch("/api/v1/generate", { // Using relative path for the API request
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
      // Assuming your custom API returns the bot's reply in the 'text' field of the response
      return responseBody.text;
    } catch (error) {
      throw error;
    }
  }
  
  //So as a joke, I went to my friend's house wearing Pekora's wig and clothes. I could barely stop my laughter as he went as red as a tomato and looked at me from head to toe with a bit of drool in his mouth. The way he stared made mde feel a bit funny too, but I decided to tease him more by taking off my clothes. He asked me, 'Are you serious?' and I said 'Yep peko.' He went silent for what seemed like forever, so I asked him, 'What's the matter peko?' He said he's confused, but then his boner got really hard, which made me take off his clothes. I expected him to scream, 'Stop!' as I kissed him and stroked his cock, but he instead shouted 'Oh God, Pekora!' which made me get a boner myself. Before I knew it, I was blowing him for the first time till he came. His semen was so thick, it got stuck inside my throat no matter how hard I swallowed. He then said, 'I want to fuck you now!' and seeing that we've already gone that far and we were both naked, I obliged. A few hours later, the jerk went all pale and said to me 'Why did we do that? Now I'm not fucking straight.' But he still looked so cute all confused like that, so I took pity on him and reassured while wiping his cum off my face, 'Let's just pretend I'ms till Pekora.'

  // Function to send user's message
  function sendMessage() {
    const messageText = inputElement.value.trim();

    if (messageText !== "") {
      const className = "sent"; // CSS class for the user's message
      const userAvatar = "avatars/user/user.png"; // User's profile picture
      const messageElement = createMessageElement(
        messageText,
        className,
        userAvatar,
        userDisplayName
      );
      messageContainer.appendChild(messageElement);
      inputElement.value = "";
      adjustInputHeight();

      // Send user's message to OpenAI for bot's reply
      handleBotReply(messageText);

    }
  }

  // Function to create the message element
  // Function to create the message element
  function createMessageElement(text, className, avatarSrc, username) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
  
    // Create the user or bot info div
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add(className === "sent" ? "user-info" : "bot-info");
  
    // Create and add the avatar image to the user or bot info div
    const avatarElement = document.createElement("img");
    avatarElement.src = avatarSrc;
    avatarElement.classList.add("avatar");
    avatarElement.style.width = "40px"; // Adjust the width as needed
    avatarElement.style.height = "40px"; // Adjust the height as needed
    userInfoDiv.appendChild(avatarElement);
  
    // Get the username from the data-username attribute of the userAvatarElement
    const usernameText = document.createElement("span");
    usernameText.textContent = username;
    usernameText.id = "message-username"; // Add ID to the username element
    userInfoDiv.appendChild(usernameText);
  
    // Append the user or bot info div to the messageElement
    messageElement.appendChild(userInfoDiv);
  
    // Create the message text element
    const pElement = document.createElement("p");
    const lines = text.split("\n"); // Split the text by line breaks
  
    lines.forEach((line, index) => {
      if (line === "" && index < lines.length - 1 && lines[index + 1] === "") {
        // Check for consecutive empty lines
        const emptyLineElement = document.createElement("div");
        pElement.appendChild(emptyLineElement);
      } else {
        const lineElement = document.createElement("div");
        lineElement.textContent = line;
        pElement.appendChild(lineElement);
      }
    });

    if (className === "sent") {
      // Create delete button for sent messages
      const deleteButton = document.createElement("img");
      deleteButton.src = "img/close.png";
      deleteButton.classList.add("delete-button");
      deleteButton.style.width = "20px";
      deleteButton.style.height = "20px";
      userInfoDiv.appendChild(deleteButton);
  
      // Add click event listener to the delete button
      deleteButton.addEventListener("click", function () {
        // Remove the message element from the message container
        messageElement.remove();
      });
    }
  
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
        const chatContainer = document.querySelector(".chat-container");
        const inputContainer = document.querySelector(".input-container");
            
        if (
          debugTab.classList.contains("active") &&
          sidebar.classList.contains("active")
        ) {
          // If both debug-tab and sidebar are active, do something different
          messageContainer.style.width = "68.34%";
          messageContainer.style.marginLeft = "410px";
          inputContainer.style.marginLeft = "211px";
        } else if (debugTab.classList.contains("active")) {
          // If only debug-tab is active
          messageContainer.style.width = "84.15%";
          messageContainer.style.marginLeft = "205px";
          inputContainer.style.marginLeft = "0px";
        } else if (sidebar.classList.contains("active")) {
          // If only sidebar is active
          messageContainer.style.width = "84.15%";
          messageContainer.style.marginLeft = "205px";
          inputContainer.style.marginLeft = "211px";
        } else {
          // If neither is active
          messageContainer.style.width = "100%";
          messageContainer.style.marginLeft = "0";
          inputContainer.style.marginLeft = "0";
        }
    
        const headerHeight = document.querySelector("header").offsetHeight;
        const inputContainerHeight = inputContainer.offsetHeight;
        const messageContainerHeight =
          chatContainer.offsetHeight - headerHeight - inputContainerHeight;
        messageContainer.style.height = `${messageContainerHeight}px`;
        scrollToBottom();
      }
  
    inputElement.addEventListener('input', adjustInputHeight);
  
    // Adjust message container height on initial page load
    adjustMessageContainer();
  
  });