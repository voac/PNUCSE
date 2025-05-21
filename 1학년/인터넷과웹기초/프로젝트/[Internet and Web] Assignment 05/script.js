const enterBtn = document.getElementById("enterBtn");
const nameInput = document.getElementById("nameInput");
const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const welcomeText = document.getElementById("welcomeText");
var guideModal = document.getElementById('guideModal');

let map;
let markers = []; // 마커 배열

// 1. 지도 초기화
function initMap() {
  const center = new kakao.maps.LatLng(35.179554, 129.075638);
  map = new kakao.maps.Map(document.getElementById('map'), {
    center: center,
    level: 9
  });

  $("div button").click(function() { 
    setTimeout(function() {
      map.relayout();
      map.setCenter(new kakao.maps.LatLng(35.179554, 129.075638));
    }, 100);
  });
}

// 2. 축제 정보 API 호출
function fetchFestivalData() {
  const serviceKey = 'cxnMT1Z2HYI3QIgC1idDqO6x4Oy125xU5kPjM1727vaVLuIZMQ8Ey0FFDbPVjc5Y233nqDHUW6rQKPr6IiebqQ==';
  const url = `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?ServiceKey=${serviceKey}&pageNo=1&numOfRows=40&resultType=JSON`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayFestivalMarkers(data);
    })
    .catch(error => console.error('API 호출 오류:', error));
}

// 3. 마커 생성 및 클릭 이벤트 설정
function displayFestivalMarkers(data) {
  if (data && data.getFestivalKr && data.getFestivalKr.item) {
    const festivals = data.getFestivalKr.item;

    festivals.forEach(festival => {
      const lat = parseFloat(festival.LAT);
      const lng = parseFloat(festival.LNG);

      if (!isNaN(lat) && !isNaN(lng)) {
        const position = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
          position: position,
          map: map
        });

        // 마커 클릭 시 상세 정보 표시
        kakao.maps.event.addListener(marker, 'click', function () {
          displayFestivalInfo(festival);
        });

        markers.push(marker);
      }
    });
  } else {
    console.error('축제 데이터가 없습니다.');
  }
}

// 4. 마커 클릭 시 지도 아래에 정보 표시
function displayFestivalInfo(festival) {
  const infoDiv = document.getElementById('festivalInfo');

  // fade-out
  infoDiv.classList.remove('visible');

  setTimeout(() => {
    infoDiv.innerHTML = `
      <br><h1>${festival.TITLE}</h1><br>
      <div><img src="${festival.MAIN_IMG_NORMAL || '#'}" style="width: 100%; max-width: 700px;"></div><br>
      <p><strong>기간:</strong> &nbsp; ${festival.USAGE_DAY_WEEK_AND_TIME || '정보 없음'}</p><br>
      <p><strong>장소:</strong> &nbsp; ${festival.PLACE || '정보 없음'}</p><br>
      <p><strong>주소:</strong> &nbsp; ${festival.ADDR1 || '정보 없음'}</p><br>
      <p><strong>가격:</strong> &nbsp; ${festival.USAGE_AMOUNT || '정보 없음'}</p><br>
      <p><strong>연락처:</strong> &nbsp; ${festival.CNTCT_TEL || '정보 없음'}</p><br>
      <p><strong>내용:</strong> &nbsp; ${festival.ITEMCNTNTS || '정보 없음'}</p><br>
      <p><strong>홈페이지:</strong> &nbsp; <a href="${festival.HOMEPAGE_URL}" target="_blank">이동하기</a></p><br>
    `;

    // fade-in 트리거
    infoDiv.classList.add('visible');
  }, 300);
}

// 5. 초기 실행
window.onload = function () {
  initMap();
  fetchFestivalData();
};

enterBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    welcomeText.textContent = `${name}님, 반가워요! 👋`;
    intro.classList.add("hidden");
    mainPage.classList.remove("hidden");
  }
});

function openGuideModal() {
    guideModal.style.display = 'block';
}

function closeGuideModal() {
    guideModal.style.display = 'none';
}