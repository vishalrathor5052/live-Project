/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Grid,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FC, useEffect, useState, memo, useCallback } from 'react';
import api from 'src/store/query';
import { TypographyComponents } from 'src/components/TypographyComponents';
import { useDispatch, useSelector } from 'src/store/hooks';
import {
  setWardId,
  setWardEmployee,
  GetRosterDetails,
  getEmployeeList,
  setSelectedEmployeeId,
  setUpdatEditMode,
  setIsMultiWard,
  getSchedules,
} from 'src/store/actions/header';
import { MoreHoriz, Person, CheckCircle } from '@mui/icons-material';
import { IconButtonComponent } from 'src/components/IconButtonComponent';
import {
  RosterSearchWard,
  Placeholders,
  RoleArray as roleArray,
} from 'src/shared/Shared';
import _ from 'lodash';
import {
  GetEmployeeByHospitalIDType,
  RosterSearchWardType,
  WardsTypes,
} from 'src/Interface/Interface';

import { Loader } from 'src/components/Loader';
import SelectComponent from '../../../components/SelectComponent';
import { createSX } from '../../../utils/createStyles';

const styles = createSX({
  mainContainer: {
    maxHeight: '550px',
    overflowY: 'auto',
    overflowX: 'hidden',
    mt: 2,
  },
  listItem: {
    padding: '15px 20px',
    borderBottom: '1px solid #3A7C92',
    cursor: 'pointer',
  },
  timeIcon: {
    width: '18px',
    height: '18px',
    mt: 0.4,
  },
  chip: {
    backgroundColor: '#D0EEF2',
    color: '#062335',
    mr: 1,
    mt: 1,
    border: '1px solid #3a7c92',
  },
});

