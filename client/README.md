# Airbnb Clone
### Terminal Set up
- `cd client`
- `yarn dev`
    - will give you localhost link
### Tailwind CSS
- https://tailwindcss.com/
    - > Docs
    - Search "React"
    - > Vite
- `yarn add tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`
- In `tailwind.config.js` file, place this code:
```
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
- In `index.css` file, place this code:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```