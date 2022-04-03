class SJSE_Audio {
    constructor(audio) {
        this.audio = audio;
    }

    play() {
        if(!GameEnvironement.muted)
        if (!this.audio.isPaused) this.audio.play().catch(() => {
            GameEnvironement.alert.show('Allow Simple JS Canvas to play sound', 'Click Ok to allow the Browser to play sound for this game.', 
            [
                new AlertButton('Ok', () => this.audio.play()),
                new AlertButton('Cancel', () => GameEnvironement.muted = true)
            ]);
        });
    }

    playInLoop() {
        this.audio.loop = true;
        this.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.pause();
        this.audio.currentTime = 0; 
    }
}