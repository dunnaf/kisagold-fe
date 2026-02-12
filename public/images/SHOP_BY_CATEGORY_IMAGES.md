# Shop By Category - Required Images

This document lists the background images needed for the Shop By Category section on the homepage.

## Image Requirements

All images should be placed in `/kisagold-fe/public/images/` directory.

### 1. KISA24 Classic 99.99% Card
- **Filename**: `card-classic-9999.jpg`
- **Dimensions**: 
  - Mobile: 375px x 280px (or larger with same aspect ratio)
  - Desktop: 460px x 560px (or larger with same aspect ratio)
- **Description**: Product image showing the KISA24 Classic 99.99% gold bar with packaging
- **Example**: Black box with gold bar visible, professional product photography

### 2. KISA24 Classic 24K Card
- **Filename**: `card-classic-24k.jpg`
- **Dimensions**: 
  - Mobile: 375px x 280px (or larger with same aspect ratio)
  - Desktop: 460px x 560px (or larger with same aspect ratio)
- **Description**: Product image showing the KISA24 Classic 24K gold bar
- **Example**: Gold bar in protective case, similar style to the 99.99% card

### 3. KISA24 Custom Card
- **Filename**: `card-custom.jpg`
- **Dimensions**: 
  - Mobile: 375px x 280px (or larger with same aspect ratio)
  - Desktop: 460px x 560px (or larger with same aspect ratio)
- **Description**: Image showing custom gold jewelry or personalized pieces
- **Example**: Hand wearing custom gold bracelet or jewelry, lifestyle photography

### 4. Coming Soon Card
- **Filename**: `card-coming-soon.jpg`
- **Dimensions**: 
  - Mobile: 375px x 280px (or larger with same aspect ratio)
  - Desktop: 460px x 560px (or larger with same aspect ratio)
- **Description**: Teaser image for upcoming products
- **Example**: Artistic/abstract image related to gold or craftsmanship, blurred or mysterious

## Image Guidelines

- **Format**: JPG or PNG (JPG recommended for photos)
- **Quality**: High resolution for desktop (at least 920px x 1120px for 2x displays)
- **Optimization**: Compress images to balance quality and loading speed
- **Background Coverage**: Images should work well with text overlay at the bottom
- **Gradient Overlay**: Component adds a gradient overlay from black/80% to transparent, so ensure important subjects are not at the bottom

## Implementation Note

The component uses `background-image` with `bg-cover bg-center` positioning, so images will be cropped to fill the card while maintaining aspect ratio. Ensure the focal point of each image is centered or slightly above center.
