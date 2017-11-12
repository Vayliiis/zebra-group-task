
var swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheel: {                   
                    releaseOnEdges: true,
                },
                keyboard: true,
                loop: false,
                on: {
                    init: function() {
                        var footer = document.querySelector('.footer');
                        footer.classList.add('hidden');
                    }
                }
            });
            swiper.on('slideChange', function() {               
                var header = document.querySelector('.header');
                var menubtn = document.querySelector('.menu__menubtn');
                var footer = document.querySelector('.footer');
                if (swiper.activeIndex > 0) {
                    header.classList.add('hidden');
                    menubtn.classList.add('hidden');
                }
                else {
                    header.classList.remove('hidden');
                    menubtn.classList.remove('hidden');
                }                
                if (swiper.activeIndex == swiper.slides.length - 1) {                    
                    footer.classList.remove('hidden');
                }
                else footer.classList.add('hidden');
            })
            
            function toggleMenu() {
                var menu = document.querySelector('#mainmenu');
                var menubtn = document.querySelector('.menu__menubtn');
                
                menu.classList.toggle('menu_visible');
                menubtn.childNodes[0].classList.toggle('fa-times');
                menubtn.childNodes[0].classList.toggle('fa-navicon');
            } 
            function upToTop() {
                swiper.slideTo(0);
            }
function validateinput(e) {    
    var e = e || window.event;
    var elem = e.target;
    var inputtype = elem.attributes['type'].value;    
    var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    var minlen = +elem.attributes['minlength'].value;
    var maxlen = +elem.attributes['maxlength'].value;
    if (elem.value.length < minlen || elem.value.length > maxlen)
        elem.classList.add('invalid');
    else if (inputtype == 'email' && !elem.value.match(new RegExp(pattern))) {
        elem.classList.add('invalid');
    }
    else elem.classList.remove('invalid');    
}
function isTouch() {
    return !!('ontouchstart' in window);
}
window.addEventListener('load', function() {    
    var swCont = document.querySelector('div.swiper-container');
    swCont.removeEventListener('mousedown', swiper.onTouchStart);
    
    var istouch = isTouch();
    if (!istouch) {
        swiper.allowTouchMove = false;
    }
})