var menu = document.getElementById("menu");

function openmenu() {
  menu.style.top = "0%";
}

function closemenu() {
  menu.style.top = "-100%";
}

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  nav: true,

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 3,
    },
  },
});

class CountUp {
  constructor(el) {
    this.el = el;
    this.setVars();
    this.init();
  }

  setVars() {
    this.number = this.el.querySelector("h2");
    this.observerOptions = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0,
    };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const end = parseInt(entry.target.innerText.replace(/,/g, ""));
        if (entry.isIntersecting) {
          this.iterateValue(entry.target, end);
        }
      });
    }, this.observerOptions);
  }

  init() {
    this.observer.observe(this.el);
  }

  iterateValue(el, end) {
    const start = 0;
    const duration = 2500;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedPercent = (timestamp - startTimestamp) / duration;
      const easedProgress = Math.min(this.easeOutQuint(elapsedPercent), 1);
      let interimNumber = Math.abs(easedProgress * (end - start) + start);
      el.querySelector("h2").innerText = Math.floor(interimNumber); // Update the h2 element
      if (easedProgress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  easeOutQuad(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }
}

const numberBoxes = document.querySelectorAll(".number-scrolling-box");

numberBoxes.forEach((box) => {
  new CountUp(box);
});
