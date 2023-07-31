function handleLogin() {
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Handle successful login
          var user = userCredential.user;
          console.log(user); // You can do something with the user data here
          window.location.href = "in.html"; // Redirect to the dashboard page after login
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
          alert('Login failed. Please check your email and password.');
        });
    } else {
      alert('Please enter both email and password.');
    }
  }


   
    function handleSignup() {
        var email = document.getElementById('email-input').value;
        var password = document.getElementById('password-input').value;
        
        if (email && password) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Handle successful signup
              var user = userCredential.user;
              console.log(user); // You can do something with the user data here
              alert('Sign up successful! You can now log in with your new account.');
              window.location.href = "in.html"; // Redirect to the login page after successful signup
            })
            .catch((error) => {
              // Handle errors here
              console.error(error);
              alert('Sign up failed. Please try again.');
            });
        } else {
          alert('Please enter both email and password.');
        }
      }

      function sendMessage(message) {
        // Get the user ID of the logged-in user
        var userId = firebase.auth().currentUser.uid;
      
        // Get a reference to the 'messages' node in the database
        var messagesRef = database.ref('messages');
      
        // Push a new message to the 'messages' node
        messagesRef.push({
          userId: userId,
          message: message,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });
      }
      
      // Function to handle sending messages
      function handleSend() {
        var message = inputElement.value.trim();
        if (message !== '') {
          // Save the message to the database
          sendMessage(message);
      
          // Clear the input field after sending the message
          inputElement.value = '';
        }
      }
      
      
      // Add an event listener to the send button
      sendButton.addEventListener('click', handleSend);
      
      // Add an event listener to the send button
      document.getElementById('sendButton').addEventListener('click', handleSend);
      

    
  
      // Add an event listener to the signup button
      document.getElementById('signup-button').addEventListener('click', handleSignup);

      document.getElementById('login-button').addEventListener('click', handleLogin);
