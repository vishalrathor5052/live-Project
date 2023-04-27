import { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { createSX } from 'src/utils/createStyles';
import { LoaderProps } from 'src/Interface/Interface';

const styles = createSX({
  loaderContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Loader: FC<LoaderProps> = ({ paddingTop }) => {
  return (
    <Box
      sx={{
        ...styles.loaderContainer,
        ...{ paddingTop: paddingTop ? paddingTop : '120px' },
      }}
    >
      <CircularProgress color="primary" size={65} thickness={5} />
    </Box>
  );
};
