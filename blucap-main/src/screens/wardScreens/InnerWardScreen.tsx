import { mdiDotsHorizontal } from '@mdi/js';
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  darken,
} from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetWardsForHospitalQuery } from 'src/generated/graphql';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';

const styles = createSX({
  profileChip: {
    transition: theme =>
      theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeOut,
      }),
    color: 'inherit',
    textDecoration: 'inherit',
    paddingBottom: 2,
    backgroundColor: '#fff0',
    '&:hover': {
      backgroundColor: theme => darken(theme.palette.grey[100], 0.01),
    },
  },
  allWardLink: {
    color: 'gray',
    textDecoration: 'inherit',
  },
  danger: {
    color: 'red',
  },
});

const InnerWardScreen: FC = () => {
  const { params } = useRouteMatch<{ id: string }>();

  const { ward } = useGetWardsForHospitalQuery(
    {
      id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: res => ({
        ward: res.data?.hospital?.wards?.find(ward => ward?._id === params.id),
      }),
    },
  );

  const [pageAction, setPageAction] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  const employees = useMemo(
    () => [
      {
        role: 'Ward Secretary',
        people: [{ name: 'Chandranath Balaguruswami', designation: '' }],
      },
      {
        role: 'Resident doctor in charge',
        people: [
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
        ],
      },
      {
        role: 'Nurse in charge',
        people: [
          { name: 'Nurse Firstname Lastname', designation: 'Senior Nurse' },
        ],
      },
      {
        role: 'Doctors on duty',
        people: [
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
          {
            name: 'Dr. Ashok Vajpai',
            designation: 'Senior Consultant',
          },
        ],
      },
      {
        role: 'Nurse on duty',
        people: [
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
          {
            name: 'Dr. Chandranath Balaguruswami',
            designation: 'Senior Consultant',
          },
        ],
      },
    ],
    [],
  );

  return (
    <Grid container direction="row" width="100%">
      <Grid container item direction="column" margin={2} xs={10} spacing={4}>
        <Grid
          container
          item
          direction="row"
          width="100%"
          marginLeft={2}
          spacing={1}
          paddingLeft={4}
        >
          <Grid item component={Link} to="/wards" sx={styles.allWardLink}>
            <Typography variant="h4">All wards &gt; </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{ward?.name}</Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <IconButton onClick={e => setPageAction(e.currentTarget)}>
              <IconOf>{mdiDotsHorizontal}</IconOf>
            </IconButton>
          </Grid>
        </Grid>
        <Menu
          id="add-new-ward-menu"
          anchorEl={pageAction}
          open={!!pageAction}
          onClose={() => setPageAction(null)}
          MenuListProps={{
            'aria-labelledby': 'add-new-ward-button',
          }}
        >
          <MenuItem onClick={() => setPageAction(null)}>
            Manage roster for ward
          </MenuItem>
          <MenuItem onClick={() => setPageAction(null)} sx={styles.danger}>
            Delete ward
          </MenuItem>
        </Menu>

        <Grid container direction="column" margin={4} paddingLeft={3}>
          {employees.map(({ people, role }) => (
            <Grid item container direction="column" key={role}>
              <Grid item>
                <Typography variant="h5">{role}</Typography>
              </Grid>
              <Grid item container direction="row" flexWrap="wrap">
                {people.map((person, index) => (
                  <Grid
                    item
                    container
                    key={index}
                    direction="row"
                    xs={3}
                    p="8px"
                    alignItems="center"
                    component={Link}
                    sx={styles.profileChip}
                    to="/profile/me"
                  >
                    <Grid item xs={2}>
                      <Avatar />
                    </Grid>
                    <Grid item container direction="column" xs>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize={18}>
                          {person.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2" fontSize={18}>
                          {person.designation}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InnerWardScreen;
