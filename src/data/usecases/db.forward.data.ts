import { ForwardData } from '@/domain/usecases'
import { KafkaClient } from '@/data/protocols'

export class DbForwardData implements ForwardData {
    constructor(
        private readonly producer: KafkaClient
    ) { }

    async handle(data: ForwardData.Request): Promise<void> {
        await this.producer.sendMessage(data)
    }
}
