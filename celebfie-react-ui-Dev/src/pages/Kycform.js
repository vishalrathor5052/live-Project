import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";


import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { UserContext } from "../utility/context";
import "react-datepicker/dist/react-datepicker.css";

import KycVarifications from "../services/Kyc.varification";

import Passport from "../images/icons/passport-icon.png";
import License from "../images/icons/license-icon.png";
import AdharIcon from "../images/icons/adhar-icon.png";
import Aadharcard from "../images/icons/aadharcard-icon.png";
import Pancard from "../images/icons/pancard-icon.png";
import KycfromDocHeader from "../components/Kyc/KycfromDocHeader";
import KycStepHeader from "../components/Kyc/KycStepHeader";
import DocNote from "../components/Kyc/DocNote";
import PanForm from "../components/Kyc/PanForm";
import PanVerified from "../components/Kyc/PanVerified";
import { varificationstatus } from "../utility/Strings";
import PancardValidate, { generatePanrequest , AdharCardVelidate, PassportaVelidata, LicanseVelidata, generateRequest } from "../components/Kyc/Validate";
import PersonalDetail from "../components/Kyc/PersonalDetail";
import { KycForm, DocUpload } from "../utility/Strings";
import AdharForm from "../components/Kyc/AdharForm";
import PassportForm from "../components/Kyc/PassportForm";
import Drive from "../components/Kyc/Drive";

