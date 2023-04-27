/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Grid,
  InputAdornment,
  OutlinedInput,
  Switch,
  InputLabel,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { General, Placeholders } from 'src/shared/Shared';
import {
  ColumnsType,
  DNDColumnIds,
  DragNDropProps,
} from 'src/Interface/Interface';
import { createSX } from 'src/utils/createStyles';
import { Search } from '@mui/icons-material';
import { api } from 'src/generated/graphql';
import DropColumn from './DropColumn';
import { TypographyComponents } from './TypographyComponents';
import { IconButtonComponent } from './IconButtonComponent';
import IMAGE from '../shared/Image';

const styles = createSX({
  title: {
    paddingX: 2,
  },
  switch: {
    display: 'flex',
    justifyContent: 'space-between',
    pl: 3,
  },
  switchLabel: {
    color: 'red',
  },
  searchInput: {
    height: '36px',
    borderRadius: '15px',
    borderColor: '#2393B8',
  },
  cancellation: {
    color: '#f93030',
    marginTop: '10px',
    pl: 2,
  },
  cancellationBoxContainer: {
    mb: 1,
    width: '100%',
  },
  noDataContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '40px',
    flexDirection: 'column',
  },
});

const DragNDrop: React.FC<DragNDropProps> = ({ onDragEnd, shiftIds }) => {
  const [search, setSearch] = useState<string>('');
  const [isShowCancel, setIsShowCancel] = useState<boolean>(false);

  const { employees = [] } = api.useGetEmployeesForShiftQuery(
    {
      shiftDetails: { shiftIds: [shiftIds[0]?._id] },
    },
    {
      selectFromResult: ({ data }) => ({
        employees: data?.employees,
      }),
    },
  );

  const [columns, setColumns] = useState<any>({});

  /**
   * todo: making the columns object
   * make sure we have the employee list the columns object for drag and drop the employee
   * We're using object for render the data (available, allocation and cancelduties)
   * DNDColumnsIds is enum for the key name
   * setting the already available data in the list
   */
  useEffect(() => {
    if (employees.length) {
      setColumns({
        [DNDColumnIds.available]: {
          id: DNDColumnIds.available,
          list: employees,
        },
        [DNDColumnIds.allocations]: {
          id: DNDColumnIds.allocations,
          list: shiftIds[0].duties ?? [],
        },
        [DNDColumnIds.cancelledDuties]: {
          id: DNDColumnIds.cancelledDuties,
          list: shiftIds[0].cancelledDuties ?? [],
        },
      });
    }
  }, [employees, setColumns, shiftIds]);

  /**
   *
   * @param param0 getting the source and destination object
   * @returns
   * storing the data on finish the drag N drop of employee
   * Disabled the drag the employe from the allocation and available to
   * cancelled duties
   * ?: onDragEnd funtion for the making update in the object on
   * ?: the parent component
   */
  const handleDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) {
      destination = {
        droppableId:
          source.droppableId === DNDColumnIds.available ||
          source.droppableId === DNDColumnIds.cancelledDuties
            ? DNDColumnIds.allocations
            : DNDColumnIds.available,
        index: 0,
      };
    }

    // Make sure we're actually moving the item
    if (
      (source.droppableId === destination.droppableId &&
        destination.index === source.index) ||
      destination.droppableId === DNDColumnIds.cancelledDuties
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same coc
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((idx: number) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state: ColumnsType) => ({
        ...state,
        [newCol.id]: newCol,
      }));
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (idx: number) => idx !== source.index,
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = [...end?.list] ?? [];

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: [...newEndList],
      };

      // Verify the same data
      const startColId =
        start.list[source.index]?.allocation?._id ??
        start.list[source.index]?.user?._id;
      const newFilterData = newStartCol.list.filter(
        (col: Record<string, any>) => {
          const id = col?.user?._id ?? col?.allocation?._id;
          return id !== startColId;
        },
      );

      newStartCol.list = newFilterData;

      // Update the state
      setColumns((state: ColumnsType) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      onDragEnd({ newStartCol, newEndCol });
    }
  };

  /**
   *
   * @param event HTML input elemtn value
   * for filter the employee list according
   * to the keyword
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  /**
   *
   * @param event HTML Input Element
   * for the switch input field
   * Have to appear the cancelled duties on enable the
   * toggle and disappear on disable
   */
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsShowCancel(event.target.checked);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container>
        <Grid item xs={6}>
          <TypographyComponents
            component="h4"
            title={General.availAndQualified}
            variant="h4"
            sx={styles.title}
          />
          <Grid item mt={1} sx={styles.title}>
            <OutlinedInput
              id="outlined-adornment-weight"
              placeholder={Placeholders.search}
              value={search}
              fullWidth
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <Search color={'primary'} />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              sx={styles.searchInput}
            />
          </Grid>

          {employees.length <= 0 && (
            <Box sx={styles.noDataContainer}>
              <IconButtonComponent
                imgSrc={IMAGE.NoData}
                size={'medium'}
                customStyle={{ height: '200px', width: '200px' }}
                fontSize={'inherit'}
                label={'noData'}
              />
              <TypographyComponents
                component="p"
                title={'No data'}
                variant="p"
                sx={styles.title}
              />
            </Box>
          )}
          {employees.length > 0 &&
            columns[DNDColumnIds.available]?.list?.length > 0 && (
              <DropColumn
                list={columns[DNDColumnIds.available].list}
                id={DNDColumnIds.available}
              />
            )}
        </Grid>

        <Grid item xs={6}>
          <Grid item container>
            <Grid item xs={6}>
              <TypographyComponents
                component="h4"
                title={General.allocation}
                variant="h4"
                sx={styles.title}
              />
            </Grid>
            <Grid item xs={6}>
              <Box component="div" sx={styles.switch}>
                <InputLabel sx={styles.switchLabel}>
                  {General.showCancel}
                </InputLabel>
                <Switch onChange={handleSwitchChange} size="small" />
              </Box>
            </Grid>
          </Grid>
          {columns[DNDColumnIds.allocations] &&
            columns[DNDColumnIds.allocations]?.list?.length > 0 && (
              <Box sx={{ width: '100%' }}>
                <DropColumn
                  list={columns[DNDColumnIds.allocations]?.list ?? []}
                  id={DNDColumnIds.allocations}
                />
              </Box>
            )}
          {isShowCancel &&
            columns[DNDColumnIds.cancelledDuties] &&
            columns[DNDColumnIds.cancelledDuties]?.list?.length > 0 && (
              <>
                <TypographyComponents
                  component="h4"
                  title={General.cancellation}
                  variant="h4"
                  sx={styles.cancellation}
                />
                <Box sx={styles.cancellationBoxContainer}>
                  <DropColumn
                    list={columns[DNDColumnIds.cancelledDuties]?.list ?? []}
                    id={DNDColumnIds.cancelledDuties}
                    isCancelled={true}
                  />
                </Box>
              </>
            )}
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default React.memo(DragNDrop);
