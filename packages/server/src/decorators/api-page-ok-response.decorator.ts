import { applyDecorators, type Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PageDto } from '~/common/dtos';

export function ApiPageOkResponse<T extends Type>(options: { type: T; description?: string }): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(PageDto<T>),
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    })
  );
}
