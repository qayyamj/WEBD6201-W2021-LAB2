/* custom JavaScript goes here */
/* Name:      Qayyam Jamal
 * StudentID: 100713267
 * Date:      March 5, 2021
 */

"use strict";

((core) =>
{
    // Function to display the home page.
    function displayHome()
    {
      // variable for background image
      let imageUrl = "../Content/images/attack_titan.png";
      
      // inject content into the main content of the page
        let mainContent = document.getElementsByTagName("main")[0];
        mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Lab 2</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my Lab 2 project for WEBD6201 Winter 2021 semester.</p>
        `;

        // Insert a background image to the page
        document.getElementsByTagName("main")[0].style.backgroundImage = "url(" + imageUrl + ")";
        // Adjust the size of the background image
        document.getElementsByTagName("main")[0].style.backgroundSize = "200px";
        document.getElementsByTagName("main")[0].style.backgroundRepeat = "repeat-x";
    }

    // function to display About Page
    function displayAbout()
    {
      let img = document.createElement("img");
      img.src = "../Content/images/qayyam.jpg";
      img.width = 500;


      let mainContent = document.getElementsByTagName("main")[0];
      mainContent.innerHTML = `<h1> About Us </h1>
      <h2> Qayyam Jamal </h2>
      <li> Phone: 647-967-7871 </li>
      <li> Email: qayyam.jamal@dcmail.ca </li>
      <li id="resume"> Resume: </li> 
      `;

      document.getElementsByTagName("main")[0].appendChild(img);
    }

    // Display Projects page
    function displayProjects()
    {

    }

    // Display Services pages
    function displayServices()
    {

    }

    // Validate Full Name
    function testFullName()
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    // Validate Contact Number
    function testContactNumber()
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    // Validate Email Address
    function testEmailAddress()
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    // Form Validation for Contact Page
    function formValidation()
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    // Display Contact Page
    function displayContact()
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          if($("#subscribeCheckbox")[0].checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }
        });

        document.body.style.backgroundImage = "url('../Content/images/attack_titan.png')";
    }

    // Display Login Page
    function displayLogin()
    {
      if(sessionStorage.getItem("user"))
      {
        location.href = "index.html";
      }

      let messageArea = $("#messageArea");
      messageArea.hide();

      $("#loginButton").on("click", (event)=> 
      {
        let username = $("#username").val();
        let password = $("#password").val();
        let success = false;

        $.getJSON("./Data/users.json", function(data) 
        {
          let newUser = new core.User();

          // search for username and password
         for (const user of data.users) 
         {
           if(username == user.UserName && password == user.Password)
           {
             newUser.fromJSON(user);
             success = true;
             break;
           }
         }

         if(success)
         {
           // add user to session storage
           sessionStorage.setItem("user", newUser.serialize());
           messageArea.removeAttr("class").hide();

           // go to secure area
           location.href = "index.html";

           // add username between contact us and login/logout
           let nav_user = 
           `<li class="nav-item">
           <span class="navbar-text">
           ${username.value()}
           </span>
           </li>`;

           $("nav_user").insertAfter($("#contact"));
         }
         else
         {
            $("#username").trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information.");
         }
        });
      });

      $("#cancelButton").on("click", function()
      {
        // clear the form
        document.forms[0].reset();
        // return to the home page
        location.href = "index.html";
      })
    }
  
    // Display Register Page
    function displayRegister()
    {
      $("h1").append(`<div id='ErrorMessage'></div>`);
      
      let messageArea = $("#ErrorMessage").hide();
      let firstNamePattern = /([A-Z][a-z]{2,})/;
      let lastNamePattern = /([A-Z][a-z]{2,})/;
      let emailAddressPattern = /^([[a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)*$/;
      let passwordPattern = /([0-9a-zA-z]{6,})/;

      // Validate First Name
      $("#firstName").on("blur", function()
      {
        if(!firstNamePattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid First Name. First Name must be capitalized and at least 2 characters long.");
        }
        else
        {
          messageArea.removeAttr("class").hide();
        }
      });

      // Validate Last Name
      $("#lastName").on("blur", function()
      {
        if(!lastNamePattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid Last Name. Last Name must be capitalized and at least 2 characters long.");
        }
        else
        {
          messageArea.removeAttr("class").hide();
        }
      });

      // Validate Email Address
      $("#emailAddress").on("blur", function()
      {
        if(!emailAddressPattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address. Must be at least 8 characters and contain '@'.");
        }
        else
        {
          messageArea.removeAttr("class").hide();
        }
      });

      // Validate Password
      $("#password").on("blur", function()
      {
        if(!passwordPattern.test($(this).val()))
        {
          $(this).trigger("focus").trigger("select");
          messageArea.show().addClass("alert alert-danger").text("Password must be alphanumeric and a minimum of 6 characters.");
        }
        else
        {
          messageArea.removeAttr("class").hide();
        }
      });

      // Validate Confirmed Password
      $("#confirmPassword").on("blur", function()
      {
        if($(this).val() != $("#password").val())
        {
          messageArea.show().addClass("alert alert-danger").text("The passwords you entered do not match.");
        }
        else
        {
          messageArea.removeAttr("class").hide();
        }
      });

      // Register button click event
      $("#registerButton").on("click", function(event)
      {
        // prevent default functionality
        event.preventDefault();

        
      });

    }

    function Start()
    {
        console.log("App Started...");

        switch (document.title) 
        {
          case "Home":
              displayHome();
            break;
          case "About":
              displayAbout();
            break;
          case "Projects":
              displayProjects();
            break;
          case "Services":
              displayServices();
            break;
          case "Contact":
              displayContact();
            break;
          case "Login":
            displayLogin();
          break;
          case "Register":
            displayRegister();
          break;
        }

        // common functions for all pages
        if(sessionStorage.length > 0)
        {
          if(sessionStorage.getItem("user"))
          {

            let loginLink = document.getElementById("login");
            loginLink.innerHTML = `
            <a id="logout" class="nav-link" aria-current="page" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
            `;

            $("#logout").on("click", function() 
            {
              // perform logout
              sessionStorage.clear();
              // redirect back to login
              location.href = "login.html";
            });
          }
        }
        
    }

    window.addEventListener("load", Start);

    core.Start = Start;

})(core || (core={}));