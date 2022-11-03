declare global {
  namespace Express {
    interface Request {
      uid: string;
      ids: string[];
    }
  }
}
