import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

const mockUserService = {
  createUser: jest.fn()
}

jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService
    })
  }
})

describe('UserController', () => {
  
  
  const userController = new UserController();
  const mockResponse = makeMockResponse()

  it('Deve adicionar um novo usuário', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: 'tita@test.com',
        password: 'password'
      }
    } as Request
    
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios' })
  })

  it('Deve retornar erro caso o usuário não informe o name', () => {
    const mockRequest = {
      body: {
        name: '',
        email: 'tita@test.com',
        password: 'password'
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios' })
  })

  it('Deve retornar erro caso o usuário não informe o email', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: '',
        password: 'password'
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: "Usuário criado" })
  })

  it('Deve retornar erro caso o usuário não informe o password', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: 'tita@test.com',
        password: ''
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios' })
  })

  it('Deve retornar a mensagem de usuário deletado', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: 'tita@test.com',
        password: 'password'
      }
    } as Request

    userController.deleteUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado'})
  })
})