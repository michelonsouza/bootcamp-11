import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;
    const { id: provider_id } = request.user;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(classToClass(appointments));
  }
}

export default ProviderAppointmentsController;
