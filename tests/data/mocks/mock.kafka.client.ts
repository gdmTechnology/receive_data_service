import { KafkaClient, KafkaSendData } from '@/data/protocols'
export class KafkaClientSpy implements KafkaClient {
    async kafkaProducer(): Promise<any> { }
}

export class KafkaSendDataSpy implements KafkaSendData {
    input = null
    async send(data: KafkaSendData.Request): Promise<any> {
        this.input = data
        return data
    }
}
