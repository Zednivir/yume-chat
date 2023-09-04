var firebaseConfig = {
  apiKey: "AIzaSyDt8tPp8zrI2tzBUwC8M6eQZ3xcJnQqKkc",
  authDomain: "yume-b18ba.firebaseapp.com",
  projectId: "yume-b18ba",
  appId: "1:643662045975:web:1ef2fc13214c0f883acd52",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const messageCollection = db.collection('messages');


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
  const fileMessage = document.getElementById("fileUpload");
  const filePreview = document.getElementById("filePreview");
  const fileTab = document.getElementsByClassName("messageFile");
  const callTab = document.getElementsByClassName("Call");
  const callButton = document.getElementById("callButton");

  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/storage';


  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyDt8tPp8zrI2tzBUwC8M6eQZ3xcJnQqKkc",
    authDomain: "yume-b18ba.firebaseapp.com",
    projectId: "yume-b18ba",
    appId: "1:643662045975:web:1ef2fc13214c0f883acd52",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

// Function to upload user avatar
function uploadUserAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${file.name}`);

    // Upload the image to Firebase Storage
    imageRef.put(file).then((snapshot) => {
      console.log("User avatar uploaded!");

      // Get the download URL of the uploaded image
      imageRef.getDownloadURL().then((imageUrl) => {
        // Update the user's avatar preview image
        userAvatarElement.src = imageUrl;
      });
    });
  }
}

// Attach the event listener to the user's avatar file input
avatarFileInput.addEventListener("change", uploadUserAvatar);

// Function to upload bot avatar
function uploadBotAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${file.name}`);

    // Upload the image to Firebase Storage
    imageRef.put(file).then((snapshot) => {
      console.log("Bot avatar uploaded!");

      // Get the download URL of the uploaded image
      imageRef.getDownloadURL().then((imageUrl) => {
        // Update the bot's avatar preview image
        botImgElement.src = imageUrl;
      });
    });
  }
}

// Attach the event listener to the bot's avatar file input
botAvatarFileInput.addEventListener("change", uploadBotAvatar);

// Function to upload file message
function uploadFileMessage(event) {
  const file = event.target.files[0];
  if (file) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`files/${file.name}`);

    // Upload the file to Firebase Storage
    fileRef.put(file).then((snapshot) => {
      console.log("File uploaded!");

      // Get the download URL of the uploaded file
      fileRef.getDownloadURL().then((fileUrl) => {
        // Update the file preview
        filePreview.src = fileUrl;

        // Add "active" class to fileTab
        if (!fileTab[0].classList.contains("active")) {
          fileTab[0].classList.add("active");
        }
      });
    });
  }
}

// Attach the event listener to the file input
fileMessage.addEventListener("change", uploadFileMessage);



  function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const storageRef = storage.ref(); // Get a reference to the root of the storage bucket
      const imageRef = storageRef.child(`images/${file.name}`); // Create a reference to the image file in a "images" folder
  
      // Upload the image to Firebase Storage
      imageRef.put(file).then((snapshot) => {
        console.log("Image uploaded!");
  
        // Get the download URL of the uploaded image
        imageRef.getDownloadURL().then((imageUrl) => {
          // Now you have the imageUrl, which can be used to display the image
          imgElement.src = imageUrl; // Update the preview image
        });
      });
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

  callButton.addEventListener('click', function () {
    callTab.classList.toggle('active');
  })

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
        const botAvatar = botImgElement.src;
        const messageElement = createMessageElement(botReply, className, botAvatar, botDisplayName);
        messageContainer.appendChild(messageElement);
        scrollToBottom();
  
        // Save the received message
        // await saveMessageToServer(botReply, className, userAvatarElement.src, botAvatar, botDisplayName);
      }
    } catch (error) {
      console.error("Error sending request to the custom API:", error);
      const className = "received";
      const errorMessage = "Error, couldn't connect to API.";
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
  
      const response = await fetch("http://localhost:9080/api/v1/generate", {
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
    const fileSelected = filePreview.src && filePreview.src !== "" && filePreview.src !== "about:blank";
  
    if (messageText !== "") {
      const className = "sent";
      const userAvatar = userAvatarElement.src;
  
      const messageData = {
        text: messageText,
        className: className,
        userAvatar: userAvatar,
        // Add more fields as needed, e.g., timestamp, image URL, etc.
      };
  
      if (fileSelected) {
        const storageRef = storage.ref(); // Get a reference to the root of the storage bucket
        const imageRef = storageRef.child(`images/${file.name}`); // Create a reference to the image file in a "images" folder
  
        // Upload the image to Firebase Storage
        imageRef.put(file).then((snapshot) => {
          console.log("Image uploaded!");
  
          // Get the download URL of the uploaded image
          imageRef.getDownloadURL().then((imageUrl) => {
            // Now you have the imageUrl, which can be used to display the image
            messageData.imageUrl = imageUrl; // Add the imageUrl to the messageData
  
            // Add the messageData to Firestore
            db.collection("messages")
              .add(messageData)
              .then((docRef) => {
                console.log("Message saved with ID: ", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding message: ", error);
              });
          });
        });
      } else {
        // If there is no file selected, just add the messageData to Firestore without the imageUrl
        db.collection("messages")
          .add(messageData)
          .then((docRef) => {
            console.log("Message saved with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding message: ", error);
          });
      }
  
      // Rest of your sendMessage function...
    }
  }

  async function saveMessageToServer(message, className, userAvatar, botAvatar, botDisplayName) {
    try {
      const response = await fetch('http://localhost:1212/save-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          className,
          userAvatar,
          botAvatar,
          botDisplayName,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save message');
      }
  
      console.log('Message saved successfully');
    } catch (error) {
      console.error('Error saving message:', error);
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

    // Create timestamp element for date
    const dateTimestamp = document.createElement("span");
    dateTimestamp.classList.add("timestamp", className === "sent" ? "sentDate" : "receivedDate");
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    dateTimestamp.textContent = currentDate.toLocaleDateString(undefined, options);
    
    // Create timestamp element for time with AM/PM
    const timeTimestamp = document.createElement("span");
    timeTimestamp.classList.add("timestamp", className === "sent" ? "sentTime" : "receivedTime");
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    timeTimestamp.textContent = currentDate.toLocaleTimeString(undefined, timeOptions);

    // Inside the loop that creates message elements
    if (className === "sent") {
      // For sent messages (user)
      userInfoDiv.appendChild(dateTimestamp);
      userInfoDiv.appendChild(timeTimestamp);
    } else {
      // For received messages (bot)
      userInfoDiv.appendChild(dateTimestamp);
      userInfoDiv.appendChild(timeTimestamp);
    }

    const pElement = document.createElement("p");

    const formattingRules = [
        { pattern: /"([^"]*)"/g, style: 'color: #d8d8d8;' },
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
        editButton.classList.add("edit-button");

        const textarea = document.createElement("textarea");
        textarea.style.width = "100%";
        textarea.style.height = "100px"; // Adjust the height as needed
        editElement.appendChild(textarea);

        editButton.addEventListener("click", () => {
            editElement.style.display = editElement.style.display === "flex" ? "none" : "flex";
            if (editElement.style.display === "flex") {
                textarea.value = pElement.innerText; // Set the value of the textarea
            } else {
                pElement.innerHTML = textarea.value; // Update the message with the edited content
            }
            pElement.style.display = editElement.style.display === "flex" ? "none" : "block";
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

