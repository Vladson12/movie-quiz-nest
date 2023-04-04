import { registerDecorator } from 'class-validator';

export function IsNotNegativeNumber() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotNegative',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return typeof value === 'number' && value >= 0;
        },
      },
    });
  };
}
