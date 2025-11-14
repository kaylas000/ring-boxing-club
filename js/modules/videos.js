// Видео-плеер и работа с плейлистом
export class VideoPlayer {
  constructor(selector) {
    this.el = document.querySelector(selector);
    // Реализация видео-плеера и управления
  }
  play(src) { /* загрузка и воспроизведение */ }
  pause() { /* пауза */ }
}
window.VideoPlayer = VideoPlayer;
