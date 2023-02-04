import { ReceiveMeasuresController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbReceiveSensorMeasures, makeLogControllerDecorator, makeReceiveSensorMeasuresValidation } from '@/main/factories'

export const makeReceiveSensorMeasuresController = (): Controller => {
    const controller = new ReceiveMeasuresController(
        makeReceiveSensorMeasuresValidation(),
        makeDbReceiveSensorMeasures()
    )
    return makeLogControllerDecorator(controller)
}
