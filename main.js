const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd img')
const heading = $('.header__name-music')
const currenCD = $('.cd img')
const backgroundCD = $('.background-CD')
const htmlAudio = $('#audio')
const playBtn = $('.btn-play-pause')
const player = $('.music-app')
const playIcon = $('.play-icon')
const pauseIcon = $('.pause-icon')
const timeLine = $('.time-line')
const prevBtn = $('.previous-btn')
const nextBtn = $('.next-btn')
const loopBtn = $('.loop-btn')
const randomBtn = $('.random-btn')
const containerMusic = $('.container-music')

const app = {
    currenIndex: 0,
    isPlaying: true,
    isRandom: false,
    isLoop: false,

    songs: [    
        {
            song: 'Let Me Down Slowly',
            singer: 'Alec Benjamin',
            music: '/assets/music/Let Me Down Slowly.mp3',
            img: '/assets/img/Let_Me_Down_Slowly.jpg'
        },
        {
            song: 'Comethru',
            singer: 'Jeremy Zucker',
            music: '/assets/music/Comethru.mp3',
            img: '/assets/img/Comethru.jpg'
        },
        {  
            song: 'Savage Love',
            singer: 'Jason Derulo & Jawsh 685',
            music: '/assets/music/Savage Love.mp3',
            img: '/assets/img/Savage_Love.jpg'
        },
        {
            song: 'Mood',
            singer: '24kGoldn',
            music: '/assets/music/Mood.mp3',
            img: '/assets/img/Mood.jpg'
        },
        {
            song: 'Enemy',
            singer: 'ImagineDragons',
            music: '/assets/music/Enemy.mp3',
            img: '/assets/img/Enemy.jpg'
        },
        {
            song: 'Dancing With Your Ghost',
            singer: 'Sasha Alex Sloan',
            music: '/assets/music/Dancing With Your Ghost.mp3',
            img: '/assets/img/Dancing_With_Your_Ghost.jpg'
        },
        {
            song: 'Toxic',
            singer: 'BoyWithUke',
            music: '/assets/music/Toxic.mp3',
            img: '/assets/img/Toxic.jpg'
        },
        {
            song: 'Stay',
            singer: 'The Kid LAROI, Justin Bieber',
            music: '/assets/music/Stay.mp3',
            img: '/assets/img/Stay.jpg'
        },
        {
            song: 'Death Bad',
            singer: 'Powfu',
            music: '/assets/music/Death Bad.mp3',
            img: '/assets/img/Death_Bad.jpg'
        },
        {
            song: 'Senorita',
            singer: 'Shawn Mendes, Camila Cabello',
            music: '/assets/music/Senorita.mp3',
            img: '/assets/img/Senorita.jpg'
        },
        {
            song: 'At My Worst',
            singer: 'Pink Sweat',
            music: '/assets/music/At My Worst.mp3',
            img: '/assets/img/At_My_Worst.jpg'
        },
        {
            song: 'Despacito',
            singer: 'Luis Fonsi & Daddy Yankee',
            music: '/assets/music/Despacito.mp3',
            img: '/assets/img/Despacito.jpg'
        },
        {
            song: 'Girls Like You',
            singer: 'Maroon 5',
            music: '/assets/music/Girls Like You.mp3',
            img: '/assets/img/Girls_Like_You.jpg'
        },
        {
            song: 'Lovely',
            singer: 'Billie Eilish, Khalid',
            music: '/assets/music/Lovely.mp3',
            img: '/assets/img/Lovely.jpg'
        },
        {
            song: 'Happy New Year',
            singer: 'ABBA',
            music: '/assets/music/Happy New Year.mp3',
            img: '/assets/img/Happy_New_Year.jpg'
        },
        {
            song: 'Merry Christmas',
            singer: 'Mariah Carey',
            music: '/assets/music/Merry Christmas.mp3',
            img: '/assets/img/Merry_Christmas.jpg'
        },
        {
            song: 'We Don\'t Talk Anymore',
            singer: 'Charlie Puth',
            music: '/assets/music/We Dont Talk Anymore.mp3',
            img: '/assets/img/We_Dont_Talk_Anymore.jpg'
        },
    ],

    render: function(){
      const htmls = this.songs.map((song, index) =>
            `<div class="music ${index == this.currenIndex ? 'active-background-color' : ' '}" data-index="${index}">
            <div class="music__img">
                <img src="${song.img}" alt="">
            </div>
            <div class="music__infor">
                <p class="music__name-music">${song.song}</p>
                <p class="music__singer">${song.singer}</p>
            </div>
            <div class="music__menu">
                <i class="fas fa-ellipsis-v"></i>
            </div>
            </div>`
        ) 
        containerMusic.innerHTML = htmls.join('')
    },

    defineProperties: function(){
        Object.defineProperty(this,'currenSong',{
            get: function(){
                return this.songs[this.currenIndex]
            }
        })
    },
    
    handleEvent: function(){
        //handle CD turn
        const CD = currenCD.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 20000,
            iterations: Infinity
        })
        CD.pause()

        //catch event scale of CD
        const cdWidth = cd.offsetWidth
        document.onscroll = function(){
            const scrollValue = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollValue
            cd.style.width = newCdWidth >= 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }
        
        //convert play button and pause button
        pauseIcon.classList.add('hide-icon')
        playBtn.onclick= function(){
            if(app.isPlaying){
                app.isPlaying = false
                htmlAudio.play()
                playIcon.classList.add('hide-icon')
                pauseIcon.classList.remove('hide-icon')
                CD.play()
            }else{
                app.isPlaying = true
                htmlAudio.pause()
                playIcon.classList.remove('hide-icon')
                pauseIcon.classList.add('hide-icon')
                CD.pause()
            }
        }

        //catch event current time of music
        htmlAudio.ontimeupdate = function(){
            const percentSong = Math.floor(htmlAudio.currentTime / htmlAudio.duration * 100)
            if(htmlAudio.duration){
                timeLine.value = percentSong
            };
        }

        //handle tua song
        timeLine.onchange = function(x){
            const seekTime = htmlAudio.duration / 100 * x.target.value
            htmlAudio.currentTime = seekTime     
        }
        
        //next song
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            }else{
                app.nextSong()
            }
            app.render()
            app.isPlaying = false
            htmlAudio.play()
            playIcon.classList.add('hide-icon')
            pauseIcon.classList.remove('hide-icon')
            CD.play()
        }
        
        //previous song
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            }else{ 
                app.prevSong()
            }
            app.render()
            app.isPlaying = false
            htmlAudio.play()
            playIcon.classList.add('hide-icon')
            pauseIcon.classList.remove('hide-icon')
            CD.play()
        }
        
        //random btn
        randomBtn.onclick = function(){
        app.isRandom = !app.isRandom
        randomBtn.classList.toggle('active', app.isRandom)
        }
        
        //loop song
        loopBtn.onclick = function(){
            app.isLoop = !app.isLoop
            loopBtn.classList.toggle('active', app.isLoop)
        }

        //handle random, loop, auto next song when end song
        htmlAudio.onended = function(){
            //random song
            if(app.isRandom && !app.isLoop){
                app.randomSong()
                app.isPlaying = false
                htmlAudio.play()
                playIcon.classList.add('hide-icon')
                pauseIcon.classList.remove('hide-icon')
                CD.play()
            }
            //loop song
            if(app.isLoop || (app.isLoop && app.isRandom)){
                htmlAudio.play()
            }
            //auto next song
            else{
                app.nextSong()
                app.render()
                app.isPlaying = false
                htmlAudio.play()
            }
        }

        //listen click song
        containerMusic.onclick = function(e){
            //click without menu
            if(e.target.closest('.music') && !e.target.closest('.music__menu')){
                app.currenIndex = e.target.closest('.music').dataset.index
                app.loadCurrenSong()
                app.render()
                app.isPlaying = false
                htmlAudio.play()
                playIcon.classList.add('hide-icon')
                pauseIcon.classList.remove('hide-icon')
                CD.play()
            }
            //click on menu
            if(e.target.closest('.music__menu')){

            }
        }
    },
    
    loadCurrenSong: function(){
        heading.textContent = this.currenSong.song
        currenCD.setAttribute('src', `${this.currenSong.img}`)
        backgroundCD.style.backgroundImage = `url(${this.currenSong.img})`
        htmlAudio.src = this.currenSong.music
    },

    nextSong: function(){
        this.currenIndex++
        if(this.currenIndex >= this.songs.length){
            this.currenIndex = 0
        }
        this.loadCurrenSong()
    },
    
    prevSong: function(){
        this.currenIndex--
        if(this.currenIndex < 0){
            this.currenIndex = this.songs.length - 1
        }
        this.loadCurrenSong()
    },
    
    //random song
    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex == this.currenIndex)
        this.currenIndex = newIndex
        this.loadCurrenSong()
    },

    start: function(){
        this.defineProperties()    //định nghĩa các thuộc tính cho object
        this.handleEvent()  //lắng nghe và sử lý các sự kiện (DOM event)
        this.loadCurrenSong()   //tải bài hát đầu tiên khi mở app
        this.render()   //render playlist
    }
}

app.start()