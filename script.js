// ===================================
// Agrisethu - JavaScript Interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================
  // Sticky Navbar on Scroll
  // ===================================
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // ===================================
  // Smooth Scroll for Navigation Links
  // ===================================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only prevent default for anchor links on the same page
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ===================================
  // Scroll Animations
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.scroll-animate');
  animatedElements.forEach(el => observer.observe(el));
  
  // ===================================
  // Contact Form Validation & Submission
  // ===================================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Bootstrap validation
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      
      // Get form data
      const formData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        inquiryType: document.getElementById('inquiryType').value,
        message: document.getElementById('message').value
      };
      
      // Show success message
      showSuccessMessage();
      
      // Reset form
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      
      // Log form data (in production, this would be sent to a server)
      console.log('Form submitted:', formData);
    });
  }
  
  // ===================================
  // Success Message Display
  // ===================================
  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    successDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    successDiv.innerHTML = `
      <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
  
  // ===================================
  // Mobile Menu Close on Link Click
  // ===================================
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarCollapse) {
    const navItems = navbarCollapse.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth < 992) {
          navbarToggler.click();
        }
      });
    });
  }
  
  // ===================================
  // Image Lazy Loading Enhancement
  // ===================================
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // ===================================
  // Crop Prediction Chart (for crop-prediction.html)
  // ===================================
  const chartCanvas = document.getElementById('predictionChart');
  
  if (chartCanvas) {
    // Simple animated bar chart using canvas
    const ctx = chartCanvas.getContext('2d');
    const width = chartCanvas.width = chartCanvas.offsetWidth;
    const height = chartCanvas.height = 300;
    
    const data = [
      { label: 'Rice', value: 85, color: '#2d5016' },
      { label: 'Wheat', value: 72, color: '#6b4423' },
      { label: 'Corn', value: 68, color: '#c9a961' },
      { label: 'Vegetables', value: 90, color: '#4a7c2c' },
      { label: 'Fruits', value: 78, color: '#8b6f47' }
    ];
    
    const barWidth = width / data.length - 20;
    const maxValue = Math.max(...data.map(d => d.value));
    
    // Animate bars
    let progress = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      data.forEach((item, index) => {
        const x = index * (barWidth + 20) + 10;
        const barHeight = (item.value / maxValue) * (height - 60) * (progress / 100);
        const y = height - barHeight - 40;
        
        // Draw bar
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#2c2c2c';
        ctx.font = '14px Lato';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, height - 20);
        
        // Draw value
        if (progress === 100) {
          ctx.fillText(item.value + '%', x + barWidth / 2, y - 10);
        }
      });
      
      if (progress < 100) {
        progress += 2;
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation when chart is visible
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          chartObserver.unobserve(entry.target);
        }
      });
    });
    
    chartObserver.observe(chartCanvas);
  }
  
  // ===================================
  // Counter Animation (for statistics)
  // ===================================
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });
    
    counterObserver.observe(counter);
  });
  
  // ===================================
  // Parallax Effect for Hero Images
  // ===================================
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = heroSection.querySelector('.hero-bg');
      
      if (parallax && scrolled < window.innerHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }
  
});
