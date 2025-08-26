export class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
  
      // Corrige o prototype para instanceof funcionar corretamente
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = this.constructor.name;
    }
  }
  