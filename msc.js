
/*
1. render song
2. scrollTop
3. play/pause/seek
**/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const srcAudio = $(".src-audio");
const cd = $('.cd');
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
const playlist = $('.playlist')

const audio = $('#audio');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex? "active": ""}" data-Index=${index}>
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join("");

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        }
        )
    },
    handleEvent: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // xử lý quay/dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ],
            {
                // đối số thứ 2 là nó lặp như thế nào
                duration: 10000,
                iterations: Infinity, //lặp lại vô hạn
            }
        );
        cdThumbAnimate.pause();

        // xử lí phòng to nhỏ ảnh
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;
            // thu nhỏ ảnh cd
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            // làm mờ ảnh cd
            cd.style.opacity = newWidth / cdWidth;
        }

        // xử lí onclick play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // khi song play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // tiến độ bài hất thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        // khi next bài hát
        btnNext.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // khi prev bài hát
        btnPrev.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();


        }
        // khi random bài hát
        btnRandom.onclick = function () {
            if (!_this.isRandom) {
                _this.isRandom = true;
                btnRandom.classList.add("active");
            } else {
                _this.isRandom = false;
                btnRandom.classList.remove("active");
            }

            // _this.isRandom = !_this.isRandom;
            // btnRandom.classList.toggle('active', _this.isRandom);
        }

        // Xử lý next song khi ended bài hát
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play();
            }else{
                _this.nextSong();
                _this.render();
                audio.play();
            }
            // Hoặc dùng click --> btnNext.click(); --> vậy là nó tự động click luôn
        }

        // Xử lý phats lại 1 bài hát
        btnRepeat.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            btnRepeat.classList.toggle('active', _this.isRepeat);
        }

        // lắng nghe sự kiện khi click vào bài hát
        playlist.onclick = function(e){
            const songIndex = e.target.closest('.song:not(.active)');
            if(songIndex || e.target.closest('.option')){
                // xử lí khi click vào
                if(songIndex) {
                    _this.currentIndex = Number(songIndex.getAttribute('data-index'));
                    // hoặc thay songIndex.dataset.index
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }
    },
    scrollToActiveSong: function(){
        setTimeout(()=> {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
        }, 300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        audio.src = this.currentSong.path;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        // định nghĩa các thuộc tính cho object
        this.defineProperties();

        //lắng nghe, xử lý các sự kiện của Dom event;
        this.handleEvent();

        // tải thông tin bài hát đầu tiên khi chạy ứng dụng
        this.loadCurrentSong();

        // render playlist
        this.render();
    }
};

const handleGetData = async () => {
    try {
        const response = await fetch("http://localhost:3000/songs").then(res => res.json());
        app.songs = response;
        app.start()
    } catch (error) {
        console.log(error.message);
    }
}

handleGetData();