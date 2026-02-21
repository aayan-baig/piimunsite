(function(){
  var page = document.querySelector("[data-page]");
  var nav = document.querySelector(".nav");
  var wm = document.querySelector(".watermark img");

  function setActiveTab(){
    if(!page) return;
    var key = page.getAttribute("data-page");
    var tabs = document.querySelectorAll("[data-tab]");
    tabs.forEach(function(a){
      a.classList.toggle("is-active", a.getAttribute("data-tab") === key);
    });
  }

  function navScrollState(){
    if(!nav) return;
    nav.classList.toggle("is-scrolled", (window.scrollY || 0) > 10);
  }

  function parallaxWatermark(){
    if(!wm) return;
    var y = window.scrollY || 0;
    var t = 8 + y * 0.018;
    wm.style.transform = "translateY(" + t + "px) scale(1.03)";
  }

  function revealInit(){
    var els = document.querySelectorAll(".reveal");
    if(!els.length) return;

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function(el){ io.observe(el); });
  }

  function pageIn(){
    var shell = document.querySelector(".fade-page");
    if(shell) requestAnimationFrame(function(){ shell.classList.add("is-ready"); });
  }

  setActiveTab();
  navScrollState();
  pageIn();
  revealInit();
  parallaxWatermark();

  window.addEventListener("scroll", function(){
    navScrollState();
    parallaxWatermark();
  }, { passive:true });
})();
