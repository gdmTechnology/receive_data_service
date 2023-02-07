export interface KafkaSendData {
    send: (message: KafkaSendData.Request) => Promise<void>
}

export namespace KafkaSendData {
    export type Request = {
        sensorIdentification: string
        sensorMeasureType: string
        sensorValue: string
        sensorTimeStamp: string
    }
}
