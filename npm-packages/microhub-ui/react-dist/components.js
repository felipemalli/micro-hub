'use client';
import { CoreButton as CoreButtonElement, defineCustomElement as defineCoreButton } from "@felipemalli-libs/microhub-ui/dist/components/core-button.js";
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
