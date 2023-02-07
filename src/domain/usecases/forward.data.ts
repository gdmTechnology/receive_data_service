export interface ForwardData {
    handle: (data: ForwardData.Request) => Promise<void>
}

export namespace ForwardData {
    export type Request = {
        sensorIdentification: string
        measures: Array<{
            sensorMeasureType: string
            sensorValue: string
            sensorTimeStamp: string
        }>
    }
}
