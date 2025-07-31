// Navigation function for CTA buttons
function navigateToCategory(category) {
  // In a real application, this would navigate to the category page
  console.log(`Navigating to ${category} category page`)

  // For demonstration, show an alert
  alert(`Navigating to ${category.charAt(0).toUpperCase() + category.slice(1)} collection page`)

  // In a real app, you might use:
  // window.location.href = `/categories/${category}`;
  // or for SPA: history.pushState(null, '', `/categories/${category}`);
}

// Add click event listeners to product cards
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    card.addEventListener("click", function () {
      const productName = this.querySelector("h4").textContent
      console.log(`Clicked on product: ${productName}`)

      // In a real application, this would navigate to the product detail page
      alert(`Viewing details for: ${productName}`)
    })
  })

  // Add smooth scrolling for better UX
  const ctaButtons = document.querySelectorAll(".cta-button")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add a subtle animation effect
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all category sections
  const categorySections = document.querySelectorAll(".category-section")
  categorySections.forEach((section) => {
    observer.observe(section)
  })

  // Sample blog data - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Spring Fashion Trends 2024",
      category: "fashion",
      preview:
        "Discover the latest spring fashion trends that are taking the runway by storm. From vibrant colors to flowing silhouettes...",
      image: "/placeholder.svg?height=250&width=400&text=Spring+Fashion",
      date: "March 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Perfect Skincare Routine",
      category: "beauty",
      preview:
        "Learn how to create a skincare routine that works for your skin type. Our beauty experts share their top tips...",
      image: "/placeholder.svg?height=250&width=400&text=Skincare+Routine",
      date: "March 12, 2024",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Packing Essentials for Fashion Week",
      category: "travel",
      preview:
        "Traveling to fashion week? Here's your ultimate packing guide to ensure you look stylish while staying comfortable...",
      image: "/placeholder.svg?height=250&width=400&text=Travel+Fashion",
      date: "March 10, 2024",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Review: Designer Handbag Collection",
      category: "reviews",
      preview:
        "We put the latest designer handbags to the test. Find out which ones are worth the investment and which to skip...",
      image: "/placeholder.svg?height=250&width=400&text=Handbag+Review",
      date: "March 8, 2024",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "End of Season Sale Guide",
      category: "deals",
      preview:
        "Don't miss out on the best end-of-season deals. We've curated the top discounts from your favorite fashion brands...",
      image: "/placeholder.svg?height=250&width=400&text=Sale+Guide",
      date: "March 5, 2024",
      readTime: "3 min read",
    },
    {
      id: 6,
      title: "Sustainable Fashion Choices",
      category: "fashion",
      preview:
        "Making eco-friendly fashion choices doesn't mean compromising on style. Explore sustainable brands and practices...",
      image: "/placeholder.svg?height=250&width=400&text=Sustainable+Fashion",
      date: "March 3, 2024",
      readTime: "8 min read",
    },
    {
      id: 7,
      title: "Summer Makeup Trends",
      category: "beauty",
      preview:
        "Get ready for summer with these fresh makeup looks. From dewy skin to bold lips, here's what's trending...",
      image: "/placeholder.svg?height=250&width=400&text=Summer+Makeup",
      date: "March 1, 2024",
      readTime: "5 min read",
    },
    {
      id: 8,
      title: "Travel Style: Airport to Destination",
      category: "travel",
      preview:
        "Master the art of travel style with outfits that transition seamlessly from airport to your final destination...",
      image: "/placeholder.svg?height=250&width=400&text=Airport+Style",
      date: "February 28, 2024",
      readTime: "4 min read",
    },
  ]

  // DOM elements
  const blogGrid = document.getElementById("blog-grid")
  const emptyState = document.getElementById("empty-state")
  const filterCheckboxes = document.querySelectorAll(".filter-checkbox")

  // Current active filters
  const activeFilters = new Set(["all"])

  // Initialize the blog page
  document.addEventListener("DOMContentLoaded", () => {
    renderBlogPosts()
    setupFilterListeners()
  })

  // Render blog posts
  function renderBlogPosts() {
    blogGrid.innerHTML = ""

    const filteredPosts = filterPosts()

    if (filteredPosts.length === 0) {
      showEmptyState()
      return
    }

    hideEmptyState()

    filteredPosts.forEach((post) => {
      const postElement = createPostElement(post)
      blogGrid.appendChild(postElement)
    })

    // Add stagger animation
    const posts = blogGrid.querySelectorAll(".blog-post")
    posts.forEach((post, index) => {
      post.style.animationDelay = `${index * 0.1}s`
      post.classList.add("fade-in")
    })
  }

  // Create individual post element
  function createPostElement(post) {
    const article = document.createElement("article")
    article.className = "blog-post"
    article.setAttribute("data-category", post.category)
    article.setAttribute("tabindex", "0")
    article.setAttribute("role", "button")
    article.setAttribute("aria-label", `Read article: ${post.title}`)

    article.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="post-image" onerror="handleImageError(this)">
      <div class="post-content">
        <span class="post-category">${getCategoryDisplayName(post.category)}</span>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-preview">${post.preview}</p>
        <div class="post-meta">
          <span class="post-date">${post.date}</span>
          <a href="#" class="read-more" onclick="readPost(${post.id}); return false;">${post.readTime}</a>
        </div>
      </div>
    `

    // Add click handler
    article.addEventListener("click", () => readPost(post.id))
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        readPost(post.id)
      }
    })

    return article
  }

  // Handle image loading errors
  function handleImageError(img) {
    img.style.display = "none"
    const fallbackDiv = document.createElement("div")
    fallbackDiv.className = "post-image fallback"
    fallbackDiv.textContent = "Image not available"
    img.parentNode.insertBefore(fallbackDiv, img)
  }

  // Get display name for category
  function getCategoryDisplayName(category) {
    const categoryNames = {
      fashion: "Fashion",
      beauty: "Beauty",
      travel: "Travel",
      reviews: "Product Reviews",
      deals: "Deals",
    }
    return categoryNames[category] || category
  }

  // Filter posts based on active filters
  function filterPosts() {
    if (activeFilters.has("all")) {
      return blogPosts
    }

    return blogPosts.filter((post) => activeFilters.has(post.category))
  }

  // Setup filter event listeners
  function setupFilterListeners() {
    filterCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleFilterChange)
    })
  }

  // Handle filter changes
  function handleFilterChange(event) {
    const checkbox = event.target
    const category = checkbox.dataset.category

    if (category === "all") {
      if (checkbox.checked) {
        // If "All" is checked, uncheck all others and clear filters
        activeFilters.clear()
        activeFilters.add("all")
        filterCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false
        })
      } else {
        // If "All" is unchecked, do nothing (keep it checked)
        checkbox.checked = true
        return
      }
    } else {
      // Handle individual category filters
      if (checkbox.checked) {
        activeFilters.add(category)
        // Uncheck "All" if any specific category is selected
        const allCheckbox = document.getElementById("filter-all")
        if (allCheckbox.checked) {
          allCheckbox.checked = false
          activeFilters.delete("all")
        }
      } else {
        activeFilters.delete(category)
        // If no categories are selected, check "All"
        if (activeFilters.size === 0) {
          activeFilters.add("all")
          document.getElementById("filter-all").checked = true
        }
      }
    }

    // Add filtering class for smooth transitions
    const posts = document.querySelectorAll(".blog-post")
    posts.forEach((post) => post.classList.add("filtering"))

    // Re-render posts with a slight delay for smooth animation
    setTimeout(() => {
      renderBlogPosts()
    }, 100)
  }

  // Show empty state
  function showEmptyState() {
    blogGrid.style.display = "none"
    emptyState.style.display = "block"
  }

  // Hide empty state
  function hideEmptyState() {
    blogGrid.style.display = "grid"
    emptyState.style.display = "none"
  }

  // Handle post reading (placeholder function)
  function readPost(postId) {
    const post = blogPosts.find((p) => p.id === postId)
    if (post) {
      console.log(`Reading post: ${post.title}`)
      // In a real application, this would navigate to the full post
      alert(`Opening article: "${post.title}"\n\nIn a real application, this would navigate to the full blog post.`)
    }
  }

  // Add CSS animation class
  const style = document.createElement("style")
  style.textContent = `
    .fade-in {
      animation: fadeInUp 0.6s ease forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)

  // Handle responsive filter behavior
  function handleResize() {
    const filterContainer = document.querySelector(".filter-container")
    if (window.innerWidth < 1024) {
      filterContainer.style.overflowX = "auto"
    } else {
      filterContainer.style.overflowX = "visible"
    }
  }

  window.addEventListener("resize", handleResize)
  handleResize() // Call on initial load

  // Add loading state for images
  const images = document.querySelectorAll(".product-card img")

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=300&width=250"
      this.alt = "Product image unavailable"
    })
  })
})
