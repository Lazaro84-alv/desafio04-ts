import { UserService } from './UserService';

jest.mock('./../repositories/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn()
})

const mockUserRepository = require('./../repositories/UserRepository')
const mockUser = {
  id_user: '123456',
  name: 'tita',
  email: 'tita@test.com',
  password: '123456'
}

describe('UserService', () => {
  const userService = new UserService(mockUserRepository)

  it('Deve adicionar um novo usuário', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    const response = await userService.createUser('tita', 'tita@test.bank', '12345');
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject({
      id_user: '123456',
      name: 'tita',
      email: 'tita@test.com',
      password: '123456'
    })
  })

  it('Devo retornar um token de usuário', async () => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
    const token = await userService.getToken('tita@test.com', '123456')
    expect(token).toBe('123456')
  })
})