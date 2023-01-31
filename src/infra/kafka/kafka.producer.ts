import { KafkaClient } from '@/data/protocols'
import { ForwardData } from '@/domain/usecases'
import { Producer, Kafka } from 'kafkajs'
import { Topics } from '@/main/config/kafka'

let producer = null

export class KafkaProducer implements KafkaClient {
    constructor(
        private readonly kafkaServer: Kafka
    ) { }

    async kafkaProducer(): Promise<Producer> {
        producer = this.kafkaServer.producer()
        await producer.connect()
        return producer
    }

    async sendMessage(message: ForwardData.Request): Promise<void> {
        const mesgStringyfied = JSON.stringify(message)
        await producer.send({
            topic: Topics.MEASURE,
            messages: [
                { value: mesgStringyfied }
            ]
        })
    }
}
