import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configSchema } from './common/validations';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { TeamModule } from './modules/team/team.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TaskListModule } from './modules/task-list/task-list.module';
import { TaskModule } from './modules/task/task.module';
import { DataSourceModule } from './database/datasource.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configSchema,
    }),
    DataSourceModule,
    AuthModule,
    UserModule,
    ProjectModule,
    TeamModule,
    ScheduleModule,
    TaskListModule,
    TaskModule,
    BoardModule,
  ],
})
export class AppModule {}
