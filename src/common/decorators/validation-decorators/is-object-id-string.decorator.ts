import { Types } from 'mongoose';
import {
  registerDecorator,
  ValidationOptions,
  buildMessage,
} from 'class-validator';

export function IsObjectIdString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isObjectIdString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Types.ObjectId.isValid(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix, args) =>
            `centralizer id [${args.value}] is not a valid id`,
          validationOptions,
        ),
      },
    });
  };
}
