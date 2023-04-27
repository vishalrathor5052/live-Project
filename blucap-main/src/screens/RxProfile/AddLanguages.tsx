import {
  Grid,
  TextField,
  Typography,
  darken,
  Autocomplete,
  Button,
} from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import api from 'src/store/query';
import { createSX } from 'src/utils/createStyles';

const style = createSX({
  card: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: theme => theme.palette.background.paper,
  },
  languageLabel: {
    paddingY: 3,
    paddingX: 5,
    height: '100%',
    width: '100%',
  },
  languageListItem: {
    transition: theme =>
      theme.transitions.create('background-color', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp,
      }),
    backgroundColor: '#fff0',
    '&:hover': {
      backgroundColor: theme => darken(theme.palette.grey[100], 0.1),
    },
  },
});

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const AddLanguageModal: FC<{
  languagesKnown: string[];
  onClose: () => void;
  userId: string;
}> = ({ languagesKnown, onClose: close, userId }) => {
  const { languages } = api.useGetAllLanguagesQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        languages: data?.languages ?? [],
      }),
    },
  );
  const [language, setLanguage] = useState(() => languagesKnown);
  const [updating, setUpdating] = useState(false);
  const [update] = api.useUpdateLanguageMutation({
    selectFromResult: ({ isSuccess }) => ({
      isSuccess,
    }),
  });

  const onSubmit = useCallback(async () => {
    try {
      setUpdating(true);
      await update({
        languages: language,
        userId,
      }).unwrap();
      close();
    } finally {
      setUpdating(false);
    }
  }, [close, language, update, userId]);

  const autoCompleteLanguageValue = useMemo(
    () =>
      language
        .map(langId => languages?.find(lang => lang && langId === lang?._id))
        .filter(notEmpty),
    [language, languages],
  );

  return (
    <Grid sx={style.card}>
      <Grid container direction="column" spacing={2} sx={style.languageLabel}>
        <Grid item>
          <Typography variant="h5">Select languages</Typography>
        </Grid>
        <Grid item width="100%">
          <Autocomplete
            disabled={updating}
            itemID="_id"
            multiple
            value={autoCompleteLanguageValue}
            disablePortal
            id="language-box"
            options={languages}
            getOptionLabel={params => params.value}
            renderInput={params => <TextField {...params} label="Languages" />}
            onChange={(_, value) => setLanguage(value.map(v => v?._id))}
          />
        </Grid>
        <Grid item height={2} />
        <Button disabled={updating} onClick={() => onSubmit()}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddLanguageModal;
