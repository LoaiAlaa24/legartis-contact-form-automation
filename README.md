# Legartis Contact Form

A React-based contact form matching the official Legartis layout with validation and responsive design.

## Features

- **Official Legartis Layout**: Matches the design from https://www.legartis.ai/resources/get-in-touch
- **Two-Column Layout**: Content section on the left, form on the right
- **Mandatory Fields Validation**: All required fields are validated:
  - First name*
  - Last name* 
  - Business email*
  - Company*
  - Job title*
  - Your Message to Legartis*
  - Privacy Policy acceptance*

- **Complete Content Sections**:
  - "Get in Touch" hero section with subheadline
  - "What Legartis Is All About" with feature bullet points
  - "Looking for Helpful Content?" section with download button

- **Email Validation**: Ensures proper email format
- **Responsive Design**: Adapts to mobile with single-column layout
- **Logo Integration**: Uses the Legartis logo from the public folder
- **Error Handling**: Real-time validation with error messages
- **Professional Styling**: Dark blue background with white content card

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the form in your browser.

## Project Structure

```
src/
├── App.js              # Main application component
├── ContactForm.js      # Contact form component with validation
├── ContactForm.css     # Contact form styles
├── App.css            # App-level styles
└── index.js           # React entry point

public/
├── logo.svg           # Legartis logo
└── index.html         # HTML template
```

## Form Validation

The form includes client-side validation for:
- Required field validation
- Email format validation
- Privacy policy acceptance
- Real-time error display and clearing

## Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.