import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { signJwt } from '../utils/jwt';

const COOKIE_NAME = 'token';

function setAuthCookie(res: Response, token: string) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const token = signJwt({ id: user._id.toString(), role: user.role });
    setAuthCookie(res, token);

    return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signJwt({ id: user._id.toString(), role: user.role });
    setAuthCookie(res, token);

    return res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed' });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  return res.json({ ok: true });
}
