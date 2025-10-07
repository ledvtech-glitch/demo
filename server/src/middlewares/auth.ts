import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token as string | undefined;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const payload = verifyJwt(token);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });
  req.user = { id: payload.id, role: payload.role };
  next();
}

export function requireRole(...roles: Array<'admin' | 'vendor'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.user.role as any)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
