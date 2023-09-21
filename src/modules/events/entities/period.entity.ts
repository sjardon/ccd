import { Prop } from '@nestjs/mongoose';

export class Period {
  startTime: Date;
  endTime: Date;
}

export class DiscretePeriod extends Period {
  periods: Period[];
}
