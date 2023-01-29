import { ForwardData } from '@/domain/usecases'
import { serverError, badRequest, noContent } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class ReceiveMeasuresController implements Controller {
    constructor(
        private readonly receiveDataValidation: Validation,
        private readonly forwardData: ForwardData
    ) { }

    async handle(data: any): Promise<HttpResponse> {
        try {
            const error = this.receiveDataValidation.validate(data)
            if (error) return badRequest(error)
            await this.forwardData.handle(data)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace ReceiveMeasuresController {
    export interface Request {
        sensorIdentification: string
        sensorValue: string
        sensorTimeStamp: string
    }
}
