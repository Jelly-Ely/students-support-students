/* STUDENTS SUPPORT STUDENTS — Global UI */
const header = document.querySelector('.site-header');
const footer = document.querySelector('.site-footer');

const navMarkup = `
<nav class="navbar container" aria-label="Main navigation">
  <a href="index.html" class="logo" aria-label="Students Support Students home"><img src="images/logo.png" alt=""><span>Students Support Students</span></a>
  <button class="menu-button" type="button" aria-expanded="false" aria-label="Open navigation menu"><span></span><span></span><span></span></button>
  <ul class="nav-links">
    <li><a href="about.html">About Us</a></li>
    <li class="nav-item dropdown">
      <button class="dropdown-toggle" type="button" aria-expanded="false">Find Support <span aria-hidden="true">⌄</span></button>
      <div class="dropdown-menu support-menu">
        <div class="dropdown-intro"><span class="dropdown-kicker">Find support</span><strong>You don't have to figure it out alone.</strong><p>Start with what you need right now. We'll help you find a person, resource, or next step.</p></div>
        <div class="dropdown-links"><a href="get-help.html"><strong>Ask for support</strong><span>Tell us what you're navigating.</span></a><a href="mentors.html"><strong>Meet a mentor</strong><span>Connect with another student.</span></a><a href="how-we-help.html"><strong>Ways we can help</strong><span>See the support SSS offers.</span></a></div>
      </div>
    </li>
    <li class="nav-item dropdown">
      <button class="dropdown-toggle" type="button" aria-expanded="false">Explore Resources <span aria-hidden="true">⌄</span></button>
      <div class="dropdown-menu compact-menu"><div class="dropdown-links"><a href="resources.html"><strong>Resource Library</strong><span>Browse all student resources.</span></a><a href="resources.html#financial-aid"><strong>Paying for college</strong><span>Aid, scholarships, and money.</span></a><a href="resources.html#transfer-support"><strong>Navigating college</strong><span>Transfer and college pathways.</span></a><a href="resources.html#undocumented-students"><strong>Undocumented students</strong><span>Resources built with access in mind.</span></a></div></div>
    </li>
    <li class="nav-item dropdown">
      <button class="dropdown-toggle" type="button" aria-expanded="false">Join the Community <span aria-hidden="true">⌄</span></button>
      <div class="dropdown-menu compact-menu dropdown-menu-right"><div class="dropdown-links"><a href="get-involved.html"><strong>Get involved</strong><span>Help us support more students.</span></a><a href="get-involved.html#mentor"><strong>Become a mentor</strong><span>Share what you've learned.</span></a><a href="contact.html"><strong>Partner or collaborate</strong><span>Build something with SSS.</span></a></div></div>
    </li>
    <li><a href="contact.html">Contact</a></li>
    <li class="mobile-cta"><a href="get-help.html">Get Help</a></li>
  </ul>
  <a href="get-help.html" class="nav-button">Get Help <span aria-hidden="true">→</span></a>
</nav>`;

const footerMarkup = `
<div class="container footer-content">
  <div class="footer-brand"><div class="footer-logo-line"><img src="images/logo.png" alt=""><h3>Students Support Students</h3></div><p>Making college a little easier to navigate, one student at a time.</p></div>
  <div class="footer-links"><h4>Find support</h4><a href="get-help.html">Ask for help</a><a href="mentors.html">Meet mentors</a><a href="resources.html">Resources</a></div>
  <div class="footer-links"><h4>Be part of SSS</h4><a href="get-involved.html">Get involved</a><a href="about.html">About us</a><a href="contact.html">Contact</a></div>
  <div class="footer-links"><h4>Follow along</h4><a href="https://www.instagram.com/students_support_students/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div>
</div><div class="footer-bottom"><div class="container"><p>© <span id="current-year"></span> Students Support Students.</p></div></div>`;

if (header) header.innerHTML = navMarkup;
if (footer) footer.innerHTML = footerMarkup;

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const dropdowns = [...document.querySelectorAll('.dropdown')];
function closeDropdowns(except=null){dropdowns.forEach(d=>{if(d===except)return;d.classList.remove('open');d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded','false');});}
function closeMenu(){if(!menuButton||!navLinks)return;navLinks.classList.remove('nav-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation menu');closeDropdowns();}
menuButton?.addEventListener('click',()=>{const open=navLinks.classList.toggle('nav-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
dropdowns.forEach(dropdown=>{const toggle=dropdown.querySelector('.dropdown-toggle');toggle?.addEventListener('click',e=>{e.stopPropagation();const open=!dropdown.classList.contains('open');closeDropdowns(dropdown);dropdown.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));});dropdown.addEventListener('mouseenter',()=>{if(innerWidth<=900)return;closeDropdowns(dropdown);dropdown.classList.add('open');toggle?.setAttribute('aria-expanded','true');});dropdown.addEventListener('mouseleave',()=>{if(innerWidth<=900)return;dropdown.classList.remove('open');toggle?.setAttribute('aria-expanded','false');});});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!navLinks?.contains(e.target)&&!menuButton?.contains(e.target))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
function updateHeader(){header?.classList.toggle('header-scrolled',scrollY>20);} addEventListener('scroll',updateHeader,{passive:true});updateHeader();
const currentPage=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('#')[0]===currentPage));
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;const reveal=document.querySelectorAll('.path-card,.service-card,.step-card,.support-card,.reason,.mission-vision-card,.hexagon,.audience-card,.mentor-card,.topic-pill,.help-service-card,.help-step,.help-audience-card,.resource-item,.featured-resource-card,.category-card,.contact-method');if(!reduceMotion&&'IntersectionObserver'in window){reveal.forEach(el=>el.classList.add('reveal'));const io=new IntersectionObserver((entries,o)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');o.unobserve(entry.target);}}),{threshold:.08});reveal.forEach(el=>io.observe(el));}else reveal.forEach(el=>el.classList.add('visible'));
const topButton=document.createElement('button');topButton.className='scroll-top';topButton.type='button';topButton.innerHTML='↑';topButton.setAttribute('aria-label','Scroll to top');document.body.appendChild(topButton);function updateTop(){topButton.classList.toggle('scroll-top-visible',scrollY>500);}addEventListener('scroll',updateTop,{passive:true});updateTop();topButton.addEventListener('click',()=>scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));
const year=document.querySelector('#current-year');if(year)year.textContent=new Date().getFullYear();