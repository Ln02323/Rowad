const login_btn = document.querySelector("#login-btn");
const signup_btn = document.querySelector("#signup-btn");
const container = document.querySelector(".container");

signup_btn.addEventListener('click', () => {
    container.classList.add("signup-mode");
});

login_btn.addEventListener('click', () => {
    container.classList.remove("signup-mode");
});


let logoutbtn = document.getElementById('logoutAction');


logoutbtn?.addEventListener('click', async function() {
   
    let response = await fetch('http://localhost:3001/api/v1/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    let data = await response.json();
  
    // Handle the response here. For example:
    try {
      if (data.success) {
        localStorage.removeItem('token');
        document.cookie = "token="+null;
        alert("Logged out successfully");
      }
    } catch (error) {
      alert("Error: " + error)
      alert(error.message);
    }
});
// let logoutbtn1 = document.getElementById('logoutAction1');

// logoutbtn1?.addEventListener('click', async function() {
//    alert('Hello ')
//     let response = await fetch('http://localhost:3001/api/v1/logout', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
  
//     let data = await response.json();
  
//     // Handle the response here. For example:
//     try {
//       if (data.success) {
//         localStorage.removeItem('token');
//         document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         alert("Logged out successfully");
//       }
//     } catch (error) {
//       alert("Error: " + error)
//       alert(error.message);
//     }
// });

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
  
    let response = await fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    // Handle the response here. For example:
    if (data.success==true) {
      alert("Login successful");
      localStorage.setItem('token', data.token);
      // document.cookie = "token="+(localStorage.getItem('token'));
       event.target.elements.email.value="";
       event.target.elements.password.value="";
       window.location.href = "/ROWAD/HTML/Home.html";
    } else {
      // Login failed   
      alert(data.message)
    }
  });

let signupform = document.getElementById('signupForm')

signupform?.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    let name = event.target.elements.name.value;
    let username = event.target.elements.username.value;
    let PhoneNo = event.target.elements.PhoneNo.value;
    let Address = event.target.elements.Address.value;
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
  
    let response = await fetch('http://localhost:3001/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password,name,username,PhoneNo,Address })
    });
  
    let data = await response.json();
  
    // Handle the response here. For example:

      if (data.success) {
        alert("Signup successful");
        event.target.elements.email.value="";
        event.target.elements.password.value="";
        event.target.elements.name.value="";
        event.target.elements.username.value="";
        event.target.elements.PhoneNo.value="";
        event.target.elements.Address.value="";
        login_btn.click();
      }else{
        alert(data.message)
      }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      try {
        // Perform all validation checks
        validateFullName();
        validateUsername();
        validateEmail();
        validatePhone();
        validatePassword();
  
        let name = event.target.elements.name.value;
        let username = event.target.elements.username.value;
        let PhoneNo = event.target.elements.PhoneNo.value;
        let Address = event.target.elements.Address.value;
        let email = event.target.elements.email.value;
        let password = event.target.elements.password.value;
  
        let response = await fetch('http://localhost:3001/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, name, username, PhoneNo, Address })
        });
  
        let data = await response.json();
  
        // Handle the response here. For example:
        if (data.success) {
          alert("Signup successful");
          event.target.elements.email.value = "";
          event.target.elements.password.value = "";
          event.target.elements.name.value = "";
          event.target.elements.username.value = "";
          event.target.elements.PhoneNo.value = "";
          event.target.elements.Address.value = "";
          login_btn.click();
        } else {
          alert(data.message)
        }
      } catch (error) {
        // If an error is thrown, handle it by showing an alert or displaying the error message on the page
        alert(error.message);
        console.error("Form validation error:", error);
      }
    });
  
    function validateFullName() {
      const fullName = document.querySelector('input[name="name"]').value;
      if (!fullName.includes(' ')) {
        throw new Error('Full name must include both first and last name.');
      }
    }
  
    function validateUsername() {
      const username = document.querySelector('input[name="username"]').value;
      if (!/^[A-Za-z0-9]+$/.test(username)) {
        throw new Error('Username must contain only letters and numbers.');
      }
    }
  
    function validateEmail() {
      const email = document.querySelector('input[name="email"]').value;
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        throw new Error('Enter a valid email address. Example@gmail.com');
      }
    }
  
    function validatePhone() {
      const phone = document.querySelector('input[name="PhoneNo"]').value;
      if (!/^05\d{8}$/.test(phone)) {
        throw new Error('Phone number must start with 05 and be 10 digits long.');
      }
    }
  
    function validatePassword() {
      const password = document.getElementById('password').value;
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }
    
      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter.');
      }
    
      if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter.');
      }
    
      if (!/[!@#$%^&*]/.test(password)) {
        throw new Error('Password must contain at least one symbol (!, @, #, $, %, ^, &, *).');
      }
    
      if (!/[0-9]/.test(password)) {
        throw new Error('Password must contain at least one number.');
      }
    }
  });
  