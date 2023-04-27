#!/bin/node

const axios = require('axios');

const getResourceQueries = {
  wards: {
    query: `query GetResource($hospitalId: String!) {
     hospital: getHospitalById(hospitalId: $hospitalId) {
        wards {
          _id
          name
        }
      }
    }`,
    select: 'hospital.wards',
  },
  departments: {
    query: `query GetResource($hospitalId: String!) {
     hospital: getHospitalById(hospitalId: $hospitalId) {
      departments {
          _id
          name
        }
      }
    }`,
    select: 'hospital.departments',
  },
  roleTypes: {
    query: `query GetResource($hospitalId: String!) {
      roles: getHospitalRoleTypes(hospitalId: $hospitalId) {
        name: title
        _id
       }
     }`,
    select: 'roles',
  },
};

const contextValues = { hospitalId: '3P3dgKhPuXvRc7tUBekes' };
const resource = process.argv[2];

axios
  .post('http://localhost:3000/graphql', {
    query: getResourceQueries[resource].query,
    variables: contextValues,
  })
  .then(res => {
    console.log(
      getResourceQueries[resource].select
        .split('.')
        .reduce((o, i) => o[i], res.data?.data),
    );
  })
  .catch(err => console.warn(err.response.data));
