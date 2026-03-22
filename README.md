# AuraPK - Premium Perfume E-Commerce Website

🌐 **Live Website:** https://aura-pk.vercel.app/

A modern, responsive perfume e-commerce website built with HTML, CSS, and JavaScript. Perfect for selling luxury fragrances in Pakistan.

---

## 🌟 Features

### Core Features
- **Multiple Collections** - Men's, Women's, and Unisex fragrance categories
- **Quick View Modal** - Browse product details without leaving the page
- **Size Selection** - Choose between 30ml, 50ml, and 100ml bottles
- **Quantity Selection** - Adjust product quantity with +/- buttons
- **Shopping Cart** - Persistent cart using localStorage
- **Checkout System** - Complete order form with Pakistan-specific fields

### Order Management
- **WhatsApp Integration** - Direct orders via WhatsApp (pre-filled message)
- **Auto-calculated Totals** - Real-time price updates
- **Order Confirmation** - Automatic WhatsApp message with order details

### Design & UX
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Premium Aesthetic** - Elegant dark theme with gold accents
- **Smooth Animations** - Fade-in effects and hover transitions
- **Custom Toast Notifications** - Beautiful add-to-cart feedback
- **Mobile Navigation** - Fully functional hamburger menu

### Pakistan-Specific
- **PKR Currency** - All prices in Pakistani Rupees
- **Local Cities** - Dropdown with major Pakistani cities
- **Local Phone Format** - Pakistan mobile number validation
- **Cash on Delivery** - Payment on delivery option

---

## 📁 File Structure

```
perfumes/
├── index.html          # Homepage
├── mens.html           # Men's collection
├── womens.html         # Women's collection
├── unisex.html         # Unisex collection
├── cart.html           # Shopping cart
├── checkout.html       # Checkout form
├── style.css           # All styling
├── script.js           # JavaScript functionality
└── images/             # Product images
    └── perfume-loading.png
```

---

## 🚀 Getting Started

1. **Open in Browser** - Simply double-click `index.html`
2. **No Server Required** - Works with local file access
3. **Customize** - Edit `script.js` to change:
   - WhatsApp number
   - Product prices
   - Product details
   - Images

---

## ⚙️ Configuration

### Change WhatsApp Number
In `script.js`, find and update:
```javascript
const whatsappNumber = "923063159899"; // Pakistan format (without +)
```

### Add/Edit Products
In `script.js`, modify the products array:
```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 8500, // Price in PKR
        image: "images/product.jpg",
        category: "men" // men, women, unisex
    }
];
```

### Change Logo
Replace the logo in `images/` folder and update the `src` in all HTML files.

---

## 📱 Pages Overview

| Page | Description |
|------|-------------|
| `index.html` | Homepage with hero, featured products, about section |
| `mens.html` | Men's fragrance collection |
| `womens.html` | Women's fragrance collection |
| `unisex.html` | Unisex fragrance collection |
| `cart.html` | View cart, adjust quantities, remove items |
| `checkout.html` | Customer details form, order confirmation |

---

## 💳 Payment Method

Currently configured for **Cash on Delivery (COD)** in Pakistan. Customers can:
1. Add items to cart
2. Fill checkout form
3. Order via WhatsApp
4. Pay on delivery

---

## 🔧 Technical Details

- **No Frameworks** - Pure HTML, CSS, JavaScript
- **No Database** - Data stored in JavaScript arrays
- **LocalStorage** - Cart persists across sessions
- **Cross-browser** - Works on Chrome, Firefox, Safari, Edge

---

## 📞 Support

For questions or customizations:
- WhatsApp: 03063159899

---

## 📄 License

This website is ready for commercial use. Customize as needed for your business.

---

**Built with ❤️ for the Pakistani market**
