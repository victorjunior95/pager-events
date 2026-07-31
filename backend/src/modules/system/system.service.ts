import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  getStatus() {
    return {
      status: 'ok',
      service: 'pager-backend',
    };
  }
}
