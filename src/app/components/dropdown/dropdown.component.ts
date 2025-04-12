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
  Renderer2,
  OnDestroy,
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
export class DropdownComponent implements OnDestroy {
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

  private overlayElement: HTMLElement | null = null;
  private clickOutsideListener: (() => void) | null = null;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.removeOverlay();
    if (this.clickOutsideListener) {
      this.clickOutsideListener();
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

    // Always remove existing overlay first
    this.removeOverlay();

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.createOverlay();
      this.onFocus();
    } else {
      this.onBlur();
    }
  }

  private createOverlay() {
    // Double check that any existing overlay is removed
    this.removeOverlay();

    const selectElement = this.selectElement.nativeElement;
    const rect = selectElement.getBoundingClientRect();

    this.overlayElement = this.renderer.createElement('div');
    this.renderer.addClass(this.overlayElement, 'dropdown-options');
    this.renderer.addClass(this.overlayElement, 'open');

    // Position the overlay
    this.renderer.setStyle(this.overlayElement, 'top', `${rect.bottom}px`);
    this.renderer.setStyle(this.overlayElement, 'left', `${rect.left}px`);
    this.renderer.setStyle(this.overlayElement, 'width', `${rect.width}px`);

    // Add options to overlay
    this.options.forEach((option) => {
      const optionElement = this.renderer.createElement('div');
      this.renderer.addClass(optionElement, 'dropdown-option');

      // Add selected class if this is the selected option
      if (this.isOptionSelected(option)) {
        this.renderer.addClass(optionElement, 'selected');
      }

      this.renderer.setProperty(
        optionElement,
        'textContent',
        typeof option === 'object' ? option[this.displayField] : option
      );

      this.renderer.listen(optionElement, 'click', (event) => {
        event.stopPropagation();
        this.selectOption(option);
      });

      this.renderer.appendChild(this.overlayElement, optionElement);
    });

    this.renderer.appendChild(document.body, this.overlayElement);

    // Remove any existing click outside listener
    if (this.clickOutsideListener) {
      this.clickOutsideListener();
    }

    // Add new click outside listener
    this.clickOutsideListener = this.renderer.listen(
      'document',
      'click',
      (event) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.isOpen = false;
          this.removeOverlay();
        }
      }
    );
  }

  private removeOverlay() {
    if (this.overlayElement) {
      this.renderer.removeChild(document.body, this.overlayElement);
      this.overlayElement = null;
    }

    // Also remove click outside listener
    if (this.clickOutsideListener) {
      this.clickOutsideListener();
      this.clickOutsideListener = null;
    }
  }

  selectOption(option: any): void {
    const value = typeof option === 'object' ? option[this.valueField] : option;
    this._value = value;
    this.onChange(value);
    this.valueChange.emit(value);
    this.selectionChange.emit(option);
    this.isOpen = false;
    this.removeOverlay(); // Ensure overlay is removed after selection
    this.onBlur(); // Ensure proper state cleanup
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

  private isOptionSelected(option: any): boolean {
    if (typeof option === 'object') {
      return option[this.valueField] === this._value;
    }
    return option === this._value;
  }
}
