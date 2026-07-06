# Joey Miral — Portfolio

A personal portfolio site built with React, Vite, and Tailwind CSS, based on the original Figma wireframe.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open the URL it prints (usually `http://localhost:5173`).

3. **Build for production**

   ```bash
   npm run build
   ```

   Output goes to the `dist/` folder — upload that anywhere (Vercel, Netlify, GitHub Pages, etc.).

## Project structure

```
joey-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx       # The portfolio page itself
    └── index.css     # Tailwind imports + base styles
```

## Things to swap in before publishing

- **Photo**: replace the gray "Photo" placeholder in the About section with a real `<img>`.
- **Resume**: replace the "Resume Preview" box and "Attached Resume" button with a real PDF link or embed.
- **Social links**: the Facebook and LinkedIn icons in the footer currently link to `#` — drop in your real profile URLs in `src/App.jsx` under the `FOOTER` section.
- **Contact form**: the form currently just shows a "Message sent!" confirmation locally. To actually receive messages, wire it up to a service like Formspree, EmailJS, or your own backend endpoint inside the `handleSubmit` function in `src/App.jsx`.
- **Projects links**: each project card links to `#` — point these at your live Behance case studies.

## Dark mode

The toggle in the top-right switches the whole page between light and dark using local component state — no extra setup needed.
