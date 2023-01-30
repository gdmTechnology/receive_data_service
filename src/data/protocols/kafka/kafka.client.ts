import { ForwardData } from '@/domain/usecases'

export interface KafkaClient {
    send: (data: ForwardData.Request) => Promise<void>
}
