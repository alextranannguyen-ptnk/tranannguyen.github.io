document.addEventListener('DOMContentLoaded', () => {
    // all spans with data-count anywhere on the page
    const allSpans = Array.from(document.querySelectorAll('span[data-count]'));
    if (!allSpans.length) return;
  
    // find any sections with class .INICOM-counters
    const groups = Array.from(document.querySelectorAll('.INICOM-counters'));
  
    // If there are grouped containers, observe them and animate their children;
    // otherwise fall back to observing each span individually.
    if (groups.length) {
      // observe each group
      groups.forEach(section => {
        const spans = Array.from(section.querySelectorAll('span[data-count]'));
        if (!spans.length) return;
        observeAndAnimate(section, spans);
      });
  
      // animate any spans that are not inside a .INICOM-counters group
      const covered = new Set(groups.flatMap(g => Array.from(g.querySelectorAll('span[data-count]'))));
      allSpans.forEach(s => {
        if (!covered.has(s)) observeAndAnimate(s.parentElement || s, [s]);
      });
    } else {
      // no groups — observe each span's parent (or the span itself)
      allSpans.forEach(s => observeAndAnimate(s.parentElement || s, [s]));
    }
  
    // Creates an IntersectionObserver for a target element and animates the provided spans once when visible
    function observeAndAnimate(targetElement, spans) {
      let triggered = false;
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !triggered) {
            spans.forEach(animateRandomPlay);
            triggered = true;
            io.disconnect();
          }
        });
      }, { threshold: 0.3 });
  
      // watch the element (could be the group container or a parent)
      io.observe(targetElement);
    }
  
    // Random-jump animation for a single span element
    function animateRandomPlay(spanEl) {
      const raw = (spanEl.dataset.count || '').trim();        // e.g. "+50" or "200"
      const sign = raw.startsWith('+') ? '+' : (raw.startsWith('-') ? '-' : '');
      // extract numeric portion
      const target = parseInt(raw.replace(/[^\d]/g, ''), 10) || 0;
  
      // optional per-counter duration: <span data-count="+50" data-duration="2500">0</span>
      const duration = parseInt(spanEl.dataset.duration, 10) || 1200; // ms total animation time
      const step = parseInt(spanEl.dataset.step, 10) || 60; // ms between random updates
      let elapsed = 0;
  
      const timer = setInterval(() => {
        elapsed += step;
        if (elapsed >= duration) {
          clearInterval(timer);
          // final, exact value
          spanEl.textContent = sign + target.toLocaleString();
        } else {
          // show a random value from 0 to target (you can adjust to larger ranges)
          const randomVal = Math.floor(Math.random() * (target + 1));
          spanEl.textContent = sign + randomVal.toLocaleString();
        }
      }, step);
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    const ecoTrack = document.getElementById("ecoTrack");
    const ecoSlides = ecoTrack.querySelectorAll(".ECO-parent");
  
    // Clone first and last slides
    const firstClone = ecoSlides[0].cloneNode(true);
    const lastClone = ecoSlides[ecoSlides.length - 1].cloneNode(true);
  
    ecoTrack.appendChild(firstClone);
    ecoTrack.insertBefore(lastClone, ecoSlides[0]);
  
    // Re-select all slides (with clones)
    const allSlides = ecoTrack.querySelectorAll(".ECO-parent");
    let ecoIndex = 1; // start at first real slide
    const slideCount = ecoSlides.length;
  
    // set initial position
    ecoTrack.style.transform = `translateX(-${ecoIndex * 100}%)`;
  
    function moveEco(step) {
      ecoIndex += step;
      ecoTrack.style.transition = "transform 0.6s ease";
      ecoTrack.style.transform = `translateX(-${ecoIndex * 100}%)`;
    }
  
    // after transition, handle the "infinite" loop jump
    ecoTrack.addEventListener("transitionend", () => {
      if (ecoIndex === 0) {
        ecoTrack.style.transition = "none";
        ecoIndex = slideCount; // last real slide
        ecoTrack.style.transform = `translateX(-${ecoIndex * 100}%)`;
      }
      if (ecoIndex === allSlides.length - 1) {
        ecoTrack.style.transition = "none";
        ecoIndex = 1; // first real slide
        ecoTrack.style.transform = `translateX(-${ecoIndex * 100}%)`;
      }
    });
  
    // expose for HTML buttons
    window.moveEco = moveEco;
  });
  

  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach(card => {
      const imgEl = card.querySelector(".card-img");
      const images = JSON.parse(card.getAttribute("data-images"));
      let currentIndex = 0;
  
      function changeImage(newIndex) {
        imgEl.style.opacity = 0; // fade out
        setTimeout(() => {
          currentIndex = newIndex;
          imgEl.src = images[currentIndex];
          imgEl.style.opacity = 1; // fade in
        }, 300); // match transition time
      }
  
      // Right button
      card.querySelector(".nav-btn.right").addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % images.length;
        changeImage(nextIndex);
      });
  
      // Left button
      card.querySelector(".nav-btn.left").addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        changeImage(prevIndex);
      });
    });
  });
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".OpenJournal-card");
  
    cards.forEach(card => {
      const imgEl = card.querySelector(".OpenJournal-card-img");
      const images = JSON.parse(card.getAttribute("data-images"));
      let currentIndex = 0;
  
      function changeImage(newIndex) {
        imgEl.style.opacity = 0; // fade out
        setTimeout(() => {
          currentIndex = newIndex;
          imgEl.src = images[currentIndex];
          imgEl.style.opacity = 1; // fade in
        }, 300); // match transition time
      }
  
      // Right button
      card.querySelector(".OpenJournal-nav-btn.right").addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % images.length;
        changeImage(nextIndex);
      });
  
      // Left button
      card.querySelector(".OpenJournal-nav-btn.left").addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        changeImage(prevIndex);
      });
    });
  });
  
 // === OpenJournal slider (track-based, 3/2/1 card, loop, click + drag) ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.OpenJournal-slider').forEach(initOpenJournal);
});


