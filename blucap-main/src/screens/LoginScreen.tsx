import {
  Grid,
  Box,
  Typography,
  Link,
  AppBar,
  Toolbar,
  useTheme,
  Fab,
  CircularProgress,
} from '@mui/material';
import { FC } from 'react';
import QRCode from 'qrcode.react';

import blucapLogo from '/assets/blucap-rx-logo-no-bg.png';
import logoNew from '/assets/circular.ico';

import { createSX } from 'src/utils/createStyles';
import { useGenerateQrCodeQuery } from 'src/generated/graphql';

const styles = createSX({
  appbar: {
    background: theme =>
      `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
  },
  qrCode: {
    color: theme => theme.palette.getContrastText(theme.palette.primary.dark),
    backgroundColor: theme => theme.palette.primary.dark,
  },
  inactiveBox: {
    display: 'flex',
    backgroundColor: theme => theme.palette.grey[100],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circularProgress: {
    color: theme => theme.palette.primary.dark,
    position: 'absolute',
    zIndex: 1,
  },
  textBlucap: {
    color: theme => theme.palette.primary.dark,
  },
  textRx: {
    color: theme => theme.palette.secondary.main,
  },
});

const LoginScreen: FC = () => {
  const theme = useTheme();

  const { data: qrCodeData } = useGenerateQrCodeQuery();

  return (
    <Grid container direction="column" height="100vh">
      <AppBar position="static" sx={styles.appbar}>
        <Toolbar
          component={Grid}
          container
          spacing={1}
          alignItems="center"
          direction="row"
        >
          <Grid item marginTop={'10px'}>
            <Box component="img" src={blucapLogo} height={100} width={100} />
          </Grid>
          <Grid>
            <Typography
              height="100%"
              width="100%"
              component={Link}
              href="https://blucap.health/"
              underline="none"
              variant="h4"
              textAlign="right"
              color="white"
              fontWeight="bold"
              fontFamily="League Spartan"
            >
              BluCap.health
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        flex={1}
        container
        width="100vw"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item justifyContent="center">
          <Grid item>
            {qrCodeData?.getQrCodeForLogin ? (
              <QRCode
                renderAs="svg"
                value={qrCodeData?.getQrCodeForLogin ?? ''}
                size={300}
                fgColor={styles.qrCode.backgroundColor(theme)}
                bgColor={styles.qrCode.color(theme)}
                imageSettings={{
                  src: logoNew,
                  height: 90,
                  width: 90,
                  excavate: false,
                }}
              />
            ) : (
              <Box height={300} width={300} sx={styles.inactiveBox}>
                <Fab aria-label="save" color="primary">
                  <Box component="img" src={logoNew} height={90} width={90} />
                </Fab>
                <CircularProgress size={80} sx={styles.circularProgress} />
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            fontFamily="Lato"
            fontSize={23}
            fontWeight={600}
          >
            Login to{' '}
            <Box component="span" sx={styles.textBlucap}>
              BluCap
            </Box>
            <Box component="span" sx={styles.textRx}>
              Rx
            </Box>{' '}
            using QR code
          </Typography>
          <Grid item>
            <Grid container direction="column" component="div">
              {[
                'Open blucapRx app',
                'Make sure you are logged into the app',
                'Tap on the options icon on the top right',
                'Select "Login to blucapRx web"',
              ].map((text, i) => (
                <Grid item component="li" key={i}>
                  <Typography variant="caption" fontFamily="Lato" fontSize={20}>
                    {text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
