import { ForwardData } from '@/domain/usecases'
import { KafkaClient } from '@/data/protocols'

export class DbForwardData implements ForwardData {
    constructor(
        private readonly kafkaClient: KafkaClient
    ) { }

    async handle(data: ForwardData.Request): Promise<void> {
        this.kafkaClient.send(data)
    }
}
