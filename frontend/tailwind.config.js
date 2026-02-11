/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: "#1F2937",      // dark slate - main text, headers
        secondary: "#374151",    // secondary slate - subtext
        accent: "#2563EB",       // muted blue - buttons, links
        
        // Background & Surface
        background: "#F9FAFB",   // light gray - page background
        surface: "#FFFFFF",      // white - cards, modals
        border: "#E5E7EB",       // light gray - borders, dividers
        
        // Status Colors
        success: "#15803D",      // green - success states
        warning: "#B45309",      // orange - warning states
        error: "#B91C1C",        // red - error states
        info: "#1D4ED8",         // blue - info states
        
        // Text Colors
        muted: "#6B7280",        // gray - secondary text, placeholders
        disabled: "#9CA3AF",     // lighter gray - disabled text
        
        // Hover States
        "accent-hover": "#1D4ED8",     // darker blue for hover
        "surface-hover": "#F3F4F6",    // slight gray for hover on white
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
      }
    },
  },
  plugins: [],
}
