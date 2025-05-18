import { PrismaClient, Usuario } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = () => prisma.usuario.findMany();

export const getUserById = (id: string) =>
  prisma.usuario.findUnique({ where: { id } });

export const createUser = (data: Omit<Usuario, 'id'>) =>
  prisma.usuario.create({ data });

export const updateUser = (id: string, data: Partial<Usuario>) =>
  prisma.usuario.update({ where: { id }, data });

export const deleteUser = (id: string) =>
  prisma.usuario.delete({ where: { id } });