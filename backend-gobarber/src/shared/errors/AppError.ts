class AppError {
  public readonly message: string;

  public readonly satatusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.satatusCode = statusCode;
  }
}

export default AppError;
