/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Grid } from '@mui/material';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import SelectComponent from 'src/components/SelectComponent';
import AutocompleteComponent from 'src/components/AutocompleteComponent';
import api from 'src/store/query';
import { ActionTypes, ButtonLabels, Placeholders } from 'src/shared/Shared';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetRosterDetails,
  setSelectRoster,
  Maybe,
} from 'src/store/actions/header';

const TopComponent: FC = () => {
  const dispatch = useDispatch();

  const state: Maybe<any> = useSelector(state => state);
  const {
    header: { selectedRoster, rosterData, wardEmployee },
  } = state;

  const [isPublsih, setIsPublish] = useState<boolean>(true);
  const [getPublishMutation] = api.useGetPublishRosterMutation();

  /**
   * get the department list from the graphql
   * we're using hook for the fetch data
   */
  const { departments = [] } = api.useGetDepartmentForHospitalQuery(
    {
      id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        departments: data?.departments.departments,
      }),
    },
  );

  /**
   * fetch the roster types list from the graphql
   * we're using hook for the fetch data
   */
  const { rosterTypes = [] } = api.useGetRosterTypesQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        rosterTypes: data?.rosterTypes,
      }),
    },
  );

  /**
   * store the roster id in the reducer
   * by using setSelectRoster action type
   * when user select roster type
   * then fetching the roster data
   * using useCallback to avoid the recall the function
   * providing dispatch as a dependency
   */
  const handleRosterChange = useCallback(
    (rosterId: string) => {
      dispatch(setSelectRoster(rosterId));
      wardEmployee === 'Wards' && dispatch(GetRosterDetails());
    },
    [dispatch],
  );

  /**
   * todo: fetch the updated roster data
   * handleRosterChange - will update the selectedRoster state
   * in reducer, then fetching the data
   * todo: will check the deps and call the handleChangeroster
   * todo: if selectedRoster will empty and roster list will not empty
   * !: deps - rosterTypes - if user will select the roster type
   * !: deps - selectedRoster - if selectedRoster will update
   */
  useEffect(() => {
    if (rosterTypes.length && !selectedRoster) {
      handleRosterChange(rosterTypes[0]._id);
    }
  }, [rosterTypes, selectedRoster, handleRosterChange]);

  /** for verify the publish or unpublish shifts */
  const handleRosterPublish = useCallback(() => {
    if (rosterData?.length) {
      let isPublish = true;
      /** iterate all rosterdata and verify duties are publish
       * or not and is there any draft duty
       */
      for (const roster of rosterData) {
        /**
         * todo: draft duty list would be verified
         * draft duty is not empty, then publish button will disable
         * !: either publish button will enable or disable
         */
        isPublish = roster.draftDutyChanges ? false : isPublish;

        /**
         * todo: verify the ispublished in all shift
         * iterate the duties from the evry roster and
         * check isPublished in all shift for
         * disable and enable the button
         * !: isPublished is true and false in evry shift
         */
        for (const duty of roster.duties) {
          if (!duty.isPublished) {
            isPublish = false;
          }
        }
      }
      /**
       * todo: store the publish status in isPublish key
       * !: either enable or disable the publish button
       */
      setIsPublish(isPublish);
    }
  }, [rosterData]);

  /**
   * todo: verify the publish button should be enabled or not
   * It would check on every update of rosterData (on getRoster)
   */
  useEffect(() => {
    handleRosterPublish();
  }, [rosterData, handleRosterPublish]);

  /**
   * todo: publish the roster of the selected date range
   * Have to publsih the roster
   * We're dispatching the getPublishReoster function
   * for publish the data
   */
  const doPublish = async () => {
    try {
      const publishData: string | string[] = [];
      for (const x of rosterData) {
        const { draftDutyChanges, _id } = x;
        if (draftDutyChanges) {
          publishData.push(_id);
        }
      }

      await getPublishMutation({ shiftIds: publishData })
        .unwrap()
        .then(() => {
          dispatch(api.util.resetApiState());
          dispatch(GetRosterDetails());
        })
        .catch((err: unknown) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={5}>
          <AutocompleteComponent
            options={departments ?? []}
            getOptionLabel={'name'}
            multiple={true}
            id="autoComplete"
            label={Placeholders.search}
            isCheckbox={true}
          />
        </Grid>

        {rosterTypes && (
          <Grid item xs={2}>
            <SelectComponent
              options={rosterTypes}
              label={Placeholders.selectRoster}
              id="roster-type"
              labelKey="typeName"
              getValue={selectedRoster}
              onHandleChange={handleRosterChange}
            />
          </Grid>
        )}

        <Grid item xs={3}>
          <SelectComponent options={ActionTypes} label={Placeholders.actions} />
        </Grid>

        <Grid item xs={2}>
          <Button
            style={{ width: '100%' }}
            variant="contained"
            onClick={doPublish}
            disabled={isPublsih}
          >
            {ButtonLabels.publish}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(TopComponent);
