import { ForwardData } from '@/domain/usecases'
import { Producer } from 'kafkajs'

export interface KafkaClient {
    sendMessage: (data: ForwardData.Request) => Promise<void>
    kafkaProducer: () => Promise<Producer>
}
