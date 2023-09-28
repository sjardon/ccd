import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class StreetAddress {
  address: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
}

export type PersonDocument = HydratedDocument<Person>;

@Schema()
export class Person {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  nickname: string;

  @Prop()
  idCardType: string;

  @Prop()
  idCard: string;

  @Prop()
  sex: 'male' | 'female';

  @Prop()
  birthDate: Date;

  @Prop()
  maritalStatus: string;

  @Prop()
  nationality: string;

  @Prop()
  address: StreetAddress;

  @Prop()
  phoneNumber: string;

  @Prop()
  studiesAchieved: string;

  @Prop()
  work: string;

  @Prop()
  ecclesiasticalStatus: string;

  @Prop()
  diocese: string;

  @Prop()
  religiousStudies: string;

  @Prop()
  otherReligiousGroups: string;

  @Prop()
  otherSocialAction: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
