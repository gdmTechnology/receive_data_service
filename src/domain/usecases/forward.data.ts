export interface ForwardData {
    handle: (data: string) => Promise<void>
}

export namespace ForwardData {
    export type Request = {
        sensorIdentification: string
        sensorValue: string
        sensorTimeStamp: string
    }
}
