export interface ForwardData {
    handle: (data: ForwardData.Request) => Promise<void>
}

export namespace ForwardData {
    export type Request = {
        deviceIdentification: string
        measures: Array<{
            sensorIdentification: string
            sensorMeasureType: string
            sensorValue: string
            sensorTimeStamp: string
        }>
    }
}
