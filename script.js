/* ===== CONFIG ===== */

const WA_NUMBER = "917303040534"; // without + sign


/* ===== DROPDOWN PRODUCT NAVIGATION ===== */

document.addEventListener("DOMContentLoaded", function () {
  
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  
  dropdownItems.forEach(item => {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      
      const productName = this.dataset.product;
      
      // Find matching stage item
      const stageItem = Array.from(document.querySelectorAll(".stage-item")).find(
        item => item.dataset.name === productName
      );
      
      if (stageItem) {
        const index = Array.from(document.querySelectorAll(".stage-item")).indexOf(stageItem);
        current = index;
        updateStage();
        
        // Scroll to product stage
        setTimeout(() => {
          document.querySelector(".product-stage").scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
  });

});


/* ===== BUY BUTTON LOGIC ===== */

document.addEventListener("DOMContentLoaded", function () {

  const buyButtons = document.querySelectorAll(".product-card .buy");

  buyButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const card = btn.closest(".product-card");
      const productName = card.querySelector("h3").innerText;
      const price = card.querySelector(".price").innerText;

      sendWhatsAppOrder(productName, price);
    });
  });
  
  // Product detail page buy button
  const productBuyBtn = document.querySelector(".product-buy");
  
  if (productBuyBtn) {
    productBuyBtn.addEventListener("click", function(e) {
      e.preventDefault();
      
      const productName = document.querySelector(".product-info-section h1").innerText;
      const price = document.querySelector(".product-price").innerText;
      
      sendWhatsAppOrder(productName, price);
    });
  }

});


/* ===== WHATSAPP FUNCTION ===== */

function sendWhatsAppOrder(product, price) {

  const message =
    "नमस्ते 🙏%0A" +
    "मुझे यह प्रोडक्ट चाहिए:%0A" +
    "Product: " + encodeURIComponent(product) + "%0A" +
    "Price: " + encodeURIComponent(price) + "%0A%0A" +
    "कृपया ऑर्डर की प्रक्रिया बताएं।";

  const url = "https://wa.me/" + WA_NUMBER + "?text=" + message;

  window.open(url, "_blank");
}

/* ===== HERO SLIDER ===== */

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const heroSlider = document.querySelector(".hero-slider");
const sliderDots = document.querySelectorAll(".slider-dot");
let slideIndex = 0;
let autoSlideInterval;

document.querySelector(".slider-btn.next").onclick = () => {
  changeSlide(1);
  resetAutoSlide();
};

document.querySelector(".slider-btn.prev").onclick = () => {
  changeSlide(-1);
  resetAutoSlide();
};

function changeSlide(dir) {
  slideIndex = (slideIndex + dir + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  slideIndex = index;
  updateSlider();
}

function updateSlider() {
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  
  // Update dots
  sliderDots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Slider dot click handlers
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    resetAutoSlide();
  });
});

// Auto-slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Pause auto-slide on hover
heroSlider.addEventListener('mouseenter', stopAutoSlide);
heroSlider.addEventListener('mouseleave', startAutoSlide);

// Start auto-slide when page loads
startAutoSlide();


/* ===== PRODUCT STAGE ===== */

const items = document.querySelectorAll(".stage-item");
const track = document.querySelector(".stage-track");
const buyBtn = document.querySelector(".stage-buy");
const stageWrapper = document.querySelector(".stage-wrapper");

let current = 2; // Start with Men's Flyer Capsules (the featured product)
let initialTrackLeft = null; // Store the track's initial left position

function updateStage() {

  items.forEach(item => item.classList.remove("active"));
  items[current].classList.add("active");

  // Get initial track position on first call
  if (initialTrackLeft === null) {
    const trackRect = track.getBoundingClientRect();
    initialTrackLeft = trackRect.left;
  }
  
  // Simple centering: center of window/viewport
  const viewportCenter = window.innerWidth / 2;
  
  // Each item characteristics
  const itemWidth = 220;
  const gap = 40;
  
  // Where the current item's center naturally is (at transform 0)
  const itemNaturalCenter = initialTrackLeft + (current * (itemWidth + gap)) + (itemWidth / 2);
  
  // Calculate how much to translate to align with viewport center  
  const translateX = viewportCenter - itemNaturalCenter;
  
  track.style.transform = `translateX(${translateX}px)`;

}

// Left button handler
document.querySelector(".stage-btn.left").addEventListener("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  current = (current - 1 + items.length) % items.length;
  updateStage();
});

// Right button handler
document.querySelector(".stage-btn.right").addEventListener("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  current = (current + 1) % items.length;
  updateStage();
});

buyBtn.onclick = () => {
  const product = items[current].dataset.name;
  window.open(`https://wa.me/917303040534?text=नमस्ते, मुझे ${encodeURIComponent(product)} के बारे में जानकारी चाहिए।`, "_blank");
};

// Initialize the stage to show correct price on page load
updateStage();

// Recalculate position on window resize
window.addEventListener('resize', function() {
  initialTrackLeft = null; // Reset to recalculate
  updateStage();
});

// Click on poster images to scroll to About section
const posterImages = document.querySelectorAll(".poster-grid img");
posterImages.forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", function() {
    const aboutSection = document.querySelector(".about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
});


/* ===== NEWSLETTER FORM ===== */

document.addEventListener("DOMContentLoaded", function() {
  const newsletterForm = document.getElementById("newsletterForm");
  
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = new FormData(newsletterForm);
      const name = newsletterForm.querySelector('input[type="text"]').value;
      const email = newsletterForm.querySelector('input[type="email"]').value;
      const phone = newsletterForm.querySelector('input[type="tel"]').value;
      
      // You can send this data to your backend here
      // For now, we'll show a success message
      
      const message = `Thank you ${name} for subscribing! 🎉\n\nWe'll send exclusive offers to ${email}`;
      alert(message);
      
      // Optional: Send to WhatsApp
      const whatsappMessage = 
        `New Newsletter Signup 📧%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Phone: ${encodeURIComponent(phone)}`;
      
      // Uncomment to auto-send to WhatsApp
      // window.open(`https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`, '_blank');
      
      newsletterForm.reset();
    });
  }
});

/* ===== POPUP SIGNUP MODAL ===== */

document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("signupPopup");
  const closeBtn = document.getElementById("closePopup");
  const popupForm = document.getElementById("popupNewsletterForm");
  
  // Show popup after 2 seconds
  setTimeout(function() {
    popup.classList.add("show");
  }, 2000);
  
  // Close popup when clicking X button
  closeBtn.addEventListener("click", function() {
    popup.classList.remove("show");
  });
  
  // Close popup when clicking outside
  popup.addEventListener("click", function(e) {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
  
  // Handle form submission
  popupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = popupForm.querySelector('input[type="text"]').value;
    const email = popupForm.querySelector('input[type="email"]').value;
    const phone = popupForm.querySelector('input[type="tel"]').value;
    
    // Generate discount code
    const discountCode = "NIGHT20";
    
    // Show success message
    alert(`🎉 Congratulations ${name}!\n\nYour 20% discount code: ${discountCode}\n\nWe've sent this code to ${email}.\nUse it on your next order!`);
    
    // Optional: Send to WhatsApp
    const whatsappMessage = 
      `🎁 New Newsletter Signup%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Discount Code: ${discountCode}`;
    
    // Uncomment to auto-send to WhatsApp
    // window.open(`https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`, '_blank');
    
    // Close popup
    popup.classList.remove("show");
    popupForm.reset();
  });
  
  // Close popup with Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && popup.classList.contains("show")) {
      popup.classList.remove("show");
    }
  });
});