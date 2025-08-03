import { Request } from 'express';

interface AuthRequest extends Request {
  user?: { id: string; isAdmin?: boolean };
}

export { AuthRequest };