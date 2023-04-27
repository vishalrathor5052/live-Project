import { FC, useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ScopedCssBaseline,
  ThemeProvider,
  Theme,
  useMediaQuery,
  Divider,
  Modal,
  DialogContent,
} from '@mui/material';
import {
  mdiCircleSmall,
  mdiCheckDecagramOutline,
  mdiChevronDown,
  mdiEmail,
  mdiPhone,
  mdiPlus,
  mdiDotsHorizontal,
  mdiClose,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import dayjs from 'dayjs';
import _ from 'lodash';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import IconOf from 'src/utils/IconOf';
import { createSX } from 'src/utils/createStyles';
import api from 'src/store/query';
import {
  diffInYearMonth,
  parseMonthYearDay,
} from 'src/utils/parseMonthYearDay';
import { useTheme } from '@mui/system';
import AddLanguageModal from './AddLanguages';

dayjs.extend(customParseFormat);

const ContentHolder = styled(Grid)(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const styles = createSX({
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
  verified: {
    color: 'primary.main',
    pt: '10px',
    fontSize: 30,
  },
  listIcon: {
    minWidth: 0,
  },
  bg: {
    backgroundColor: '#f6f6f6',
  },
  card: {
    backgroundColor: theme => theme.palette.background.paper,
    boxShadow: 2,
  },
  danger: {
    color: 'error.main',
  },
  expandChevron: {
    color: theme => theme.palette.grey[100],
  },
  avatarSize: {
    width: 150,
    height: 150,
  },
  fullWidth: {
    width: '100%',
  },
});

const hospitalIcon =
  'https://media.istockphoto.com/vectors/caduceus-design-vector' +
  '-id1181534622?k=20&m=1181534622&s=612x612&w=0&h=iV7IuM8JpdMJ' +
  'Taj_i85SNwTbE3vvkm2N8ZOAI-daREk=';

const RxProfile: FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const theme = useTheme();
  const smallWidth = useMediaQuery(theme.breakpoints.up('md'));

  const { currentUserId } = api.useGetCurrentUserQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        currentUserId: data?.user?._id,
      }),
    },
  );

  const { profileUser } = api.useGetUserProfileQuery(
    { userId: match?.params?.id ?? '' },
    {
      skip: !match?.params?.id,
      selectFromResult: ({ data }) => ({
        profileUser: data?.user,
      }),
    },
  );

  const canEdit = currentUserId === match?.params?.id;

  const [menuAnchor, setMenuAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [workAnchor, setWorkAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [eduAnchor, setEduAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [languageAnchor, setLanguageAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  const logout = () => {
    setMenuAnchor(null);
  };

  const workExperience = useMemo(() => {
    const affiliated = profileUser?.rxProfile?.workExperience.affiliated ?? [];
    const unaffiliated =
      profileUser?.rxProfile?.workExperience.unaffiliated ?? [];

    const affiliatedWorkExp = Object.values(
      _.groupBy(affiliated, exp => exp.hospital._id),
    ).map(affWorkExp => ({
      _id: affWorkExp[0].hospital._id,
      hospital: affWorkExp[0].hospital.name,
      startDate: _.minBy(
        affWorkExp.map(exp => parseMonthYearDay(exp.role.from)),
        date => date.unix(),
      ),
      toDate: (dates => dates.includes(undefined) || dates.includes(null))(
        affWorkExp.map(exp => exp.role.to),
      )
        ? null
        : _.maxBy(
            affWorkExp.map(exp => parseMonthYearDay(exp.role.to)),
            date => date.unix(),
          ),
      roles: affWorkExp.map(exp => ({
        ...exp.role,
        from: exp.role.from ? parseMonthYearDay(exp.role.from) : null,
        to: exp.role.to ? parseMonthYearDay(exp.role.from) : null,
        employmentType: exp.role.employmentType.type,
        verified: exp.verificationStatus === 'APPROVED',
        __typename: exp.role.__typename as string | undefined,
      })),
    }));

    const unaffiliatedWorkExp = Object.values(
      _.groupBy(unaffiliated, exp => exp.hospital),
    ).map(unaffWorkExp => ({
      _id: unaffWorkExp[0].hospital,
      hospital: unaffWorkExp[0].hospital,
      startDate: _.minBy(
        unaffWorkExp.map(exp => parseMonthYearDay(exp.role.from)),
        date => date.unix(),
      ),
      toDate: (dates => dates.includes(undefined) || dates.includes(null))(
        unaffWorkExp.map(exp => exp.role.to),
      )
        ? null
        : _.maxBy(
            unaffWorkExp.map(exp => parseMonthYearDay(exp.role.to)),
            date => date.unix(),
          ),
      roles: unaffWorkExp.map(exp => ({
        ...exp.role,
        employmentType: exp.role.employmentType,
        from: parseMonthYearDay(exp.role.from),
        to: parseMonthYearDay(exp.role.from),
        verified: false,
        __typename: exp.role.__typename as string | undefined,
      })),
    }));

    return affiliatedWorkExp
      .concat(unaffiliatedWorkExp)
      .sort(
        (wExpA, wExpB) =>
          (wExpB.startDate?.unix() ?? 0) - (wExpA.startDate?.unix() ?? 0),
      );
  }, [profileUser]);

  return (
    <ThemeProvider
      theme={(theme: Theme) => ({
        ...theme,
        palette: {
          ...theme.palette,
          background: { ...theme.palette.background, default: '#f6f6f6' },
        },
      })}
    >
      <ScopedCssBaseline>
        <Grid
          container
          display="flex"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <AppBar position="fixed">
            <Toolbar>
              <Grid container justifyContent="space-between">
                <Grid item component={Link} to="/" sx={styles.link}>
                  <Typography variant="h6" noWrap>
                    BluCap Rx
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container item alignItems="center" spacing={1}>
                    <Grid item>
                      {profileUser?.picture ? (
                        <Avatar src={profileUser?.picture} />
                      ) : (
                        <Avatar />
                      )}
                    </Grid>
                    <Grid item>
                      <Typography>
                        {profileUser?.fullName ?? 'Doctor'}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={e => setMenuAnchor(e.currentTarget)}
                        sx={styles.expandChevron}
                      >
                        <IconOf>{mdiChevronDown}</IconOf>
                      </IconButton>
                    </Grid>
                    <Menu
                      id="logout-menu"
                      anchorEl={menuAnchor}
                      open={!!menuAnchor}
                      onClose={() => setMenuAnchor(null)}
                    >
                      <MenuItem onClick={logout} sx={styles.danger}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <ContentHolder
            item
            container
            direction="column"
            spacing={5}
            mt={10}
            alignItems="center"
            width={smallWidth ? '70%' : '100%'}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction={smallWidth ? 'row' : 'column'}
                spacing={2}
                alignItems="center"
                padding={0}
                sx={styles.card}
                pl={4}
                pb={4}
              >
                <Grid item>
                  {profileUser?.picture ? (
                    <Avatar src={profileUser?.picture} sx={styles.avatarSize} />
                  ) : (
                    <Avatar />
                  )}
                </Grid>
                <Grid xs item container direction="column">
                  <Grid item>
                    <Typography variant="h5">
                      {profileUser?.fullName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem eos fugiat rem! Tempora nostrum veritatis
                      fugiat quibusdam mollitia culpa quis quia. Corrupti,
                      libero accusamus nobis tempore iste optio nostrum
                      explicabo?
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4} container direction="column">
                  {profileUser?.phoneNumber ? (
                    <Grid item container alignItems="center" spacing={1}>
                      <Grid item mt="4px">
                        <IconOf>{mdiPhone}</IconOf>
                      </Grid>
                      <Grid item>
                        <Typography textAlign="center">
                          {profileUser.phoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null}
                  {profileUser?.email ? (
                    <Grid item container alignItems="center" spacing={1}>
                      <Grid item mt="4px">
                        <IconOf>{mdiEmail}</IconOf>
                      </Grid>
                      <Grid item>
                        <Typography textAlign="center">
                          {profileUser.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>

            <Grid item width="100%">
              <Grid
                container
                sx={styles.card}
                direction="column"
                spacing={2}
                pb={4}
                pl={4}
              >
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  pr={6}
                >
                  <Grid item>
                    <Typography variant="h4">Work Experience</Typography>
                  </Grid>
                  {canEdit ? (
                    <Grid item>
                      <IconButton>
                        <IconOf>{mdiPlus}</IconOf>
                      </IconButton>
                    </Grid>
                  ) : null}
                </Grid>
                {workExperience.map(workExp => (
                  <Grid
                    item
                    container
                    direction="row"
                    key={workExp._id}
                    spacing={4}
                    alignItems="center"
                    pr={6}
                  >
                    <Grid item>
                      <Avatar src={hospitalIcon} />
                    </Grid>
                    <Grid item container direction="column" xs>
                      <Grid item>
                        <Typography variant="h5">{workExp.hospital}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {diffInYearMonth(
                            workExp.toDate ? dayjs(workExp.toDate) : dayjs(),
                            dayjs(workExp.startDate),
                            (year, month) => `${year} years, ${month} months`,
                          )}
                        </Typography>
                      </Grid>
                      <List component="ul" disablePadding>
                        {workExp.roles.map((role, i, curr) => (
                          <>
                            <ListItem
                              key={
                                role.title + role.to?.unix() + role.department
                              }
                              disablePadding
                            >
                              <ListItemIcon sx={styles.listIcon}>
                                <IconOf>{mdiCircleSmall}</IconOf>
                              </ListItemIcon>
                              <Grid item>
                                <Grid container direction="column">
                                  <Grid
                                    item
                                    container
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Typography variant="h6">
                                        {role.title}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      {!role.verified ? (
                                        <IconOf sx={styles.verified}>
                                          {mdiCheckDecagramOutline}
                                        </IconOf>
                                      ) : null}
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Typography>
                                      {role.from
                                        ? `${role.from?.format(
                                            'MMM, YYYY',
                                          )} - ${
                                            role.to
                                              ? role.to?.format('MMM, YYYY')
                                              : 'Present'
                                          } ${
                                            role.from
                                              ? '(' +
                                                diffInYearMonth(
                                                  workExp.toDate
                                                    ? dayjs(role.to)
                                                    : dayjs(),
                                                  dayjs(role.from),
                                                  (year, month) =>
                                                    `${year} years, ${month} months`,
                                                ) +
                                                ')'
                                              : ''
                                          }`
                                        : null}{' '}
                                      {role.to && role.from
                                        ? `(${role.to.diff(
                                            role.from,
                                            'y',
                                          )} year(s), ${
                                            role.to.diff(role.from, 'm') % 12
                                          } month(s))`
                                        : ''}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </ListItem>{' '}
                            {i !== curr.length - 1 ? (
                              <Grid item width="100%" pr={8}>
                                <Divider sx={styles.fullWidth} />
                              </Grid>
                            ) : null}
                          </>
                        ))}
                      </List>
                    </Grid>
                    <Grid item alignSelf="flex-start">
                      <IconButton onClick={e => setWorkAnchor(e.currentTarget)}>
                        <IconOf>{mdiDotsHorizontal}</IconOf>
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Menu
                id="workExpMenu"
                anchorEl={workAnchor}
                open={!!workAnchor}
                onClose={() => {
                  setWorkAnchor(null);
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem
                  onClick={() => {
                    setWorkAnchor(null);
                  }}
                >
                  Edit work experience details
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setWorkAnchor(null);
                  }}
                  sx={styles.danger}
                >
                  Remove experience
                </MenuItem>
              </Menu>
            </Grid>

            <Grid item width="100%">
              <Grid
                container
                direction="column"
                sx={styles.card}
                spacing={2}
                pb={4}
                pl={6}
                pt={2}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  pr={6}
                >
                  <Grid item>
                    <Typography variant="h4">Education</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <IconOf>{mdiPlus}</IconOf>
                    </IconButton>
                  </Grid>
                </Grid>
                {profileUser?.profile.educations.map((education, i, curr) => (
                  <>
                    <Grid
                      item
                      container
                      direction="row"
                      key={education.degree + education.institution}
                      spacing={4}
                      alignItems="center"
                      pr={6}
                    >
                      <Grid item>
                        <Avatar src={hospitalIcon} />
                      </Grid>
                      <Grid item container direction="column" xs>
                        <Grid item>
                          <Typography variant="h5">
                            {education.institution}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">
                            {education.degree}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                            {parseMonthYearDay(education.from).format(
                              'MMMM, YYYY',
                            )}{' '}
                            -{' '}
                            {education.to
                              ? parseMonthYearDay(education.to).format(
                                  'MMMM, YYYY',
                                )
                              : 'Currently present'}
                          </Typography>
                        </Grid>
                      </Grid>
                      {canEdit ? (
                        <Grid item>
                          <IconButton
                            onClick={e => setEduAnchor(e.currentTarget)}
                          >
                            <IconOf>{mdiDotsHorizontal}</IconOf>
                          </IconButton>
                        </Grid>
                      ) : null}
                    </Grid>
                    {i !== curr.length - 1 ? (
                      <Grid item width="100%" pr={8}>
                        <Divider sx={styles.fullWidth} />
                      </Grid>
                    ) : null}
                  </>
                ))}
                <Menu
                  id="eduMenu"
                  anchorEl={eduAnchor}
                  open={!!eduAnchor}
                  onClose={() => {
                    setEduAnchor(null);
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <MenuItem
                    onClick={() => {
                      setEduAnchor(null);
                    }}
                  >
                    Edit education
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setEduAnchor(null);
                    }}
                    sx={styles.danger}
                  >
                    Remove education
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>

            <Grid item width="100%">
              <Grid container sx={styles.card} spacing={2} pb={4} pl={4}>
                <Grid item>
                  <Typography variant="h4">Languages Known</Typography>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  mr={6}
                  alignItems="center"
                >
                  <Grid item container direction="row" xs={8} spacing={2}>
                    {profileUser?.profile?.languages.map(language => (
                      <Grid item key={language.label}>
                        <Chip label={language.value} />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item>
                    {canEdit ? (
                      <Grid item>
                        <IconButton
                          onClick={e => setLanguageAnchor(e.currentTarget)}
                        >
                          <IconOf>{mdiDotsHorizontal}</IconOf>
                        </IconButton>
                      </Grid>
                    ) : null}
                    <Menu
                      id="lang-menu"
                      anchorEl={languageAnchor}
                      open={!!languageAnchor}
                      onClose={() => setLanguageAnchor(null)}
                      transformOrigin={{
                        horizontal: 'right',
                        vertical: 'bottom',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setLanguageAnchor(null);
                          setModalOpen(true);
                        }}
                      >
                        Edit languages
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item width="100%">
              <Grid container sx={styles.card} spacing={2} pb={4} pl={4}>
                <Grid item>
                  <Typography variant="h4">Procedure Skills</Typography>
                </Grid>
                <Grid item container direction="column" spacing={2}>
                  {(
                    profileUser?.rxProfile?.skill?.canPerformProcedures ?? [
                      'Test Skill A',
                      'Test Skill B',
                    ]
                  ).map(procedures => (
                    <Grid item key={procedures} container direction="column">
                      <Grid container direction="row" alignItems="center">
                        {canEdit ? (
                          <Grid item>
                            <IconButton>
                              <IconOf>{mdiClose}</IconOf>
                            </IconButton>
                          </Grid>
                        ) : null}
                        <Grid item>
                          <Typography>{procedures}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Menu
              id="app-menu"
              anchorEl={menuAnchor}
              open={!!menuAnchor}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem onClick={logout} sx={styles.danger}>
                Logout
              </MenuItem>
            </Menu>
          </ContentHolder>
        </Grid>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          tabIndex={-1}
        >
          <DialogContent>
            <AddLanguageModal
              languagesKnown={
                profileUser?.profile?.languages?.map(lang => lang._id) ?? []
              }
              onClose={() => {
                setModalOpen(false);
              }}
              userId={currentUserId ?? ''}
            />
          </DialogContent>
        </Modal>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};

export default RxProfile;
