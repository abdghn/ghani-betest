const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('User API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer <valid_jwt_token>`)
            .send({
                userName: 'John Doe',
                accountNumber: '123456',
                emailAddress: 'john@example.com',
                identityNumber: 'ID123456',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    // More tests for other endpoints...
});
