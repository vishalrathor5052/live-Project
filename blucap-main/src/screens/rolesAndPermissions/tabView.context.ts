import { createContext, Dispatch, SetStateAction } from 'react';

const PermissionContext = createContext({
  hasActiveChanges: false,
  setHasActiveChanges: (() => null) as Dispatch<SetStateAction<boolean>>,
  userTryingToLeave: false,
  setUserTryingToLeave: (() => null) as Dispatch<SetStateAction<boolean>>,
});

export default PermissionContext;
