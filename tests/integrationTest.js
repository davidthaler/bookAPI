require('should')
const request = require('supertest')
const mongoose = require('mongoose')

process.env.ENV = 'Test'
const app = require('../app.js')

const Book = mongoose.model('Book')
const agent = request.agent(app)
const base_url = '/api/books'

describe('Book Crud Test', () => {
    it('should return with _id and read field after POST', (done) => {
        const bookPost = {
            title: "My Book",
            author: "Me",
            genre: "BS"
        }
        agent.post(base_url)
            .send(bookPost)
            .expect(200)
            .end((err, result) => {
                result.body.read.should.equal(false)
                result.body.should.have.property('_id')
                done()
            })
    })

    afterEach((done) => {
        Book.deleteMany({}).exec()
        done()
    })

    after((done) => {
        mongoose.connection.close()
        app.server.close(done())
    })
})

