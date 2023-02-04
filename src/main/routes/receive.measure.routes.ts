import { adaptRoute } from '@/main/adapters'
import { makeReceiveSensorMeasuresController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
    router.post('/receive/measure', adaptRoute(makeReceiveSensorMeasuresController()))
}
