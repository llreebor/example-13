// Initialize mobile menu and submenu functionality
function initializeMobileMenu() {
	// Select main DOM elements for mobile menu
	const menu = document.querySelector("#mobile-menu")
	const overlay = document.querySelector("#mobile-menu-overlay")
	const burger = document.querySelector("#burger")
	const body = document.querySelector("body")

	// Define mobile breakpoint for responsive behavior
	const MOBILE_BREAKPOINT = 992

	// Exit if required elements are missing
	if (!menu || !burger || !body || !overlay) return

	// ============================
	// MENU TOGGLE FUNCTIONALITY
	// ============================

	const updateMenuState = (isOpen) => {
		burger.setAttribute("aria-expanded", isOpen)
		burger.classList.toggle("active", isOpen)

		menu.classList.toggle("is-open", isOpen)
		menu.classList.toggle("-translate-x-full", !isOpen)
		menu.classList.toggle("translate-x-0", isOpen)

		overlay.classList.toggle("opacity-0", !isOpen)
		overlay.classList.toggle("opacity-100", isOpen)
		overlay.classList.toggle("pointer-events-none", !isOpen)
		overlay.classList.toggle("pointer-events-auto", isOpen)

		body.classList.toggle("overflow-hidden", isOpen)
	}

	const handleBurgerClick = () => {
		const isOpening = !menu.classList.contains("is-open")
		updateMenuState(isOpening)
	}

	const handleOverlayClick = (event) => {
		if (event.target === overlay) updateMenuState(false)
	}

	const handleEscapeKey = (event) => {
		if (event.key === "Escape" && menu.classList.contains("is-open")) {
			updateMenuState(false)
		}
	}

	const handleWindowResize = () => {
		if (window.innerWidth >= MOBILE_BREAKPOINT) {
			updateMenuState(false)
		}
	}

	// Add event listeners for main menu
	burger.addEventListener("click", handleBurgerClick)
	overlay.addEventListener("click", handleOverlayClick)
	document.addEventListener("keydown", handleEscapeKey)
	window.addEventListener("resize", handleWindowResize)

	burger.setAttribute("aria-expanded", "false")
	handleWindowResize()

	// ============================
	// SUBMENU FUNCTIONALITY
	// ============================

	// Check if there are submenu triggers at all
	const submenuTriggersExist = menu.querySelector(".submenu-trigger")

	if (submenuTriggersExist) {
		menu.addEventListener("click", (event) => {
			const trigger = event.target.closest(".submenu-trigger")
			if (!trigger) return

			const submenuItem = trigger.closest(".with-submenu")
			if (submenuItem) {
				submenuItem.classList.toggle("active")
			}
		})
	}

	// ============================
	// LINK CLICK CLOSE MENU
	// ============================

	menu.addEventListener("click", (event) => {
		const link = event.target.closest("a")
		if (!link) return

		const href = link.getAttribute("href")
		if (href && href !== "#") {
			updateMenuState(false)
		}
	})
}
// Initialize accordion functionality
function initializeAccordion() {
	// Select the accordion container (assuming items are inside a common parent)
	const accordion = document.querySelector(".accordion")
	const accordionItems = document.querySelectorAll(".accordion-item")

	// Exit if no accordion container or items are found
	if (!accordion || !accordionItems.length) return

	// Set initial state for all accordion items
	accordionItems.forEach((item) => {
		const content = item.querySelector(".accordion-content")
		const trigger = item.querySelector(".accordion-trigger")

		if (!content || !trigger) return

		// Set ARIA attributes for accessibility
		trigger.setAttribute("aria-expanded", item.classList.contains("active"))
		content.setAttribute("aria-hidden", !item.classList.contains("active"))

		// Ensure content has active class if item is active
		if (item.classList.contains("active")) {
			content.classList.add("active")
		}
	})

	// Use event delegation for accordion triggers
	accordion.addEventListener("click", (event) => {
		const trigger = event.target.closest(".accordion-trigger")
		if (!trigger) return // Exit if not a trigger

		const parent = trigger.closest(".accordion-item")
		if (!parent) return // Exit if no parent item

		const content = parent.querySelector(".accordion-content")
		if (!content) return

		// Toggle active state
		const isOpening = !parent.classList.contains("active")
		parent.classList.toggle("active")
		content.classList.toggle("active")

		// Update ARIA attributes
		trigger.setAttribute("aria-expanded", isOpening)
		content.setAttribute("aria-hidden", !isOpening)

		// Optional: Close other items if only one should be open
		/*
		if (isOpening) {
			document.querySelectorAll(".accordion-item").forEach((otherItem) => {
				if (otherItem !== parent && otherItem.classList.contains("active")) {
					otherItem.classList.remove("active");
					const otherContent = otherItem.querySelector(".accordion-content");
					const otherTrigger = otherItem.querySelector(".accordion-trigger");
					if (otherContent && otherTrigger) {
						otherContent.classList.remove("active");
						otherTrigger.setAttribute("aria-expanded", "false");
						otherContent.setAttribute("aria-hidden", "true");
					}
				}
			});
		}
		*/
	})

	// Add keyboard support for accessibility
	accordion.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			const trigger = event.target.closest(".accordion-trigger")
			if (!trigger) return

			event.preventDefault() // Prevent default scrolling for spacebar
			trigger.click() // Simulate click to reuse logic
		}
	})
}

