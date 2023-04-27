import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';

export const useSearchParamState = (
  target: string,
): [string | null, (newState?: string | null | undefined) => void] => {
  const location = useLocation();
  const history = useHistory();

  const state = new URLSearchParams(location.search).get(target);
  const setState = useCallback(
    (newState?: string | undefined | null) => {
      const params = new URLSearchParams(location.search);
      newState ? params.set(target, newState) : params.delete(target);
      history.replace('?' + params.toString());
    },
    [history, location.search, target],
  );

  return [state, setState];
};
