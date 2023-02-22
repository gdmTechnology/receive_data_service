import { ForwardData } from '@/domain/usecases'
import { KafkaSendData } from '../protocols'
export class DbForwardData implements ForwardData {
    constructor(
        private readonly sendMessage: KafkaSendData
    ) { }

    async handle(data: ForwardData.Request): Promise<void> {
        for (let i = 0; i < data.measures.length; i++) {
            const datahandled = {
                deviceIdentification: data.deviceIdentification,
                sensorIdentification: data.measures[i].sensorIdentification,
                sensorMeasureType: data.measures[i].sensorMeasureType,
                sensorValue: data.measures[i].sensorValue,
                sensorTimeStamp: data.measures[i].sensorTimeStamp
            }
            await this.sendMessage.send(datahandled)
        }
    }
}
