import { API_ENDPOINT, headers } from "./ServiceDetails";
import axios from "axios";

const getusers =async (email,code)=>
{
  
  var data = `query{
    getAllUser(
        requestOperation: "GetAllUser"
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


const AdminServices = {
    getusers,
    
  }
  export default AdminServices;