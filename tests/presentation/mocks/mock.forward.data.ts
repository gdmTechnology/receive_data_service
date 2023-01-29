import { ForwardData } from '@/domain/usecases'

export class ForwardDataSpy implements ForwardData {
    input: any
    async handle(data: string): Promise<void> {
        this.input = data
    }
}
