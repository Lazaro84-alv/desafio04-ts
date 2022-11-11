import { makeMockRequest } from './../__mocks__/mockRequest.mock';
import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn()
  }
  
  const userController = new UserController(mockUserService as UserService);
  const mockResponse = makeMockResponse()

  it('Deve adicionar um novo usuário', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: 'tita@test.com'
      }
    } as Request
    
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    expect
  })

  it('Deve retornar erro caso o usuário não informe o name', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: 'tita@test.com'
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
  })

  it('Deve retornar erro caso o usuário não informe o email', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: ''
      }
    } as Request

    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name e email obrigatórios'})
  })

  it('Deve retornar a lista de usuários', () => {
    const mockRequest = makeMockRequest({})
    userController.getAllUsers(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
  })

  it('Deve retornar a mensagem de usuário deletado', () => {
    const mockRequest = {
      body: {
        name: 'Tita',
        email: ''
      }
    } as Request

    userController.deleteUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado'})
  })
})