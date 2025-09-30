// 오디오 서비스
class AudioService {
  constructor() {
    this.sounds = {}
    this.isEnabled = true
    this.volume = 0.5
    this.loadSounds()
  }

  // 사운드 파일들 로드
  loadSounds() {
    const soundFiles = {
      click: '/src/assets/sounds/click.mp3',
      coin: '/src/assets/sounds/coin.mp3',
      levelUp: '/src/assets/sounds/level-up.mp3',
      purchase: '/src/assets/sounds/purchase.mp3',
      roulette: '/src/assets/sounds/roulette.mp3',
      win: '/src/assets/sounds/win.mp3',
      lose: '/src/assets/sounds/lose.mp3',
      notification: '/src/assets/sounds/notification.mp3',
      button: '/src/assets/sounds/button.mp3'
    }

    // 각 사운드 파일을 Audio 객체로 생성
    Object.keys(soundFiles).forEach(key => {
      this.sounds[key] = new Audio(soundFiles[key])
      this.sounds[key].volume = this.volume
    })
  }

  // 사운드 재생
  play(soundName) {
    if (!this.isEnabled) return
    
    const sound = this.sounds[soundName]
    if (sound) {
      // 현재 재생 중인 사운드가 있으면 처음부터 다시 재생
      sound.currentTime = 0
      sound.play().catch(error => {
        console.warn(`사운드 재생 실패: ${soundName}`, error)
      })
    }
  }

  // 볼륨 설정
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume
    })
  }

  // 사운드 활성화/비활성화
  setEnabled(enabled) {
    this.isEnabled = enabled
  }

  // 사운드 중지
  stop(soundName) {
    const sound = this.sounds[soundName]
    if (sound) {
      sound.pause()
      sound.currentTime = 0
    }
  }

  // 모든 사운드 중지
  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause()
      sound.currentTime = 0
    })
  }
}

// 싱글톤 인스턴스 생성
export const audioService = new AudioService()