const LeftComponent: FC = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isWardsList, setIsWardsList] = useState<boolean>(true);
  const [selectedChip, setSelectedChip] = useState<Array<string>>([]);

  const {
    wardId,
    wardEmployee,
    employeeList,
    selectedEmployeeId,
    isLoading,
    isEditMode,
    isMultiWard,
  } = useSelector(state => state?.header);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  /**
   *
   * @param event for store the value of target
   * and open the allocate duties to shift modal
   * on click the add butto
   */
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * close the modal either on update the data
   * or click on close button
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * todo: fetch the ward list by the query
   * using static hospital id for fetch the wards list
   */
  const { wards = [] } = api.useGetWardsForHospitalQuery(
    {
      id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        wards: data?.hospital?.wards,
      }),
    },
  );

  /**
   * todo: verifying the role type of roster,then
   * todo: appears the view
   * !: roleArray[1] is employee role type
   * !: wardEmplyee is getting value from reducer, like Wards and Employee
   * ?: updating the isWardList state for appear the view according
   * ?: to role type and if the role rype will employee, then
   * ?: it'll fetch the employee list
   * ?: there are two dependency wardEmployee and dispatch
   * ?: whenever wardEmployee would update,
   * ?: it would verify the condition, then appear the view
   * ?: same for dispatch
   * ?: We're using useEffect for re-render the component
   */
  useEffect(() => {
    if (wardEmployee === roleArray[1]) {
      setIsWardsList(false);
      dispatch(getEmployeeList());
    } else {
      setIsWardsList(true);
    }
  }, [wardEmployee]);

  /**
   * todo: updateing the wardId in the rducer, then fetching the roster data
   * !: setWardId for update the wardId in reducer
   * !: GetRosterDetails is an action for get the roster data
   * Have to set the ward id and then fetch the roster for corresponding
   * wardId. using useCallback due to re-render the component
   */
  const handleSelectWard = useCallback(
    (ward: WardsTypes) => {
      dispatch(setWardId(ward._id ?? ''));
      dispatch(GetRosterDetails());
    },
    [dispatch],
  );

  const handleSelectedEmployee = useCallback(
    (employee: GetEmployeeByHospitalIDType) => {
      console.log(employee);
      dispatch(setSelectedEmployeeId([_.get(employee, 'user._id', '')]));
      dispatch(getSchedules());
    },
    [],
  );

  /**
   * todo: check wards length and wardId for select the first ward by-default
   * !: storing the first index value as default due to get roster data
   */
  useEffect(() => {
    if (wards.length && !wardId?.length) {
      const wardObj: WardsTypes = { ...wards[0] };
      handleSelectWard(wardObj);
    }
  }, [wards, handleSelectWard, wardId]);

  useEffect(() => {
    if (employeeList?.length && !selectedEmployeeId?.length) {
      const employeeObj: GetEmployeeByHospitalIDType = { ...employeeList[0] };
      handleSelectedEmployee(employeeObj);
    }
  }, [employeeList, selectedEmployeeId, wardEmployee]);

  /**
   * todo: updating the role type ('Wards' and 'Employee') in the reducer
   * setWardEmployee is action type for update the role type
   * in the entire application and UI would appear according to
   * role type.
   */
  const handleSelectedRole = useCallback(
    (selectedRole: string) => {
      dispatch(setWardEmployee(selectedRole));
    },
    [dispatch],
  );

  /**
   * todo: filter the employee and ward list
   * @param event
   * getting value of the input and filtering
   * the wards and employees list
   */
  const handleSearchWard = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  /**
   * todo: filtering the wards and employee list for wardType
   * @param wardType (ICU, HDU and General)
   * filtering the wards and employee list corresponding to
   * selected user ward type, then close the modal.
   * Taking first index, after splitted the string
   * Example:-
   * ?: const splitString = 'ICU Wards'.split(' ');
   * ?: splitString[0]; // ['ICU', 'Wards]
   */
  const handleSelect = (wardType: RosterSearchWardType) => {
    !selectedChip.includes(wardType.name) &&
      setSelectedChip(prevState => [...prevState, wardType.name]);
    selectedChip.includes(wardType.name) &&
      setSelectedChip(prevState => [
        ...prevState.filter(x => x !== wardType.name),
      ]);
    handleClose();
  };

  const handleDelete = (index: number) => {
    const filteredChip = selectedChip
      .slice(0, index)
      .concat(selectedChip.slice(index + 1, selectedChip.length));
    setSelectedChip(filteredChip);
  };

  return (
    <>
      <SelectComponent
        options={roleArray}
        label={Placeholders.selectRole}
        getValue={wardEmployee}
        id="demo-select-small"
        onHandleChange={handleSelectedRole}
      />

      <Box sx={{ position: 'relative', mt: 3 }}>
        <TextField
          size="small"
          placeholder={Placeholders.searchIcu}
          fullWidth
          onChange={handleSearchWard}
        />
        <Box sx={{ position: 'absolute', right: '0', top: '0' }}>
          <IconButtonComponent
            onHandleWeek={(event: any) => handleClick(event)}
            IconName={MoreHoriz}
            size={'medium'}
            fontSize={'inherit'}
            label={'person'}
          />
        </Box>
      </Box>

      {/* for filter the wards */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {RosterSearchWard.map((ward: RosterSearchWardType, index: number) => {
          return (
            <MenuItem key={index.toString()} onClick={() => handleSelect(ward)}>
              <ListItemIcon>
                <Box
                  sx={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: ward.color,
                  }}
                ></Box>
              </ListItemIcon>
              <ListItemText>{ward.name}</ListItemText>
              {selectedChip.some(wardType => wardType === ward?.name) && (
                <IconButtonComponent
                  // onHandleWeek={(event: any) => handleClick(event)}
                  IconName={CheckCircle}
                  color={'primary'}
                  size={'small'}
                  fontSize={'inherit'}
                  label={'checkCircle'}
                />
              )}
            </MenuItem>
          );
        })}
      </Menu>
      {selectedChip?.map((ward: string, index: number) => {
        return (
          <Chip
            label={ward}
            size="small"
            sx={styles.chip}
            onDelete={() => handleDelete(index)}
            key={ward}
          />
        );
      })}

      {wardEmployee === roleArray[0] && (
        <>
          <FormControlLabel
            color="primary"
            sx={{ ml: 0 }}
            labelPlacement="start"
            label={Placeholders.multiWard}
            control={
              <Switch
                checked={isMultiWard}
                onChange={(event, value) => dispatch(setIsMultiWard(value))}
              />
            }
          />

          <FormControlLabel
            sx={{ ml: 0 }}
            labelPlacement="start"
            label={Placeholders.editMode}
            control={
              <Switch
                value={isEditMode}
                onChange={(event, value) => dispatch(setUpdatEditMode(value))}
              />
            }
          />
        </>
      )}

      <Box sx={styles.mainContainer}>
        {isLoading && <Loader />}
        {!isLoading &&
          isWardsList &&
          wards.length > 0 &&
          wards
            ?.filter(
              (ward: WardsTypes) =>
                ward?.name
                  .toLocaleLowerCase()
                  .includes(searchKeyword.toLocaleLowerCase()) ?? '',
            )
            .filter((wardElm: WardsTypes) =>
              selectedChip.length
                ? selectedChip.some(
                    x => x.split(' ')[0] == wardElm?.wardType?.name ?? '',
                  )
                : true,
            )
            .map((ward: WardsTypes) => (
              <Box
                sx={{
                  ...styles.listItem,
                  ...{
                    background: `#${
                      wardId?.includes(ward._id) ? 'D0EEF2' : 'F5F6F8'
                    }`,
                  },
                }}
                onClick={() => handleSelectWard(ward)}
                key={_.get(ward, 'ward._id')}
              >
                <TypographyComponents
                  variant={'h5'}
                  component={'div'}
                  title={ward.name}
                />
                <Grid display="flex" mt={1}>
                  <AccessTimeIcon sx={styles.timeIcon} />
                  <Box sx={{ ml: '5%' }}>
                    <TypographyComponents
                      variant={'h5'}
                      component={'div'}
                      title="08:00-14:00"
                    />
                    <TypographyComponents
                      variant={'h5'}
                      component={'div'}
                      title="14:00-20:00"
                    />
                    <TypographyComponents
                      variant={'h5'}
                      component={'div'}
                      title="20:00-08:00"
                    />
                  </Box>
                </Grid>
              </Box>
            ))}
        {!isLoading &&
          !isWardsList &&
          employeeList?.length > 0 &&
          employeeList
            ?.filter((employee: GetEmployeeByHospitalIDType) =>
              _.get(employee, 'user.fullName', '')
                .toLocaleLowerCase()
                .includes(searchKeyword.toLocaleLowerCase()),
            )
            .map((employee: GetEmployeeByHospitalIDType) => (
              <Box
                key={employee._id}
                sx={{
                  ...styles.listItem,
                  ...{
                    background: `#${
                      selectedEmployeeId?.includes(
                        _.get(employee, 'user._id', ''),
                      )
                        ? 'D0EEF2'
                        : 'F5F6F8'
                    }`,
                  },
                }}
                onClick={() => handleSelectedEmployee(employee)}
              >
                <Grid display="flex" alignItems="center" sx={{ gap: 1 }}>
                  <Person style={{ color: '#3A7C92' }} />
                  <TypographyComponents
                    variant={'h5'}
                    component={'div'}
                    title={_.get(employee, 'user.fullName', '')}
                    sx={{ color: '#3A7C92' }}
                  />
                </Grid>
                <Grid
                  display="flex"
                  spacing={2}
                  alignItems="center"
                  sx={{ gap: 1 }}
                >
                  <AccessTimeIcon style={{ width: '18px', height: '18px' }} />
                  <TypographyComponents
                    sx={['ml:4', { color: '#3A7C92' }]}
                    variant={'p'}
                    component={'div'}
                    title="250hr"
                  />
                </Grid>
              </Box>
            ))}
      </Box>
    </>
  );
};

export default memo(LeftComponent);
