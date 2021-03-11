"use strict";
// User Class

((core)=>{
  class User 
  {
    // getters and setters
    get FirstName()
    {
      return this.m_firstName;
    }

    set FirstName(value)
    {
      this.m_firstName = value;
    }

    get LastName()
    {
      return this.m_lastName;
    }

    set LastName(value)
    {
      this.m_lastName = value;
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
     * @param {string} [firstName=""]
     * @param {string} [lastName=""]
     * @param {string} [emailAddress=""]
     * @param {string} [username=""]
     * @param {string} [password=""]
     */
    constructor(firstName = "", lastName = "", emailAddress = "", username = "", password ="") 
    {
      this.FirstName = firstName;
      this.LastName = lastName;
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
      return `First Name     : ${this.FirstName} \n Last Name : ${this.LastName} \n Email Address : ${this.EmailAddress} \nUserName : ${this.UserName}`;
    }

    /**
     * This method returns a JSON object made up of the properties of the User class
     *
     * @returns {Object}
     */
    toJSON()
    {
      return {
        "FirstName": this.FirstName,
        "LastName": this.LastName,
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
      this.FirstName = JSONData.FirstName;
      this.LastName = JSONData.LastName;
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
      if(this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== "" && this.UserName !== "")
      {
        return `${this.FirstName},${this.LastName},${this.EmailAddress},${this.UserName}`;
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
      this.FirstName = propertyArray[0];
      this.LastName = propertyArray[1];
      this.EmailAddress = propertyArray[2];
      this.UserName = propertyArray[3];
    }
  }
  

  core.User = User;

})(core || (core={}));