import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcronymModule } from './acronym/acronym.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
