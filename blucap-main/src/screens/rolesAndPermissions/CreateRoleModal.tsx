import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { FC, useCallback, useState } from 'react';
import { HospitalRoleCategory } from 'src/generated/graphql';

const CreateRoleModal: FC<{
  onClose: () => void;
  onProceed: (value: {
    roleName: string;
    abbr: string;
    roleType: HospitalRoleCategory;
  }) => void;
}> = ({ onProceed }) => {
  const [roleName, setRoleName] = useState('');
  const [abbr, setAbbr] = useState('');
  const [roleType, setRoleType] = useState<HospitalRoleCategory>(
    HospitalRoleCategory.Medical,
  );
  const [roleNameSync, setRoleNameSync] = useState(false);

  const handleRoleCreation = useCallback(() => {
    onProceed({
      roleName,
      abbr,
      roleType,
    });
  }, [abbr, onProceed, roleName, roleType]);

  return (
    <Grid
      container
      direction="column"
      component={Card}
      width="max(30%, 300px)"
      // paddingX={3}
      // spacing={2}
      paddingLeft={0}
    >
      <Grid container direction="column" padding={2} spacing={2}>
        <Grid item>
          <Typography variant="h5">Create new hospital role</Typography>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Role name"
            value={roleName}
            onChange={e => {
              setRoleName(e.target.value);
              if (roleNameSync) setAbbr(e.target.value);
            }}
          />
        </Grid>

        <Grid item container direction="column" spacing={0}>
          <Grid item>
            <TextField
              fullWidth
              disabled={roleNameSync}
              label="Abbreviation"
              onChange={e => setAbbr(e.target.value)}
              value={abbr}
            />
          </Grid>
          <Grid item ml={2}>
            <FormControlLabel
              value={roleNameSync}
              control={
                <Checkbox
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

        <Grid item>
          <TextField
            fullWidth
            select
            label="Role Type"
            value={roleType}
            onChange={e => setRoleType(e.target.value as HospitalRoleCategory)}
          >
            {Object.values(HospitalRoleCategory).map(category => (
              <MenuItem key={category} value={category}>
                {_.startCase(category.toLowerCase())}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid item>
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: 0 }}
          onClick={handleRoleCreation}
        >
          Create role
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoleModal;
