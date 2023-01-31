export default {
  port: process.env.PORT || 3002,
  jwtSecret: process.env.JWT_SECRET || '1kZDnw8==jh',
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/myapp',
  KAFKA_CLIENTID: process.env.KAFKA_CLIENTID || 'rem-kafka',
  KAFKA_BROKER_PORT: process.env.KAFKA_BROKER_PORT || 9092,
  KAFKA_BROKER_HOST: process.env.KAFKA_BROKER_HOST || 'broker'
}
