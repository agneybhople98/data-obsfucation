import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: any[] = [];
  @Input() displayField: string = 'name';
  @Input() valueField: string = 'id';
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
  @Output() selectionChange = new EventEmitter<any>();

  private _value: any = '';

  @ViewChild('selectElement') selectElement!: ElementRef;

  isOpen: boolean = false;
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

  get selectedOption(): any {
    if (!this.hasValue || !this.options || this.options.length === 0) {
      return null;
    }

    return this.options.find((option) => {
      if (typeof option === 'object') {
        return option[this.valueField] === this._value;
      }
      return option === this._value;
    });
  }

  get displayValue(): string {
    if (!this.selectedOption) {
      return '';
    }

    if (typeof this.selectedOption === 'object') {
      return this.selectedOption[this.displayField];
    }

    return this.selectedOption;
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

  toggleDropdown(): void {
    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onFocus();
    } else {
      this.onBlur();
    }
  }

  selectOption(option: any): void {
    const value = typeof option === 'object' ? option[this.valueField] : option;
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(value);
    this.selectionChange.emit(option);
    this.isOpen = false;
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
    this.selectElement.nativeElement.focus();
  }
}
