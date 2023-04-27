import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { HospitalRoleCategory } from 'src/generated/graphql';
import { useDispatch } from 'src/store';
import api from 'src/store/query';

const RolesAndPermissionsAttribute: FC = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch<{ id: string }>();

  const [fetching, setFetching] = useState(true);
  const [roleName, setRoleName] = useState('');
  const [abbr, setAbbr] = useState('');
  const [roleTypeCategory, setRoleTypeCategory] =
    useState<HospitalRoleCategory>(HospitalRoleCategory.Medical);
  const [roleNameSync, setRoleNameSync] = useState(false);

  useEffect(() => {
    dispatch(
      api.endpoints.GetHospitalRoleTypes.initiate({
        hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      }),
    ).then(({ data }) => {
      setFetching(false);
      setRoleNameSync(false);
      const roleType = data?.roleTypes.find(
        roleTypeData => roleTypeData._id === params.id,
      );
      if (roleType) {
        setRoleName(roleType?.title);
        setAbbr(roleType?.abbr);
        setRoleTypeCategory(roleType?.category);
      }
    });
  }, [dispatch, params.id]);

  const handleSave = useCallback(() => {
    // Call a mutation
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item ml={4}>
        <Typography variant="h5">Set role attributes</Typography>
      </Grid>

      <Grid item ml={2}>
        <TextField
          fullWidth
          disabled={fetching}
          label="Role name"
          value={roleName}
          onChange={e => {
            setRoleName(e.target.value);
            if (roleNameSync) setAbbr(e.target.value);
          }}
        />
      </Grid>

      <Grid item container direction="column" spacing={0} ml={2}>
        <Grid item>
          <TextField
            fullWidth
            disabled={fetching || roleNameSync}
            label="Abbreviation"
            onChange={e => setAbbr(e.target.value)}
            value={abbr}
          />
        </Grid>
        <Grid item ml={2}>
          <FormControlLabel
            checked={roleNameSync}
            control={
              <Checkbox
                disabled={fetching}
                onChange={e => {
                  setRoleNameSync(e.target.checked);
                  if (e.target.checked) setAbbr(roleName);
                }}
              />
            }
            label="Same as role name"
          />
        </Grid>
      </Grid>

      <Grid item ml={2}>
        <TextField
          fullWidth
          select
          disabled={fetching}
          label="Role Type"
          value={roleTypeCategory}
          onChange={e =>
            setRoleTypeCategory(e.target.value as HospitalRoleCategory)
          }
        >
          {Object.values(HospitalRoleCategory).map(category => (
            <MenuItem key={category} value={category}>
              {_.startCase(category.toLowerCase())}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid
        item
        ml={2}
        mt={2}
        container
        justifyContent="flex-end"
        alignItems="end"
      >
        <Grid item>
          <Button variant="contained" onClick={handleSave}>
            Save role attribute
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RolesAndPermissionsAttribute;
