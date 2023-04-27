import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api, GetHospitalByIdQuery } from 'src/generated/graphql';

export const updateHospitalDetails = createAction<
  GetHospitalByIdQuery['hospital'] | undefined
>('hospital/updateHospitalDetails');

export const getHospitalDetails = createAsyncThunk(
  'hospital/getHospitalDetails',
  async (_, { dispatch }) => {
    const response = await dispatch(
      api.endpoints.GetHospitalById.initiate({
        id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      }),
    );
    return response.data?.hospital;
  },
);
