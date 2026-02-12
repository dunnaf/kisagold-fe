# Kisa Gold - Company Profile Frontend

Vue 3 company profile application with Tailwind CSS, featuring a clean architecture and API-ready structure.

## Tech Stack

- **Vue 3.5** (Composition API with `<script setup>`)
- **Vite 5** (Fast build tool)
- **Vue Router 4** (Client-side routing)
- **Tailwind CSS 3** (Utility-first CSS)
- **Axios** (HTTP client)
- **pnpm** (Package manager)

## Features

- ✅ Responsive design (Mobile & Desktop only)
- ✅ Custom fonts (Assistant & Trajan Pro)
- ✅ Shared layout with header & footer
- ✅ 3 pages: Homepage, Product List, Product Detail
- ✅ API-ready architecture with composables
- ✅ Clean component structure

## Project Structure

```
/
├── public/
│   └── fonts/              # Custom fonts (Assistant, Trajan Pro)
├── src/
│   ├── assets/styles/      # CSS files
│   ├── components/layout/  # Layout components (Header, Footer, Layout)
│   ├── views/              # Page components
│   ├── composables/        # Reusable composition functions
│   ├── services/           # API service layer
│   ├── router/             # Vue Router configuration
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables (optional)
cp .env.example .env
```

### Development

```bash
# Start dev server on http://localhost:3000
pnpm run dev
```

### Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Routes

- `/` - Homepage
- `/products` - Product listing page
- `/products/:id` - Product detail page

## Custom Fonts

Two custom font families are configured:

- **Assistant** - Body text (use `font-assistant` class)
- **Trajan Pro** - Display/headings (use `font-trajan` class)

## Responsive Design

- **Mobile**: Base styles (0-1023px)
- **Desktop**: `lg:` prefix (1024px+)
- **Tablets**: Show mobile version (768px-1023px)

## API Integration

The app is structured for easy API integration:

1. Configure API base URL in `.env` file
2. API services are in `src/services/`
3. Composables handle state management in `src/composables/`
4. Uncomment API calls in page components when ready

### Example API Usage

```vue
<script setup>
import { onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Customization

### Colors

Edit `tailwind.config.js` to add custom colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Fonts

Add more font weights in `src/assets/styles/fonts.css` and update `tailwind.config.js`.

## License

Private project
