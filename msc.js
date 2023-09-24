
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
    songs: [
        {
            name: "Không Thể Say",
            singer: "Hieu Thu Hai",
            path: "./assets/music/song1.mp3",
            image: "https://o.vdoc.vn/data/image/2023/04/19/loi-bai-hat-khong-the-say-hieuthuhai-700.jpg"
        
        },
        {
            name: "Có Em Là Đủ",
            singer: "Wil",
            path: "./assets/music/song5.mp3",
            image: "https://nhachay.vn/wp-content/uploads/2022/03/14_maxresdefault.jpg"
        },
        {
            name: "Cổ Tích",
            singer: "JSol",
            path: "./assets/music/song6.mp3",
            image: "https://cdn.tuoitre.vn/471584752817336320/data/teen360/pictures/2022/03/09/1646794547_mv-co-tich_crot8469.jpg"
        },
        {
            name: "Em Là Tia Nắng",
            singer: "XIN",
            path: "./assets/music/song7.mp3",
            image: "https://wp.inews.co.uk/wp-content/uploads/2019/10/shutterstock_1479789158.jpg?resize=640,360&strip=all&quality=90"
        },
        {
            name: "Vệ Tinh",
            singer: "Hieu Thu Hai",
            path: "./assets/music/song3.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/4/9/f/6/49f6f7ebf517b9a6b2bc47abd6abfa32.jpg"
        
        },
        {
            name: "Một Ngàn Nôi Đau",
            singer: "Văn Mai Hương",
            path: "./assets/music/song13.mp3",
            image: "https://cdn.tuoitrethudo.com.vn/stores/news_dataimages/phamhuonggiang/062022/20/11/40f6d14d36e68016cc26375b7dd5cc23.jpg?rt=20220620111450"
        },
        {
            name: "Gieo Quẻ",
            singer: "Hoàng Thùy Linh",
            path: "./assets/music/song8.mp3",
            image: "https://vtv1.mediacdn.vn/thumb_w/640/2021/12/31/2701220944690031212547938452702125562170601n-16409622776481714933299.jpg"
        },
        {
            name: "Nghe Như Tình Yêu",
            singer: "Hieu Thu Hai",
            path: "./assets/music/song2.mp3",
            image: "https://img.vietcetera.com/uploads/images/13-aug-2021/pic2.jpg"
        
        },
        {
            name: "Giữa Đại Lộ Đông Tây",
            singer: "Uyen Linh",
            path: "./assets/music/song9.mp3",
            image: "https://img.meta.com.vn/Data/image/2021/05/19/giua-dai-lo-dong-tay-2.jpg"
        },
        {
            name: "Hẹn Gặp Em Dưới Ánh Trăng",
            singer: "Hieu Thu Hai",
            path: "./assets/music/song4.mp3",
            image: "https://i.vietgiaitri.com/2021/3/30/bo-ba-hurrykng-hieuthuhai-manbo-ru-re-masew-va-redt-tung-mv-cung-ngay-duoi-bat-nhau-tren-top-trending-333-5668863.jpg"
        },
        {
            name: "Miên Man",
            singer: "Minh Huy",
            path: "./assets/music/song10.mp3",
            image: "https://nhachay.vn/wp-content/uploads/2022/06/4_hqdefault.jpg"
        },
        {
            name: "Anh Ta Bỏ Em Rồi",
            singer: "Hương Giang Idol",
            path: "./assets/music/song11.mp3",
            image: "https://media.tinmoi.vn/upload/thanhdat/2019/11/01/142501-loi-bai-hat-anh-ta-bo-em-roi-lyric-anh-ta-bo-em-roi.jpg"
        },
        {
            name: "Chưa Quên Người Yêu Cũ",
            singer: "Hà Nhi",
            path: "./assets/music/song12.mp3",
            image: "https://afamilycdn.com/150157425591193600/2022/8/10/photo-1-16591985705011984033168-1659198609063109936963-1660101598440-16601015985911001149773.jpg"
         },
         {
             name: "Đoạn Kết Cuối",
             singer: "Vũ Thịnh",
             path: "./assets/music/song14.mp3",
             image: "https://ss-images.saostar.vn/wpr700/pc/1676280130572/saostar-bbax95kppypkil7n.jpg"
            },
          {
              name: "Trà Sữa",
              singer: "Anh Tú & Lyly",
              path: "./assets/music/song15.mp3",
              image: "https://media.viez.vn/prod/2021/12/19/large_Anh_tu_lyly_2_a4d0d01f89.png"
             },
           {
               name: "Xe Đạp",
               singer: "Thùy Chi",
               path: "./assets/music/song16.mp3",
               image: "https://cdn-petrotimes.mastercms.vn/stores/news_dataimages/donghoa/012021/08/09/3652_TC.jpg?rt=20210108093653"
            }
        
    ],
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

// const handleGetData = async () => {
//     try {
//         const response = await fetch("http://localhost:3000/songs").then(res => res.json());
//         app.songs = response;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// handleGetData();
app.start();
