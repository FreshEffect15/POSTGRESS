import { Router, Request, Response, NextFunction } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

function wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return function(req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}

router.get('/', wrapAsync(userController.getUsers));
router.get('/:id', wrapAsync(userController.getUserById));
router.post('/register', wrapAsync(userController.registerUser));
router.put('/:id', wrapAsync(userController.updateUser));
router.delete('/:id', wrapAsync(userController.deleteUser));

export default router;
