import { registerDecorator, ValidationOptions } from 'class-validator';
import { Role } from 'src/user/entities/roles';

export function IsUserrole(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUserrole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Object.values(Role).includes(value);
        },
      },
    });
  };
}
