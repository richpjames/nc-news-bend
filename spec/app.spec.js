process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe.only('/', () => {
	beforeEach(() => connection.seed.run());
	after(() => connection.destroy());
	describe('/api', () => {
		it('GET status:200', () => {
			return request(app)
				.get('/api')
				.expect(200);
		});
		describe('/topics', () => {
			return request(app)
				.get('api/topics/wrecked')
				.expect(200)
				.then(res => {
					expect(res.body.topics).to.be.an('array');
					expect(res.body.treasures[0]).to.contain.keys('description', 'slug');
				});
		});
	});
});
