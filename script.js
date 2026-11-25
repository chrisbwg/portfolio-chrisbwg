/* ================= MENU MOBILE ================= */
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
function closeMenu(){
  if(!toggle || !navLinks) return;
  toggle.classList.remove("active"); navLinks.classList.remove("active");
  toggle.setAttribute("aria-expanded","false"); toggle.setAttribute("aria-label","Ouvrir le menu");
}
function toggleMenu(){
  if(!toggle || !navLinks) return;
  const opened = navLinks.classList.toggle("active");
  toggle.classList.toggle("active",opened);
  toggle.setAttribute("aria-expanded",String(opened));
  toggle.setAttribute("aria-label",opened ? "Fermer le menu" : "Ouvrir le menu");
}
if(toggle && navLinks){
  toggle.addEventListener("click",toggleMenu);
  navLinks.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
  window.addEventListener("resize",()=>{if(window.innerWidth>650) closeMenu();});
}

/* ================= TYPING ================= */
const words=["Électronicien","Électricien","Développeur Web"];
const typingElement=document.querySelector(".typing");
let wordIndex=0,charIndex=0,deleting=false;
function type(){
  if(!typingElement) return;
  const word=words[wordIndex]; typingElement.textContent=word.substring(0,charIndex);
  if(!deleting && charIndex<word.length){charIndex++;setTimeout(type,95);}
  else if(deleting && charIndex>0){charIndex--;setTimeout(type,48);}
  else{deleting=!deleting;if(!deleting) wordIndex=(wordIndex+1)%words.length;setTimeout(type,deleting?1200:280);}
}
type();

/* ================= REVEAL ================= */
const reveals=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("active");observer.unobserve(entry.target);}});
  },{threshold:.12});
  reveals.forEach(element=>observer.observe(element));
}else{reveals.forEach(element=>element.classList.add("active"));}

/* ================= EMAILJS ================= */
const contactForm=document.getElementById("contact-form");
const statusElement=document.getElementById("status");
const submitButton=contactForm ? contactForm.querySelector('button[type="submit"]') : null;
if(typeof emailjs!=="undefined") emailjs.init("wKRGyDqGYCuYJLfV8");
if(contactForm){
  contactForm.addEventListener("submit",function(event){
    event.preventDefault();
    if(typeof emailjs==="undefined"){
      if(statusElement) statusElement.textContent="❌ Le service d'envoi n'a pas pu être chargé. Réessaie plus tard.";
      return;
    }
    if(statusElement) statusElement.textContent="⏳ Envoi en cours...";
    if(submitButton){submitButton.disabled=true;submitButton.querySelector("span").textContent="Envoi en cours...";}
    const params={
      name:document.getElementById("name").value.trim(),
      email:document.getElementById("email").value.trim(),
      subject:document.getElementById("subject").value.trim(),
      message:document.getElementById("message").value.trim()
    };
    emailjs.send("service_l5j3wnt","template_5pc2xe8",params)
      .then(()=>{if(statusElement) statusElement.textContent=" Message envoyé avec succès !";contactForm.reset();})
      .catch(error=>{if(statusElement) statusElement.textContent=" Une erreur est survenue. Vérifie ta connexion et réessaie.";console.error("EmailJS error:",error);})
      .finally(()=>{if(submitButton){submitButton.disabled=false;submitButton.querySelector("span").textContent="Envoyer";}});
  });
}
const yearElement=document.getElementById("year");
if(yearElement) yearElement.textContent=new Date().getFullYear();
