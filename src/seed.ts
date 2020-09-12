import { NestFactory } from '@nestjs/core';
import { Seeder } from './database/seeder';
import { SeederModule } from './database/seeder.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(() => {
          console.log('Seeding complete!');
        })
        .catch(error => {
          console.log('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
