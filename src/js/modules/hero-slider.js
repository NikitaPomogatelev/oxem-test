import Swiper, {
  Navigation,
  Pagination,
  EffectFade
} from 'swiper';

const heroSlider = () => {
  Swiper.use([Navigation, Pagination, EffectFade]);

const swiper = new Swiper('.swiper-container', {
  loop: true,
  speed: 400,
  spaceBetween: 100,
  navigation: {
    nextEl: '.hero-button-next',
    prevEl: '.hero-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

const circle = document.querySelector('.hero-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;

}

let value = 0;
setInterval(() => {
  
  if (value <= 100 && value >= -1) {
    setProgress(value);
    value++;
    
  } else {
    swiper.slideNext();
    clearInterval();
    value = 0;
  }
}, 100)
}
export default heroSlider;



