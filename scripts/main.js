// scripts/main.js

// ==============================
// Footer year
// ==============================
(function setYear() {
  // Set current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// ==============================
// Navigation active state + dot
// ==============================
(function navInteractions() {
  var nav = document.querySelector(".nav");
  if (!nav) return;

  var links = nav.querySelectorAll(".nav__link");
  var dot = nav.querySelector(".nav__dot");

  // Guard: if dot or links missing, bail
  if (!dot || !links.length) return;

  // Helper to position dot under a given link
  function moveDotTo(link) {
    var rect = link.getBoundingClientRect();
    var navRect = nav.getBoundingClientRect();
    var center = rect.left + rect.width / 2;
    var offset = center - navRect.left - dot.offsetWidth / 2;

    dot.style.opacity = "1";
    dot.style.transform = "translateX(" + offset + "px)";
  }

  // Click handler: update active class and move dot
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      links.forEach(function (l) {
        l.classList.remove("nav__link--active");
      });
      this.classList.add("nav__link--active");
      moveDotTo(this);
    });
  });

  // On load, align dot with initial active link
  var active = nav.querySelector(".nav__link--active");
  if (active) {
    // small delay so layout computes correctly
    setTimeout(function () {
      moveDotTo(active);
    }, 150);
  }

  // Optional: update nav based on scroll position
  var sectionIds = ["Home", "About", "Skills", "Projects", "Contact"];
  var sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function onScroll() {
    var fromTop = window.scrollY + 120;

    var currentSection = sections.reduce(function (acc, section) {
      if (section.offsetTop <= fromTop) {
        return section;
      }
      return acc;
    }, sections[0]);

    if (!currentSection) return;

    var id = currentSection.getAttribute("id");

    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        if (!link.classList.contains("nav__link--active")) {
          links.forEach(function (l) {
            l.classList.remove("nav__link--active");
          });
          link.classList.add("nav__link--active");
          moveDotTo(link);
        }
      }
    });
  }

  window.addEventListener("scroll", onScroll);
})();
