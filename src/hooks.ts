import React from 'react';

import { User } from './interfaces';
import { DataState, useDataState } from './DataState';

const requests = {
  fetchUser: '/api/user',
};

export const useUser = (): [
  DataState<User>,
  React.Dispatch<React.SetStateAction<DataState<User>>>
] => {
  const [dataState, setDataState] = useDataState<DataState<User>>(
    () =>
      fetch(requests.fetchUser, {
        credentials: 'same-origin',
      })
        .then(res => res.json())
        .then(data => data.user ?? DataState.Empty)
        .catch(error => DataState.error(error.message)),
    []
  );
  return [dataState, setDataState];
};
