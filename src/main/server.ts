import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongo.helper'
import { setupKafka } from '@/main/config/kafka/kafka.server'
import { makeReceiveSensorMeasuresController } from '@/main/factories'

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const producer = await setupKafka()
        makeReceiveSensorMeasuresController(producer)
        const { setupApp } = await import('./config/app')
        const app = await setupApp()
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
    .catch(console.error)
