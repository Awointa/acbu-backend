process.env.DATABASE_URL ||= "postgresql://test:test@localhost:5432/acbu_test";
process.env.MONGODB_URI ||= "mongodb://localhost:27017/acbu_test";
process.env.RABBITMQ_URL ||= "amqp://localhost:5672";
process.env.JWT_SECRET ||= "test-secret";
