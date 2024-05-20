import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseLogger implements LoggerService {
  constructor() {}

  log(message: string) {
    console.log(`[Back-end] > ${message}`);
  }

  error(message: string, trace: string) {
    console.error(`[Back-end/ERROR] > ${message} / ${trace}`);
  }

  warn(message: string) {
    console.warn(`[Back-end/WARN] > ${message}`);
  }

  debug(message: string) {
    console.debug(`[Back-end/DEBUG] > ${message}`);
  }

  verbose(message: string) {
    console.log(`[Back-end/VERBOSE] > ${message}`);
  }
}
