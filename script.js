const CONFIG = {
    whatsapp: "4491131722",
    facebook: "https://www.facebook.com/pepe.moreno.9235",
    instagram: "https://www.instagram.com/ia_hacer_dinero/",
    maps: "https://maps.app.goo.gl/awfbCueopAjmRnFX7", 
    youtubeUrl: "https://www.youtube.com/shorts/WhSWTBxVpQ0",
    textos: {
        cat1: { 
            t: "NUESTRA HISTORIA", 
            c: "Con más de 20 años de trayectoria en Aguascalientes, nuestra clínica de podología ha sido el referente de salud para miles de hidrocálidos. Lo que comenzó como un pequeño sueño dedicado al bienestar, hoy es una institución consolidada que combina experiencia artesanal con tecnología de vanguardia para que cada paso de nuestros pacientes sea firme y sin dolor." 
        },
        cat2: { 
            t: "SERVICIOS INTEGRALES", 
            c: "Ofrecemos una gama completa de cuidados especializados:\n\n• Quiropodia completa (corte correcto y eliminación de durezas).\n• Tratamiento de onicocriptosis (uñas encarnadas).\n• Eliminación de verrugas plantares.\n• Tratamiento para micosis (hongos) y pie de atleta.\n• Ortesis de silicona y plantillas personalizadas.\n• Hidratación profunda y cuidado del pie diabético." 
        },
        cat3: { 
            t: "ATENCIÓN PERSONALIZADA", 
            c: "Entendemos que tu salud no puede esperar. Por ello, ofrecemos servicio personalizado tanto en nuestra clínica equipada con los más altos estándares de higiene, como en la comodidad de tu hogar. Contamos con protocolos de bioseguridad rigurosos, materiales esterilizados y profesionales titulados para garantizarte un servicio seguro, profesional y totalmente confiable." 
        }
    }
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;

function openYouTubeVideo() { playClick(); window.open(CONFIG.youtubeUrl, '_blank'); }

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) {
        const src = imgElement.src;
        openLightbox(src, [src], true);
    }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);

    const imgCount = (cat === 'cat1' || cat === 'cat2' || cat === 'cat3') ? 6 : 4;
    const imgs = [];
    for(let i = 1; i <= imgCount; i++) {
        imgs.push(`assets/gallery/${cat}/${i}.jpg`);
    }
    
    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';
    
    imgs.forEach((src, index) => {
        const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
        rowGrid.appendChild(createPol(src, posClass, imgs));
    });
    
    grid.appendChild(rowGrid);

    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    div.onclick = (e) => { e.stopPropagation(); openLightbox(src, arr, false); };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    if(hideControls) {
        lightboxEl.classList.add('hide-nav-arrows');
    } else {
        lightboxEl.classList.remove('hide-nav-arrows');
    }
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    document.getElementById('text-zoom-title').innerText = CONFIG.textos[cat].t;
    document.getElementById('text-zoom-content').innerText = CONFIG.textos[cat].c;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }

function openWAChat() {
    playClick();
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=Hola, deseo agendar una cita podológica.`, '_blank');
}

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const spot = document.getElementById('spot-intro');
    const icon = document.getElementById('audio-icon');
    spot.muted = isMuted;
    icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function playClick() {
    const snd = document.getElementById('sndFxClick');
    if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); }
}

document.addEventListener('DOMContentLoaded', () => {
    const fbLink = document.getElementById('link-fb-direct');
    const mapsLink = document.getElementById('link-maps-direct');
    const igLink = document.getElementById('link-ig-direct');
    
    if(fbLink) fbLink.href = CONFIG.facebook;
    if(mapsLink) mapsLink.href = CONFIG.maps;
    if(igLink) igLink.href = CONFIG.instagram;

    window.addEventListener('click', () => {
        const spot = document.getElementById('spot-intro');
        if(spot && !isMuted) spot.play().catch(()=>{});
    }, {once: true});
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'Ama tus pies - Podología', url: window.location.href }); }
    catch { alert("Enlace copiado al portapapeles."); }
}