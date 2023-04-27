import axios from "axios";
import { API_ENDPOINT,headers,KYC_ENDPOINT,KycHeaders } from "./ServiceDetails";
import { formatDate } from "../utility/date";
import strtotime from "strtotime";
import { varificationstatus } from "../utility/Strings";



/* register */
const createReaquast = async (varifyProps) => {
  
    var reference = Math.floor(Math.random() * strtotime("now") );
    let documentInfo ={};

    if(varifyProps.doctype===varificationstatus.IdCard)
    {
       documentInfo={
        "proof": "",
        "backside_proof_required" : "0",
        "additional_proof": "",
        "supported_types": [varifyProps.doctype],
        "name": [varifyProps.fname],
        "dob": formatDate(varifyProps.DOB),
        "age": "",
        "document_number": `${varifyProps.DocNumber}`,
        "allow_offline": "1",
        "allow_online": "1",
        "gender":  varifyProps.gender
      }
    }else
    {

       documentInfo= {
        "proof": "",
        "backside_proof_required" : "0",
        "additional_proof": "",
        "supported_types": [varifyProps.doctype],
        "name": [varifyProps.fname],
        "dob": formatDate(varifyProps.DOB),
        "age": "",
        "issue_date": (varifyProps.issue_date) ? formatDate(varifyProps.issue_date) : "",
        "expiry_date":(varifyProps.expiry_date) ? formatDate(varifyProps.expiry_date) : "",
        "document_number": `${varifyProps.DocNumber}`,
        "allow_offline": "1",
        "allow_online": "1",
        "gender":  varifyProps.gender
      }
    }




    
    var data = JSON.stringify({
      "reference":`${reference}`,
      "callback_url" : "https://webhook.site/7e2cb500-36b6-4941-ad62-d067cbc8f46c",
      "email": `${varifyProps.Email}`,
      "country": `${varifyProps.national}`,
      "language": "EN",
      "redirect_url": `${process.env.REACT_APP_URL}kycverification?ref=${reference}`,
      "ttl": 60,
      "verification_mode": "any",
      "document": documentInfo
    });

    var config = {
      method: 'post',
      url: `${KYC_ENDPOINT}shuftiprocreate`,
      headers: KycHeaders,
      data : data
    };

    
      
    return await axios(config).then(function (response) {
      
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
   
  };



const varifyReaquast = async (refno) => {


        var data = JSON.stringify({
          "reference": `${refno}`
        });
        
        var config = {
          method: 'post',
          url: `${KYC_ENDPOINT}shuftiprostatus`,
          headers:KycHeaders,
          data : data
        };
        
        return axios(config).then(function (response) 
        {
          
          return response;
        })
        .catch(function (error) {
          
          return {errror:"Some thing Wrong Please Try Again"}
        });
        
   
  };


const getKycDetails = async (userid) =>
{

  
  var data = `query{
    getKycDetails(
        requestOperation: "GetKycDetail"
        userId:${userid}
    )
    {
			users{
	referenceId
  status
  verificationLink
  userId
  docType
  createTimestamp
  updateTimestamp
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
    headers:headers,
    data : data
  };

  return  await  axios(config)
    .then(function (response) 
    { 
      
          if(response?.status===200  && response?.data?.data?.getKycDetails?.errors?.code)
          {  
            throw {status:response?.data?.data?.getKycDetails?.errors?.code,data:response?.data?.data?.getKycDetails}
          }
          else
          {
            return {status:response?.status,data:response?.data?.data?.getKycDetails}
          }
        
        
          
    })
    .catch(function (error) 
    {
      
       return error;
       
    });

}


const addKycDetails = async(keydetail) =>
{

  

  var data = `mutation{
    addKycDetails(addKycDetails: {
          requestOperation: "AddKycDetails",
          referenceId:${keydetail.reference},
          userId:${keydetail.userid},
          verificationLink:"${keydetail.verification_url}",
          status:"pending",
          docType:"${keydetail.doctype}",
          
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
    console.log(response);
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });

}

const UpdateKycDetails = async(referenceId,status)=>{

  var data = `mutation{
      updateKycDetails(updateKycDetails: {
          requestOperation: "UpdateKycDetails",
          referenceId:${referenceId},
            status:"${status}"
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
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
  


}

const KycVarifications = {
    createReaquast,
    varifyReaquast,
    getKycDetails,
    addKycDetails,
    UpdateKycDetails
,
 
  }
  export default KycVarifications;