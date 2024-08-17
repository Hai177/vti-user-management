import debounce from 'debounce-promise';
import { GroupBase } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';

import { convertProjectsToOptions } from '~/utils';
import { Option } from '~/types';
import { IProject, useLazyGetProjectsQuery } from '~/redux/admin/project';

interface UserAutocompleteProps<M extends boolean> extends AsyncProps<Option, M, GroupBase<Option>> {
  defaultProjects?: IProject[];
}

const ProjectAutocomplete = <M extends boolean = false>({
  defaultProjects = [],
  ...props
}: UserAutocompleteProps<M>) => {
  const defaultOptions = convertProjectsToOptions(defaultProjects);
  const [getUsers] = useLazyGetProjectsQuery();

  const loadOptions = debounce(async (q: string) => {
    const result = await getUsers({ q }).unwrap();
    return convertProjectsToOptions(result.data);
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

export { ProjectAutocomplete };
