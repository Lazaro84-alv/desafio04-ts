import { UserService } from './UserService';

jest.mock('./../repositories/UserRepository')

const mockUserRepository = require('./../repositories/UserRepository')

describe('UserService', () => {
  const userService = new UserService(mockUserRepository)

  it('Deve adicionar um novo usuário', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
      id_user: '123456',
      name: 'tita',
      email: 'tita@test.com',
      password: '123456'
    }))
    const response = await userService.createUser('tita', 'tita@test.bank', '12345');
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject({
      id_user: '123456',
      name: 'tita',
      email: 'tita@test.com',
      password: '123456'
    })
  })
})