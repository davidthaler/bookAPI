const should = require('should')
const sinon = require('sinon')
const bookController = require('../controllers/bookController')

describe('Book Controller Tests:', () => {
    describe('POST', () => {
        it('should not allow empty title on post', () => {
            // mock of Book object
            const Book = function(book){this.save = () => {}}

            const req = {
                body: {
                    author: 'Me'
                }
            }

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }

            const controller = bookController(Book)
            controller.post(req , res)
            res.status.calledWith(400).should.equal(true, 'Bad status')
            res.send.calledWith('Title is required').should.equal(true)
        })
    })
})
