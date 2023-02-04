import { KafkaClient, KafkaSendData } from '@/data/protocols'
import { ForwardData } from '@/domain/usecases'
import { Producer, Kafka } from 'kafkajs'
import { Topics } from '@/main/config/kafka'

export let producer = null

export class KafkaProducer implements KafkaClient {
    constructor(
        private readonly kafkaServer: Kafka
    ) { }

    async kafkaProducer(): Promise<Producer> {
        if (producer) return producer
        producer = this.kafkaServer.producer()
        await producer.connect()
        return producer
    }
}

export class KafkaSendMsg implements KafkaSendData {
    async send(message: ForwardData.Request): Promise<void> {
        const mesgStringyfied = JSON.stringify(message)
        console.log('sendMessage', mesgStringyfied)
        await producer.send({
            topic: Topics.MEASURE,
            messages: [
                { value: mesgStringyfied }
            ]
        })
    }
}
