const SECTIONS = document.querySelectorAll("section");
const NAV_LINKS = document.querySelectorAll("header a");
const HEADER = document.querySelector("header");
const HEADER_HEIGHT = HEADER.offsetHeight;

let currentSectionIndex = 0;

function updateActiveLink() {
  SECTIONS.forEach((section) => {
    const TOP = window.scrollY;
    const OFFSET = section.offsetTop - HEADER.offsetHeight;
    const HEIGHT = section.offsetHeight;
    const ID = section.getAttribute("id");

    if (TOP >= OFFSET && TOP < OFFSET + HEIGHT) {
      NAV_LINKS.forEach((links) => {
        links.classList.remove("active-link");
      });

      const ACTIVE_LINK = document.querySelector(`header a[href*=${ID}]`);
      ACTIVE_LINK.classList.add("active-link");
    }
  });
}

function scrollToSection(index) {
  const TARGET_POSITION = SECTIONS[index].offsetTop - HEADER_HEIGHT;

  window.scrollTo({
    top: TARGET_POSITION,
    behavior: "smooth"
  });
}

function handleScroll(event) {
  const DELTAY = event.deltaY;

  if (DELTAY >= 0) {
    currentSectionIndex = Math.min(currentSectionIndex + 1, SECTIONS.length - 1);
  } else {
    currentSectionIndex = Math.max(0, currentSectionIndex - 1);
  }

  scrollToSection(currentSectionIndex);
}

function handleLinkClick(event) {
  event.preventDefault();

  const INDEX = [...NAV_LINKS].indexOf(event.target);
  
  if (INDEX !== -1) scrollToSection(INDEX);
}

document.addEventListener("scroll", updateActiveLink);
document.addEventListener("wheel", handleScroll);
NAV_LINKS.forEach((link) => link.addEventListener("click", handleLinkClick));
