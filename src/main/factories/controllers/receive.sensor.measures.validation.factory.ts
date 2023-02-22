import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeReceiveSensorMeasuresValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['deviceIdentification', 'measures']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
