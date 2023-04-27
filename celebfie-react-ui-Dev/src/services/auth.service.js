import axios from "axios";
import { API_ENDPOINT,headers } from "./ServiceDetails";
import { StoreCookie } from "../utility/sessionStore";



/* register */
const register = async (Fname,Email, Password,Phone) => 
{
      var axios = require('axios');
      var data = `mutation{
        signUp(signUp: {
            requestOperation: "SignUp",
            fullName:"${Fname}",
            email:"${Email}",
            encryptedPassword:"${Password}",
            contactNumber:"${Phone}",
            twoFactorVarification: false,
        })
        { data{
                userId
                username
                fullName
                email
                encryptedPassword
                referalLink
                contactNumber
                dateOfBirth
                nationality
                investmentInterest
                tokenHash
                walletAddress
                identityStatus
                twoFactorVarification
                lastLoggedIn
                memberSince
                updateTimestamp
        }errors{
            message
            code 
            err
        }
        }
    }`;
      
        var config = {
          method: 'post',
          url: API_ENDPOINT,
          headers: headers,
          data : data
        };
        
        return axios(config)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });

 };

/*
Login  method
*/
const login = async(email, password) =>
{
  
  var data = `mutation{
    login(login: {
      requestOperation: "Login",
      email:"${email}",
      encryptedPassword:"${password}"
    })
    {data
      errors{
        message
        code 
        err
      }
    }
  }`;
  
  var config = {
    method: 'post',
    url: API_ENDPOINT,
    headers:headers,
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

const logout = () => {


  StoreCookie.removeItem("userToken");
  StoreCookie.removeItem("userEmail");
  StoreCookie.removeItem("userData");
  StoreCookie.removeItem("user");


  
  //const response = await axios.post(API_ENDPOINT + "signout");
  return true;
};

const getCurrentUser = () => {

  
  return StoreCookie.getItem("userToken");
};

const getCurrentUserData = () => {

  return StoreCookie.getItem("userData");

};

const ifCurrentUserAdmin= () => {
    //let role = false;
   const currentUserRoles =  StoreCookie.getItem("user");
   
   
   const roles =  currentUserRoles?.userRole.filter(role=>{
    return (role?.roleName==="Admin")
  })
  

  if(typeof roles ==="undefined") return false;
  if(roles[0]?.roleName==="Admin")return true;


  
};

const getCurrentUserEmail = () => {
  
  return StoreCookie.getItem("userEmail");
};


/* get user by email id */

const getusersbyEmail = async (email) =>
{
    var data = `query{
      getUser(
          requestOperation: "GetUser"
          email: "${email}"
      )
      {
          users{ 
        users{
          userId
          username
          fullName
          email
          encryptedPassword
          referalLink
          contactNumber
          dateOfBirth
          nationality
          investmentInterest
          tokenHash
          walletAddress
          identityStatus
          twoFactorVarification
          lastLoggedIn
          memberSince
          updateTimestamp 
        }
        verificationStatus{
                  verificationStatusId
                  userId
                  email
                  verificationSourceId
                  status
                  issuedBy
                  verificationName
                  documentType
                  
              }
              userRole{
                  id
                  roleId
                  roleName
                  userId
              }
      }
          errors{
        message
        code 
        err
      }
      }
  }`;
    var config = {
      method: 'post',
      url: API_ENDPOINT,
      headers: headers,
      data : data
    };
    
    return axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

}

/* */

const getCountries = async () => {


  var data = `query{
        getCountries(
            requestOperation: "GetCountries"
        )
        {
            data
            {
                countryIso
                countryName
            }
            errors{
          message
          code 
          err
        }
            
        }
      }`;

  var config = {
    method: 'post',
    url: API_ENDPOINT,
    headers: headers,
    data : data
  };
  try {
    const response = await axios(config);
    return response?.data ? response?.data?.data?.getCountries?.data : '';
  } catch (error) {
    console.log(error);
  }

}


const updateUserProfile = async (updatedUserData) => {

  

  var data = `
  mutation{
    updateUser(updateUser: 
       ${JSON.stringify({...updatedUserData,requestOperation: "UpdateUser"})}
    )
    {   data{
            userId
            username
            fullName
            email
            encryptedPassword
            referalLink
            contactNumber
            dateOfBirth
            nationality
            investmentInterest
            tokenHash
            walletAddress
            identityStatus
            twoFactorVarification
            lastLoggedIn
            memberSince
            updateTimestamp
    }
    }
}
  `
    var config = {
      method: 'post',
      url: API_ENDPOINT,
      headers: headers,
      data : data
    };
    try {
    const response = await axios(config);

    StoreCookie.setItem("userData", JSON.stringify(response?.data?.data?.updateUser?.data));
    
    

    return response?.data ? response?.data?.data?.getCountries?.data : '';
  } catch (error) {
    console.log(error);
  }
  

}


const UpdatePassword = async (email,oldPassword,NewPassword) =>{

  var axios = require('axios');
  var data = `mutation{ passwordUpdate(passwordUpdate: {
    requestOperation: "PasswordUpdate",
    email:"${email}",
    encryptedPassword:"${oldPassword}",
    newEncryptedPassword:"${NewPassword}"
  })
  {data
    errors{
      message
      code
      err
    }
  }
}`;
  
  var config = {
    method: 'post',
    url: API_ENDPOINT,
    headers: headers,
    data : data
  };
  
  return await axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  });
  

}


const varifyUser =async (email,code)=>
{
  
  var data = `mutation{
    verifyUser(verifyUser: {
      "requestOperation":"VerifyUser",
      "email":"${email}",
      "documentType":"KYC",
      "issuedBy":"Admin",
      "status":true,
      "code":"${code}"
    })
    {data
      errors{
        message
        code 
        err
      }
    }
  }`;

  var config = {
    method: 'post',
    url: API_ENDPOINT,
    headers: headers,
    data : data
  };

return axios(config)
.then(function (response) {
  return response;
})
.catch(function (error) {
  console.log(error);
});

}


const ResetPassword =async (ResetPassword, ResetRePassword,VerifyEmail,VerifyCode)=>
{
  var data = `mutation{
    resetPassword(resetPassword: {
      requestOperation: "ResetPassword",
      email:"${VerifyEmail}",
      encryptedPassword:"${ResetPassword}",
      code:"${VerifyCode}"
    })
    {data
      errors{
        message
        code
        err
      }
    }
  }`;
  var config = {
    method: 'post',
    url: API_ENDPOINT,
    headers: headers,
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
  
  

}

const ForgetPassword = async (email) =>
{
  
  var data = `mutation{
    sendEmailLink(sendEmailLink: {
        "requestOperation":"SendEmailLink",
        "email":"${email}"
    })
    {data
    errors{
        message
        code 
        err
    }
    }
  }`;

var config = {
  method: 'post',
  url: API_ENDPOINT,
  headers: headers,
  data : data
};

return axios(config)
.then(function (response) {
  return response;
})
.catch(function (error) {
  console.log(error);
});

}



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCountries,
  getusersbyEmail,
  getCurrentUserEmail,
  getCurrentUserData,
  updateUserProfile,
  UpdatePassword,
  varifyUser,
  ResetPassword,
  ifCurrentUserAdmin,
  ForgetPassword
}
export default AuthService;