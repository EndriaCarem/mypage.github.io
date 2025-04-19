// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Sound management
    let soundEnabled = localStorage.getItem("soundEnabled") !== "false"; // Default to true
    const toggleSoundBtn = document.getElementById("toggleSound");
    const mobileToggleSoundBtn = document.getElementById("mobileToggleSound");
    const clickSound = document.getElementById("clickSound");
    const hoverSound = document.getElementById("hoverSound");
    const successSound = document.getElementById("successSound");
    const toggleSound = document.getElementById("toggleSound");
  
    // Update sound button state
    function updateSoundButtonState() {
      if (soundEnabled) {
        toggleSoundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        if (mobileToggleSoundBtn) {
          mobileToggleSoundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        toggleSoundBtn.classList.remove("muted");
        if (mobileToggleSoundBtn) {
          mobileToggleSoundBtn.classList.remove("muted");
        }
      } else {
        toggleSoundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        if (mobileToggleSoundBtn) {
          mobileToggleSoundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        toggleSoundBtn.classList.add("muted");
        if (mobileToggleSoundBtn) {
          mobileToggleSoundBtn.classList.add("muted");
        }
      }
    }
  
    // Initialize sound button state
    updateSoundButtonState();
  
    // Toggle sound function
    function toggleSoundState() {
      soundEnabled = !soundEnabled;
      localStorage.setItem("soundEnabled", soundEnabled);
      updateSoundButtonState();
  
      // Play toggle sound if enabling sounds
      if (soundEnabled && toggleSound) {
        toggleSound.currentTime = 0;
        toggleSound.play();
      }
    }
  
    // Add event listeners to sound toggle buttons
    if (toggleSoundBtn) {
      toggleSoundBtn.addEventListener("click", toggleSoundState);
    }
  
    if (mobileToggleSoundBtn) {
      mobileToggleSoundBtn.addEventListener("click", toggleSoundState);
    }
  
    // Function to play sound
    function playSound(sound) {
      if (soundEnabled && sound) {
        sound.currentTime = 0;
        sound.play().catch((err) => {
          console.log("Audio playback was prevented:", err);
        });
      }
    }
  
    // Add click sound to all buttons and links
    const clickableElements = document.querySelectorAll(
      "a, button, .social-link, .contact-link, .skill-card, .contact-card"
    );
    clickableElements.forEach((element) => {
      element.addEventListener("click", () => {
        playSound(clickSound);
      });
  
      // Add hover sound for desktop
      element.addEventListener("mouseenter", () => {
        playSound(hoverSound);
      });
    });
  
    // Preloader
    const preloader = document.querySelector(".preloader");
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  
    // Particles.js Configuration
    if (document.getElementById("particles-js")) {
      // Check if particlesJS is a function before using it
      if (typeof particlesJS === "function") {
        particlesJS("particles-js", {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#8b5cf6", "#ec4899", "#a78bfa", "#f472b6"],
            },
            shape: {
              type: ["circle", "triangle"],
              stroke: {
                width: 0,
                color: "#000000",
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#8b5cf6",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        });
      } else {
        console.error(
          "particlesJS is not a function. Make sure particles.js is loaded correctly."
        );
      }
    }
  
    // Custom Cursor
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
  
    if (cursor && cursorFollower) {
      document.addEventListener("mousemove", (e) => {
        cursor.style.opacity = "1";
        cursorFollower.style.opacity = "1";
  
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
  
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      });
  
      document.addEventListener("mouseout", () => {
        cursor.style.opacity = "0";
        cursorFollower.style.opacity = "0";
      });
  
      // Change cursor on hover over links and buttons
      const links = document.querySelectorAll("a, button, .social-link");
      links.forEach((link) => {
        link.addEventListener("mouseover", () => {
          cursor.style.width = "0";
          cursor.style.height = "0";
          cursorFollower.style.width = "50px";
          cursorFollower.style.height = "50px";
          cursorFollower.style.borderWidth = "3px";
          cursorFollower.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
        });
  
        link.addEventListener("mouseout", () => {
          cursor.style.width = "10px";
          cursor.style.height = "10px";
          cursorFollower.style.width = "40px";
          cursorFollower.style.height = "40px";
          cursorFollower.style.borderWidth = "2px";
          cursorFollower.style.backgroundColor = "transparent";
        });
      });
    }
  
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const closeMenuBtn = document.querySelector(".close-menu-btn");
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        playSound(clickSound);
      });
  
      // Close menu when clicking on a link
      const navItems = document.querySelectorAll(".nav-links a");
      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          navLinks.classList.remove("active");
        });
      });
  
      // Close menu button
      if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => {
          navLinks.classList.remove("active");
          playSound(clickSound);
        });
      }
    }
  
    // Header Scroll Effect
    const header = document.querySelector("header");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  
    // Active Navigation Link
    const sections = document.querySelectorAll("section");
    const navLinksElements = document.querySelectorAll(".nav-link");
  
    window.addEventListener("scroll", () => {
      let current = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
  
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
  
      navLinksElements.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  
    // Dark/Light Theme Toggle
    const themeToggles = document.querySelectorAll(".theme-toggle");
  
    if (themeToggles.length > 0) {
      // Check for saved theme preference or use device preference
      const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
  
      // Apply saved theme
      document.documentElement.setAttribute("data-theme", savedTheme);
  
      themeToggles.forEach((themeToggle) => {
        if (savedTheme === "dark") {
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
  
        themeToggle.addEventListener("click", () => {
          const currentTheme =
            document.documentElement.getAttribute("data-theme");
          let targetTheme = "light";
  
          if (currentTheme === "light") {
            targetTheme = "dark";
            themeToggles.forEach((toggle) => {
              toggle.innerHTML = '<i class="fas fa-sun"></i>';
            });
          } else {
            targetTheme = "light";
            themeToggles.forEach((toggle) => {
              toggle.innerHTML = '<i class="fas fa-moon"></i>';
            });
          }
  
          document.documentElement.setAttribute("data-theme", targetTheme);
          localStorage.setItem("theme", targetTheme);
  
          // Play toggle sound
          playSound(toggleSound);
        });
      });
    }
  
    // Typing Effect
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
      const text = typingText.textContent;
      typingText.textContent = "";
      let i = 0;
  
      function typeWriter() {
        if (i < text.length) {
          typingText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }
  
      setTimeout(typeWriter, 1000);
    }
  
    // Animate Skills Progress Bars
    function animateSkills() {
      const skillProgress = document.querySelectorAll(".skill-progress");
  
      skillProgress.forEach((progress) => {
        const width = progress.getAttribute("data-width");
        progress.style.width = "0";
  
        setTimeout(() => {
          progress.style.width = width;
        }, 300);
      });
    }
  
    // Trigger skill animation when skills section is in view
    const skillsSection = document.querySelector(".skills");
  
    if (skillsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateSkills();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
  
      observer.observe(skillsSection);
    }
  
    // Contact Form Submission
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
  
        // Simple validation
        if (!name || !email || !subject || !message) {
          alert("Por favor, preencha todos os campos.");
          return;
        }
  
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        if (successMessage) {
          successMessage.classList.add("show");
  
          // Play success sound
          playSound(successSound);
  
          // Hide message after 3 seconds
          setTimeout(() => {
            successMessage.classList.remove("show");
          }, 3000);
        }
  
        // Reset form
        contactForm.reset();
      });
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  
    // Back to top button
    const backToTop = document.querySelector(".back-to-top");
  
    if (backToTop) {
      backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  
    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll(
        ".skill-card, .timeline-item, .contact-card, .about-image, .about-text"
      );
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
  
      elements.forEach((element) => {
        observer.observe(element);
      });
    }
  
    // Initialize animations
    setTimeout(animateOnScroll, 500);
  
    // Add vibration feedback for mobile devices
    function vibrateOnClick() {
      if ("vibrate" in navigator) {
        navigator.vibrate(30); // Vibrate for 30ms
      }
    }
  
    // Add vibration to clickable elements on mobile
    if ("ontouchstart" in window) {
      const touchElements = document.querySelectorAll(
        "a, button, .social-link, .contact-link"
      );
      touchElements.forEach((element) => {
        element.addEventListener("touchstart", vibrateOnClick);
      });
    }
  
    // Efeito de hover nos itens de contato
    const contactInfoItems = document.querySelectorAll(".contact-info-item");
  
    contactInfoItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const icon = item.querySelector(".contact-info-icon i");
        if (icon) {
          icon.classList.add("fa-beat");
        }
      });
  
      item.addEventListener("mouseleave", () => {
        const icon = item.querySelector(".contact-info-icon i");
        if (icon) {
          icon.classList.remove("fa-beat");
        }
      });
    });
  });
  
  var particlesJS;
  
  // Player de Música
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os elementos do player existem
    if (!document.getElementById('vinylDisc')) return;
  
    // Elementos do player
    const vinylDisc = document.getElementById('vinylDisc');
    const musicPlayer = document.getElementById('musicPlayer');
    const closePlayer = document.getElementById('closePlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const muteButton = document.getElementById('muteButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const currentSongArtist = document.getElementById('currentSongArtist');
    const playlist = document.getElementById('playlist');
  
    // Lista de músicas - Substitua pelas URLs do YouTube quando tiver um serviço de conversão
    const songs = [
      {
        title: 'Música Ambiente 1',
        artist: 'Artista 1',
        url: 'https://youtu.be/G7KNmW9a75Y?si=kt42OzzYZ2-00R6r'
      },
      {
        title: 'Música Ambiente 2',
        artist: 'Artista 2',
        url: 'https://youtu.be/ONq8z34NhwA?si=rW02W-G0UNrWzzdU'
      },
      {
        title: 'Música Ambiente 3',
        artist: 'Artista 3',
        url: 'https://youtu.be/xwtdhWltSIg?si=JIRbhXqEbhl7DZJE'
      },
      {
        title: 'Música Ambiente 4',
        artist: 'Artista 4',
        url: 'https://youtu.be/QpQn0Q9N5qA?si=Zimo0XEpj2Ct4o4Y'
      },
      {
        title: 'Música Ambiente 5',
        artist: 'Artista 5',
        url: 'https://youtu.be/GB2oJJPE7jY?si=Mpo84KtEhEa1HMoo'
      }
    ];
  
    let currentSongIndex = 0;
    let isPlaying = false;
  
    // Inicializar o player
    function initPlayer() {
      // Carregar a primeira música
      loadSong(currentSongIndex);
      
      // Criar a playlist
      createPlaylist();
      
      // Adicionar event listeners
      vinylDisc.addEventListener('click', togglePlayer);
      closePlayer.addEventListener('click', togglePlayer);
      playPauseButton.addEventListener('click', togglePlayPause);
      prevButton.addEventListener('click', playPreviousSong);
      nextButton.addEventListener('click', playNextSong);
      muteButton.addEventListener('click', toggleMute);
      volumeSlider.addEventListener('input', setVolume);
      progressBar.addEventListener('click', setProgress);
      
      // Atualizar o progresso da música
      audioPlayer.addEventListener('timeupdate', updateProgress);
      
      // Quando a música terminar, tocar a próxima
      audioPlayer.addEventListener('ended', playNextSong);
      
      // Inicializar o volume
      audioPlayer.volume = volumeSlider.value;
      
      // Inicializar animação de ícones dançantes
      initDancingIcons();
    }
  
    // Criar a playlist
    function createPlaylist() {
      playlist.innerHTML = '';
      
      songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        if (index === currentSongIndex) {
          li.classList.add('active');
        }
        
        li.innerHTML = `
          <div class="playlist-item-number">
            ${index === currentSongIndex && isPlaying ? 
              `<div class="music-bar"></div>
               <div class="music-bar"></div>
               <div class="music-bar"></div>` : 
              index + 1}
          </div>
          <div class="playlist-item-info">
            <h5 class="playlist-item-title">${song.title}</h5>
            <p class="playlist-item-artist">${song.artist}</p>
          </div>
        `;
        
        li.addEventListener('click', () => {
          currentSongIndex = index;
          loadSong(currentSongIndex);
          togglePlayPause(true);
        });
        
        playlist.appendChild(li);
      });
    }
  
    // Carregar uma música
    function loadSong(index) {
      const song = songs[index];
      currentSongTitle.textContent = song.title;
      currentSongArtist.textContent = song.artist;
      audioPlayer.src = song.url;
      
      // Atualizar a playlist
      updatePlaylistActiveItem();
    }
  
    // Atualizar o item ativo na playlist
    function updatePlaylistActiveItem() {
      const playlistItems = document.querySelectorAll('.playlist-item');
      
      playlistItems.forEach((item, index) => {
        const itemNumber = item.querySelector('.playlist-item-number');
        
        if (index === currentSongIndex) {
          item.classList.add('active');
          if (isPlaying) {
            itemNumber.innerHTML = `
              <div class="music-bar"></div>
              <div class="music-bar"></div>
              <div class="music-bar"></div>
            `;
          } else {
            itemNumber.textContent = index + 1;
          }
        } else {
          item.classList.remove('active');
          itemNumber.textContent = index + 1;
        }
      });
    }
  
    // Alternar o player (abrir/fechar)
    function togglePlayer() {
      musicPlayer.classList.toggle('active');
    }
  
    // Alternar play/pause
    function togglePlayPause(forcePlay) {
      if (forcePlay === true || !isPlaying) {
        audioPlayer.play().then(() => {
          isPlaying = true;
          playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
          vinylDisc.classList.add('spinning');
          updatePlaylistActiveItem();
        }).catch(error => {
          console.error('Erro ao reproduzir áudio:', error);
        });
      } else {
        audioPlayer.pause();
        isPlaying = false;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        vinylDisc.classList.remove('spinning');
        updatePlaylistActiveItem();
      }
    }
  
    // Tocar a música anterior
    function playPreviousSong() {
      currentSongIndex--;
      if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
      }
      
      loadSong(currentSongIndex);
      togglePlayPause(true);
    }
  
    // Tocar a próxima música
    function playNextSong() {
      currentSongIndex++;
      if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
      }
      
      loadSong(currentSongIndex);
      togglePlayPause(true);
    }
  
    // Alternar mudo
    function toggleMute() {
      audioPlayer.muted = !audioPlayer.muted;
      
      if (audioPlayer.muted) {
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    }
  
    // Definir o volume
    function setVolume() {
      audioPlayer.volume = volumeSlider.value;
      
      if (audioPlayer.volume === 0) {
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
      
      // Se o volume for ajustado para maior que 0, desativar o mudo
      if (audioPlayer.volume > 0 && audioPlayer.muted) {
        audioPlayer.muted = false;
      }
    }
  
    // Atualizar o progresso da música
    function updateProgress() {
      const { duration, currentTime } = audioPlayer;
      
      if (duration) {
        // Atualizar a barra de progresso
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Atualizar os displays de tempo
        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(duration);
      } else {
        currentTimeDisplay.textContent = '0:00';
        totalTimeDisplay.textContent = '0:00';
      }
    }
  
    // Definir o progresso ao clicar na barra
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audioPlayer.duration;
      
      if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
      }
    }
  
    // Formatar o tempo em minutos:segundos
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
    // Inicializar animação de ícones dançantes
    function initDancingIcons() {
      // Adicionar classe de animação para ícones
      const icons = document.querySelectorAll('.fab, .fas');
      
      icons.forEach(icon => {
        // Não aplicar aos ícones dentro do player de música
        if (!icon.closest('.music-player') && !icon.closest('.vinyl-disc')) {
          // Adicionar classe para animação
          icon.classList.add('dancing-icon');
          
          // Adicionar atraso aleatório para cada ícone
          const delay = Math.random() * 1;
          icon.style.animationDelay = `${delay}s`;
        }
      });
    }
  
    // Inicializar o player
    initPlayer();
  });
  
  // Adicionar estilos CSS para ícones dançantes
  document.addEventListener('DOMContentLoaded', function() {
    // Criar um estilo para a animação de dança
    const style = document.createElement('style');
    style.textContent = `
      @keyframes dance {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-3px) rotate(-5deg);
        }
        50% {
          transform: translateY(0) rotate(0deg);
        }
        75% {
          transform: translateY(-3px) rotate(5deg);
        }
        100% {
          transform: translateY(0) rotate(0deg);
        }
      }
  
      .dancing-icon {
        display: inline-block;
        animation: dance 3s ease-in-out infinite;
        transform-origin: center;
      }
    `;
    
    document.head.appendChild(style);
  });