// errors/InternalServerError.ts
class InternalServerError extends Error {
    constructor(message: string = 'Internal Server Error') {
      super(message);
      this.name = 'InternalServerError';
    }
  }
  
  export default InternalServerError;