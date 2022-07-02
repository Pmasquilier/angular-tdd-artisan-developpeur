import { Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { SecurityNumberService } from './api/security-number.service';
import { AppComponent } from './app.component';

describe('Security Number Checker', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [FormsModule, ReactiveFormsModule],
    mocks: [SecurityNumberService],
  });

  // avant chaque test, reiinitialiser spectateur pour qu'il ne reste rien du test d'avant
  beforeEach(() => (spectator = createComponent()));

  it('should appear as the given mockup', () => {
    const service = spectator.inject(SecurityNumberService);
    service.validate.and.returnValue(of(false));
    expect(spectator.query('form')).toBeTruthy();
    expect(spectator.query('input[name="security-number"]')).toBeTruthy();
    expect(spectator.query('form button')).toBeTruthy();
    expect(spectator.query('data-cy-global-status')).toBeNull();
    expect(spectator.query('data-cy-security-number-error')).toBeNull();
  });

  it('should reject bad formatted security number', () => {
    const service = spectator.inject(SecurityNumberService);
    service.validate.and.returnValue(of(false));
    spectator.typeInElement('100 100 00', 'input[name="security-number"]');
    spectator.click('form button');

    expect(spectator.query('[data-cy-security-number-error]')).toBeTruthy();
    expect(spectator.query('[data-cy-global-status]')).toBeTruthy();
  });

  it('should reject invalid securityNumber', () => {
    const service = spectator.inject(SecurityNumberService);
    service.validate.and.returnValue(of(false));
    spectator.typeInElement('1861013099001', 'input[name="security-number"]');
    spectator.click('form button');

    expect(spectator.query('[data-cy-security-number-error]')).toBeTruthy();
    expect(spectator.query('[data-cy-global-status]')).toBeTruthy();
  });
});
