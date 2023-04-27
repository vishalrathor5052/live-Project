import KycVarifications from "../../services/Kyc.varification";
import { ErrorMessage } from "../../utility/Strings";

export default function PancardValidate(Pancard) {
    let errors = {};
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (!Pancard.fname) {
        errors.panname = ErrorMessage.PanNameRequired
    } 
 
    if (!Pancard.number) {
        errors.pannumber = ErrorMessage.PanNumberRequired;
    } else if (Pancard.number.length < 10 || Pancard.number.length > 10 ) {
        errors.pannumber = ErrorMessage.PanNumbervalid;
    }else if(!Pancard.number.toUpperCase().match(regex))
    {
      errors.pannumber = ErrorMessage.PanNumbervalid;
    }

    if (!Pancard.pancorrectinfo) {
        errors.pancorrectinfo = ErrorMessage.PanTermaccept;
    } 

    if (!Pancard.pantermAccept) {
        errors.pantermAccept = ErrorMessage.Pancheckaccept;
    } 

    return errors;
  };
  

  export const  AdharCardVelidate = (AdharCard) =>
  {
    let errors = {};

   

   
    if (!AdharCard.adharname) {
        errors.adharname = ErrorMessage.AdharnameREquuired;
    } 
 
    if (!AdharCard.adharnumber) {
        errors.adharnumber = ErrorMessage.AdharNumbreREquuired;
    } 
    else if (isNaN(AdharCard.adharnumber) ) {
      errors.adharnumber = ErrorMessage.AdharNumbrevalid;
    }
    
    else if (AdharCard.adharnumber.length < 12 || AdharCard.adharnumber.length > 12 ) {
        errors.adharnumber = 'top';
    }

    if (!AdharCard.adharcheckAccept) {
        errors.adharcheckAccept = ErrorMessage.Adharcheckpersonal;
    } 

    if (!AdharCard.adhartermAccept) {
        errors.adhartermAccept = ErrorMessage.adhartermAccept;
    } 
    return errors;

  }


export const PassportaVelidata=(Passport)=>{
  let errors = {};

    if (!Passport?.passportName) {
      errors.passportName = ErrorMessage.passportName;
    } 

    if (!Passport?.passportnumber) {
      errors.passportnumber = ErrorMessage.passportnumber;
    } 


    if (!Passport?.passportissuedate) {
      errors.passportissuedate = ErrorMessage.passportissuedaterequired;
    } 



    if (!Passport?.passportexpirydate) {
      errors.passportexpirydate = ErrorMessage.passportexpirydaterequired;
    } 

    if (!Passport?.PassporttermAccept) {
      errors.PassporttermAccept = ErrorMessage.PassporttermAccept;
  } 

  if (!Passport?.PassportcheckAccept) {
      errors.PassportcheckAccept = ErrorMessage.PassportcheckAccept;
  } 

    
  return errors;

}


export const LicanseVelidata=(License)=>{
  let errors = {};
  
    

    if (!License?.licenseName) {
      errors.licenseName = "Enter License Name";
    } 

    if (!License?.licensenumber) {
      errors.licensenumber = "Enter License Number";
    } 


    if (!License?.licenseissuedate) {
      errors.passportissuedate = "Enter issue date";
    } 



    if (!License?.licenseexpirydate) {
      errors.licenseexpirydate = "Enter expairy date";
    } 

    if (!License?.licenseTermAccept) {
      errors.licenseTermAccept = "Accept Term and condition";
  } 

  if (!License?.licenseCheckAccept) {
      errors.licenseCheckAccept = "Accept accept profile detail term";
  } 

    
  return errors;

}

export  const generateRequest = async (kycField) => {

  

  if(kycField.formtype==="pancard")
  {
    
      return await KycVarifications.createReaquast({
          fname: (kycField.PanDetail.name) ? kycField.PanDetail.name : kycField.fullName,
          Email:kycField.nationality,
          Phone:kycField.phone,
          DOB:kycField.dateOfBirth,
          national:kycField.nationality,
          doctype:'id_card',
          DocNumber:kycField.PanDetail.number,
          gender:kycField.gender,
          ...kycField,
        }).then((response) => {
        const { status, data } = response;
        if (status === 200 && data?.reference && data?.verification_url) {
          return data;
        } else {
          
          return (data?.data?.error?.message);
        }
      });
  }
  
  
};