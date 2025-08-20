'use client';
import { CoreButton as CoreButtonElement, defineCustomElement as defineCoreButton } from "@felipemalli-libs/microhub-ui/dist/components/core-button.js";
import { CoreInput as CoreInputElement, defineCustomElement as defineCoreInput } from "@felipemalli-libs/microhub-ui/dist/components/core-input.js";
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
export const CoreButton = /*@__PURE__*/ createComponent({
    tagName: 'core-button',
    elementClass: CoreButtonElement,
    // @ts-ignore - ignore potential React type mismatches between the Stencil Output Target and your project.
    react: React,
    events: { onCoreClick: 'coreClick' },
    defineCustomElement: defineCoreButton
});
export const CoreInput = /*@__PURE__*/ createComponent({
    tagName: 'core-input',
    elementClass: CoreInputElement,
    // @ts-ignore - ignore potential React type mismatches between the Stencil Output Target and your project.
    react: React,
    events: {
        onCoreInput: 'coreInput',
        onCoreChange: 'coreChange',
        onCoreFocus: 'coreFocus',
        onCoreBlur: 'coreBlur'
    },
    defineCustomElement: defineCoreInput
});
