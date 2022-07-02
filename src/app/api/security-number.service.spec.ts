import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { SecurityNumberService } from './security-number.service';

describe('Security Number Service', () => {
  let spectator: SpectatorHttp<SecurityNumberService>;
  const createSpectator = createHttpFactory({
    service: SecurityNumberService,
  });

  beforeEach(() => (spectator = createSpectator()));

  it('should return false if the API gives a 404 status', done => {
    spectator.service.validate('1861013099001').subscribe(result => {
      expect(result).toBeFalse();
      done();
    });

    const request = spectator.expectOne(
      'https://api.test/validate/1861013099001',
      HttpMethod.GET
    );

    request.error(new ErrorEvent('Not Found'), {
      status: 404,
      statusText: 'Not Found',
    });
  });

  it('should return true if the API gives a 200 status', done => {
    spectator.service.validate('1861013055001').subscribe(result => {
      expect(result).toBeTrue();
      done();
    });

    const request = spectator.expectOne(
      'https://api.test/validate/1861013055001',
      HttpMethod.GET
    );

    request.flush('OK', {
      status: 200,
      statusText: 'OK',
    });
  });
});
