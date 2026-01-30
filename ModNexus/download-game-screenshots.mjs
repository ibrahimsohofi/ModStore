// Script to download screenshots for all games
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to download an image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
      }
    });
  });
};

// Define images to download
const gameImages = [
  // MONOPOLY GO!
  {
    url: 'https://play-lh.googleusercontent.com/5iHLmT2qZU6z2KWfvl_4rQxE7PfRp3cGQDANuhKYvOKfT3eftdXvBnoJGkSqIPXYOA=w240-h480-rw',
    filename: 'monopoly-go.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/7yIB9d6ZE6hfOyq35Ec2MNKM-kROGwnGRO_TWkGOaLzD7kDeSGygpnMXHBisjQqPmg=w526-h296-rw',
    filename: 'screenshots/monopoly-go-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/yBCBnw5YQVfbUCQaO5HnJmk1CHPY2eCe20NiIjxrDmndFJTFRRKnmLRNDGWgJbfM7OI=w526-h296-rw',
    filename: 'screenshots/monopoly-go-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/g1PH15zyP0M5eWvVGSzQb9CyFRHgMQrTvvqQqz2i3sZWXYOIGdzvbS-AprnAoLkSQDw=w526-h296-rw',
    filename: 'screenshots/monopoly-go-3.jpg'
  },

  // Block Blast
  {
    url: 'https://play-lh.googleusercontent.com/S8IlaqQto9W_SL2IkQPiXBH7lv6uBWRFqhjCIOkoE4Fgf_6mCjbp9uxWhojnHZ77pw=w240-h480-rw',
    filename: 'block-blast.jpg'
  },

  // Township
  {
    url: 'https://play-lh.googleusercontent.com/z2lDFiCRY30MpUKcH4FAM6r-q-WVnbuICgCAlrQ0X_vqoR-dKvHg7UxapQqtXwPh8Xo=w240-h480-rw',
    filename: 'township.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/QoPW71ogRIKXxr76lZk8BHfb_rrMYHDYXgWLfpnPEqoCBbbgJCJ6lqSNRVG4fj0F2Q=w526-h296-rw',
    filename: 'screenshots/township-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/9_5XEqsJZ0jwNzFqXOYdIEboq9xBXiAgwxzVoK6hKBLPJ_gZQeluPrIJWg9ka1PnOK4=w526-h296-rw',
    filename: 'screenshots/township-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/fHJo7TghcpI_wB9TTfqYgWdLl_2yoIDM93wlNVAcF8DOF1Mm831q1jHHsG584oKXPQ=w526-h296-rw',
    filename: 'screenshots/township-3.jpg'
  },

  // Last War: Survival
  {
    url: 'https://play-lh.googleusercontent.com/5XxYq1FPvwEO7ZCiaG1mWATEuMnyb4IG3aWZ_d2H8-T3JBxPMgfLsfMnHwGD7gR9rA=w240-h480-rw',
    filename: 'last-war-survival.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/7dHRFwc38-IW8JJgJoqECcDfm_NpX9UrzqtiUzYAkQfxgwGiBfyq-SH1qWwQAQTqaXOF=w526-h296-rw',
    filename: 'screenshots/last-war-survival-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/oCmWJ-yNx1-lOWWXHKKjMMnJC_kfH1U9IgqULCIQrfUU6LK2y9yARMdRGr-ZznBQJA=w526-h296-rw',
    filename: 'screenshots/last-war-survival-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/Nv-1ePHJ3w3UgFTyUOUKy_PXSiBsj17hSZVIFtP9U18Lw9a2yPzr8bNWhOI1JO_FptA=w526-h296-rw',
    filename: 'screenshots/last-war-survival-3.jpg'
  },

  // Call of Duty: Warzone Mobile
  {
    url: 'https://play-lh.googleusercontent.com/KGZC4vOfDXGjb8uGIEWNqBqKhGevKn5IMmD9X7U3wpHo8pO7BjIqR8iR0kLaKpnbAyM=w240-h480-rw',
    filename: 'cod-warzone-mobile.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/P1sHtZkZIbRkadBczuKmdZ4_lFhpbCDVdaQXIJnNdLqc0r9gU56FyYMNJZQoCZUvkA=w526-h296-rw',
    filename: 'screenshots/cod-warzone-mobile-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/X8mjAXtCEbdPKx-SgMTAV8oJmZ-dIvroULG-xtN3kVRqcgRnfOu-5wj9zZ7MOxkEvw=w526-h296-rw',
    filename: 'screenshots/cod-warzone-mobile-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/_nJB4F_m8dv5gkZHkHmqJNUhCR9GsQlD2bQ5dKL1ueIRySyQMZQZUU0y3JLO0Yk6qTI=w526-h296-rw',
    filename: 'screenshots/cod-warzone-mobile-3.jpg'
  }
];

