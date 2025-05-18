import { Request, Response } from 'express';
import * as userService from '../services/userService';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error: unknown) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error: unknown) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, email, password } = req.body;
    const newUser = await userService.createUser({ nombre, email, password });
    return res.status(201).json(newUser);
  } catch (error: unknown) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, email, password } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, { nombre, email, password });
    return res.json(updatedUser);
  } catch (error: unknown) {
    const msg = getErrorMessage(error);
    if (msg === 'User not found') {
      return res.status(404).json({ message: msg });
    }
    return res.status(400).json({ message: msg });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    await userService.deleteUser(req.params.id);
    return res.status(204).send();
  } catch (error: unknown) {
    const msg = getErrorMessage(error);
    if (msg === 'User not found') {
      return res.status(404).json({ message: msg });
    }
    return res.status(400).json({ message: msg });
  }
};
