import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/usuarios', userController.getUsuarios);
router.get('/usuarios/:id', userController.getUsuario);
router.post('/usuarios/register', userController.registerUsuario);
router.put('/usuarios/:id', userController.updateUsuario);
router.delete('/usuarios/:id', userController.deleteUsuario);

export default router;
