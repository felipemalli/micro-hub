import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'core-button',
  styleUrl: 'core-button.css',
  shadow: true,
})
export class CoreButton {
  @Prop() variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'underline' = 'primary';
  @Prop() disabled: boolean = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  @Event() coreClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) this.coreClick.emit(event);
  }

  render() {
    return (
      <button
        class={`btn btn--${this.variant} btn--${this.size}`}
        disabled={this.disabled}
        type={this.type}
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : 'false'}
      >
        <slot></slot>
      </button>
    );
  }
}