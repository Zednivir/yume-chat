function redirectToNonLoggedInVersion() {
    window.location.href = "index.html";
  }

function handleLogout() {
    firebase.auth().signOut()
      .then(() => {
        // Handle successful logout
        console.log('Logged out successfully.');
        window.location.href = "index.html"; // Redirect to the login page after logout
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
        alert('Logout failed. Please try again.');
      });
  }

  // Add an event listener to the logout button
  document.getElementById('logout-button').addEventListener('click', handleLogout);