// Initializes tab navigation with accessibility features for a given tab container.
// function initTabs(tabsEl) {
// 	const triggers = tabsEl.querySelectorAll(".tabs-header .tab-trigger")
// 	const panels = tabsEl.querySelectorAll(".tabs-content .tab-content")

// 	function setActive(index) {
// 		triggers.forEach((t, i) => {
// 			const active = i === index
// 			t.setAttribute("aria-selected", active)
// 			t.setAttribute("tabindex", active ? "0" : "-1")
// 			t.classList.toggle("active", active)
// 		})
// 		panels.forEach((p, i) => {
// 			const active = i === index
// 			p.classList.toggle("hidden", !active)
// 			p.setAttribute("aria-hidden", !active)
// 		})
// 	}

// 	triggers.forEach((trigger, index) => {
// 		trigger.addEventListener("click", () => setActive(index))
// 		trigger.addEventListener("keydown", (e) => {
// 			if (e.key === "Enter" || e.key === " ") {
// 				e.preventDefault()
// 				setActive(index)
// 			} else if (e.key === "ArrowRight") {
// 				e.preventDefault()
// 				const n = (index + 1) % triggers.length
// 				setActive(n)
// 				triggers[n].focus()
// 			} else if (e.key === "ArrowLeft") {
// 				e.preventDefault()
// 				const p = (index - 1 + triggers.length) % triggers.length
// 				setActive(p)
// 				triggers[p].focus()
// 			}
// 		})
// 	})

// 	setActive(0)
// }

