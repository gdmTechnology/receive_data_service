import { Kafka } from 'kafkajs'
import env from '@/main/config/env'
import { KafkaProducer } from '@/infra/kafka'

export const setupKafka = async (): Promise<void> => {
    const kafkaServer = new Kafka({
        clientId: env.kafkaClientId,
        brokers: [`${env.kafkaBrokerHost}: ${env.kafkaBrokerPort}`]
    })
    const kafkaProducer = new KafkaProducer(kafkaServer)
    await kafkaProducer.kafkaProducer()
}
