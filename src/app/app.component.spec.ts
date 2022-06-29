import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';

describe('Security Number Checker', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
  });

  // avant chaque test, reiinitialiser spectateur pour qu'il ne reste rien du test d'avant
  beforeEach(() => spectator = createComponent());

  it('should appear as the given mockup', () => {
    expect(spectator.query('form')).toBeTruthy();
/*     expect(spectator.query('input[name="security-number"]')).toBeTruthy();
    expect(spectator.query('form button')).toBeTruthy();

    expect(spectator.query('data-cy-global-status')).toBeTruthy();
    expect(spectator.query('data-cy-security-number-error')).toBeTruthy(); */


  });
});
