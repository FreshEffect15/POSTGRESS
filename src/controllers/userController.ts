import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcrypt';

export const getUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await userService.getAllUsuarios();
  res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  const usuario = await userService.getUsuarioById(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

export const registerUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = await userService.createUsuario({
    nombre,
    email,
    password: hashedPassword,
  });

  res.status(201).json(nuevoUsuario);
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  let datosActualizados: any = {};
  if (nombre) datosActualizados.nombre = nombre;
  if (email) datosActualizados.email = email;
  if (password) datosActualizados.password = await bcrypt.hash(password, 10);

  try {
    const usuario = await userService.updateUsuario(req.params.id, datosActualizados);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    await userService.deleteUsuario(req.params.id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
};
