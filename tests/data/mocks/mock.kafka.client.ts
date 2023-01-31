import { KafkaClient } from '@/data/protocols'

export class KafkaClientSpy implements KafkaClient {
    input: any
    async sendMessage(data: any): Promise<void> {
        this.input = data
    }

    async kafkaProducer(): Promise<any> { }
}
