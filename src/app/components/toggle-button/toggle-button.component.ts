// toggle-button.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  standalone: false,
  template: `
    <div class="toggle-container">
      <button
        class="toggle-button left"
        [class.active]="value === leftValue"
        (click)="onButtonClick(leftValue)"
      >
        {{ leftOption }}
      </button>
      <button
        class="toggle-button right"
        [class.active]="value === rightValue"
        (click)="onButtonClick(rightValue)"
      >
        {{ rightOption }}
      </button>
    </div>
  `,
  styles: [
    `
      .toggle-container {
        display: flex;
        border-radius: 6px;
        overflow: hidden;
        width: fit-content;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .toggle-button {
        padding: 4px 8px;
        border: none;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
        min-width: 40px;
        color: white;
        text-align: center;
      }

      .left {
        background-color: #2a5885;
      }

      .right {
        background-color: #3a75b0;
      }

      .active.left {
        background-color: #1e3f66;
      }

      .active.right {
        background-color: #1e3f66;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
})
export class ToggleButtonComponent implements ControlValueAccessor {
  @Input() leftOption: string = 'AND';
  @Input() rightOption: string = 'OR';
  @Input() leftValue: string = 'and';
  @Input() rightValue: string = 'or';

  // For two-way binding of value (separate from ngModel)
  @Input() value: string = this.leftValue;
  @Output() valueChange = new EventEmitter<string>();

  // Function to call when the value changes
  onChange: any = () => {};

  // Function to call when the control is touched
  onTouched: any = () => {};

  onButtonClick(selectedValue: string): void {
    if (this.value !== selectedValue) {
      this.value = selectedValue;

      // Emit for [(value)] binding
      this.valueChange.emit(this.value);

      // Emit for ngModel binding
      this.onChange(this.value);
      this.onTouched();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }
}
