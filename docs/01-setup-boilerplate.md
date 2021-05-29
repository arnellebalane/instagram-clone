# Setup project boilerplate

1. Create `index.html`

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />

       <link
         rel="stylesheet"
         href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700&display=swap"
       />
       <link rel="stylesheet" href="./src/index.css" />

       <title>Instagram Clone</title>
     </head>

     <body>
       <h1>Instagram Clone</h1>
       <script type="module" src="./src/index.js"></script>
     </body>
   </html>
   ```

1. Create `src/index.css`

   ```css
   *,
   *::before,
   *::after {
     box-sizing: border-box;
     margin: 0;
   }

   html {
     --primary: #60a5fa;
     --danger: #ef4444;
     --white: #fff;
     --gray-50: #f9fafb;
     --gray-100: #f3f4f6;
     --gray-200: #e5e7eb;
     --gray-300: #d1d5db;
     --gray-400: #9ca3af;
     --gray-500: #6b7280;
     --gray-600: #4b5563;
     --gray-700: #374151;
     --gray-800: #1f2937;
     --gray-900: #111827;
     --gray-transparent: rgba(17, 24, 39, 0.5);

     font-size: 62.5%;
   }

   body {
     min-height: 100vh;
     font-family: 'Inter', sans-serif;
     font-size: 1.4rem;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     color: var(--gray-900);
     background-color: var(--gray-50);
   }

   a,
   input,
   button,
   textarea {
     font: inherit;
     color: inherit;
   }

   a {
     text-decoration: none;
   }

   input:disabled,
   button:disabled {
     opacity: 0.5;
     cursor: not-allowed;
   }
   ```

1. Create `src/index.js`

   ```js
   console.log('Hello world');
   ```

### Switch to completed branch for this step:

```bash
git checkout 01-setup-boilerplate
```

---

- [**Proceed to next step**](02-setup-vue-project.md)