// Inits
document.addEventListener("DOMContentLoaded", () => {
	// Mobile Menu
	initializeMobileMenu()

	// FAQ Accordion
	initializeAccordion()

	// Initialize tabs
	// document.querySelectorAll(".tabs").forEach(initTabs)

	// Trusted By Slider
	const trustedBySwiper = new Swiper(".swiper-trusted-by", {
		// Optional parameters
		loop: true,
		speed: 3000,
		spaceBetween: 40,
		autoplay: {
			delay: 0,
		},
		breakpoints: {
			320: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 5,
			},
			1280: {
				slidesPerView: 6,
			},
		},
	})

	// Teams
	const teamsSwiper = new Swiper(".swiper-teams", {
		// Optional parameters
		loop: true,
		spaceBetween: 24,

		breakpoints: {
			320: {
				slidesPerView: 1.1,
			},

			640: {
				slidesPerView: 1.9,
			},
			992: {
				slidesPerView: 2,
			},
			1280: {
				slidesPerView: 3,
			},
		},
	})

	// Swiper Team
	const swiperTeam = new Swiper(".swiper-team", {
		centeredSlides: false,
		loop: true,

		navigation: {
			nextEl: ".swiper-team-next",
			prevEl: ".swiper-team-prev",
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 16,
				slidesOffsetBefore: 36,
				slidesOffsetAfter: 36,
			},
			769: {
				slidesPerView: 2,
				spaceBetween: 20,
				slidesOffsetBefore: 64,
				slidesOffsetAfter: 64,
			},
			1280: {
				slidesPerView: 2,
				spaceBetween: 24,
				slidesOffsetBefore: 85,
				slidesOffsetAfter: 85,
			},
		},
	})
})
function initResponsiveSwiperTabs(containerEl) {
	const triggers = containerEl.querySelectorAll(".tabs-header .tab-trigger")
	const panels = containerEl.querySelectorAll(".tabs-content .tab-content")

	const nextEl = containerEl.querySelector(".swiper-tabs-visibility-next")
	const prevEl = containerEl.querySelector(".swiper-tabs-visibility-prev")

	if (!triggers.length || !panels.length) return

	let swiperInstance = null
	const maxWidth = "(max-width: 1024px)"
	const mediaQuery = window.matchMedia(maxWidth)

	let currentIndex = 0

	function updateUI(activeIndex) {
		currentIndex = activeIndex

		triggers.forEach((t, i) => {
			const active = i === activeIndex
			t.setAttribute("aria-selected", active)
			t.setAttribute("tabindex", active ? "0" : "-1")
			t.classList.toggle("active", active)
		})

		panels.forEach((p, i) => {
			const active = i === activeIndex
			p.classList.toggle("hidden", !active)
			p.setAttribute("aria-hidden", !active)
		})
	}

	function handleBreakpoint(e) {
		if (e.matches) {
			if (!swiperInstance) {
				swiperInstance = new Swiper(containerEl, {
					slidesPerView: 1,
					initialSlide: currentIndex,
					navigation: { nextEl, prevEl },
					loop: true,
					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
					on: {
						slideChange: function () {
							updateUI(this.realIndex)
						},
					},
				})
			}
		} else {
			if (swiperInstance) {
				swiperInstance.destroy(true, true)
				swiperInstance = null

				updateUI(currentIndex)
			}
		}
	}

	triggers.forEach((trigger, index) => {
		const handleActivation = () => {
			if (swiperInstance) {
				swiperInstance.slideToLoop(index)
			} else {
				updateUI(index)
			}
		}

		trigger.addEventListener("click", handleActivation)

		trigger.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault()
				handleActivation()
			} else if (e.key === "ArrowRight") {
				e.preventDefault()
				const nextIndex = (index + 1) % triggers.length
				if (swiperInstance) swiperInstance.slideToLoop(nextIndex)
				else updateUI(nextIndex)
				triggers[nextIndex].focus()
			} else if (e.key === "ArrowLeft") {
				e.preventDefault()
				const prevIndex = (index - 1 + triggers.length) % triggers.length
				if (swiperInstance) swiperInstance.slideToLoop(prevIndex)
				else updateUI(prevIndex)
				triggers[prevIndex].focus()
			}
		})
	})

	mediaQuery.addEventListener("change", handleBreakpoint)
	handleBreakpoint(mediaQuery)

	updateUI(currentIndex)
}

document
	.querySelectorAll(".tabs.swiper-tabs-visibility")
	.forEach((container) => {
		initResponsiveSwiperTabs(container)
	})

const swiperToolsFirst = new Swiper(".swiper-tools-first", {
	loop: true,
	speed: 5000,
	slidesPerView: "auto",
	spaceBetween: 56,
	freeMode: {
		enabled: true,
		momentum: false,
		sticky: false,
	},

	autoplay: {
		delay: 0,
		reverseDirection: false,
	},
})
const swiperToolsSecond = new Swiper(".swiper-tools-second", {
	loop: true,
	speed: 5000,
	slidesPerView: "auto",
	spaceBetween: 56,

	autoplay: {
		delay: 0,
		reverseDirection: true,
	},
})
const swiperToolsThird = new Swiper(".swiper-tools-third", {
	loop: true,
	speed: 5000,
	slidesPerView: "auto",
	spaceBetween: 56,
	freeMode: {
		enabled: true,
		momentum: false,
		sticky: false,
	},

	autoplay: {
		delay: 0,
		reverseDirection: false,
	},
})
