import { KafkaClient } from '@/data/protocols'

export class KafkaClientSpy implements KafkaClient {
    input: any
    async send(data: any): Promise<void> {
        this.input = data
    }
}
