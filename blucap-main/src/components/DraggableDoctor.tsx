import React from 'react';
import { ListItem, Grid } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { Person } from '@mui/icons-material';
import * as _ from 'lodash';
import SelectComponent from './SelectComponent';
import { IconButtonComponent } from './IconButtonComponent';
import { TypographyComponents } from './TypographyComponents';
import { EmployeeRoleType, IDoctor } from '../Interface/Interface';
import { createSX } from '../utils/createStyles';

const styles = createSX({
  column: {
    alignItems: 'flex-start',
  },
  desination: {
    marginLeft: 5,
    fontWeight: '600',
  },
  text: {
    fontWeight: '600',
  },
  checkContainer: {
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inCharge: {
    fontSize: 12,
  },
});

const DraggableDoctor: React.FC<IDoctor> = ({
  user,
  roles,
  index,
  id,
  allocation,
  isCancelled,
}) => {
  const employeeDetails = user ?? allocation;
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Grid
            item
            xs={12}
            container
            border={`1px solid ${!isCancelled ? '#2393B8' : '#f93030'}`}
            borderRadius="10px"
            sx={{ backgroundColor: 'white' }}
            paddingX={1}
            pb={1}
          >
            <Grid container item xs={8} sx={styles.column}>
              <Grid item>
                {employeeDetails?.fullName && (
                  <Grid container item alignItems="center">
                    <IconButtonComponent
                      IconName={Person}
                      size={'medium'}
                      fontSize={'inherit'}
                      label={'person'}
                      color={`${!isCancelled ? '#2393B8' : '#f93030'}`}
                    />
                    <TypographyComponents
                      component="span"
                      wrap={false}
                      title={employeeDetails.fullName ?? ''}
                      sx={styles.text}
                      color={`${!isCancelled ? '#3A7C92' : '#f93030'}`}
                    />
                  </Grid>
                )}
                {roles &&
                  roles.map((role: EmployeeRoleType) => (
                    <TypographyComponents
                      key={role._id}
                      component="p"
                      wrap={false}
                      title={role.hospitalRole?.hospitalRoleType?.title ?? ''}
                      sx={styles.desination}
                      color={`${!isCancelled ? '' : '#f93030'}`}
                    />
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={4} className="noneBorder" sx={styles.column}>
              <SelectComponent
                options={_.get(employeeDetails, 'profile.educations', [])}
                label="Skills"
                id="demo-select-small"
                labelKey="degree"
                isLabel={true}
                getValue={''}
              />
            </Grid>
          </Grid>
        </ListItem>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableDoctor);
