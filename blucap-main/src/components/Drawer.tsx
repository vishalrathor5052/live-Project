import { FC, useEffect, useState, memo } from 'react';
import {
  Box,
  Drawer as MuiDrawer,
  styled,
  Theme,
  CSSObject,
  Avatar,
} from '@mui/material';

import { useDispatch } from 'src/store';
import { updateHospitalDetails } from 'src/store/actions/hospital';
import { createSX } from 'src/utils/createStyles';
import { useGetHospitalByIdQuery } from 'src/generated/graphql';

import Header from 'src/components/Header';
import SideBarComponent from './SideBar';

export const drawerWidth = '6%';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const styles = createSX({
  drawer: {
    width: [0, drawerWidth],
    flexShrink: 0,
  },
  background: {
    background: theme =>
      `linear-gradient(0deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    flex: 1,
  },
  text: {
    color: '#FFF',
    fontSize: 25,
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  helper: {
    color: theme => theme.palette.grey[300],
    fontSize: 16,
  },
  name: {
    marginLeft: '12px',
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '1px',
    flex: 1,
  },
  drawerHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  childerenMainContainer: {
    width: '100%',
    position: 'absolute',
    top: '10%',
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const ContainerBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
  overflowX: 'hidden',
  position: 'relative',
  height: '100vh',
  width: '94%',
  marginLeft: '6%',
  '&.open': {
    transition: theme.transitions.create(['left', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: '94%',
    // left: `calc(${theme.spacing(4)} + ${drawerWidth}px)`,
    // width: `calc(100vw - ${theme.spacing(4)} - ${drawerWidth}px)`,
  },
  '&.close': {
    transition: theme.transitions.create(['left', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //   left: `calc(${theme.spacing(10)} + 1px)`,
    //   width: `calc(100vw - ${theme.spacing(10)} - 1px)`,
  },
}));

const ResponsiveDrawer: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { data: queryResult } = useGetHospitalByIdQuery({
    id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
  });
  const hospitalData = queryResult ? queryResult.hospital : undefined;
  const [drawerOpen] = useState(true);

  const hospitalImage = 'assets/logo_no_bg.png';

  useEffect(() => {
    dispatch(updateHospitalDetails(hospitalData));
  }, [hospitalData, dispatch]);

  return (
    <>
      <Drawer variant="permanent" open={drawerOpen}>
        <Box sx={styles.background}>
          <DrawerHeader
            sx={styles.drawerHeader}
            // onClick={() => setDrawerOpen(drawer => !drawer)}
          >
            <Avatar src={hospitalImage} />
          </DrawerHeader>
          <SideBarComponent textStyle={styles.text} />
        </Box>
      </Drawer>
      <ContainerBox className={drawerOpen ? 'open' : 'close'}>
        <Box display="flex" height="100%">
          <Header />
          <Box sx={styles.childerenMainContainer}>{children}</Box>
        </Box>
      </ContainerBox>
    </>
  );
};

export default memo(ResponsiveDrawer);
