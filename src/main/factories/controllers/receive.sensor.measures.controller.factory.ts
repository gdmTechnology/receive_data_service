import { KafkaProducer } from '@/infra/kafka'
import { ReceiveMeasuresController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbReceiveSensorMeasures, makeLogControllerDecorator, makeReceiveSensorMeasuresValidation } from '@/main/factories'

export const makeReceiveSensorMeasuresController = (producer: KafkaProducer): Controller => {
    const controller = new ReceiveMeasuresController(
        makeReceiveSensorMeasuresValidation(),
        makeDbReceiveSensorMeasures(producer)
    )
    return makeLogControllerDecorator(controller)
}
