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


// NAV / HERO behavior: set hero padding initially, toggle overlay on scroll,
// and set active nav-link based on location.pathname so active persists after navigation.
document.addEventListener('DOMContentLoaded', function () {
  try {
    var navbar = document.querySelector('.navbar');
    var hero = document.querySelector('.hero-section');
    var navLinks = document.querySelectorAll('.nav-link');

    // ensure navbar has initial class
    if (navbar) {
      navbar.classList.add('initial');
    }

    // set hero padding to navbar height so hero starts below navbar
    function setHeroPadding() {
      if (navbar && hero) {
        var h = navbar.offsetHeight;
        hero.style.paddingTop = h + 'px';
        hero.classList.add('padded');
      }
    }
    setHeroPadding();
    // recalc on resize
    window.addEventListener('resize', function () {
      setHeroPadding();
    });

    // scroll handler: when scrolled down, enable overlay and remove hero padding
    function onScroll() {
      if (!navbar || !hero) return;
      if (window.scrollY > 20) {
        navbar.classList.add('overlay');
        navbar.classList.remove('initial');
        
      } else {
        navbar.classList.remove('overlay');
        navbar.classList.add('initial');
        setHeroPadding();
      }
    }
    window.addEventListener('scroll', onScroll);
    // run once
    onScroll();

    // Active link detection based on current filename
    var path = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function(link) {
      // remove any prior active
      link.classList.remove('active');
      // make relative href comparison
      var href = link.getAttribute('href');
      if (!href) return;
      var linkFile = href.split('/').pop();
      if (linkFile === path) {
        link.classList.add('active');
      }
    });

    // For single-page style anchors: if href matches hash or current path, still highlight
    // Also add click listener to persist active immediately when clicking (useful if not reloading)
    navLinks.forEach(function(link){
      link.addEventListener('click', function(e){
        // remove active on others
        navLinks.forEach(function(l){ l.classList.remove('active'); });
        link.classList.add('active');
      });
    });

  } catch (err) {
    console.error('Nav/Hero script error', err);
  }
});

document.addEventListener("DOMContentLoaded",()=>{
 const nav=document.querySelector(".navbar");
 const hero=document.querySelector(".hero-section");
 function pad(){ if(nav&&hero){ hero.style.paddingTop=nav.offsetHeight+"px"; }}
 pad(); window.addEventListener("resize",pad);
 function sc(){
   if(window.scrollY > (hero.offsetHeight - nav.offsetHeight)){
     nav.classList.add("overlay");
     nav.classList.remove("initial");
     hero.style.paddingTop="0px";
   } else {
     nav.classList.add("initial");
     nav.classList.remove("overlay");
     pad();
   }
 }
 window.addEventListener("scroll",sc); sc();
});



// ===== Safe Navbar Scroll Patch (Additive) =====
(function () {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero, .hero-section, section.hero');

  if (!navbar) return;

  function onScroll() {
    const triggerHeight = hero ? (hero.offsetHeight - 50) : 50;
    if (window.scrollY > triggerHeight) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', onScroll);
})();

