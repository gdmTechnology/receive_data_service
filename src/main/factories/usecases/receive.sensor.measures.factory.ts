import { KafkaProducer } from '@/infra/kafka'
import { ForwardData } from '@/domain/usecases'
import { DbForwardData } from '@/data/usecases'

export const makeDbReceiveSensorMeasures = (producer: KafkaProducer): ForwardData => {
    return new DbForwardData(producer)
}
