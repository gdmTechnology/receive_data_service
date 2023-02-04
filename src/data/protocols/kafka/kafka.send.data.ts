import { ForwardData } from '@/domain/usecases'

export interface KafkaSendData {
    send: (message: ForwardData.Request) => Promise<void>
}
