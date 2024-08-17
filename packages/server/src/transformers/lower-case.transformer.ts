import { TransformFnParams } from 'class-transformer';

import { MaybeType } from '~/common/types';

export const lowerCaseTransformer = (params: TransformFnParams): MaybeType<string> =>
  params.value?.toLowerCase().trim();
