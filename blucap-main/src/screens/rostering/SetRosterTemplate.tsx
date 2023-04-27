/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Button, Grid, FormControl, RadioGroup, Modal } from '@mui/material';
import { FC, memo, useState, useEffect } from 'react';
import { TypographyComponents } from 'src/components/TypographyComponents';
import { useHistory } from 'react-router-dom';
import { createSX } from 'src/utils/createStyles';
import { ButtonLabels, SetRoster } from 'src/shared/Shared';
import RadioComponent from 'src/components/RadioComponent';
import { Loader } from 'src/components/Loader';
import { useSelector } from 'react-redux';
import CreateTemplate from './CreateTemplate';
import SelectComponent from '../../components/SelectComponent';

const styles = createSX({
  Previous: {
    pb: 2,
    pl: 1.5,
    pt: 0.5,
    border: 1,
    borderColor: '#3A7C92',
  },
});

const SetRosterTemplate: FC = () => {
  const history = useHistory();
  const [rosterTemplate, setValue] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const { isLoading, wardEmployee } = useSelector(
    (state: any) => state?.header,
  );

  /**
   *
   * @param event getting the HTML element on change input field
   * Have to verify user selecttion for create new template
   * for create new template, the value will be 1
   * for already use roster, the value will be 0
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+(event.target as HTMLInputElement).value);
  };

  /**
   * verify the ward selected employee type
   * if ward employee is employee, then redirect to rostering
   */
  useEffect(() => {
    wardEmployee === 'Employee' && history.push('/rostering');
  }, [wardEmployee, history]);

  /**
   * if user would select the create new template, than
   * model would be appeared, otherwise redirect to rostering page
   */
  const handleNewTemplate = () => {
    rosterTemplate === 1 ? setOpen(true) : history.push('/rostering');
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <TypographyComponents
            variant={'h3'}
            wrap={false}
            component={'div'}
            title={SetRoster.setRosterTemp}
          />
          <hr />
          <Grid sx={{ mt: 2 }} container spacing={2}>
            <Grid item xs={5}>
              <FormControl>
                <RadioGroup
                  value={rosterTemplate}
                  name="radio-buttons-group"
                  aria-labelledby="radio-buttons-group-label"
                  onChange={handleChange}
                >
                  {/* <RadioComponent
                    stylesSheet={styles.Previous}
                    value={0}
                    label={SetRoster.usPrev}
                  /> */}

                  <RadioComponent
                    stylesSheet={{
                      ...styles.Previous,
                      mt: 2.5,
                    }}
                    value={1}
                    label={SetRoster.createNewTemp}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {rosterTemplate === 0 && (
              <Grid item xs={5}>
                <SelectComponent label="13-19 December" options={[]} />
              </Grid>
            )}
          </Grid>

          <Button
            sx={{ mt: 2.5 }}
            variant="contained"
            onClick={handleNewTemplate}
          >
            {ButtonLabels.seeNewTemp}
          </Button>

          {/* -------------modal for create templete---------- */}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateTemplate onClose={() => setOpen(false)} />
          </Modal>
        </>
      )}
    </>
  );
};

export default memo(SetRosterTemplate);
