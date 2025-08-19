import { newSpecPage } from '@stencil/core/testing';
import { CoreButton } from './core-button';

describe('core-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CoreButton],
      html: `<core-button>Click me</core-button>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('btn')).toBe(true);
    expect(button?.classList.contains('btn--primary')).toBe(true);
    expect(button?.classList.contains('btn--medium')).toBe(true);
    expect(button?.type).toBe('button');
  });

  it('applies variant and size classes correctly', async () => {
    const page = await newSpecPage({
      components: [CoreButton],
      html: `<core-button variant="danger" size="large">Delete</core-button>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('btn--danger')).toBe(true);
    expect(button?.classList.contains('btn--large')).toBe(true);
  });

  it('handles disabled state', async () => {
    const page = await newSpecPage({
      components: [CoreButton],
      html: `<core-button disabled>Disabled</core-button>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits coreClick event when clicked and not disabled', async () => {
    const page = await newSpecPage({
      components: [CoreButton],
      html: `<core-button>Click me</core-button>`,
    });

    const clickSpy = jest.fn();
    page.root?.addEventListener('coreClick', clickSpy);
    
    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not emit event when disabled', async () => {
    const page = await newSpecPage({
      components: [CoreButton],
      html: `<core-button disabled>Click me</core-button>`,
    });

    const clickSpy = jest.fn();
    page.root?.addEventListener('coreClick', clickSpy);
    
    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    await page.waitForChanges();
    expect(clickSpy).not.toHaveBeenCalled();
  });
});