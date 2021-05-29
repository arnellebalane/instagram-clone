# Setup VueJS project

1. Install `vue` (we'll be using Vue3)

   ```bash
   npm install vue@next
   ```

1. Create `src/components/App.vue`

   ```vue
   <template>
     <div class="Wrapper">
       <h1>Hello Vue!</h1>
     </div>
   </template>

   <style scoped>
   .Wrapper {
     display: flex;
     flex-direction: column;

     max-width: 54rem;
     min-height: 100vh;
     padding: 7.4rem 2.4rem;
     margin: 0 auto;
   }
   </style>
   ```

1. Update `src/index.js`

   ```diff
   - console.log('Hello world');
   + import { createApp } from 'vue';
   + import App from './components/App.vue';

   + const app = createApp(App);
   + app.mount('#app');
   ```

1. Update `index.html`

   ```diff
     <body>
   -   <h1>Instagram Clone</h1>
   +   <div id="app"></div>
       <script type="module" src="./src/index.js"></script>
     </body>
   ```

### Switch to completed branch for this step:

```bash
git checkout 02-setup-vue-project
```

---

- [**Return to previous step**](01-setup-boilerplate.md)
- [**Proceed to next step**](03-setup-build-tools.md)
