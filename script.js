// Optimize particles configuration
const particlesConfig = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#333333",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: 2,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#333333",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
    },
    retina_detect: true,
  }
  
  // Initialize particles.js
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", particlesConfig)
    }
  })
  
  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")
  const links = document.querySelectorAll("a, button, .social-icon, .project-card, .skill-category")
  
  document.addEventListener("mousemove", (e) => {
    if (cursor && cursorFollower) {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      // Add a slight delay to the follower for a smoother effect
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 50)
    }
  })
  
  // Add hover effect to links
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      document.body.classList.add("link-hover")
    })
  
    link.addEventListener("mouseleave", () => {
      document.body.classList.remove("link-hover")
    })
  })
  
  // Mouse follower dots
  const createMouseFollowers = () => {
    const container = document.createElement("div")
    container.className = "mouse-followers-container"
    document.body.appendChild(container)
  
    for (let i = 0; i < 5; i++) {
      const follower = document.createElement("div")
      follower.className = "mouse-follower-dot"
      container.appendChild(follower)
    }
  
    const followers = document.querySelectorAll(".mouse-follower-dot")
    let mouseX = 0,
      mouseY = 0
  
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })
  
    followers.forEach((follower, index) => {
      let posX = 0,
        posY = 0
      const speed = 0.1 - index * 0.015 // Different speeds for each follower
  
      function animate() {
        // Calculate distance between current position and mouse position
        const distX = mouseX - posX
        const distY = mouseY - posY
  
        // Move a percentage of the distance
        posX += distX * speed
        posY += distY * speed
  
        // Apply position
        follower.style.left = posX + "px"
        follower.style.top = posY + "px"
  
        // Continue animation
        requestAnimationFrame(animate)
      }
  
      animate()
    })
  }
  
  // Scroll progress bar
  const scrollProgressBar = document.querySelector(".scroll-progress-bar")
  window.addEventListener("scroll", () => {
    if (scrollProgressBar) {
      const totalScroll = document.body.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalScroll) * 100
      scrollProgressBar.style.width = progress + "%"
    }
  })
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
  
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })
  
  // Active navigation link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")
  
    let currentSection = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
  
      if (window.pageYOffset >= sectionTop - 150) {
        currentSection = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  })
  
  // Reveal animations on scroll
  function revealOnScroll() {
    const revealElements = document.querySelectorAll(".reveal-text, .reveal-item")
    const windowHeight = window.innerHeight
  
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
  
      if (elementTop < windowHeight - 100) {
        element.classList.add("revealed")
      }
    })
  }
  
  // Fix skill progress bars initialization
  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = entry.target.getAttribute("data-progress")
            entry.target.style.width = progress + "%"
          }
        })
      },
      { threshold: 0.5 },
    )
  
    skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }
  
  // Confetti effect
  function triggerConfetti() {
    const canvas = document.getElementById("confetti-canvas")
    const ctx = canvas.getContext("2d")
  
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  
    const confetti = []
    const confettiCount = 100
    const gravity = 0.5
    const terminalVelocity = 5
    const drag = 0.075
    const colors = [
      { front: "#4285F4", back: "#3372C2" }, // Blue
      { front: "#EA4335", back: "#C23332" }, // Red
      { front: "#FBBC05", back: "#C29E22" }, // Yellow
      { front: "#34A853", back: "#2A8743" }, // Green
    ]
  
    // Confetti particle
    class Confetti {
      constructor(context) {
        this.context = context
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.dimensions = {
          x: Math.random() * 10 + 5,
          y: Math.random() * 10 + 5,
        }
        this.position = {
          x: Math.random() * canvas.width,
          y: -this.dimensions.y,
        }
        this.rotation = Math.random() * 2 * Math.PI
        this.scale = { x: 1, y: 1 }
        this.velocity = {
          x: Math.random() * 25 - 12.5,
          y: Math.random() * 10 + 3,
        }
      }
  
      update() {
        this.velocity.x -= this.velocity.x * drag
        this.velocity.y = Math.min(this.velocity.y + gravity, terminalVelocity)
        this.velocity.y -= this.velocity.y * drag
  
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
  
        this.rotation += 0.01
  
        if (this.position.y >= canvas.height) {
          this.position.y = -this.dimensions.y
          this.position.x = Math.random() * canvas.width
          this.velocity.y = Math.random() * 10 + 3
        }
      }
  
      draw() {
        this.context.save()
        this.context.translate(this.position.x, this.position.y)
        this.context.rotate(this.rotation)
        this.context.scale(this.scale.x, this.scale.y)
  
        this.context.fillStyle = this.color.front
        this.context.fillRect(-this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y)
  
        this.context.restore()
      }
    }
  
    // Initialize confetti
    for (let i = 0; i < confettiCount; i++) {
      confetti.push(new Confetti(ctx))
    }
  
    // Animation loop
    let animationFrame = null
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      confetti.forEach((confetto) => {
        confetto.update()
        confetto.draw()
      })
  
      animationFrame = requestAnimationFrame(render)
  
      // Stop after 3 seconds
      setTimeout(() => {
        cancelAnimationFrame(animationFrame)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }, 3000)
    }
  
    render()
  }
  
  // Enhanced magnetic button effect
  const magneticButtons = document.querySelectorAll(".magnetic-button")
  
  magneticButtons.forEach((button) => {
    const buttonText = button.querySelector(".btn-text")
    const buttonIcon = button.querySelector("i")
  
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
  
      const strength = 15 // Adjust the magnetic strength
  
      button.style.transform = `translate(${x / strength}px, ${y / strength}px)`
  
      // Add subtle rotation based on mouse position
      const rotateStrength = 5
      const rotateX = (y / rect.height) * rotateStrength
      const rotateY = (x / rect.width) * -rotateStrength
  
      button.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  
      // Move text and icon slightly for 3D effect
      if (buttonText) buttonText.style.transform = `translateZ(10px)`
      if (buttonIcon) buttonIcon.style.transform = `translateZ(15px) translateX(${x / 30}px)`
    })
  
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) rotateX(0) rotateY(0)"
      if (buttonText) buttonText.style.transform = "translateZ(0)"
      if (buttonIcon) buttonIcon.style.transform = "translateZ(0) translateX(0)"
    })
  })
  
  // Initialize vanilla-tilt for tilt effect with improved settings
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05,
        perspective: 1000,
        transition: true,
        gyroscope: true, // Enable gyroscope on mobile
      })
    }
  })
  
  // Modal functionality with enhanced animations
  const projectButtons = document.querySelectorAll(".project-btn")
  const modalContainers = document.querySelectorAll(".modal-container")
  const modalCloseButtons = document.querySelectorAll(".modal-close")
  
  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.getAttribute("data-project")
      const modal = document.getElementById(`${projectId}Modal`)
  
      if (modal) {
        modal.classList.add("active")
        document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  
        // Add entrance animation to modal content
        const modalContent = modal.querySelector(".modal")
        modalContent.style.animation = "modalEnter 0.5s forwards"
      }
    })
  })
  
  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-container")
      const modalContent = modal.querySelector(".modal")
  
      // Add exit animation
      modalContent.style.animation = "modalExit 0.3s forwards"
  
      // Remove active class after animation completes
      setTimeout(() => {
        modal.classList.remove("active")
        document.body.style.overflow = "auto" // Re-enable scrolling
      }, 300)
    })
  })
  
  // Close modal when clicking outside
  modalContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
      if (e.target === container) {
        const modalContent = container.querySelector(".modal")
  
        // Add exit animation
        modalContent.style.animation = "modalExit 0.3s forwards"
  
        // Remove active class after animation completes
        setTimeout(() => {
          container.classList.remove("active")
          document.body.style.overflow = "auto"
        }, 300)
      }
    })
  })
  
  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalContainers.forEach((container) => {
        if (container.classList.contains("active")) {
          const modalContent = container.querySelector(".modal")
  
          // Add exit animation
          modalContent.style.animation = "modalExit 0.3s forwards"
  
          // Remove active class after animation completes
          setTimeout(() => {
            container.classList.remove("active")
            document.body.style.overflow = "auto"
          }, 300)
        }
      })
    }
  })
  
  // Enhanced parallax effect for the home image
  window.addEventListener("mousemove", (e) => {
    const homeImage = document.querySelector(".home-image img")
    const homeText = document.querySelector(".home-text")
  
    if (homeImage && homeText) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01
  
      homeImage.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px) scale(1.05)`
  
      // Add subtle parallax to text elements
      const headings = homeText.querySelectorAll("h1, p")
      headings.forEach((heading, index) => {
        const depth = 0.5 - index * 0.1 // Different depths for each element
        heading.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`
      })
    }
  })
  
  // Interactive background gradient
  function createInteractiveBackground() {
    const body = document.body
  
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
  
      // Subtle gradient shift based on mouse position
      const gradientColor = `radial-gradient(
              circle at ${x * 100}% ${y * 100}%,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(255, 255, 255, 0) 50%
          )`
  
      body.style.backgroundImage = gradientColor
    })
  }
  
  // Text scramble effect for headings
  class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = "!<>-_\\/[]{}—=+*^?#________"
      this.update = this.update.bind(this)
    }
  
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => (this.resolve = resolve))
      this.queue = []
  
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ""
        const to = newText[i] || ""
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
  
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
  
    update() {
      let output = ""
      let complete = 0
  
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
  
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="scramble-text">${char}</span>`
        } else {
          output += from
        }
      }
  
      this.el.innerHTML = output
  
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
  
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  // Apply text scramble to section titles
  function initTextScramble() {
    const titles = document.querySelectorAll(".section-title")
  
    titles.forEach((title) => {
      const originalText = title.textContent
      const scrambler = new TextScramble(title)
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scrambler.setText(originalText)
              observer.unobserve(title)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(title)
    })
  }
  
  // Floating elements animation
  function createFloatingElements() {
    const floatingContainer = document.createElement("div")
    floatingContainer.className = "floating-elements"
    document.body.appendChild(floatingContainer)
  
    const shapes = ["circle", "square", "triangle"]
    const colors = ["#333", "#555", "#777"]
  
    // Create floating elements
    for (let i = 0; i < 15; i++) {
      const element = document.createElement("div")
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 20 + 10
  
      element.className = `floating-element ${shape}`
      element.style.width = `${size}px`
      element.style.height = `${size}px`
      element.style.backgroundColor = color
      element.style.opacity = "0.1"
      element.style.left = `${Math.random() * 100}vw`
      element.style.top = `${Math.random() * 100}vh`
  
      // Random animation duration and delay
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
  
      element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`
  
      floatingContainer.appendChild(element)
    }
  }
  
  // Interactive skill cards
  function enhanceSkillCards() {
    const skillCards = document.querySelectorAll(".skill-category")
  
    skillCards.forEach((card) => {
      // Add glow effect on hover
      card.addEventListener("mouseenter", () => {
        card.classList.add("skill-glow")
      })
  
      card.addEventListener("mouseleave", () => {
        card.classList.remove("skill-glow")
      })
  
      // Add click interaction
      card.addEventListener("click", () => {
        card.classList.add("skill-pulse")
  
        setTimeout(() => {
          card.classList.remove("skill-pulse")
        }, 500)
      })
    })
  }
  
  // Easter egg - Konami code
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  let konamiCodePosition = 0
  
  document.addEventListener("keydown", (e) => {
    // Check if the key matches the next key in the Konami code
    if (e.key === konamiCode[konamiCodePosition]) {
      konamiCodePosition++
  
      // If the entire code is entered correctly
      if (konamiCodePosition === konamiCode.length) {
        triggerConfetti()
  
        // Add a fun message
        const message = document.createElement("div")
        message.className = "konami-message"
        message.textContent = "🎮 Konami Code Activated! 🎮"
        document.body.appendChild(message)
  
        setTimeout(() => {
          message.remove()
        }, 3000)
  
        konamiCodePosition = 0
      }
    } else {
      konamiCodePosition = 0
    }
  })
  
  // Add typing animation to home heading
  function createTypingAnimation() {
    const heading = document.querySelector(".home-section h1")
    if (!heading) return
  
    const text = heading.textContent
    heading.textContent = ""
    heading.style.opacity = "1"
    heading.style.transform = "translateY(0)"
  
    let i = 0
    const speed = 50 // typing speed in ms
  
    function typeWriter() {
      if (i < text.length) {
        heading.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, speed)
      }
    }
  
    typeWriter()
  }
  
  // Add scroll-triggered animations
  function addScrollAnimations() {
    const skillIcons = document.querySelectorAll(".skill-icon")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-skill-icon")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    skillIcons.forEach((icon) => {
      observer.observe(icon)
    })
  }
  
  // Add interactive project cards
  function enhanceProjectCards() {
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      const image = card.querySelector(".project-image img")
      const content = card.querySelector(".project-content")
  
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const centerX = rect.width / 2
        const centerY = rect.height / 2
  
        const deltaX = (x - centerX) / centerX
        const deltaY = (y - centerY) / centerY
  
        // Move image slightly based on mouse position
        if (image) {
          image.style.transform = `scale(1.05) translate(${deltaX * 10}px, ${deltaY * 10}px)`
        }
  
        // Add subtle shadow based on mouse position
        card.style.boxShadow = `
                  0 10px 30px rgba(0, 0, 0, 0.1),
                  ${-deltaX * 10}px ${-deltaY * 10}px 20px rgba(0, 0, 0, 0.05)
              `
      })
  
      card.addEventListener("mouseleave", () => {
        if (image) {
          image.style.transform = "scale(1)"
        }
        card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
      })
    })
  }
  
  // Add interactive social icons
  function enhanceSocialIcons() {
    const socialIcons = document.querySelectorAll(".social-icon")
  
    socialIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        // Add bounce animation
        icon.style.animation = "bounce 0.5s ease"
  
        setTimeout(() => {
          icon.style.animation = ""
        }, 500)
      })
    })
  }
  
  // Add scroll-to-top button
  function addScrollToTopButton() {
    const button = document.createElement("button")
    button.className = "scroll-to-top"
    button.innerHTML = '<i class="fas fa-arrow-up"></i>'
    document.body.appendChild(button)
  
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        button.classList.add("visible")
      } else {
        button.classList.remove("visible")
      }
    })
  
    // Scroll to top when clicked
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
  
  // Add interactive navigation highlight
  function enhanceNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a")
  
    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        // Add pulse animation
        link.style.animation = "nav-pulse 0.5s ease"
  
        setTimeout(() => {
          link.style.animation = ""
        }, 500)
      })
    })
  }
  
  // Ensure the confetti canvas is present in the HTML
  document.addEventListener("DOMContentLoaded", () => {
    // Create confetti canvas if it doesn't exist
    if (!document.getElementById("confetti-canvas")) {
      const canvas = document.createElement("canvas")
      canvas.id = "confetti-canvas"
      document.body.appendChild(canvas)
    }
  
    // Initialize all interactive elements
    createMouseFollowers()
    createInteractiveBackground()
    initTextScramble()
    createFloatingElements()
    enhanceSkillCards()
    addScrollAnimations()
    enhanceProjectCards()
    enhanceSocialIcons()
    addScrollToTopButton()
    enhanceNavigation()
  
    // Initialize standard functions
    revealOnScroll()
    initSkillBars()
  })
  
  // Initialize on load
  window.addEventListener("load", () => {
    revealOnScroll()
    initSkillBars()
  })
  
  // Scroll event
  window.addEventListener("scroll", () => {
    revealOnScroll()
  })
  
  // Resize event for canvas
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti-canvas")
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  })
  
  