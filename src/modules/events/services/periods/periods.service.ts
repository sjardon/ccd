import { Injectable } from '@nestjs/common';
import { Period } from '../../entities/period.entity';

@Injectable()
export class PeriodsService {
  validate(period: Period) {
    return true;
  }
}
