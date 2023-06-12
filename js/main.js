/** HEADER - basket (장바구니) */
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains('show')) {
    // contains: 해당 요소에 특정한 클래스값 존재하는지 여부 (true/false 값 반환)
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

window.addEventListener('click', function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

/** HEADER - search (검색) */
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed'); // documentElement : document의 최상위 element를 뜻함 = html
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600); // 6초 있다가 input 요소에 focus
}
function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse(); // 다시 검색 열었을때 원래 순서로 나오게 하기위해 다시 원래대로 돌림
  searchInputEl.value = ''; // input에 입력했던 것 초기화 (다시 검색창 열었을 때 기록 남지않게 하기 위함)
}

/** Intersection Observer 요소의 가시성 관찰 */
const io = new IntersectionObserver(function (entries) {
  // 아래의 io.observe(el)를 통해 각각 요소들에 대한 관찰 정보가 entries라는 매개변수로 들어감 (배열 데이터)
  entries.forEach(function (entry) {
    // 배열 데이터이기 때문에 개별적으로 처리하기 위해서 forEach를 사용
    if (!entry.isIntersecting) {
      // 화면에 보이지 않을 때는 return 키워드로 함수를 사용하지 않음
      return;
    }
    entry.target.classList.add('show'); // 화면에 보이면 target 속성을 통해서 'show'라는 클래스 추가
  });
});
const infoEls = document.querySelectorAll('.info'); // info 요소 모두 찾아서 infoEls에 할당
infoEls.forEach(function (el) {
  // infoEls 각 요소들 forEach로 반복 함수 실행, 반복되는 info라는 클래스를 가진 요소(el)를
  io.observe(el); // io객체의 observe를 통해 넣어줌. (intersection observer를 통해 관찰)
});

/** 비디오 재생 ! */
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

// 재생 버튼 클릭
playBtn.addEventListener('click', function () {
  video.play(); // video 요소 찾아서 play() 자바스크립트 메소드 사용
  playBtn.classList.add('hide'); // 재생 버튼 숨김
  pauseBtn.classList.remove('hide'); // 일시정지 버튼 나타남
});
// 일시정지 버튼 클릭
pauseBtn.addEventListener('click', function () {
  video.pause();
  playBtn.classList.remove('hide'); // 일시정지 버튼 숨김
  pauseBtn.classList.add('hide'); // 재생 버튼 나타남
});
