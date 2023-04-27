
var axios = require('axios');
require('dotenv').config()


exports.handler = async (event, context,callback) => {

 if(event.httpMethod==="POST" && (event.headers.host==="localhost:8888" || event.headers.host==="celebfie.netlify.app"))
  {
        let Resposnse
        var data = JSON.stringify(JSON.parse(event.body));
        var config = {
          method: 'post',
          url:  `${process.env.KYCENDPOINT}status`,
          headers: { 
            'Authorization': process.env.KYCKEY, 
            'Content-Type': 'application/json'
          },
          data : data
        };

        Resposnse =  await  axios(config).then(function (response) {
          return {status:response.status,data:response.data};
        }).catch(function (error) {
          return {statusCode:error.response.status,data:error.response.data}
        });

    return {
        statusCode: Resposnse.status,
        body: JSON.stringify(Resposnse.data),
     };
  }else
  {
    return {
      statusCode: 200,
      body: JSON.stringify('we are accept only post method'),
    };
  }   



};