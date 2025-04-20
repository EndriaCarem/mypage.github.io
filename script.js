// Player de Música com YouTube - IMPLEMENTAÇÃO ÚNICA
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM carregado, iniciando player de música");
  
  // Verificar se os elementos do player existem
  if (!document.getElementById('vinylDisc')) {
    console.error("Elemento vinylDisc não encontrado");
    return;
  }

  // Elementos do player
  const vinylDisc = document.getElementById('vinylDisc');
  const musicPlayer = document.getElementById('musicPlayer');
  const closePlayer = document.getElementById('closePlayer');
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

  console.log("Elementos do player encontrados:", vinylDisc, musicPlayer);

  // Lista de músicas com IDs de vídeos do YouTube
  const songs = [
    {
      title: 'Hideout',
      artist: 'The Jazz Cats',
      youtubeId: 'rzJV_VEl-0k'
    },
    {
      title: 'ALIBI',
      artist: ' PABLLO VITTAR & YSEULT',
      youtubeId: 'rzJV_VEl-0k'
    },
    {
      title: 'Pararam Pra Reparar',
      artist: 'Maria Gadu',
      youtubeId: 'pxrNYPc0GmQ'
    },
    {
      title: 'Nave Espacial',
      artist: 'Liu & Samantha Machado',
      youtubeId: 'vOElyIyRPdE'
    },
    {
      title: 'Gather My Tears',
      artist: '서지원',
      youtubeId: 'QpQn0Q9N5qA'
    }
  ];

  let currentSongIndex = 0;
  let isPlaying = false;
  let youtubePlayer = null;
  let progressInterval = null;
  let autoPlayOnReady = true; // Flag para iniciar automaticamente
  let apiLoaded = false;
  let playerReady = false;

  // Alternar o player (abrir/fechar)
  function togglePlayer() {
    console.log("Alternando player");
    musicPlayer.classList.toggle('active');
  }

  // Adicionar event listeners básicos
  vinylDisc.addEventListener('click', function() {
    console.log("Disco clicado");
    togglePlayer();
    
    // Se o player estiver pronto mas não estiver tocando, inicie a reprodução
    if (playerReady && !isPlaying) {
      togglePlayPause(true);
    }
  });
  
  closePlayer.addEventListener('click', togglePlayer);

  // Carregar a API do YouTube
  function loadYouTubeAPI() {
    console.log("Carregando API do YouTube");
    
    // Verificar se a API já foi carregada
    if (window.YT && window.YT.Player) {
      console.log("API do YouTube já carregada");
      initYouTubePlayer();
      return;
    }
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Definir callback global
    window.onYouTubeIframeAPIReady = function() {
      console.log("API do YouTube pronta");
      apiLoaded = true;
      initYouTubePlayer();
    };
  }

  // Inicializar o player do YouTube
  function initYouTubePlayer() {
    console.log("Inicializando player do YouTube");
    
    // Verificar se o elemento do player existe
    if (!document.getElementById('youtubePlayer')) {
      console.error("Elemento youtubePlayer não encontrado");
      
      // Criar o elemento se não existir
      const playerContainer = document.getElementById('youtubePlayerContainer');
      if (playerContainer) {
        const playerDiv = document.createElement('div');
        playerDiv.id = 'youtubePlayer';
        playerContainer.appendChild(playerDiv);
      } else {
        console.error("Container do player não encontrado");
        return;
      }
    }
    
    try {
      youtubePlayer = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: songs[currentSongIndex].youtubeId,
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'disablekb': 1,
          'rel': 0,
          'autoplay': 0, // Não usar autoplay aqui, vamos controlar manualmente
          'origin': window.location.origin
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      });
    } catch (error) {
      console.error("Erro ao inicializar o player do YouTube:", error);
    }
  }

  // Tratamento de erro do player
  function onPlayerError(event) {
    console.error("Erro no player do YouTube:", event.data);
    
    // Se houver erro na música atual, tente a próxima
    if (event.data === 2 || event.data === 5 || event.data === 100 || event.data === 101 || event.data === 150) {
      console.log("Erro ao carregar vídeo, tentando próxima música");
      playNextSong();
    }
  }

  // Quando o player do YouTube estiver pronto
  function onPlayerReady(event) {
    console.log("Player do YouTube pronto");
    playerReady = true;
    
    // Remover preloader
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
    
    // Atualizar informações da música atual
    currentSongTitle.textContent = songs[currentSongIndex].title;
    currentSongArtist.textContent = songs[currentSongIndex].artist;
    
    // Criar a playlist
    createPlaylist();
    
    // Inicializar o volume
    setVolume();
    
    // Iniciar a música automaticamente com um pequeno atraso
    if (autoPlayOnReady) {
      setTimeout(() => {
        try {
          console.log("Iniciando reprodução automática");
          event.target.playVideo(); // Usar o evento diretamente
          musicPlayer.classList.add('active'); // Mostrar o player automaticamente
          vinylDisc.classList.add('spinning');
          isPlaying = true;
          playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
          startProgressUpdate();
          updatePlaylistActiveItem();
        } catch (error) {
          console.error("Erro ao iniciar reprodução automática:", error);
        }
      }, 1000);
    }
  }

  // Quando o estado do player mudar
  function onPlayerStateChange(event) {
    console.log("Estado do player mudou:", event.data);
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      playNextSong();
    }
    
    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      isPlaying = true;
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
      vinylDisc.classList.add('spinning');
      startProgressUpdate();
      updatePlaylistActiveItem();
    }
    
    // YT.PlayerState.PAUSED = 2
    if (event.data === 2) {
      isPlaying = false;
      playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
      vinylDisc.classList.remove('spinning');
      stopProgressUpdate();
      updatePlaylistActiveItem();
    }
  }

  // Criar a playlist
  function createPlaylist() {
    console.log("Criando playlist");
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
    console.log("Carregando música:", index);
    const song = songs[index];
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    
    if (youtubePlayer && youtubePlayer.loadVideoById) {
      try {
        youtubePlayer.loadVideoById(song.youtubeId);
      } catch (error) {
        console.error("Erro ao carregar vídeo:", error);
      }
    }
    
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

  // Alternar play/pause
  function togglePlayPause(forcePlay) {
    console.log("Toggle play/pause, forcePlay:", forcePlay, "isPlaying:", isPlaying);
    if (!youtubePlayer) {
      console.error("YouTube player não está pronto");
      return;
    }
    
    try {
      if (forcePlay === true || !isPlaying) {
        console.log("Tentando reproduzir vídeo");
        youtubePlayer.playVideo();
      } else {
        console.log("Tentando pausar vídeo");
        youtubePlayer.pauseVideo();
      }
    } catch (error) {
      console.error("Erro ao controlar o player:", error);
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
    if (!youtubePlayer) return;
    
    try {
      if (youtubePlayer.isMuted()) {
        youtubePlayer.unMute();
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        youtubePlayer.mute();
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
    } catch (error) {
      console.error("Erro ao alternar mudo:", error);
    }
  }

  // Definir o volume
  function setVolume() {
    if (!youtubePlayer) return;
    
    try {
      const volume = Math.round(volumeSlider.value * 100);
      youtubePlayer.setVolume(volume);
      
      if (volume === 0) {
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    } catch (error) {
      console.error("Erro ao definir volume:", error);
    }
  }

  // Iniciar atualização do progresso
  function startProgressUpdate() {
    stopProgressUpdate();
    progressInterval = setInterval(updateProgress, 1000);
  }

  // Parar atualização do progresso
  function stopProgressUpdate() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  // Atualizar o progresso da música
  function updateProgress() {
    if (!youtubePlayer) return;
    
    try {
      const duration = youtubePlayer.getDuration();
      const currentTime = youtubePlayer.getCurrentTime();
      
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
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
    }
  }

  // Definir o progresso ao clicar na barra
  function setProgress(e) {
    if (!youtubePlayer) return;
    
    try {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = youtubePlayer.getDuration();
      
      if (duration) {
        const seekTime = (clickX / width) * duration;
        youtubePlayer.seekTo(seekTime, true);
      }
    } catch (error) {
      console.error("Erro ao definir progresso:", error);
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
      }
    });
  }

  // Adicionar event listeners
  playPauseButton.addEventListener('click', function() {
    console.log("Botão play/pause clicado");
    togglePlayPause();
  });
  prevButton.addEventListener('click', playPreviousSong);
  nextButton.addEventListener('click', playNextSong);
  muteButton.addEventListener('click', toggleMute);
  volumeSlider.addEventListener('input', setVolume);
  progressBar.addEventListener('click', setProgress);

  // Inicializar o player
  console.log("Inicializando player");
  loadYouTubeAPI();
  initDancingIcons();
});
