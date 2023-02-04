import { ForwardData } from '@/domain/usecases'
import { KafkaSendData } from '../protocols'
export class DbForwardData implements ForwardData {
    constructor(
        private readonly sendMessage: KafkaSendData
    ) { }

    async handle(data: ForwardData.Request): Promise<void> {
        await this.sendMessage.send(data)
    }
}