// Add screenshots for original games that might be missing
const originalGameScreenshots = [
  // Clash Royale
  {
    url: 'https://play-lh.googleusercontent.com/AHWuE4BcSgKxuBoMhYfGXt9xQUFVxJNIlKPTkQOHJy1dRGmdPJYzs0VD_TaHNe2XSg=w526-h296-rw',
    filename: 'screenshots/clash-royale-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/RGkIP3G0xSIPXPYCDaAjM6QAG2DEi0a5EaoQT-xmqHKL-Ib_je0jaNR-pK8GeyLXmDqf=w526-h296-rw',
    filename: 'screenshots/clash-royale-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/PvnSOa6TLdJfBc-afh_qtq66feZ3UQnVDmMfn4v3tOPNc58091peSAL6yKvzCzcZ5g=w526-h296-rw',
    filename: 'screenshots/clash-royale-3.jpg'
  },

  // Candy Crush
  {
    url: 'https://play-lh.googleusercontent.com/V3J5RVh9fHWMtXyiJitE3i6LK5E3Lz6kUYDV5ADa0PGHBLhK_nGuKnjDzjZk-6HurpQ=w526-h296-rw',
    filename: 'screenshots/candy-crush-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/hVCQlGjUzJZjNbJEXuX7XGO29jU98K4oRB2HV_PwaIgc1HBh0R8QqrYA_k3a_BhIFjM=w526-h296-rw',
    filename: 'screenshots/candy-crush-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/MGhkRbRX6LiP9eQZeP5nRTMjtxAtqSoGDsZPbZ-4N9_nKIz_XTG0hLRIZTLKUula78s=w526-h296-rw',
    filename: 'screenshots/candy-crush-3.jpg'
  },

  // PUBG Mobile
  {
    url: 'https://play-lh.googleusercontent.com/NJ5FdXg-69TlnDDgY4mTAYb-K0c-foCf1HX2Y7GR8zs6jmL-HIf-QFrwVMjqpzhtUw=w526-h296-rw',
    filename: 'screenshots/pubg-mobile-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/lq6YImNKSRMtV-J2P6_PSCQFuVJ-_zyqDZfhJ-WmzG1IDrxL0vOBc90ft8nTpzBOFA=w526-h296-rw',
    filename: 'screenshots/pubg-mobile-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/bJ7fblYWMWUwP2LLuiUJbXI4FbZUzpEjS5n-1E-lF4qiGYDb9tV6T2YPfAJ5aGvdSQE=w526-h296-rw',
    filename: 'screenshots/pubg-mobile-3.jpg'
  },

  // Genshin Impact
  {
    url: 'https://play-lh.googleusercontent.com/8d6tI9RXgUWlGmJ5B3W6DiUlQfjRHbSEAFU6RJ9WvXRHZIY2CBrRHiZeCYkwk6V_90g=w526-h296-rw',
    filename: 'screenshots/genshin-impact-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/mXcM3dy-OwCXDR_zQIqF7kG1y5ZNRjcYLdz0FaKZhPZA5mTF1e0w5lUYBBYMw28tOr4=w526-h296-rw',
    filename: 'screenshots/genshin-impact-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/BVnrlScxQFG2K162C3p9Uq9Tbo33FLBnJLhHMiR5jH5kYYxUAHfA4Pan1pAQSKzBCg=w526-h296-rw',
    filename: 'screenshots/genshin-impact-3.jpg'
  },

  // Pokemon GO
  {
    url: 'https://play-lh.googleusercontent.com/GIbXS0Cu2Z5T9RMNRH3shPGGpJWV-yKJKdmwxIdBQjOJ1zxcghMQ29Z_LzsPWk1J7w=w526-h296-rw',
    filename: 'screenshots/pokemon-go-1.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/GrXHLEEYLMxvUdUL3Xei-FWMVgSlJI72InEyxKJzTOEEJeMqRYBVppkXBYZOQYGnP1E=w526-h296-rw',
    filename: 'screenshots/pokemon-go-2.jpg'
  },
  {
    url: 'https://play-lh.googleusercontent.com/bK3s_Idd1QP7rx0dTzCh6QzZJH_9YMnhjCWE3VJKvRQp1nrEBdD5D97_6nECw4-x7A=w526-h296-rw',
    filename: 'screenshots/pokemon-go-3.jpg'
  }
];

// Add all the images together
const allImages = [...gameImages, ...originalGameScreenshots];

// Set up the directory paths
const baseDir = path.join(__dirname, 'public', 'images', 'games');

// Ensure directories exist
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}
if (!fs.existsSync(path.join(baseDir, 'screenshots'))) {
  fs.mkdirSync(path.join(baseDir, 'screenshots'), { recursive: true });
}

// Download all images
Promise.all(
  allImages.map(image =>
    downloadImage(image.url, path.join(baseDir, image.filename))
      .then(() => console.log(`Downloaded ${image.filename}`))
      .catch(err => console.error(`Error downloading ${image.filename}:`, err))
  )
)
.then(() => console.log('All downloads complete!'))
.catch(err => console.error('Error during downloads:', err));
