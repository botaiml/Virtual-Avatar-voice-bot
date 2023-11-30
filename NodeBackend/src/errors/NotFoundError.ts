// errors/NotFoundError.ts
class NotFoundError extends Error {
    constructor(message: string = 'Not Found') {
      super(message);
      this.name = 'NotFoundError';
    }
  }
  
  export default NotFoundError;