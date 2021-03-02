"use strict";
// User Class

((core)=>{
  class User 
  {
    // getters and setters
    get DisplayName() 
    {
      return this.m_displayName;
    }
  
    set DisplayName(value) 
    {
      this.m_displayName = value;
    }
  
    get EmailAddress() 
    {
      return this.m_emailAddress;
    }
  
    set EmailAddress(value) 
    {
      this.m_emailAddress = value;
    }

    get UserName() 
    {
      return this.m_userName;
    }
  
    set UserName(value) 
    {
      this.m_userName = value;
    }

    get Password() 
    {
      return this.m_password;
    }
  
    set Password(value) 
    {
      this.m_password = value;
    }
  
    // constructor

    /**
     * Creates an instance of User.
     * @param {string} [displayName=""]
     * @param {string} [emailAddress=""]
     * @param {string} [username=""]
     * @param {string} [password=""]
     */
    constructor(displayName = "", emailAddress = "", username = "", password ="") 
    {
      this.DisplayName = displayName;
      this.EmailAddress = emailAddress;
      this.UserName = username;
      this.Password = password;
    }

    // methods

    /**
     * This method overrides the built-in toString method for the User class
     *
     * @returns {string}
     */
    toString() 
    {
      return `Display Name     : ${this.FullName} \nEmail Address : ${this.EmailAddress} \nUserName : ${this.UserName}`;
    }

    /**
     * This method returns a JSON object made up of the properties of the User class
     *
     * @returns {Object}
     */
    toJSON()
    {
      return {
        "DisplayName": this.DisplayName,
        "EmailAddress": this.EmailAddress,
        "UserName": this.UserName
      }
    }

    /**
     * Convert a JSON Data object to a User
     *
     * @param {Object} JSONData
     */
    fromJSON(JSONData)
    {
      this.DisplayName = JSONData.DisplayName;
      this.EmailAddress = JSONData.EmailAddress;
      this.UserName = JSONData.UserName;
      this.Password = JSONData.Password;
    }

    /**
     * This method converts the User into a comma-separated value string
     *
     * @returns {string}
     */
    serialize()
    {
      if(this.DisplayName !== "" && this.EmailAddress !== "" && this.UserName !== "")
      {
        return `${this.DisplayName},${this.EmailAddress},${this.UserName}`;
      }
      else 
      {
        console.error("One or more properties of the Contact is empty");
        return null;
      }
    }

    /**
     * This method takes a comma-separated data string and assigns the values to the Contact class properties
     *
     * @param {string} data
     * @return {void}
     */
    deserialize(data)
    {
      let propertyArray = data.split(",");
      this.DisplayName = propertyArray[0];
      this.EmailAddress = propertyArray[1];
      this.UserName = propertyArray[2];
    }
  }
  

  core.User = User;

})(core || (core={}));