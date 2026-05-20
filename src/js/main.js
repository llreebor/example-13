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

// Inits
document.addEventListener("DOMContentLoaded", () => {
	// Mobile Menu
	initializeMobileMenu()

	// Trusted By Slider
	const trustedBySwiper = new Swiper(".swiper", {
		// Optional parameters
		loop: true,
		speed: 3000,
		autoplay: {
			delay: 0,
		},
		breakpoints: {
			320: {
				slidesPerView: 3,
			},

			640: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1280: {
				slidesPerView: 5.5,
			},
		},
	})
})
