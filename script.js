/* ================= MENU ================= */
const toggle = document.getElementById("menu-toggle");
const panel = document.getElementById("menu-panel");

// ouvrir / fermer
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  panel.classList.toggle("active");
});

// fermer quand on clique sur un lien
document.querySelectorAll(".menu-links a").forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    panel.classList.remove("active");
  });
});

/* ================= TYPING ================= */
const words = ["Électronicien","Électricien","Développeur Web"];
let i = 0, j = 0, del = false;

function type(){
  let w = words[i];
  document.querySelector(".typing").textContent = w.substring(0,j);

  if(!del && j < w.length) j++;
  else if(del && j > 0) j--;
  else{
    del = !del;
    if(!del) i = (i+1) % words.length;
  }

  setTimeout(type, del ? 50 : 100);
}
type();

/* ================= REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("active");
    }
  });
});

/* ================= EMAILJS ================= */

// Initialisation
(function(){
  emailjs.init("wKRGyDqGYCuYJLfV8");
})();

// Envoi formulaire
document.getElementById("contact-form")
.addEventListener("submit", function(e){

  e.preventDefault();

  const status = document.getElementById("status");

  // Message de chargement
  status.innerHTML = "⏳ Envoi en cours...";

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  emailjs.send(
    "service_l5j3wnt",
    "template_5pc2xe8",
    params
  )
  .then(() => {
    status.innerHTML = "✅ Message envoyé avec succès !";
    this.reset();
  })
  .catch((error) => {
    status.innerHTML = "❌ Une erreur est survenue.";
    console.error(error);
  });

});
window.addEventListener("load", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("active");
  });
});
