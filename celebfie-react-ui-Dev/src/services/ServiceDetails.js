export const API_ENDPOINT = (process.env.REACT_APP_NETLIFY==="FALSE" ) ? process.env.REACT_APP_APIENDPOINT : process.env.REACT_APP_NETLIFYAPIENDPOINT;
export const headers = {"content-type": "graphql"};

export const KYC_ENDPOINT =  process.env.REACT_APP_NODE_ENDPOINT;
export const KycHeaders = {"content-type": "application/json"};