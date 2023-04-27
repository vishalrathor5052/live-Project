/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Grid, IconButton } from '@mui/material';
import { FC, memo, useState } from 'react';
import { createSX } from 'src/utils/createStyles';
import { useDispatch } from 'src/store';
import { Done, Close } from '@mui/icons-material';
import DragNDrop from 'src/components/DragNDrop';
import {
  AddRosterProps,
  AllocationList,
  ColumnsType,
  DNDColumnIds,
  DutyType,
} from 'src/Interface/Interface';
import ButtonComponent from 'src/components/ButtonComponent';
import api from 'src/store/query';
import { GetRosterDetails } from 'src/store/actions/header';
import { useSelector } from 'react-redux';
import { Maybe } from 'src/generated/graphql';
import { Loader } from 'src/components/Loader';
import { ButtonLabels } from 'src/shared/Shared';
import LeftAddRosterSection from './LeftAddRosterSection';

const classes = createSX({
  root: {
    width: '96%',
    maxWidth: '1600px',
    maxHeight: '512px',
    height: '96%',
    margin: '0 auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  },
  heading: {
    margin: 2,
  },
  chip: {
    ml: 1,
  },
  button: {
    backgroundImage: 'linear-gradient(#3A7C92, #304562)',
    paddingX: '40px',
  },
  disableButton: {
    backgroundColor: '#e8e6e6',
    paddingX: '40px',
  },
  rightContent: {
    borderLeft: '0.5px solid #3A7C92',
    position: 'relative',
    height: '90% !important',
    overflowY: 'auto',
  },
  colorRed: {
    color: 'red',
  },
  colorGreen: {
    color: 'green',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
});

const AddRoster: FC<AddRosterProps> = ({ shiftTemplate, onClose }) => {
  const [allocationDutiesShift] = api.useAllocationDutiesShiftMutation();
  const [allocation, setAllocation] = useState<Array<AllocationList>>(
    shiftTemplate[0].duties ?? [],
  );
  const { minimumStrength } = shiftTemplate[0].shiftTemplate.requirements ?? {};

  const { isLoading } = useSelector((state: Maybe<any>) => state?.header);

  const dispatch = useDispatch();

  /**
   *
   * @param list type of columns type with available and allocation
   * employee list whose user wants to assign for the duty
   * verifying the type of allocation and from the list data
   * and udating the allocation state
   */
  const onHandleAllocationEmployee = (list: ColumnsType) => {
    const { newEndCol, newStartCol } = list;
    let allocationList = [];
    if (newEndCol?.id === DNDColumnIds.allocations)
      allocationList = newEndCol.list;
    if (newStartCol?.id === DNDColumnIds.allocations)
      allocationList = newStartCol.list;
    setAllocation([...allocationList]);
  };

  /**
   * fetch the new allocation and already allocated duties
   * storing the user id's in the new array and then
   * using the redu toolkit hook for call the allocation duties to shift mutation
   * todo: mutation for allocationDutiesForShift
   * !: allocationDutiesForShift, shiftTemplate for get the shift duties
   */
  const handleAllocation = async () => {
    try {
      // store all already allocated duties user id
      const reusedDutyArr: Array<string> = [];
      for (const x of shiftTemplate[0]?.duties as DutyType[]) {
        if (x?.user?._id || x?.allocation?._id) {
          const userId: any = x?.user?._id ? x?.user?._id : x?.allocation?._id;
          reusedDutyArr.push(userId);
        }
      }

      /**
       * creating the new filter array for allocate new
       * duties and verifying the user from the already assign
       * duties
       * !: using allocation hook for mutation
       * closing the modal, after getting success message
       */
      const filterList: DutyType[] = allocation.filter(
        (shiftData: any) =>
          !reusedDutyArr?.includes(
            shiftData?.user?._id ?? shiftData?.allocation?._id,
          ),
      );
      const newAllocationArr: Array<string> = [];
      for (const x of filterList as DutyType[]) {
        if (x?.user?._id || x?.allocation?._id) {
          const userId: any = x?.user?._id ?? x?.allocation?._id;
          newAllocationArr.push(userId);
        }
      }

      await allocationDutiesShift({
        allocationDuties: [
          {
            shiftId: shiftTemplate[0]._id,
            dutyUpdateData: {
              newAllocations: newAllocationArr,
              reusedDutyIds: reusedDutyArr,
            },
          },
        ],
      })
        .unwrap()
        .then(() => {
          onClose();
          dispatch(api.util.resetApiState());
          dispatch(GetRosterDetails());
        });
    } finally {
      onClose();
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      component={Card}
      sx={classes.root}
    >
      <IconButton sx={classes.closeButton} onClick={onClose}>
        <Close />
      </IconButton>
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 5, height: '100%' }}
      >
        {/* ................. Left section..................... */}
        <LeftAddRosterSection
          allocationList={allocation}
          shiftTemplate={shiftTemplate}
          classes={classes}
        />
        {/* ................................ Right Content............................................ */}
        <Grid item xs={7}>
          <Grid container sx={classes.rightContent} item xs={12}>
            {isLoading && <Loader paddingTop={'80'} />}
            <DragNDrop
              onDragEnd={(list: ColumnsType) =>
                onHandleAllocationEmployee(list)
              }
              shiftIds={shiftTemplate}
            />
          </Grid>
          <Grid
            item
            alignSelf="flex-end"
            mr={2}
            sx={{ position: 'absolute', right: 20, bottom: 20 }}
          >
            <ButtonComponent
              variant="contained"
              onClick={() => handleAllocation()}
              label={ButtonLabels.done}
              disable={allocation.length < minimumStrength ? true : false}
              sx={
                allocation.length < minimumStrength
                  ? classes.disableButton
                  : classes.button
              }
              StartIcon={<Done />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default memo(AddRoster);
