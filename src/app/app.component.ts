import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="card" style="width: 70%">
        <div class="card-header">
          <h1 class="text-center">Validation du numéro de sécurité sociale</h1>
          <form>
            <input type="text" placeholder="Numéro de sécurité sociale" class="form-control" name="security-number" data-cy-security-number>
          </form>
        </div>
        <div class="card-body"></div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
