import { FormControl } from '@angular/forms';
import { NumericInputDirective } from './numeric-input.directive';

describe('NumericInputDirective', () => {
  let directive: NumericInputDirective;

  beforeEach(() => {
    directive = new NumericInputDirective();
    directive.formControl = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should keep input value without modification', () => {
    const givenFormControlValue = '1234';
    const expectedFormControlValue = '1234';

    directive.ngOnInit();
    directive.formControl.setValue(givenFormControlValue);

    expect(directive.formControl.value).toBe(expectedFormControlValue);
  });

  it('should modify input value as fraction value is not allowed', () => {
    const givenFormControlValue = '123.4';
    const expectedFormControlValue = '123';

    directive.isFractionValueAllowed = false;
    directive.ngOnInit();
    directive.formControl.setValue(givenFormControlValue);

    expect(directive.formControl.value).toBe(expectedFormControlValue);
  });

  it('should have modify input value on for more than 1 "."', () => {
    const givenFormControlValue = '123.4.4';
    const expectedFormControlValue = '123.44';

    directive.isFractionValueAllowed = true;
    directive.ngOnInit();
    directive.formControl.setValue(givenFormControlValue);

    expect(directive.formControl.value).toBe(expectedFormControlValue);
  });

  it('should have modify input value invalid inputs', () => {
    const givenFormControlValue = '1sd23.4.4';
    const expectedFormControlValue = '123.44';

    directive.isFractionValueAllowed = true;
    directive.ngOnInit();
    directive.formControl.setValue(givenFormControlValue);

    expect(directive.formControl.value).toBe(expectedFormControlValue);
  });

  it('should trim value and control value on only whitespace input', () => {
    const givenFormControlValue = ' ';
    const expectedFormControlValue = '';

    directive.isFractionValueAllowed = true;
    directive.ngOnInit();
    directive.formControl.setValue(givenFormControlValue);

    expect(directive.formControl.value).toBe(expectedFormControlValue);
  });

  it('should return non negative values if negative values is not allowed', () => {
    const givenFormControlValue = '-22';
    const expectedFormControlValue = '22';

    directive.ngOnInit();
    directive.formControl.setValue(givenFormControlValue);

    expect(directive.formControl.value).toBe(expectedFormControlValue);
  });

  it('should unsubscribe from all subscriptions', () => {
    directive.ngOnDestroy();

    expect(directive['subscriptions$'].closed).toBeTruthy();
  });
});
