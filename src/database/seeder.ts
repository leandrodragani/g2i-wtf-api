import { Injectable } from '@nestjs/common';
import { AcronymService } from 'src/acronym/acronym.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as rawData from './data.json';

@Injectable()
export class Seeder {
  constructor(
    private readonly acronymService: AcronymService,
    private readonly userService: UsersService,
  ) {}
  async seed() {
    await this.cleanDB();
    await this.seedAcronyms();
    await this.seedUsers();
  }

  async seedAcronyms() {
    const data = rawData.reduce((previous, current) => {
      const acronym = Object.keys(current)[0];
      const definitions = [current[acronym]];
      const index = previous.findIndex(p => p.acronym === acronym);
      if (index >= 0) {
        previous[index] = {
          acronym,
          definitions: [...previous[index].definitions, ...definitions],
        };
      } else {
        previous.push({ acronym, definitions });
      }
      return previous;
    }, []);

    return await this.acronymService.insertMany(data);
  }

  async seedUsers() {
    const user: CreateUserDTO = {
      email: 'leandro.dragani@gmail.com',
      fullname: 'Leandro Martin Dragani',
      password: 'leandro1',
      username: 'ldragani',
    };

    return await this.userService.create(user);
  }

  async cleanDB() {
    return Promise.all([
      this.acronymService.dropCollection(),
      this.userService.dropCollection(),
    ]);
  }
}
