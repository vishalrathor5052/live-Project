import React from 'react'

export default function PersonalInfo() {
  return (
    <>
      <div className="table-wrap personal-info-wrap">

        <h4>Personal information</h4>

        <table className="w-full">
          <tbody>
              <tr>
                <td>Full Name</td>
                <td>Abu Bin Ishtiyak</td>
              </tr>
              <tr>
                <td>Surname</td>
                <td>IO</td>
              </tr>
              <tr>
                <td>Email Address</td>
                <td>info@softio.com</td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>01713040400</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>10 Aug, 1980</td>
              </tr>
              <tr>
                <td>Joining Date</td>
                <td>08-16-2018 09:04PM</td>
              </tr>
              <tr>
                <td>Last Login</td>
                <td>05-16-2022 01:04PM</td>
              </tr>
          </tbody>
        </table>

      </div>
    </>
  )
}