export default function Kycform() {
  const { currentUserData } = useContext(UserContext);


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues = {
    fullName: currentUserData.fullName,
    nationality: currentUserData.nationality,
    email: currentUserData.email,
    phone: currentUserData.contactNumber,
    dateOfBirth: currentUserData.dateOfBirth
      ? new Date(currentUserData.dateOfBirth)
      : new Date(),
    gender: "M",
    formtype: "pancard",
    PanDetail: { pantermAccept: false, pancorrectinfo: false,doctype:'id_card',number:'',fname:'' },
    AadhaarDetail: { adhartermAccept: false, adharcheckAccept: false,doctype:'id_card' },
    PassportDetail: { passportName:'',passportnumber:'', PassporttermAccept: false, PassportcheckAccept: false,doctype:'passport',passportissuedate:new Date(),passportexpirydate:new Date() },
    LicenseDetail: { licenseTermAccept: false, licenseCheckAccept: false,doctype:'driving_license',licenseissuedate:new Date(),licenseexpirydate:new Date() },
    
  };

  const [kycField, setKycField] = useState(defaultValues);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    kycField[name] = value;

    setKycField({ ...kycField });
  };

  const handelPanDetail = (e) => {
    
    const { checked, name, value, type } = e.target;
    
    type === "text"
      ? (kycField["PanDetail"][name] = value.toUpperCase())
      : (kycField["PanDetail"][name] = checked);
    setKycField({ ...kycField });
    
  };

  const handelAdharDetail = (e) => {

    const { checked, name, value, type } = e.target;
    type === "text"
      ? (kycField["AadhaarDetail"][name] = value)
      : (kycField["AadhaarDetail"][name] = checked);
    setKycField({ ...kycField });
  };


  const handelPassportDetail = (e) => {
    const { checked, name, value, type } = e.target;
    type === "text" || type === "date"
      ? (kycField["PassportDetail"][name] = value)
      : (kycField["PassportDetail"][name] = checked);
    setKycField({ ...kycField });
   
  };


  const handelLicenseDetail = (e) => {
    const { checked, name, value, type } = e.target;
    type === "text" || type === "date"
      ? (kycField["LicenseDetail"][name] = value)
      : (kycField["LicenseDetail"][name] = checked);

    

    setKycField({ ...kycField });
    
  };



  const setDateOfBirth = (date) => {
    kycField["dateOfBirth"] = date;
    setKycField({ ...kycField });
  };

  /* datepicker settting  */
  
  
  
  const [panshow, setPanshow] = useState(false);
  const [aadharshow, setaadharshow] = useState(false);
  const [Panverification, SetPanverification] = useState(true);
  const [Adharverification, SetAdharverification] = useState(false);
  const [PanverificationStatus, SetPanverificationStatus] = useState(varificationstatus.pending);
  const [AdharverificationStatus, SetAdharverificationStatus] =useState(varificationstatus.pending);

  /* check kyc detail */
  /*
  useEffect(() => {
    KycVarifications.getKycDetails(currentUserData.userId).then((response) => {
      if (
        response?.status === 200 &&
        response?.data?.users?.status === varificationstatus.success
      ) {
        SetPanverification(true);
        SetAdharverification(true);
        SetPanverificationStatus(varificationstatus.success);
        SetAdharverificationStatus(varificationstatus.success);
      } else {
        SetPanverificationStatus(varificationstatus.pending);
        SetAdharverificationStatus(varificationstatus.pending);
      }
    });
  });*/

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) 
    {
      generateRequest(kycField).then((resfinal) => {
                const { verification_url, reference } = resfinal;
                console.log(resfinal);
                
                KycVarifications.addKycDetails({
                    verification_url:'http://',
                    reference: parseInt(895623568959),
                    userid: currentUserData?.userId,
                    doctype: kycField.formtype==="pancard" ? 'PAN_CARD' : 'AADHAR_CARD' ,



                }).then((udpateResponse) => {
                    window.location.href = verification_url;
                });
            });
    }  
  }, [errors]);


  const HandelKeyVarification = (e) => {
    e.preventDefault();

    /* Pancard Chacker */
    if(e.nativeEvent.submitter.name===KycForm.PanCardsubmitButton)
    {
      setErrors(PancardValidate(kycField.PanDetail));
      kycField["formtype"]= 'pancard';
      setKycField({ ...kycField });
      setIsSubmitting(true);
    }

    /* AdahrCArd Checker */
    if(e.nativeEvent.submitter.name===KycForm.AdharCardsubmitButton)
    {
      setErrors(AdharCardVelidate(kycField.AadhaarDetail));
      kycField["formtype"]= 'aadhracard';
      setKycField({ ...kycField });
      setIsSubmitting(true);
    }

     /* Passport Checker */
     if(e.nativeEvent.submitter.name===KycForm.PassportsubmitButton)
     { 

      console.log(kycField.PassportDetail);
      kycField["formtype"]= 'passport';
      setKycField({ ...kycField });
       setErrors(PassportaVelidata(kycField.PassportDetail));
       setIsSubmitting(true);
     }

     
     /*license */
     if(e.nativeEvent.submitter.name===KycForm.licensesubmitButton)
     { 

      kycField["formtype"]= 'license';
      setKycField({ ...kycField });
       setErrors(LicanseVelidata(kycField.LicenseDetail));
       setIsSubmitting(true);
     }


     
    

  } 
    


  return (
    <>
      <Header />

      <div className="main">
        <div className="py-8">
          <div className="max-w-[830px] px-4 mx-auto">
            <div className="text-center">
              <h1 className="pb-2">{KycForm.KycFormTitle}</h1>
              <p>{KycForm.KycFormsubTitle}</p>
            </div>

            <div className="kyc-form-steps bg-white my-10">
              <form className="mt-6 text-sm" onSubmit={HandelKeyVarification}>
                <PersonalDetail
                  kycField={kycField}
                  handleUserInput={handleUserInput}
                  setDateOfBirth ={setDateOfBirth}
                />

                <div className="form-step form-step2">
                  <KycStepHeader
                    Step="02"
                    Heading={DocUpload.DocUploadTitle}
                    description={DocUpload.DocUploadsubTitle}
                  />

                  <div className="p-4 md:p-8 relative">
                    <div className="flex relative">
                      <em className="fas fa-info-circle text-[12px] text-green-400 absolute top-1"></em>
                      <p className="pl-5 text-green-400 leading-tight text-sm">
                        {DocUpload.DocUploadSuccess}
                      </p>
                    </div>

                    <div className="verification-wrap">
                      <div className="verification-acc mt-7">
                        {/* Form label pan card  */}
                        <KycfromDocHeader
                          Icon={Pancard}
                          click={setPanshow}
                          Showstatus={panshow}
                          dependency={1}
                          status={PanverificationStatus}
                          label={DocUpload.DocUploadPanTitle}
                        />

                        {panshow && (
                          <div className="verification-data mt-7">
                            <DocNote />
                            <PanForm handel={handelPanDetail} errors={errors} field={kycField} />
                            <PanVerified />
                          </div>
                        )}
                      </div>

                      {/*---------Step 2 -----------> */}

                      <div className="verification-acc mt-7">


                      <KycfromDocHeader
                          Icon={Aadharcard}
                          dependency={Panverification}
                          click={setaadharshow}
                          Showstatus={aadharshow}
                          status={AdharverificationStatus}
                          label={DocUpload.DocUploadIdTitle}
                        />
                   
                        
                        {aadharshow &&  (
                            <div>
                              <div className="verification-data doc-upload-wrap mt-7">
                                <Tabs>
                                  <TabList>
                                    <Tab>
                                      <img src={AdharIcon} />
                                      {DocUpload.DocUploadTabTitle1}
                                    </Tab>
                                    <Tab>
                                      <img src={Passport} />
                                      {DocUpload.DocUploadTabTitle2}
                                    </Tab>
                                    <Tab>
                                      <img src={License} />
                                      {DocUpload.DocUploadTabTitle3}
                                    </Tab>
                                  </TabList>

                                  <TabPanel>
                                    <DocNote />
                                      <AdharForm  handel={handelAdharDetail} errors={errors}  field={kycField} /> 
                                  </TabPanel>
                                  <TabPanel>
                                    <DocNote />
                                    <PassportForm  handel={handelPassportDetail} errors={errors}  field={kycField} />
                                  </TabPanel>
                                  <TabPanel>
                                    <DocNote />
                                      <Drive  handel={handelLicenseDetail} errors={errors}  field={kycField} />
                                  </TabPanel>
                                </Tabs>
                              </div>

                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
