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
  NgZone,
  HostListener,
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
  @ViewChild('dropdownOptions') dropdownOptions!: ElementRef;

  isOpen: boolean = false;
  focused: boolean = false;
  touched: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  private clickOutsideListener: (() => void) | null = null;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.removeClickOutsideListener();
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
      this.setupClickOutsideListener();
      this.positionDropdown();
    } else {
      this.onBlur();
      this.removeClickOutsideListener();
    }
  }

  private positionDropdown(): void {
    // We need to wait for Angular to update the DOM before positioning
    setTimeout(() => {
      if (this.dropdownOptions && this.selectElement) {
        const selectRect =
          this.selectElement.nativeElement.getBoundingClientRect();
        const optionsElement = this.dropdownOptions.nativeElement;

        // Position the dropdown in fixed position relative to the viewport
        this.renderer.setStyle(optionsElement, 'position', 'fixed');
        this.renderer.setStyle(optionsElement, 'left', `${selectRect.left}px`);

        // Check if there's enough space below
        const spaceBelow = window.innerHeight - selectRect.bottom;
        const optionsHeight = Math.min(200, this.options.length * 40); // Approximate height

        if (spaceBelow < optionsHeight && selectRect.top > optionsHeight) {
          // Position above if there's more space there
          this.renderer.setStyle(
            optionsElement,
            'top',
            `${selectRect.top - optionsHeight}px`
          );
        } else {
          // Position below
          this.renderer.setStyle(
            optionsElement,
            'top',
            `${selectRect.bottom}px`
          );
        }

        // Set width to match the select element
        this.renderer.setStyle(
          optionsElement,
          'width',
          `${selectRect.width}px`
        );
        this.renderer.setStyle(optionsElement, 'min-width', '200px'); // Ensure min-width
      }
    }, 0);
  }

  private setupClickOutsideListener(): void {
    this.removeClickOutsideListener(); // Clean up any existing listener

    this.ngZone.runOutsideAngular(() => {
      this.clickOutsideListener = this.renderer.listen(
        document,
        'click',
        (event) => {
          // Close dropdown if clicked outside
          if (
            !this.elementRef.nativeElement.contains(event.target) &&
            !(
              this.dropdownOptions &&
              this.dropdownOptions.nativeElement.contains(event.target)
            )
          ) {
            this.ngZone.run(() => {
              this.isOpen = false;
              this.removeClickOutsideListener();
              this.onBlur();
            });
          }
        }
      );
    });
  }

  private removeClickOutsideListener(): void {
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
    this.onBlur();
    this.removeClickOutsideListener();
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

  isOptionSelected(option: any): boolean {
    if (typeof option === 'object') {
      return option[this.valueField] === this._value;
    }
    return option === this._value;
  }

  // Handle window resize events to reposition dropdown
  @HostListener('window:resize')
  onResize(): void {
    if (this.isOpen) {
      this.positionDropdown();
    }
  }
}
