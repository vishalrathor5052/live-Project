/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Checkbox, Chip, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { IconButtonComponent } from 'src/components/IconButtonComponent';
import { TypographyComponents } from 'src/components/TypographyComponents';
import { Maybe, RoleRequirement } from 'src/generated/graphql';
import { LeftAddRosterComponentProps } from 'src/Interface/Interface';
import Image from 'src/shared/Image';
import { General } from 'src/shared/Shared';

const LeftAddRosterSection: FC<LeftAddRosterComponentProps> = ({
  shiftTemplate,
  classes,
  allocationList,
}) => {
  const { minimumStrength, requiredRoles } =
    shiftTemplate[0].shiftTemplate.requirements ?? {};

  /**
   * todo: will convert the start date in 'dddd, MMMM DD, YYYY' format
   */
  const startDate = dayjs(shiftTemplate[0].startDate)
    .clone()
    .format('dddd, MMMM DD, YYYY');

  return (
    <Grid container item xs={5} sx={{ pr: 1 }}>
      <Grid
        item
        xs={12}
        borderBottom="1px solid #D0EEF2"
        container
        sx={{ pb: 1 }}
      >
        <Grid item xs={9}>
          <Grid>
            <TypographyComponents variant={'h3'} title={`${startDate}`} />
          </Grid>
          <Grid sx={{ mt: 2 }}>
            <TypographyComponents
              variant={'p'}
              title={`${shiftTemplate[1]?.shiftType} Shift (${shiftTemplate[1]?.startTime} - ${shiftTemplate[1]?.endTime})`}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid>
            <TypographyComponents variant={'p'} title={General.shiftRequire} />
          </Grid>
          <Grid>
            <TypographyComponents
              variant={'p'}
              title={` ${minimumStrength} active`}
            />
          </Grid>
          <Grid>
            <TypographyComponents
              variant={'p'}
              sx={
                allocationList.length < minimumStrength
                  ? classes.colorRed
                  : classes.colorGreen
              }
              title={
                allocationList.length < minimumStrength
                  ? `${minimumStrength - allocationList.length} Unmet`
                  : 'All requirements met'
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid height={'65%'}>
        <Grid item xs={12} sx={{ pt: 3 }} container alignItems={'center'}>
          <Grid item xs={7} container alignItems="center">
            <Grid>
              <Checkbox defaultChecked />
            </Grid>
            <Grid>
              <TypographyComponents
                variant={'p'}
                color={
                  allocationList.length < minimumStrength ? 'red' : 'black'
                }
                title={General.minDoctor}
              />
            </Grid>
          </Grid>
          <Grid item xs={2} className="strengthInput">
            <TextField
              variant="outlined"
              placeholder=""
              type="number"
              size="small"
              defaultValue={minimumStrength}
            />
          </Grid>
        </Grid>
        {requiredRoles && requiredRoles?.length > 0 && (
          <Grid item xs={12} container>
            <Grid container>
              <Grid item xs={7} container alignItems="center">
                <Grid>
                  <Checkbox defaultChecked />
                </Grid>
                <Grid>
                  <TypographyComponents
                    variant={'p'}
                    title={General.minRoleRequire}
                  />
                </Grid>
              </Grid>
            </Grid>

            {requiredRoles.map(
              (item: Maybe<RoleRequirement>, index: number) => {
                return (
                  <Grid container sx={{ mb: 1.5 }} key={index.toString()}>
                    <Grid item xs={7} container sx={{ pl: 4.5 }}>
                      <Grid item>
                        <IconButtonComponent
                          imgSrc={Image.CrossBox}
                          size={'small'}
                          customStyle={{ height: '16px', width: '16px' }}
                          fontSize={'inherit'}
                          label={'cross'}
                        />
                      </Grid>
                      <Grid item>
                        <Chip
                          label={
                            item?.hospitalRoleType?.hospitalRoleType?.title
                          }
                          color={
                            allocationList?.length < minimumStrength
                              ? 'error'
                              : 'primary'
                          }
                          size="small"
                          sx={{
                            backgroundColor:
                              allocationList?.length < minimumStrength
                                ? '#ffffff'
                                : '#D0EEF2',
                            border:
                              allocationList?.length < minimumStrength
                                ? '1px solid red'
                                : '1px solid #3a7c92',
                            color:
                              allocationList?.length < minimumStrength
                                ? 'red'
                                : '#3a7c92',
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={1} className="inputContainer">
                      <TextField
                        variant="outlined"
                        placeholder=""
                        type="number"
                        size="small"
                        disabled
                        value={item?.minimumAssignments}
                      />
                    </Grid>
                  </Grid>
                );
              },
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(LeftAddRosterSection);
