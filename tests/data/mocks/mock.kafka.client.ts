import { KafkaClient, KafkaSendData } from '@/data/protocols'
import { ForwardData } from '@/domain/usecases'

export class KafkaClientSpy implements KafkaClient {
    async kafkaProducer(): Promise<any> { }
}

export class KafkaSendDataSpy implements KafkaSendData {
    input = null
    async send(data: ForwardData.Request): Promise<any> {
        this.input = data
        return data
    }
}
