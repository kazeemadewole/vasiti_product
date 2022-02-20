"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const _server_1 = __importDefault(require("@server"));
const user_dao_1 = __importDefault(require("@daos/user-dao"));
const user_model_1 = __importDefault(require("@models/user-model"));
const functions_1 = require("@shared/functions");
const user_router_1 = require("@routes/user-router");
const errors_1 = require("@shared/errors");
describe('user-router', () => {
    const usersPath = '/api/users';
    const getUsersPath = `${usersPath}${user_router_1.p.get}`;
    const addUsersPath = `${usersPath}${user_router_1.p.add}`;
    const updateUserPath = `${usersPath}${user_router_1.p.update}`;
    const deleteUserPath = `${usersPath}${user_router_1.p.delete}`;
    const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
    let agent;
    beforeAll((done) => {
        agent = supertest_1.default.agent(_server_1.default);
        done();
    });
    /***********************************************************************************
     *                                    Test Get
     **********************************************************************************/
    describe(`"GET:${getUsersPath}"`, () => {
        it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const users = [
                user_model_1.default.new('Sean Maxwell', 'sean.maxwell@gmail.com'),
                user_model_1.default.new('John Smith', 'john.smith@gmail.com'),
                user_model_1.default.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
            ];
            spyOn(user_dao_1.default, 'getAll').and.returnValue(Promise.resolve(users));
            // Call API
            agent.get(getUsersPath)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                // Caste instance-objects to 'User' objects
                const respUsers = res.body.users;
                const retUsers = respUsers.map((user) => {
                    return user_model_1.default.copy(user);
                });
                expect(retUsers).toEqual(users);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not fetch users.';
            spyOn(user_dao_1.default, 'getAll').and.throwError(errMsg);
            // Call API
            agent.get(getUsersPath)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                console.log(res.body);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
    /***********************************************************************************
     *                                    Test Post
     **********************************************************************************/
    describe(`"POST:${addUsersPath}"`, () => {
        const callApi = (reqBody) => {
            return agent.post(addUsersPath).type('form').send(reqBody);
        };
        const userData = {
            user: user_model_1.default.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };
        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            // Setup Spy
            spyOn(user_dao_1.default, 'add').and.returnValue(Promise.resolve());
            // Call API
            agent.post(addUsersPath).type('form').send(userData)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(CREATED);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object with an error message of "${errors_1.ParamMissingError.Msg}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            // Call API
            callApi({})
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errors_1.ParamMissingError.Msg);
                done();
            });
        });
        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not add user.';
            spyOn(user_dao_1.default, 'add').and.throwError(errMsg);
            // Call API
            callApi(userData)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
    /***********************************************************************************
     *                                    Test Put
     **********************************************************************************/
    describe(`"PUT:${updateUserPath}"`, () => {
        const callApi = (reqBody) => {
            return agent.put(updateUserPath).type('form').send(reqBody);
        };
        const userData = {
            user: user_model_1.default.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };
        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(user_dao_1.default, 'persists').and.returnValue(Promise.resolve(true));
            spyOn(user_dao_1.default, 'update').and.returnValue(Promise.resolve());
            // Call Api
            callApi(userData)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object with an error message of "${errors_1.ParamMissingError.Msg}" and a
            status code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            // Call api
            callApi({})
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errors_1.ParamMissingError.Msg);
                done();
            });
        });
        it(`should return a JSON object with the error message of ${errors_1.UserNotFoundError.Msg} 
            and a status code of "${http_status_codes_1.default.NOT_FOUND}" if the id was not found.`, (done) => {
            // Call api
            callApi(userData)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(errors_1.UserNotFoundError.HttpStatus);
                expect(res.body.error).toBe(errors_1.UserNotFoundError.Msg);
                done();
            });
        });
        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            spyOn(user_dao_1.default, 'persists').and.returnValue(Promise.resolve(true));
            // Setup spy
            const updateErrMsg = 'Could not update user.';
            spyOn(user_dao_1.default, 'update').and.throwError(updateErrMsg);
            // Call API
            callApi(userData)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(updateErrMsg);
                done();
            });
        });
    });
    /***********************************************************************************
     *                                    Test Delete
     **********************************************************************************/
    describe(`"DELETE:${deleteUserPath}"`, () => {
        const callApi = (id) => {
            return agent.delete(deleteUserPath.replace(':id', id.toString()));
        };
        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(user_dao_1.default, 'persists').and.returnValue(Promise.resolve(true));
            spyOn(user_dao_1.default, 'delete').and.returnValue(Promise.resolve());
            // Call api
            callApi(5)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object with the error message of ${errors_1.UserNotFoundError.Msg} 
            and a status code of "${http_status_codes_1.default.NOT_FOUND}" if the id was not found.`, (done) => {
            // Call api
            callApi(-1)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(http_status_codes_1.default.NOT_FOUND);
                expect(res.body.error).toBe(errors_1.UserNotFoundError.Msg);
                done();
            });
        });
        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            spyOn(user_dao_1.default, 'persists').and.returnValue(Promise.resolve(true));
            // Setup spy
            const deleteErrMsg = 'Could not delete user.';
            spyOn(user_dao_1.default, 'delete').and.throwError(deleteErrMsg);
            // Call Api
            callApi(1)
                .end((err, res) => {
                (0, functions_1.pErr)(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(deleteErrMsg);
                done();
            });
        });
    });
});
