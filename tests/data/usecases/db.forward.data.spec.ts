import { DbForwardData } from '@/data/usecases'
import { KafkaSendDataSpy } from '../mocks'

type SutTypes = {
    kafkaSendDataSpy: KafkaSendDataSpy
    sut: DbForwardData
}

const makeSut = (): SutTypes => {
    const kafkaSendDataSpy = new KafkaSendDataSpy()
    const sut = new DbForwardData(kafkaSendDataSpy)
    return {
        sut,
        kafkaSendDataSpy
    }
}

const throwError = (): any => {
    throw new Error()
}

const mockRequest = (): any => ({
    sensorIdentification: 'sensorIdentification',
    sensorValue: 'sensorValue',
    sensorTimeStamp: 'sensorTimeStamp'
})

describe('DbForwardData', () => {
    test('Should call DbForwardData with correct values', async () => {
        const { sut, kafkaSendDataSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(kafkaSendDataSpy.input).toEqual(request)
    })

    test('Should throw if DbForwardData throws', async () => {
        const { sut, kafkaSendDataSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(kafkaSendDataSpy, 'send').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
