import { Kafka } from 'kafkajs'
import env from '@/main/config/env'
import { KafkaProducer } from '@/infra/kafka'

export const setupKafka = async (): Promise<KafkaProducer> => {
    const kafkaServer = new Kafka({
        clientId: env.KAFKA_CLIENTID,
        brokers: [`${env.KAFKA_BROKER_HOST}: ${env.KAFKA_BROKER_PORT}`]
    })
    const kafkaProducer = new KafkaProducer(kafkaServer)
    await kafkaProducer.kafkaProducer()
    return kafkaProducer
}
