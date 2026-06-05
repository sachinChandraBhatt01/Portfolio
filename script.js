(function () {
  'use strict';

  // Dynamic Footer Copyright Year
  var yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Sticky Navbar Performance Tuning
  var navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile Menu Layout & State Management
  var burgerButton = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    burgerButton.classList.remove('active');
    mobileMenu.classList.remove('open');
    burgerButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burgerButton.addEventListener('click', function () {
    var isOpened = mobileMenu.classList.toggle('open');
    burgerButton.classList.toggle('active', isOpened);
    burgerButton.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
    document.body.style.overflow = isOpened ? 'hidden' : '';
  });

  // Balanced Smooth Scrolling Offset Execution
  document.querySelectorAll('.js-anchor').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetHref = anchor.getAttribute('href') || '';
      if (targetHref.charAt(0) !== '#') return;
      
      var targetSection = document.querySelector(targetHref);
      if (!targetSection) return;
      
      event.preventDefault();
      closeMobileMenu();

      var elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
      var targetOffset = elementPosition - 80; // Optimized spacing architecture

      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
    });
  });

  // Dynamic Continuous Infinite Marquee Generation
  var marqueeTrack = document.getElementById('marquee');
  if (marqueeTrack) {
    var marqueeItems = ['Mobile Responsive', 'SEO Optimized', 'Fast Loading', 'Business Focused', 'WhatsApp Ready', 'Google Maps'];
    var dynamicHtml = '';
    
    // Looping arrays systematically to seamlessly bridge layout gaps
    for (var loopCount = 0; loopCount < 4; loopCount++) {
      for (var index = 0; index < marqueeItems.length; index++) {
        dynamicHtml += '<span>' + marqueeItems[index] + '<span class="m-dot">✦</span></span>';
      }
    }
    marqueeTrack.innerHTML = dynamicHtml;
  }

  // Refined Clean FAQ Accordion Mechanics
  document.querySelectorAll('.faq-item').forEach(function (currentItem) {
    var queryButton = currentItem.querySelector('.faq-q');
    queryButton.addEventListener('click', function () {
      var isAlreadyOpen = currentItem.classList.contains('open');
      
      document.querySelectorAll('.faq-item').forEach(function (item) {
        item.classList.remove('open');
        var itemBtn = item.querySelector('.faq-q');
        if (itemBtn) itemBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isAlreadyOpen) {
        currentItem.classList.add('open');
        queryButton.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Hardware Accelerated Scroll Intersections (Fade-In Elements)
  var dynamicFadeElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.05, 
      rootMargin: '0px 0px -20px 0px' 
    });

    dynamicFadeElements.forEach(function (element) { 
      scrollObserver.observe(element); 
    });
  } else {
    dynamicFadeElements.forEach(function (element) { 
      element.classList.add('visible'); 
    });
  }
})();