function initOpenJournal(slider) {
  const viewport = slider.querySelector('.OpenJournal-viewport');
  const track    = slider.querySelector('.OpenJournal-track');
  const prevBtn  = slider.querySelector('.OpenJournal-prev');
  const nextBtn  = slider.querySelector('.OpenJournal-next');

  let baseSlides = Array.from(track.children); // <figure class="OpenJournal-slide">
  let slides = [];
  let visible = getVisible(); // 3 / 2 / 1
  let slideW = 0, gap = 0, step = 0;
  let index = 0;
  let isAnimating = false;

  // ===== Autoplay sau khi idle =====
  const IDLE_MS = 1500;    // 7s không tương tác -> tự move(1)
  let idleTimer = null;
  let dragging = false;

  build();
  bind();
  queueIdle();

  function getVisible() {
    const w = window.innerWidth;
    if (w >= 1100) return 3;
    if (w >= 720)  return 2;
    return 1;
  }

  function build() {
    track.style.transition = 'none';
    track.innerHTML = '';
    visible = getVisible();

    // clones để loop vô hạn
    const headClones = baseSlides.slice(-visible).map(cloneNode);
    const tailClones = baseSlides.slice(0, visible).map(cloneNode);
    slides = [...headClones, ...baseSlides, ...tailClones];
    slides.forEach(s => track.appendChild(s));

    // tính kích thước
    const cs = getComputedStyle(track);
    gap = parseFloat(cs.gap || 0) || 0;
    const vw = viewport.clientWidth;
    slideW = (vw - gap * (visible - 1)) / visible;
    step   = slideW + gap;

    slides.forEach(s => {
      s.style.flex = `0 0 ${slideW}px`;
      s.style.width = `${slideW}px`;
    });

    index = visible; // bắt đầu ngay sau head clones
    setX(-index * step);

    requestAnimationFrame(() => {
      track.style.transition = 'transform .55s cubic-bezier(.22,.61,.36,1)';
    });

    highlightCenter();
  }

  function cloneNode(el) {
    const c = el.cloneNode(true);
    c.classList.remove('is-center');
    return c;
  }

  function bind() {
    // click nút
    prevBtn.addEventListener('click', () => { userInteracted(); move(-1); });
    nextBtn.addEventListener('click', () => { userInteracted(); move(1);  });

    // drag/swipe
    let startX = 0, startT = 0;
    viewport.addEventListener('pointerdown', e => {
      dragging = true;
      pauseIdle();
      startX = e.clientX;
      startT = getX();
      track.style.transition = 'none';
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', e => {
      if (!dragging) return;
      setX(startT + (e.clientX - startX));
    });
    viewport.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      track.style.transition = 'transform .55s cubic-bezier(.22,.61,.36,1)';
      const diff = getX() - (-index * step);
      const threshold = step * 0.2;
      if (diff < -threshold) move(1);
      else if (diff > threshold) move(-1);
      else setX(-index * step);
      queueIdle(); // đếm lại 7s
    });

    // sau transition: xử lý nhảy “ẩn” khi chạm clone
    track.addEventListener('transitionend', (e) => {
      if (e.target !== track || e.propertyName !== 'transform') return;
    
      const realLen = baseSlides.length;
      if (index >= realLen + visible) {
        pauseIdle();
        index -= realLen;
        snap();
        queueIdle();
      } else if (index < visible) {
        pauseIdle();
        index += realLen;
        snap();
        queueIdle();
      }
      isAnimating = false;
    });
    

    // hover: tạm dừng khi trỏ chuột vào, tiếp tục khi rời
    slider.addEventListener('mouseenter', pauseIdle);
    slider.addEventListener('mouseleave', queueIdle);

    // responsive
    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => { build(); queueIdle(); }, 150);
    });

    // keyboard
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { userInteracted(); move(1); }
      if (e.key === 'ArrowLeft')  { userInteracted(); move(-1); }
    });

    // khi tab bị ẩn/hiện
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseIdle();
      else queueIdle();
    });
  }

  function move(dir) {
    if (isAnimating) return;
    isAnimating = true;
  
    const realLen = baseSlides.length;
  
    // --- PRE-WRAP TRƯỚC KHI TRƯỢT ---
    // đi sang phải từ slide thật cuối cùng
    if (dir > 0 && index === realLen + visible - 1) {
      pauseIdle();
      track.style.transition = 'none';
      index -= realLen;                 // nhảy về vị trí tương đương ở block giữa
      setX(-index * step);
      track.getBoundingClientRect();    // force layout
      track.style.transition = 'transform .55s cubic-bezier(.22,.61,.36,1)';
      queueIdle();
    }
    // đi sang trái từ slide thật đầu tiên
    if (dir < 0 && index === visible) {
      pauseIdle();
      track.style.transition = 'none';
      index += realLen;                 // nhảy sang cuối block giữa
      setX(-index * step);
      track.getBoundingClientRect();
      track.style.transition = 'transform .55s cubic-bezier(.22,.61,.36,1)';
      queueIdle();
    }
  
    // Bước animate bình thường (luôn trong block giữa)
    index += dir;
    setX(-index * step);
  }
  
  track.addEventListener('transitionend', (e) => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    isAnimating = false;
  });
  

  function setX(px) {
    track.style.transform = `translate3d(${px}px,0,0)`;
  }
  
  function getX() {
    const m = track.style.transform.match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : 0;
  }

  function snap() {
    track.style.transition = 'none';
    setX(-index * step);
  
    // đợi 1 frame rồi mới bật lại transition => không thấy nhảy
    requestAnimationFrame(() => {
      track.getBoundingClientRect(); // force layout
      track.style.transition = 'transform .55s cubic-bezier(.22,.61,.36,1)';
    });
  }
  

  function highlightCenter() {
    slides.forEach(s => s.classList.remove('is-center'));
    const center = index + Math.floor(visible / 2);
    if (slides[center]) slides[center].classList.add('is-center');
  }

  // ===== idle autoplay helpers =====
  function queueIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!dragging && !isAnimating && document.visibilityState === 'visible') {
        move(1);
      }
      queueIdle(); // lặp lại cho lần kế tiếp
    }, IDLE_MS);
  }
  function pauseIdle() { clearTimeout(idleTimer); }
  function userInteracted() { pauseIdle(); queueIdle(); }
}
