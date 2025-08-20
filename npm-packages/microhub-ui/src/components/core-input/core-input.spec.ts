import { newSpecPage } from "@stencil/core/testing";
import { CoreInput } from "./core-input";

describe("core-input", () => {
	it("renders with default props", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input></core-input>`,
		});

		const input = page.root?.shadowRoot?.querySelector("input");
		expect(input?.classList.contains("input")).toBe(true);
		expect(input?.classList.contains("input--large")).toBe(true);
		expect(input?.type).toBe("text");
		expect(input?.value).toBe("");
	});

	it("applies size classes correctly", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input size="small"></core-input>`,
		});

		const input = page.root?.shadowRoot?.querySelector("input");
		expect(input?.classList.contains("input--small")).toBe(true);
	});

	it("applies error state correctly", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input error></core-input>`,
		});

		const input = page.root?.shadowRoot?.querySelector("input");
		expect(input?.classList.contains("input--error")).toBe(true);
		expect(input?.getAttribute("aria-invalid")).toBe("true");
	});

	it("handles disabled state", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input disabled></core-input>`,
		});

		const input = page.root?.shadowRoot?.querySelector("input");
		expect(input?.hasAttribute("disabled")).toBe(true);
		expect(input?.getAttribute("aria-disabled")).toBe("true");
	});

	it("sets input attributes correctly", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input type="email" placeholder="Digite seu email" value="test@example.com" name="email" input-id="email-input" required></core-input>`,
		});

		const input = page.root?.shadowRoot?.querySelector("input");
		expect(input?.type).toBe("email");
		expect(input?.placeholder).toBe("Digite seu email");
		expect(input?.value).toBe("test@example.com");
		expect(input?.name).toBe("email");
		expect(input?.id).toBe("email-input");
		expect(input?.hasAttribute("required")).toBe(true);
	});

	it("emits coreInput event when input changes", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input></core-input>`,
		});

		const inputSpy = jest.fn();
		page.root?.addEventListener("coreInput", inputSpy);

		const input = page.root?.shadowRoot?.querySelector("input");
		input?.dispatchEvent(new Event("input"));

		await page.waitForChanges();
		expect(inputSpy).toHaveBeenCalled();
	});

	it("emits coreChange event when input changes", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input></core-input>`,
		});

		const changeSpy = jest.fn();
		page.root?.addEventListener("coreChange", changeSpy);

		const input = page.root?.shadowRoot?.querySelector("input");
		input?.dispatchEvent(new Event("change"));

		await page.waitForChanges();
		expect(changeSpy).toHaveBeenCalled();
	});

	it("emits coreFocus event when input receives focus", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input></core-input>`,
		});

		const focusSpy = jest.fn();
		page.root?.addEventListener("coreFocus", focusSpy);

		const input = page.root?.shadowRoot?.querySelector("input");
		input?.dispatchEvent(new FocusEvent("focus"));

		await page.waitForChanges();
		expect(focusSpy).toHaveBeenCalled();
	});

	it("emits coreBlur event when input loses focus", async () => {
		const page = await newSpecPage({
			components: [CoreInput],
			html: `<core-input></core-input>`,
		});

		const blurSpy = jest.fn();
		page.root?.addEventListener("coreBlur", blurSpy);

		const input = page.root?.shadowRoot?.querySelector("input");
		input?.dispatchEvent(new FocusEvent("blur"));

		await page.waitForChanges();
		expect(blurSpy).toHaveBeenCalled();
	});
});
