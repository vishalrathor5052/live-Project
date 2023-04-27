import { api as apiGenerated } from 'src/generated/graphql';

const api = apiGenerated.enhanceEndpoints({
  addTagTypes: [
    'Departments',
    'Employees',
    'HospitalRolePermissions',
    'HospitalRoleTypes',
    'UserProfile',
  ],
  endpoints: {
    // Queries
    GetCurrentUser: {
      providesTags: ['UserProfile'],
    },
    GetEmployeesForHospital: {
      providesTags: ['Departments', 'Employees'],
    },
    GetHospitalRoleTypes: {
      providesTags: ['HospitalRoleTypes', 'HospitalRolePermissions'],
    },
    GetUserProfile: {
      providesTags: ['UserProfile'],
    },
    // Mutations
    CreateDepartment: {
      invalidatesTags: ['Departments'],
    },
    CreateRoleTypeForHospital: {
      invalidatesTags: ['HospitalRoleTypes'],
    },
    GrantPermission: {
      invalidatesTags: ['HospitalRolePermissions'],
    },
    UpdateLanguage: {
      invalidatesTags: ['UserProfile'],
    },
  },
});

export default api;
