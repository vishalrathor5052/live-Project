import React, { useEffect, useState } from 'react'
import KycStepHeader from './KycStepHeader';
import { DateSeleter } from '../../utility/date';
import AuthService from '../../services/auth.service';
import { PersonalDetails } from "../../utility/Strings";

export default function PersonalDetail(Props) {
    const {kycField,handleUserInput,setDateOfBirth} =Props;
    const [countiresList, setcountriesList] = useState("");
    const getcountrydataformDB = () => {
        if (countiresList == "") {
          AuthService.getCountries().then(
            (response) => {
              setcountriesList(response);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      };
      useEffect(() => {
        getcountrydataformDB();
      }, []);
    
  return (
     <div className="form-step form-step1">
    <KycStepHeader
      Step="01"
      Heading={PersonalDetails.PersonalDetailTitle}
      description={PersonalDetails.PersonalDetailsubTitle}
    />

    <div className="p-4 md:p-8 relative border-b border-solid border-green-200">
      <div className="flex relative">
        <em className="fas fa-info-circle text-[12px] text-green-400 absolute top-1"></em>
        <p className="pl-5 text-green-400 leading-tight text-sm">
          {PersonalDetails.PersonDetailSuccess}
        </p>
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 gap-x-4 mt-7">
        <div className="form-group">
          <label>{PersonalDetails.PersonDetailFormFullName}</label>
          <input
            type="text"
            defaultValue={kycField.fullName}
            className="form-control"
            name="fullName"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>

        <div className="form-group">
          <label>{PersonalDetails.PersonDetailFormEmail}</label>
          <input
            type="text"
            defaultValue={kycField.email}
            readOnly
            className="form-control"
            name="email"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>
        <div className="form-group">
          <label>{PersonalDetails.PersonDetailFormPhone}</label>
          <input
            type="text"
            defaultValue={kycField.phone}
            className="form-control"
            name="phone"
            onChange={(e) => {
              handleUserInput(e);
            }}
          />
        </div>

        <div className="form-group">
          <label>{PersonalDetails.PersonDetailFormDob}</label>

          <DateSeleter
            date={
              kycField.dateOfBirth
                ? new Date(kycField.dateOfBirth)
                : new Date()
            }
            onChange={setDateOfBirth}
          />
        </div>

        <div className="form-group">
          <label>{PersonalDetails.PersonDetailFormGender}</label>

          <select
            name="gender"
            value={kycField.gender}
            onChange={(e) => {
              handleUserInput(e);
            }}
          >
            <option value="M">{PersonalDetails.PersonDetailFormGenderOption1}</option>
            <option value="F">{PersonalDetails.PersonDetailFormGenderOption2}</option>
            <option value="O">{PersonalDetails.PersonDetailFormGenderOption3}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{PersonalDetails.PersonDetailFormNationality}</label>

          <select
            name="nationality"
            value={kycField.nationality}
            onChange={(e) => {
              handleUserInput(e);
            }}
          >
            <option value="">{PersonalDetails.PersonDetailFormNationalityOption}</option>

            {countiresList &&
              countiresList.map((country, key) => {
                return (
                  <option key={key} value={country.countryIso}>
                    {" "}
                    {country.countryName}{" "}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      
    </div>
  </div>
  )
}
