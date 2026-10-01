/* STUDENTS SUPPORT STUDENTS — Global UI */
document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const footer=document.querySelector(".site-footer");

  const navMarkup=`
    <nav class="navbar container" aria-label="Main navigation">
      <a href="index.html" class="logo" aria-label="Students Support Students home">
        <img src="images/logo.png" alt="">
        <span>Students Support Students</span>
      </a>

      <button class="menu-button" type="button" aria-expanded="false" aria-label="Open navigation menu">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>

        <li class="nav-dropdown">
          <button class="dropdown-toggle" type="button" aria-expanded="false">About</button>
          <ul class="dropdown-menu">
            <li><a href="about.html#mission">Our Mission</a></li>
            <li><a href="mentors.html">Meet Our Mentors</a></li>
            <li><a href="executive-board.html">Executive Board</a></li>
          </ul>
        </li>

        <li class="nav-dropdown">
          <button class="dropdown-toggle" type="button" aria-expanded="false">How We Help</button>
          <ul class="dropdown-menu">
            <li><a href="how-we-help.html#mentorship">Mentorship</a></li>
            <li><a href="how-we-help.html#college-guidance">College Guidance</a></li>
            <li><a href="how-we-help.html#academic-support">Academic Support</a></li>
            <li><a href="how-we-help.html#career-support">Career Support</a></li>
          </ul>
        </li>

        <li class="nav-dropdown">
          <button class="dropdown-toggle" type="button" aria-expanded="false">Resources</button>
          <ul class="dropdown-menu">
            <li><a href="student-guides.html">Student Guides</a></li>
            <li><a href="resources.html#financial-aid">Financial Aid</a></li>
            <li><a href="resources.html#scholarships">Scholarships</a></li>
            <li><a href="resources.html#transfer-support">Transfer Support</a></li>
            <li><a href="resources.html#undocumented-students">Undocumented Students</a></li>
            <li><a href="resources.html">View All Resources</a></li>
          </ul>
        </li>

        <li class="nav-dropdown">
          <button class="dropdown-toggle" type="button" aria-expanded="false">Get Involved</button>
          <ul class="dropdown-menu">
            <li><a href="get-involved.html#become-a-mentor">Become a Mentor</a></li>
            <li><a href="get-involved.html#volunteer">Volunteer</a></li>
            <li><a href="get-involved.html#partner">Partner With Us</a></li>
          </ul>
        </li>

        <li><a href="contact.html" class="nav-button">Contact Us</a></li>
      </ul>
    </nav>
  `;

  const footerMarkup=`
    <div class="container footer-content">
      <div class="footer-brand">
        <h3>Students Support Students</h3>
        <p>Empowering students through mentorship, educational resources, and community support.</p>
      </div>

      <div class="footer-links">
        <h4>About</h4>
        <a href="about.html#mission">Our Mission</a>
        <a href="mentors.html">Our Mentors</a>
        <a href="executive-board.html">Executive Board</a>
      </div>

      <div class="footer-links">
        <h4>Explore</h4>
        <a href="how-we-help.html">How We Help</a>
        <a href="resources.html">Resources</a>
        <a href="get-involved.html">Get Involved</a>
        <a href="contact.html">Contact Us</a>
      </div>

      <div class="footer-links">
        <h4>Connect</h4>
        <a href="https://www.instagram.com/students_support_students/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <a href="https://www.tiktok.com/@studentssupportstudents" target="_blank" rel="noopener noreferrer">TikTok ↗</a>
        <a href="mailto:studentsupportquestions@gmail.com">Email Us</a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© <span id="current-year"></span> Students Support Students. All rights reserved.</p>
      </div>
    </div>
  `;

  if(header)header.innerHTML=navMarkup;
  if(footer)footer.innerHTML=footerMarkup;

  const menuButton=document.querySelector(".menu-button");
  const navLinks=document.querySelector(".nav-links");
  const dropdowns=[...document.querySelectorAll(".nav-dropdown")];

  function closeDropdowns(except=null){
    dropdowns.forEach(dropdown=>{
      if(dropdown===except)return;
      dropdown.classList.remove("open");
      dropdown.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded","false");
    });
  }

  function closeMenu(){
    if(!menuButton||!navLinks)return;
    navLinks.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label","Open navigation menu");
    closeDropdowns();
  }

  menuButton?.addEventListener("click",()=>{
    const open=navLinks.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");

    if(!open)closeDropdowns();
  });

  dropdowns.forEach(dropdown=>{
    const toggle=dropdown.querySelector(".dropdown-toggle");

    toggle?.addEventListener("click",event=>{
      event.stopPropagation();

      const open=!dropdown.classList.contains("open");
      closeDropdowns(dropdown);
      dropdown.classList.toggle("open",open);
      toggle.setAttribute("aria-expanded",String(open));
    });

    dropdown.addEventListener("mouseenter",()=>{
      if(window.innerWidth<=900)return;

      closeDropdowns(dropdown);
      dropdown.classList.add("open");
      toggle?.setAttribute("aria-expanded","true");
    });

    dropdown.addEventListener("mouseleave",()=>{
      if(window.innerWidth<=900)return;

      dropdown.classList.remove("open");
      toggle?.setAttribute("aria-expanded","false");
    });
  });

  document.querySelectorAll(".nav-links a").forEach(link=>{
    link.addEventListener("click",closeMenu);
  });

  document.addEventListener("click",event=>{
    if(!navLinks?.contains(event.target)&&!menuButton?.contains(event.target)){
      closeMenu();
    }
  });

  document.addEventListener("keydown",event=>{
    if(event.key==="Escape")closeMenu();
  });

  function updateHeader(){
    header?.classList.toggle("header-scrolled",window.scrollY>20);
  }

  window.addEventListener("scroll",updateHeader,{passive:true});
  updateHeader();

  const currentPage=window.location.pathname.split("/").pop()||"index.html";

  document.querySelectorAll(".nav-links a").forEach(link=>{
    const href=(link.getAttribute("href")||"").split("#")[0];
    link.classList.toggle("active",href===currentPage);
  });

  dropdowns.forEach(dropdown=>{
    const containsCurrentPage=[...dropdown.querySelectorAll("a")].some(link=>{
      const href=(link.getAttribute("href")||"").split("#")[0];
      return href===currentPage;
    });

    if(containsCurrentPage){
      dropdown.querySelector(".dropdown-toggle")?.classList.add("active");
    }
  });

  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealElements=document.querySelectorAll(
    ".service-card,.step,.mission-preview,.resource-home-card,.team-preview-card,.involvement-preview-card,.hexagon,.audience-card,.mentor-card,.board-card,.leadership-card,.help-service-card,.approach-card,.help-step,.help-audience-card,.resource-item,.featured-resource-card,.category-card,.guide-card,.contact-method,.next-step"
  );

  if(!reduceMotion&&"IntersectionObserver" in window){
    revealElements.forEach(element=>element.classList.add("reveal"));

    const observer=new IntersectionObserver((entries,instance)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          instance.unobserve(entry.target);
        }
      });
    },{threshold:.08});

    revealElements.forEach(element=>observer.observe(element));
  }else{
    revealElements.forEach(element=>element.classList.add("visible"));
  }

  const year=document.querySelector("#current-year");
  if(year)year.textContent=new Date().getFullYear();
});
