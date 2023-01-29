import { ReceiveMeasuresController } from '@/presentation/controllers'
import { ForwardDataSpy, ValidationSpy } from '@/tests/presentation/mocks'

type SutTypes = {
    validationSpy: ValidationSpy
    forwardDataSpy: ForwardDataSpy
    sut: ReceiveMeasuresController
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const forwardDataSpy = new ForwardDataSpy()
    const sut = new ReceiveMeasuresController(validationSpy, forwardDataSpy)
    return { validationSpy, sut, forwardDataSpy }
}

const mockParams = (): ReceiveMeasuresController.Request => ({
    sensorIdentification: 'sensorIdentification',
    sensorValue: 'sensorValue',
    sensorTimeStamp: 'sensorTimeStamp'
})

describe('ReceiveMeasuresController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockParams()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const request = mockParams()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockParams()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call ForwardData with correct values', async () => {
        const { sut, forwardDataSpy } = makeSut()
        const request = mockParams()
        await sut.handle(request)
        expect(forwardDataSpy.input).toEqual(request)
    })

    test('Should return 500 if ForwardData throws', async () => {
        const { sut, forwardDataSpy } = makeSut()
        const request = mockParams()
        jest.spyOn(forwardDataSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
