import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SecurityNumberService } from './api/security-number.service';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh">
      <div class="card" style="width: 70%">
        <div class="card-header">
          <h1 class="text-center">Validation du numéro de sécurité sociale</h1>
          <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <input
              formControlName="securityNumber"
              type="text"
              placeholder="Numéro de sécurité sociale"
              class="form-control"
              name="security-number"
              data-cy-security-number
              [ngClass]="{
                'is-invalid': hasPatternError || hasValidityError
              }" />

            <p
              *ngIf="hasPatternError || hasValidityError"
              class="invalid-feedback"
              data-cy-security-number-error>
              Numéro de sécurité sociale invalide !
            </p>

            <button class="btn btn-primary" data-cy-submit>Valider</button>
          </form>
        </div>
        <div class="card-body">
          <div
            class="alert alert-danger"
            data-cy-global-status
            *ngIf="hasPatternError || hasValidityError">
            Le patient ne peut pas être pris en charge !
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  form = new FormGroup({
    securityNumber: new FormControl('', Validators.pattern(/^[0-9]{13}/)),
  });

  constructor(private service: SecurityNumberService) {}

  get hasPatternError() {
    return this.form.controls['securityNumber'].hasError('pattern');
  }

  get hasValidityError() {
    return this.form.controls['securityNumber'].hasError('validity');
  }

  handleSubmit(): void {
    this.service
      .validate(this.form.controls['securityNumber'].value)
      .subscribe(result => {
        if (!result) {
          this.form.controls['securityNumber'].setErrors({
            validity: true,
          });
        }
      });
  }
}
