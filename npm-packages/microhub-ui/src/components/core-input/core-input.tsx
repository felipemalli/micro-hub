import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'core-input',
  styleUrl: 'core-input.css',
  shadow: true,
})
export class CoreInput {
  @Prop() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Prop() placeholder: string = '';
  @Prop() value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() size: 'small' | 'large' = 'large';
  @Prop() name: string = '';
  @Prop() inputId: string = '';
  @Prop() error: boolean = false;

  @Event() coreInput: EventEmitter<Event>;
  @Event() coreChange: EventEmitter<Event>;
  @Event() coreFocus: EventEmitter<FocusEvent>;
  @Event() coreBlur: EventEmitter<FocusEvent>;

  private handleInput = (event: Event) => {
    this.coreInput.emit(event);
  }

  private handleChange = (event: Event) => {
    this.coreChange.emit(event);
  }

  private handleFocus = (event: FocusEvent) => {
    this.coreFocus.emit(event);
  }

  private handleBlur = (event: FocusEvent) => {
    this.coreBlur.emit(event);
  }

  render() {
    return (
      <input
        class={`input input--${this.size} ${this.error ? 'input--error' : ''}`}
        type={this.type}
        placeholder={this.placeholder}
        value={this.value}
        disabled={this.disabled}
        required={this.required}
        name={this.name}
        id={this.inputId}
        onInput={this.handleInput}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        aria-invalid={this.error ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : 'false'}
      />
    );
  }
} 