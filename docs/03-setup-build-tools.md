# Setup build tools

1. Install `vite` and plugins

   ```bash
   npm install --save-dev vite @vitejs/plugin-vue @vue/compiler-sfc
   ```

1. Create `vite.config.js`

   ```js
   const path = require('path');
   const VuePlugin = require('@vitejs/plugin-vue');

   module.exports = {
     plugins: [VuePlugin()],

     resolve: {
       alias: {
         '@assets': path.resolve(__dirname, 'src/assets'),
         '@components': path.resolve(__dirname, 'src/components'),
         '@lib': path.resolve(__dirname, 'src/lib'),
         '@pages': path.resolve(__dirname, 'src/pages'),
         '@styles': path.resolve(__dirname, 'src/styles'),
       },
     },
   };
   ```

1. Update imports to use aliases

   - `src/index.js`

     ```diff
       import { createApp } from 'vue';
     - import App from './components/App.vue';
     + import App from '@components/App.vue';

       const app = createApp(App);
       app.mount('#app');
     ```

1. Add npm scripts in `package.json`

   ```diff
   -   "scripts": {},
   +   "scripts": {
   +     "serve": "vite",
   +     "build": "vite build"
   +   },
   ```

1. Test npm scripts

   ```bash
   npm run serve
   npm run build
   ```

### Switch to completed branch for this step:

```bash
git checkout 03-setup-build-tools
```

---

- [**Return to previous step**](02-setup-vue-project.md)
  <<<<<<< HEAD
- # [**Proceed to next step**](04-setup-routing.md)
  > > > > > > > 88d197e (Setup Vue project)
