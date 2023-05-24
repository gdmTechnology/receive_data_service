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
    deviceIdentification: 'deviceIdentification',
    measures: [{
        sensorIdentification: 'sensorIdentification',
        sensorMeasureType: 'sensorMeasureType',
        sensorValue: 'sensorValue',
        sensorTimeStamp: 'sensorTimeStamp'
    }]

})

describe('DbForwardData', () => {
    test('Should call kafkaSendData with correct values', async () => {
        const { sut, kafkaSendDataSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(kafkaSendDataSpy.input).toEqual({
            deviceIdentification: 'deviceIdentification',
            sensorIdentification: 'sensorIdentification',
            sensorMeasureType: 'sensorMeasureType',
            sensorValue: 'sensorValue',
            sensorTimeStamp: 'sensorTimeStamp'
        })
    })

    test('Should throw if DbForwardData throws', async () => {
        const { sut, kafkaSendDataSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(kafkaSendDataSpy, 'send').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
