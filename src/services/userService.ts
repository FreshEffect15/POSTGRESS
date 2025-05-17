import { PrismaClient, Usuario } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsuarios = () => prisma.usuario.findMany();

export const getUsuarioById = (id: string) =>
  prisma.usuario.findUnique({ where: { id } });

export const createUsuario = (data: Omit<Usuario, 'id'>) =>
  prisma.usuario.create({ data });

export const updateUsuario = (id: string, data: Partial<Usuario>) =>
  prisma.usuario.update({ where: { id }, data });

export const deleteUsuario = (id: string) =>
  prisma.usuario.delete({ where: { id } });
