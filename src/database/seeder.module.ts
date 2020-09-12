import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcronymModule } from 'src/acronym/acronym.module';
import { UsersModule } from 'src/users/users.module';
import { Seeder } from './seeder';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: 'root',
        password: 'example',
      },
    }),
    AcronymModule,
    UsersModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
