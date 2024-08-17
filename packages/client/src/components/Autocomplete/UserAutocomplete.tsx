import debounce from 'debounce-promise';
import { GroupBase } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';

import { convertUsersToOptions } from '~/utils';
import { Option } from '~/types';
import { IUser, useLazyGetUsersQuery } from '~/redux/admin/user';

interface UserAutocompleteProps<M extends boolean> extends AsyncProps<Option, M, GroupBase<Option>> {
  defaultUsers?: IUser[];
}

const UserAutocomplete = <M extends boolean = false>({ defaultUsers = [], ...props }: UserAutocompleteProps<M>) => {
  const defaultOptions = convertUsersToOptions(defaultUsers);
  const [getUsers] = useLazyGetUsersQuery();

  const loadOptions = debounce(async (q: string) => {
    const result = await getUsers({ q }).unwrap();
    return convertUsersToOptions(result.data);
  }, 200);

  return (
    <AsyncSelect<Option, M, GroupBase<Option>>
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      {...props}
    />
  );
};

export { UserAutocomplete };
