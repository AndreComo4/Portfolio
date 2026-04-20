let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});
document.getElementById('contactBtn').onclick = () => {
    location.href = "#contact";
};
const projectsContainer = document.getElementById('github-projects');
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/AndreComo4/repos?sort=updated');
        const repos = await response.json();
        const projectsContainer = document.getElementById('github-projects');
        projectsContainer.innerHTML = '';
        repos.forEach(repo => {
            if (repo.name.toLowerCase() === 'andrecomo4') return;
            const card = document.createElement('div');
            card.className = 'projects-card';
            const cleanName = repo.name.replace(/[-_]/g, ' ');
            const techTag = repo.language ? `<span class="tech-tag">${repo.language}</span>` : '';
            card.innerHTML = `
                <div class="card-content">
                    <div class="card-header">
                        <i class='bx bxl-github'></i>
                        ${techTag}
                    </div>
                    <h3>${cleanName}</h3>
                    <p>${repo.description || "Un progetto in fase di sviluppo. Clicca sul repository per esplorare il codice sorgente."}</p>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn">Vedi Repository</a>
            `;
            projectsContainer.appendChild(card);
        });
        const moreCard = document.createElement('div');
        moreCard.className = 'projects-card github-more-card';
        moreCard.innerHTML = `
            <div class="card-content" style="text-align: center;">
                <i class='bx bxl-github' style="font-size: 8rem; margin-bottom: 2rem; color: var(--main-color); filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.5));"></i>
                <h3>Vedi tutti i progetti</h3>
                <p>Vuoi esplorare il resto del mio codice? Visita il mio profilo completo su GitHub.</p>
            </div>
            <a href="https://github.com/AndreComo4" target="_blank" class="btn">Vai al Profilo</a>
        `;
        projectsContainer.appendChild(moreCard);
    } catch (error) {
        console.error("Errore:", error);
    }
}
fetchGitHubRepos();
const projectsBox = document.getElementById('github-projects');
const btnLeft = document.getElementById('scroll-left');
const btnRight = document.getElementById('scroll-right');
const scrollAmount = 450; 
if (btnRight && btnLeft && projectsBox) {
    btnRight.onclick = () => {
        projectsBox.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
    btnLeft.onclick = () => {
        projectsBox.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };
}
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nomeInput').value;
        const email = document.getElementById('emailInput').value;
        const oggetto = document.getElementById('oggettoInput').value;
        const messaggio = document.getElementById('messaggioInput').value;
        const corpoEmail = `Nome: ${nome}\nEmail di contatto: ${email}\n\nMessaggio:\n${messaggio}`;
        const mailtoLink = `mailto:info@andreacomolli.it?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(corpoEmail)}`;
        window.location.href = mailtoLink;
    });
}
document.getElementById('current-year').textContent = new Date().getFullYear();