// Followed tutorial from https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai#a-better-test
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server/server')
chai.should()
chai.use(chaiHttp)
const testId = '123456'

// Our parent block
describe('Testing User Database', () => {
    describe('/GET user', () => {
        it('Should GET all the users', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((error, response) => {
                    if (error) {
                        console.log(error)
                        done()
                    }
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    done()
                })
        })
    })

    describe('/GET/:id user', () => {
        it('Should return an error for user id that does not exist', (done) => {
            chai.request(server)
                .get('/api/users/' + testId)
                .end((error, response) => {
                    if (error) {
                        console.log(error)
                    }
                    response.should.have.status(404)
                    response.body.should.have.property('error')
                    done()
                })
        })
    })

    describe('/POST user', () => {
        it('Should POST a user ', (done) => {
            chai.request(server)
                .post('/api/users')
                .set('content-type', 'application/json')
                .send({
                    _id: testId,
                    name: 'user3',
                    email: 'user3@gmail.com'
                })
                .end((error, response) => {
                    if (error) {
                        console.log(error)
                        done()
                    }
                    response.should.have.status(200)
                    response.body.should.have.property('name')
                    response.body.should.have.property('email')
                    done()
                })
        })
    })

    describe('/GET/:id user', () => {
        it('Should GET a user given the id', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((error, response) => {
                    if (error) {
                        console.log(error)
                        done()
                    }
                    chai.request(server)
                        .get('/api/users/' + response.body.pop()._id)
                        .end((error, response) => {
                            if (error) {
                                console.log(error)
                                done()
                            }
                            response.should.have.status(200)
                            response.body.should.have.property('name')
                            response.body.should.have.property('email')
                            response.body.should.have.property('name', 'user3')
                            done()
                        })
                })
        })
    })

    describe('/PATCH/:id user', () => {
        it('Should PATCH a user given the id', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                        done()
                    }
                    chai.request(server)
                        .patch('/api/users/' + res.body.pop()._id)
                        .send({ name: 'user4' })
                        .end((err, res) => {
                            if (err) {
                                console.log(err)
                                done()
                            }
                            res.should.have.status(200)
                            res.body.should.have.property('name')
                            res.body.should.have.property('email')
                            done()
                        })
                })
        })
    })

    describe('/DELETE/:id user', () => {
        it('Should DELETE a user given the id', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                        done()
                    }
                    chai.request(server)
                        .delete('/api/users/' + res.body.pop()._id)
                        .end((err, res) => {
                            if (err) {
                                console.log(err)
                                done()
                            }
                            res.should.have.status(204)
                            done()
                        })
                })
        })
    })
})