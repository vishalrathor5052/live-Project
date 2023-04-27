import { CircularProgress, DialogContent, Modal } from '@mui/material';
import { FC, MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from 'src/store/query';
import {
  SelectDepartment,
  SelectDepartmentProceedType,
} from './SelectDepartment';
import { SelectPeopleModal, SelectPeopleProceedType } from './SelectMembers';
import { SelectScope } from './SelectScope';

const AddMembers: FC<{
  openModal: MutableRefObject<(() => void) | undefined>;
}> = ({ openModal }) => {
  const history = useHistory();
  const [createHospitalRole] = api.useCreateHospitalRolesMutation();

  const [modalState, setModalState] = useState<
    'none' | 'selectDept' | 'addMembers' | 'setScope' | 'loading'
  >('none');

  const [, setDepartmentSelectPayload] = useState<
    Parameters<SelectDepartmentProceedType>[0] | null
  >(null);
  const [, setAddedUsers] = useState<Parameters<SelectPeopleProceedType>[0]>(
    [],
  );

  const openModalFunc = useCallback(() => {
    setModalState('selectDept');
  }, []);

  useEffect(() => {
    if (openModal) openModal.current = openModalFunc;
  }, [openModal, openModalFunc]);

  const onDepartmentSelect: SelectDepartmentProceedType = useCallback(
    async payload => {
      setDepartmentSelectPayload(payload);

      if (payload.type === 'createDept') history.push('/people?add=people');
      else if (payload.type === 'continue') setModalState('addMembers');
      else if (
        payload.type === 'createRole' ||
        payload.type === 'createUnderHospital'
      )
        try {
          setModalState('loading');
          const response = await createHospitalRole({
            hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
            hospitalRoles: [
              {
                hospitalRoleTypeId: payload.roleTypeId,
                sharedRole: false,
                departmentId:
                  payload.type === 'createRole'
                    ? payload.departmentId
                    : undefined,
              },
            ],
          }).unwrap();
          if (response.createHospitalRoles[0]._id) {
            setModalState('addMembers');
            setDepartmentSelectPayload({
              type: 'continue',
              roleId: response.createHospitalRoles[0]._id,
            });
          }
        } catch (e) {
          console.warn(e);
          setModalState('none');
        }
    },
    [createHospitalRole, history],
  );

  const onPeopleAdded: SelectPeopleProceedType = useCallback(payload => {
    setAddedUsers(payload);
    setModalState('loading');
  }, []);

  return (
    <Modal
      open={modalState !== 'none'}
      onClose={() => setModalState('none')}
      tabIndex={-1}
    >
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {modalState === 'loading' ? (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}
            color="warning"
          />
        ) : modalState === 'selectDept' ? (
          <SelectDepartment proceed={onDepartmentSelect} />
        ) : modalState === 'addMembers' ? (
          <SelectPeopleModal onClose={onPeopleAdded} />
        ) : modalState === 'setScope' ? (
          <SelectScope />
        ) : null}
      </DialogContent>
    </Modal>
  );
};

export default AddMembers;
