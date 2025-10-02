# Rynix Portfolio

A portfolio website for Rynix, showcasing music video editing services, commissions, pricing tiers, and creative projects.

## Features

- Responsive design with dark/light theme toggle
- Services and pricing information
- Portfolio showcase
- Contact form with EmailJS integration
- YouTube video integration for background media

## Tech Stack

- React 18
- Vite
- CSS Modules
- EmailJS for contact form
- YouTube API for video embeds

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gaben69181/mv-portfolio.git
   cd mv-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys (optional for basic functionality):
   ```env
   VITE_YT_API_KEY=your_youtube_api_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATEOWNER_ID=your_emailjs_template_owner_id
   VITE_EMAILJS_TEMPLATECLIENT_ID=your_emailjs_template_client_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file contains the necessary configuration.

## Project Structure

```
src/
├── components/     # React components
├── context/        # React context for theme management
├── hooks/          # Custom hooks
├── services/       # API services
└── assets/         # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.
