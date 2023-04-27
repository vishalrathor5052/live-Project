/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'src/generated/graphql';
import { GetRosterType } from 'src/Interface/Interface';

export type Maybe<T> = T | undefined | null;

export const setHeaderTitle = createAction<string | undefined>(
  'header/changeTitle',
);

export const setWardId = createAction<string | undefined>('roster/wardId');

export const setSelectRoster = createAction<string | undefined>(
  'roster/selectRoster',
);

export const setDateRange = createAction<Record<string, unknown> | undefined>(
  'roster/dateRange',
);

export const setEmployeeId = createAction<string | undefined>(
  'roster/employeeId',
);

export const setWardEmployee = createAction<string | undefined>(
  'roster/WardEmployee',
);

export const setSelectMonth = createAction<string>('roster/SelectMonth');

export const setSelectedView = createAction<string>('roster/SelectedView');

export const resetRosterData = createAction<Array<GetRosterType> | undefined>(
  'roster/ResetRosterData',
);

export const setSelectedEmployeeId = createAction<Array<string> | undefined>(
  'roster/SelectedEmployee',
);

export const setUpdatEditMode = createAction<boolean | undefined>(
  'roster/UpdateEditMode',
);

export const setIsMultiWard = createAction<boolean | undefined>(
  'roster/SetIsMultiWard',
);

export const GetRosterDetails = createAsyncThunk(
  'GetRoster',
  async (_, { dispatch, getState }) => {
    const state: any = getState();
    const {
      dateRange: { startWeek, endWeek },
      wardId,
      selectedRoster,
    } = state?.header;

    if (!startWeek || !endWeek || !wardId || !selectedRoster) return;

    const response = await dispatch(
      api.endpoints.GetRoster.initiate({
        rosterTypeIds: selectedRoster,
        startDate: startWeek,
        endDate: endWeek,
        wardIds: wardId,
      }),
    );
    return response.data;
  },
);

export const getEmployeeList = createAsyncThunk(
  'header/employeeList',
  async (_, { dispatch }) => {
    const response = await dispatch(
      api.endpoints.GetEmployeesListByHispitalId.initiate({
        hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      }),
    );
    return response.data?.employees;
  },
);

export const getHospitalRoles = createAsyncThunk(
  'header/hospitalRoles',
  async (_, { dispatch }) => {
    const response = await dispatch(
      api.endpoints.GetHospitalRole.initiate({
        hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      }),
    );
    return response.data?.hospitalRoles;
  },
);

export const getSchedules = createAsyncThunk(
  'header/schedule',
  async (_, { dispatch, getState }) => {
    const state: Maybe<any> = getState();
    const {
      dateRange: { startWeek, endWeek },
      selectedEmployeeId,
    } = state?.header;
    const response = await dispatch(
      api.endpoints.getSchedule.initiate({
        schedule: {
          hospitalIds: [`${import.meta.env.VITE_APP_HOSPITAL_ID}`],
          userId: selectedEmployeeId[0],
          from: startWeek,
          to: endWeek,
        },
      }),
    );

    return response.data?.getSchedule.duties;
  },
);
