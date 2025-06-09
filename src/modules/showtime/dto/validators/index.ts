import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'isEndTimeAfterStartTime', async: false })
export class IsEndTimeAfterStartTime implements ValidatorConstraintInterface {
  validate(end_time: string, args: ValidationArguments) {
    const object: any = args.object
    const start_time = object.start_time
    if (!start_time || !end_time) return false
    return new Date(end_time) > new Date(start_time)
  }

  defaultMessage(args: ValidationArguments) {
    return 'end_time must be greater than start_time'
  }
}
