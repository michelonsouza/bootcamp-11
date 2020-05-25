import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resePassword = container.resolve(ResetPasswordService);

    await resePassword.execute({ token, password });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
