export {};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      // context?: Context;
    }
  }
}


// interface Context {
//   userRole?: string;
//   isAuthenticated?: boolean;
// }