import authAPI from '../api/auth';
import {AUTH} from '../constants/global'
import { AuthenticationError, DefaultError, BadRequestError, NotFoundError } from '../constants/errors';
jest.mock('axios');
import axios from 'axios';

describe('Login tests', () => {
  describe('login function', () => {
    const body = {
      phone : '0932323232',
      password : 'Abc@123456'
    }
    describe('with success', () => {
      const data = {something: {}};

      beforeEach(() => {
        axios.post.mockResolvedValue({ data });
      });

      it('should call endpoint with given phone & password', async () => {
        await authAPI.login(body);
        expect(axios.post).toBeCalledWith(
          `${AUTH.LOGIN}`,
          body,
        );
      });

      it('should return response data', async () => {
        const response = await authAPI.login(body);
        expect(response).toStrictEqual(data);
      });
    });

    describe('with error', () => {
      describe('status 401', () => {
        beforeEach(() => {
          axios.post.mockRejectedValue({ status: 401 });
        });

        it('should throw AuthenticationError', async () => {
          await expect(authAPI.login(body)).rejects.toThrow(AuthenticationError);
        });
      });

      describe('other status', () => {
        beforeEach(() => {
          axios.post.mockRejectedValue({});
        });

        it('should throw DefaultError', async () => {
          await expect(authAPI.login(body)).rejects.toThrow(DefaultError);
        });
      });
    });
  });
});

describe('Register tests', () => {
  describe('register function', () => {
    const body = {
      username: 'Test API',
      phone : '0932323232',
      email: 'testapi1@gmail.com',
      password : 'Abc@123456'
    }


    describe('with success', () => {
      const data = {something: {}};

      beforeEach(() => {
        axios.post.mockResolvedValue({ data });
      });

      it('should call endpoint with body', async () => {
        await authAPI.register(body);
        expect(axios.post).toBeCalledWith(
          `${AUTH.REGISTER}`,
          body,
        );
      });

      it('should return response data', async () => {
        const response = await authAPI.register(body);
        expect(response).toStrictEqual(data);
      });
    });

    describe('with error', () => {
      describe('status 400', () => {
        beforeEach(() => {
          axios.post.mockRejectedValue({ status: 400 });
        });

        it('should throw BadRequestError', async () => {
          await expect(authAPI.register(body)).rejects.toThrow(BadRequestError);
        });
      });
      
      describe('other status', () => {
        beforeEach(() => {
          axios.post.mockRejectedValue({});
        });

        it('should throw DefaultError', async () => {
          await expect(authAPI.register(body)).rejects.toThrow(DefaultError);
        });
      });
    });
  });
});