/* =====================================================================
   SCRIPT — menu mobile, en-tête au scroll, formulaire, animations
   ===================================================================== */

// -- Année courante dans le footer
document.getElementById('annee-courante').textContent = new Date().getFullYear();

// -- Menu mobile (ouverture / fermeture accessible)
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');

function toggleMenu(ouvrir){
  const estOuvert = ouvrir ?? !menuMobile.classList.contains('ouvert');
  menuMobile.classList.toggle('ouvert', estOuvert);
  btnMenu.classList.toggle('actif', estOuvert);
  btnMenu.setAttribute('aria-expanded', String(estOuvert));
  btnMenu.setAttribute('aria-label', estOuvert ? 'Fermer le menu' : 'Ouvrir le menu');
}

btnMenu.addEventListener('click', () => toggleMenu());

// Ferme le menu après un clic sur un lien (utile sur mobile)
menuMobile.querySelectorAll('a').forEach(lien => {
  lien.addEventListener('click', () => toggleMenu(false));
});

// -- Effet de la navigation au défilement
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 30
    ? '0 6px 20px rgba(15,29,51,0.12)'
    : 'var(--ombre)';
}, { passive:true });

// -- Formulaire de rappel
const callbackForm = document.getElementById('callback-form');
const formMessage = document.getElementById('form-message');

callbackForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input');
  const telephone = input.value.trim();

  if (!input.checkValidity() || telephone.length < 6) {
    formMessage.textContent = "Merci de saisir un numéro de téléphone valide.";
    return;
  }

  // Ici : appel réel à votre backend / API d'envoi (fetch, etc.)
  formMessage.textContent = `Merci, nous vous rappelons très vite au ${telephone}.`;
  this.reset();
});

// -- Animations discrètes à l'apparition au défilement
const elementsAnimes = document.querySelectorAll('.card, .valeur');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting){
        entree.target.classList.add('visible');
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold:0.15 });

  elementsAnimes.forEach(el => observateur.observe(el));
} else {
  // Si l'utilisateur préfère moins de mouvement, on affiche directement
  elementsAnimes.forEach(el => el.classList.add('visible'));
}
