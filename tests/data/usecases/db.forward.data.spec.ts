import { DbForwardData } from '@/data/usecases'
import { KafkaClientSpy } from '../mocks'

type SutTypes = {
    kafkaClientSpy: KafkaClientSpy
    sut: DbForwardData
}

const makeSut = (): SutTypes => {
    const kafkaClientSpy = new KafkaClientSpy()
    const sut = new DbForwardData(kafkaClientSpy)
    return {
        sut,
        kafkaClientSpy
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
        const { sut, kafkaClientSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(kafkaClientSpy.input).toEqual(request)
    })

    test('Should throw if DbForwardData throws', async () => {
        const { sut, kafkaClientSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(kafkaClientSpy, 'send').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
