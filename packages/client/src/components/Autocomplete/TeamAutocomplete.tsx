import debounce from 'debounce-promise';
import { GroupBase } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';

import { convertTeamsToOptions } from '~/utils';
import { Option } from '~/types';
import { ITeam, useLazyGetTeamsQuery } from '~/redux/admin/team';

interface UserAutocompleteProps<M extends boolean> extends AsyncProps<Option, M, GroupBase<Option>> {
  defaultTeams?: ITeam[];
}

const TeamAutocomplete = <M extends boolean = false>({ defaultTeams = [], ...props }: UserAutocompleteProps<M>) => {
  const defaultOptions = convertTeamsToOptions(defaultTeams);
  const [getUsers] = useLazyGetTeamsQuery();

  const loadOptions = debounce(async (q: string) => {
    const result = await getUsers({ q }).unwrap();
    return convertTeamsToOptions(result.data);
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

export { TeamAutocomplete };
