import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAcronymDTO, ListAllAcronymDTO, UpdateAcronymDTO } from './dto';
import { Acronym } from './schemas/acronym.schema';

@Injectable()
export class AcronymService {
  constructor(
    @InjectModel(Acronym.name) private readonly acronymModel: Model<Acronym>,
  ) {}

  async findAll({
    search,
    limit,
    from,
  }: ListAllAcronymDTO): Promise<Acronym[]> {
    const query = this.acronymModel.find();

    if (search) {
      query.find({ $text: { $search: search } });
    }

    if (from) {
      query.skip(from);
    }

    if (limit) {
      query.limit(limit);
    }

    return await query.exec();
  }

  async findById(acronym: string): Promise<Acronym> {
    return this.acronymModel.findOne({ acronym });
  }

  async create(dto: CreateAcronymDTO): Promise<Acronym> {
    const acronym = new this.acronymModel(dto);
    return acronym.save();
  }

  async update(acronym: string, dto: UpdateAcronymDTO): Promise<Acronym> {
    return await this.acronymModel.findOneAndUpdate({ acronym }, dto);
  }

  async remove(acronym: string) {
    return await this.acronymModel.findOneAndDelete({ acronym }).exec();
  }

  async dropCollection() {
    return await this.acronymModel.deleteMany({}).exec();
  }

  async insertMany(dto: CreateAcronymDTO[]) {
    return await this.acronymModel.insertMany(dto);
  }

  async countDocuments() {
    return await this.acronymModel.countDocuments().exec();
  }

  async findRandomByCount(count: number, max: number) {
    const randoms = {};

    const getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const fillRandoms = number => {
      const previousPresent = randoms[number - 1];
      const nextPresent = randoms[number + 1];
      const isAdjacent = previousPresent || nextPresent;
      randoms[number] = isAdjacent ? undefined : true;

      return isAdjacent;
    };

    for (let i = 0; i < count; i++) {
      let random = 0;
      do {
        random = getRandomInteger(1, max);
      } while (fillRandoms(random));
    }

    const numbers = Object.keys(randoms)
      .filter(key => randoms[key] !== undefined)
      .map(n => +n);

    return Promise.all(numbers.map(random => this.findOneRandom(random)));
  }

  async findOneRandom(random: number) {
    return this.acronymModel
      .findOne()
      .skip(random)
      .exec();
  }
}
