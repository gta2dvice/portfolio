# Cinematic Portfolio Website

A high-end, production-grade personal portfolio website built with pure HTML5, CSS3, Vanilla JavaScript, and Node.js with Express.

## 🚀 Features

- **Cinematic Hero Section** with animated particle background and typing animation
- **Scroll-Based Animations** using Intersection Observer API
- **Dark/Light Mode Toggle** with smooth transitions and localStorage persistence
- **Advanced UI Effects**: Glassmorphism, 3D tilt cards, neon glows, gradient borders
- **Interactive Skills Section** with animated circular progress indicators
- **Project Showcase** with 3D hover effects and GitHub links
- **Creative Work Gallery** with masonry layout and Pinterest integration
- **Contact Form** with real-time validation and backend submission
- **Custom Cursor** effect for enhanced interactivity
- **Fully Responsive** design optimized for all devices
- **Performance Optimized** with lazy loading and throttled scroll events

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── css/
│   │   └── style.css          # All styles and animations
│   ├── js/
│   │   └── main.js            # All JavaScript functionality
│   ├── images/                # Image assets (add your images here)
│   ├── index.html             # Main HTML file
│   └── 404.html               # Custom 404 page
├── routes/                    # Express routes (if needed)
├── server.js                  # Express server configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎨 Customization

### Personal Information

Edit `public/index.html` to update:
- Your name in the hero section
- About section content
- Education timeline
- Project details and GitHub links
- Contact information
- Social media links

### Styling

All styles are in `public/css/style.css`. The file uses CSS variables for easy theming:
- Modify `:root` and `[data-theme="dark"]` sections to change colors
- Adjust animation timings and effects as needed

### Skills & Projects

- Update skill percentages in `public/index.html`
- Add/remove project cards as needed
- Update GitHub repository links

### Creative Work

- Replace placeholder creative items with your actual work
- Update Pinterest profile links
- Add images to `public/images/` directory

## 🔧 Configuration

### Port Configuration

The server runs on port 3000 by default. To change it:

1. Edit `server.js`:
   ```javascript
   const PORT = process.env.PORT || 3000; // Change 3000 to your preferred port
   ```

2. Or set environment variable:
   ```bash
   PORT=8080 npm start
   ```

### Contact Form

The contact form submits to `/api/contact`. Currently, it logs submissions to the console. To add email functionality:

1. Install a package like `nodemailer`:
   ```bash
   npm install nodemailer
   ```

2. Update the contact route in `server.js` to send emails

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Performance Tips

- Optimize images before adding to `public/images/`
- Use WebP format for better compression
- Consider adding a CDN for static assets in production
- Enable gzip compression in production

## 🚀 Deployment

### Deploy to Heroku

1. Create a `Procfile`:
   ```
   web: node server.js
   ```

2. Push to Heroku:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

### Deploy to Vercel/Netlify

For serverless deployment, you may need to adapt the Express server or use serverless functions.

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🙏 Credits

Built with pure HTML, CSS, and JavaScript - no frameworks, no libraries, just clean code.

---

**Note:** Remember to update all placeholder content (name, email, GitHub links, etc.) before deploying!

