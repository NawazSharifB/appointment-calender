import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[numericInput]',
})
export class NumericInputDirective implements OnInit, OnDestroy {
  @Input('numericInput') formControl!: AbstractControl;
  @Input() isFractionValueAllowed = false;
  @Input() isNegativeValueAllowed = false;

  private dotString = '.';
  private subscriptions$ = new Subscription();

  ngOnInit(): void {
    this.subscriptions$.add(
      this.formControl.valueChanges.subscribe(value => {
        value = value.toString();

        if (!value || !this.hasInvalidInput(value)) {
          return;
        }

        let modifiedInputValue = value.trim();

        if (modifiedInputValue) {
          modifiedInputValue = this.getFractionRelatedErrorFixedValue(modifiedInputValue);
          modifiedInputValue = this.getMultipleDotInclusionErrorFixedValue(modifiedInputValue);
          modifiedInputValue = this.getOnlyIntegerValue(modifiedInputValue);
          modifiedInputValue = this.getNonNegativeValue(modifiedInputValue);
        }

        this.formControl.setValue(modifiedInputValue);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  private getFractionRelatedErrorFixedValue(value: string): string {
    if (this.hasFractionalInputError(value)) {
      const index = value.indexOf(this.dotString);

      value = value.slice(0, index);
    }

    return value;
  }

  private getMultipleDotInclusionErrorFixedValue(value: string): string {
    if (this.hasMultipleDotInput(value)) {
      const splittedValue = value.split(this.dotString);
      const initialValue = `${splittedValue.shift()}.`;

      value = splittedValue.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, initialValue);
    }

    return value;
  }

  private getOnlyIntegerValue(value: string): string {
    let onlyInters = value;

    if (this.hasNaNValue(value)) {
      const compromisingItems = ['0', this.dotString];

      onlyInters = value
        .split('')
        .filter(letter => Number(letter) || compromisingItems.includes(letter))
        .join('')
        .toString();
    }

    return onlyInters;
  }

  private getNonNegativeValue(value: string): string {
    return this.hasNegativeValue(value) ? value.slice(1, value.length) : value;
  }

  private hasInvalidInput(value: string): boolean {
    return (
      this.hasFractionalInputError(value) ||
      this.hasMultipleDotInput(value) ||
      this.hasNaNValue(value) ||
      this.hasWhiteSpace(value) ||
      this.hasNegativeValue(value)
    );
  }

  private hasFractionalInputError(value: string): boolean {
    return !this.isFractionValueAllowed && value.includes(this.dotString);
  }

  private hasMultipleDotInput(value: string): boolean {
    return value.includes(this.dotString) && value.split(this.dotString).length > 2;
  }

  private hasNaNValue(value: string): boolean {
    return isNaN(Number(value));
  }

  private hasWhiteSpace(value: string): boolean {
    return value.length > value.trim().length;
  }

  private hasNegativeValue(value: string): boolean {
    return !!value.match(/-/gm);
  }
}
