import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'microhub-ui',
  globalStyle: 'src/global/app.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    reactOutputTarget({
      stencilPackageName: '@felipemalli-libs/microhub-ui',
      outDir: './react',
    }),
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
}; 