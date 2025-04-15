import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  showPassword = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() additionalInfo: string = '';

  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  @Input()
  set value(val: any) {
    this._value = val;
    this.onChange(this._value);
  }

  get value(): any {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<any>();

  private _value: any = '';

  @ViewChild('input') inputElement!: ElementRef;

  focused: boolean = false;
  touched: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  get invalid(): boolean {
    return (
      this.control?.invalid && (this.control?.touched || this.control?.dirty)
    );
  }

  get hasValue(): boolean {
    return (
      this._value !== undefined && this._value !== null && this._value !== ''
    );
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onBlur(): void {
    this.focused = false;
    this.touched = true;
    this.onTouched();
  }

  onFocus(): void {
    this.focused = true;
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  // Add this method to your component class:
  togglePasswordVisibility() {
    if (!this.disabled) {
      this.showPassword = !this.showPassword;
    }
  }
}
