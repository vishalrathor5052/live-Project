import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import KycVarifications from "../services/Kyc.varification";
import { UserContext } from "../utility/context";
import { SearchQueryString } from "../utility/global";
import { varificationstatus } from "../utility/Strings";

export default function KycVerification() {
  const { currentUserData } = useContext(UserContext);

  const [varifictionstatus, setvarificationset] = useState(false);
  const [kycstatus, setKycStatus] = useState("");
  let query = SearchQueryString();
  const [ref, setref] = useState(query.get("ref"));
  const [error, seterorr] = useState("checking...");

  useEffect(() => {
    KycVarifications.getKycDetails(currentUserData.userId).then((response) => {
      if (
        response?.status === 200 &&
        response?.data?.users?.status === varificationstatus.success
      ) {
        setvarificationset(true);
      }
      //else
      // {
      //     const refid =response?.data?.users?.referenceId;
      //     KycVarifications.varifyReaquast(refid).then((response)=>{

      //         const {status,data}  = response
      //         if(status===200 && data.event===varificationstatus.accepted)
      //         {
      //             setvarificationset(true);
      //             KycVarifications.UpdateKycDetails(refid,varificationstatus.success);
      //         }else
      //         {

      //             seterorr(response?.data?.declined_reason);
      //             KycVarifications.UpdateKycDetails(refid,varificationstatus.failed);
      //             setKycStatus(response?.data?.event);

      //         }
      //     })
      //    seterorr(response?.errror);
      // }
    });
  });
  return (
    <>
      <Header />
      <div className="main">
        <div className="text-center py-8">
          <div className="max-w-[830px] px-4 mx-auto">
            <h1>KYC Verification</h1>
            <p>
              To comply with regulation each participant will have to go through
              indentity verification (KYC/AML) to prevent fraud causes. Please,
              complete our fast and secure verification process to participate
              in our token sale.
            </p>

            <div className="my-5 md:my-12">
              <div className="bg-white p-5 md:p-12 text-center mb-5">
                {!varifictionstatus ? (
                  <>
                    <div className="max-w-xl mx-auto">
                      <div className="w-[70px] h-[70px] flex items-center justify-center p-2 rounded-full border-2 border-solid border-red-400 mx-auto">
                        <em className="ti ti-close text-2xl text-red-400"></em>
                      </div>
                      {kycstatus === varificationstatus.declined ? (
                        <p className="text-base my-5 text-red-400">{error}</p>
                      ) : (
                        <p className="text-base my-5">
                          You have not submitted your necessary documents to
                          verify your identity. In order to purchase our tokens,
                          please verify your identity.
                        </p>
                      )}
                    </div>

                    <a
                      href={"/kycform"}
                      className="btn md:min-w-[350px] w-auto px-2 inline-block !text-white leading-9"
                    >
                      Click here to complete your KYC
                    </a>
                  </>
                ) : (
                  /* statis true */
                  <>
                    <div className="max-w-xl mx-auto">
                      <div className="w-[70px] h-[70px] flex items-center justify-center p-2 rounded-full border-2 border-solid border-green-400 mx-auto">
                        <em className="ti ti-check text-2xl text-green-400"></em>
                      </div>
                      {varifictionstatus ? (
                        <p className="text-base my-5 text-green-400">
                          Verification is successfully.
                        </p>
                      ) : (
                        <p className="text-base my-5">
                          You have not submitted your necessary documents to
                          verify your identity. In order to purchase our tokens,
                          please verify your identity.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <p>
                If you have any question, please contact our support team{" "}
                <a href="mailto:info@Celebfie.com">info@Celebfie.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
