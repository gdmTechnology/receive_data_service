import { ForwardData } from '@/domain/usecases'
import { DbForwardData } from '@/data/usecases'
import { KafkaSendMsg } from '@/infra/kafka'

export const makeDbReceiveSensorMeasures = (): ForwardData => {
    const sendMessage = new KafkaSendMsg()
    return new DbForwardData(sendMessage)
}
