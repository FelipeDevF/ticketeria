import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as OrmConfig from '../../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...OrmConfig,
  })],
})
export class DatabaseModule {}
