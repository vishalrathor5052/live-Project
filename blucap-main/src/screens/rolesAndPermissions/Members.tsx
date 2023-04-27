import { mdiMagnify } from '@mdi/js';
import { Button, Grid, TextField } from '@mui/material';
import { FC, useRef } from 'react';
import IconOf from 'src/utils/IconOf';
import AddMembers from './addMembers';

const RolesAndPermissionsMembers: FC = () => {
  const openModalRef = useRef<() => void>();

  return (
    <Grid container direction="column" ml={4} spacing={1}>
      <Grid item container direction="row" spacing={1} alignItems="center">
        <Grid item xs>
          <TextField
            fullWidth
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <IconOf sx={{ marginRight: 2 }}>{mdiMagnify}</IconOf>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => openModalRef?.current?.()}>
            Add members
          </Button>
        </Grid>
      </Grid>

      <Grid item></Grid>
      <AddMembers openModal={openModalRef} />
    </Grid>
  );
};

export default RolesAndPermissionsMembers;
