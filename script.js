(function () {
  const ANNIVERSARY = new Date("2026-04-16T00:00:00+08:00");
  const ANNIVERSARY_END = new Date("2026-04-16T23:59:59+08:00");

  const dayEl = document.getElementById("cd-days");
  const hourEl = document.getElementById("cd-hours");
  const minuteEl = document.getElementById("cd-minutes");
  const secondEl = document.getElementById("cd-seconds");
  const noteEl = document.getElementById("countdown-note");

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();

    if (now > ANNIVERSARY_END) {
      dayEl.textContent = "00";
      hourEl.textContent = "00";
      minuteEl.textContent = "00";
      secondEl.textContent = "00";
      noteEl.textContent = "70周年纪念日已到来，校庆进行中";
      return;
    }

    const diff = ANNIVERSARY - now;
    const day = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hour = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minute = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    const second = Math.max(0, Math.floor((diff / 1000) % 60));

    dayEl.textContent = pad(day);
    hourEl.textContent = pad(hour);
    minuteEl.textContent = pad(minute);
    secondEl.textContent = pad(second);

    if (diff <= 0 && now <= ANNIVERSARY_END) {
      noteEl.textContent = "今天就是70周年纪念日";
    } else {
      noteEl.textContent = "距离70周年纪念日";
    }
  }

  function updateEventStatus() {
    const now = new Date();
    const cards = document.querySelectorAll(".event-card");

    cards.forEach((card) => {
      const statusEl = card.querySelector(".event-status");
      const startRaw = card.getAttribute("data-start");
      if (!statusEl || !startRaw) {
        return;
      }

      const start = new Date(startRaw);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

      statusEl.className = "event-status";

      if (now < start) {
        statusEl.classList.add("status-upcoming");
        statusEl.textContent = "即将开始";
      } else if (now >= start && now <= end) {
        statusEl.classList.add("status-ongoing");
        statusEl.textContent = "进行中";
      } else {
        statusEl.classList.add("status-finished");
        statusEl.textContent = "已结束";
      }
    });
  }

  function setupReveal() {
    const blocks = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    blocks.forEach((block) => observer.observe(block));
  }

  setupReveal();
  updateCountdown();
  updateEventStatus();

  setInterval(() => {
    updateCountdown();
    updateEventStatus();
  }, 1000);
})();
