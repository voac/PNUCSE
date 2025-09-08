// ----- 초기 변수 설정
const enterBtn = document.getElementById("enterBtn");
const nameInput = document.getElementById("nameInput");
const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const welcomeText = document.getElementById("welcomeText");
const guideModal = document.getElementById("guideModal");

let map;
let markers = [];      // 축제 마커 목록
let foodMarkers = [];  // 맛집 마커 목록

let currentListItems = []; // 리스트 DOM 요소
let currentListData = [];  // 리스트에 대응하는 마커 및 데이터





// ----- 지도 초기화
function initMap() {
  const center = new kakao.maps.LatLng(35.179554, 129.075638);
  map = new kakao.maps.Map(document.getElementById("map"), {
    center: center,
    level: 9
  });

  $("div button#enterBtn").click(() => {
    setTimeout(() => {
      map.relayout();
      map.setCenter(center);
    }, 100);
  });
}





// ----- 축제 API 호출
function fetchFestivalData() {
  const url = "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?ServiceKey=cxnMT1Z2HYI3QIgC1idDqO6x4Oy125xU5kPjM1727vaVLuIZMQ8Ey0FFDbPVjc5Y233nqDHUW6rQKPr6IiebqQ==&pageNo=1&numOfRows=40&resultType=JSON";

  fetch(url)
    .then(response => response.json())
    .then(data => displayFestivalMarkers(data))
    .catch(error => console.error("축제 API 호출 오류:", error));
}





// ----- 맛집 API 호출
function fetchFoodData() {
  const url = "https://apis.data.go.kr/6260000/FoodService/getFoodKr?ServiceKey=cxnMT1Z2HYI3QIgC1idDqO6x4Oy125xU5kPjM1727vaVLuIZMQ8Ey0FFDbPVjc5Y233nqDHUW6rQKPr6IiebqQ==&pageNo=1&numOfRows=437&resultType=JSON";

  fetch(url)
    .then(response => response.json())
    .then(data => displayFoodMarkers(data))
    .catch(error => console.error("맛집 API 호출 오류:", error));
}





// ----- 축제 마커 및 리스트 표시
function displayFestivalMarkers(data) {
  const listDiv = document.getElementById("markerList");
  listDiv.innerHTML = "";
  clearMarkers(markers);
  currentListItems = [];
  currentListData = [];

  if (data?.getFestivalKr?.item) {
    data.getFestivalKr.item.forEach(festival => {
      const lat = parseFloat(festival.LAT);
      const lng = parseFloat(festival.LNG);
      if (isNaN(lat) || isNaN(lng)) return;

      const position = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({
        position,
        map,
        title: festival.TITLE,
        image: new kakao.maps.MarkerImage("./image/marker.png", new kakao.maps.Size(36, 37)) // 파란 마커
      });

      // 마커 클릭 시 지도 줌인 + 위치 이동
      kakao.maps.event.addListener(marker, "click", () => {
        displayFestivalInfo(festival);
        map.setLevel(3);
        map.setCenter(position);
      });

      // 리스트 항목 생성
      const item = document.createElement("div");
      item.className = "list-item";
      item.dataset.title = festival.TITLE + ' ' + (festival.PLACE || '');
      item.innerHTML = `<strong>${festival.TITLE}</strong><br><small>${festival.PLACE || ''}</small>`;
      item.style.cssText = "padding:10px; border-bottom:1px solid #eee; cursor:pointer;";
      
      // 리스트 항목 클릭 시 지도 줌인 + 위치 이동
      item.addEventListener("click", () => {
        map.setCenter(position);
        map.setLevel(3);
        kakao.maps.event.trigger(marker, "click");
      });

      listDiv.appendChild(item);
      currentListItems.push(item);
      currentListData.push({ marker, data: festival });
      markers.push(marker);
    });
  } else {
    console.error("축제 데이터가 없습니다.");
  }
}





// ----- 맛집 마커 및 리스트 표시
function displayFoodMarkers(data) {
  const listDiv = document.getElementById("markerList");
  listDiv.innerHTML = "";
  clearMarkers(markers);
  clearMarkers(foodMarkers);
  currentListItems = [];
  currentListData = [];

  if (data?.getFoodKr?.item) {
    data.getFoodKr.item.forEach(food => {
      const lat = parseFloat(food.LAT);
      const lng = parseFloat(food.LNG);
      if (isNaN(lat) || isNaN(lng)) return;

      const position = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({
        position,
        map,
        title: food.MAIN_TITLE,
        image: new kakao.maps.MarkerImage("./image/marker_red.png", new kakao.maps.Size(36, 37)) // 빨간 마커
      });
      
      // 마커 클릭 시 지도 줌인 + 위치 이동
      kakao.maps.event.addListener(marker, "click", () => {
        displayFoodInfo(food);
        map.setLevel(3);
        map.setCenter(position);
      });

      const item = document.createElement("div");
      item.className = "list-item";
      item.dataset.title = food.MAIN_TITLE + ' ' + (food.ADDR1 || '');
      item.innerHTML = `<strong>${food.MAIN_TITLE}</strong><br><small>${food.ADDR1 || ''}</small>`;
      item.style.cssText = "padding:10px; border-bottom:1px solid #eee; cursor:pointer;";

      // 리스트 항목 클릭 시 지도 줌인 + 위치 이동
      item.addEventListener("click", () => {
        map.setCenter(position);
        map.setLevel(3);
        kakao.maps.event.trigger(marker, "click");
      });

      listDiv.appendChild(item);
      currentListItems.push(item);
      currentListData.push({ marker, data: food });
      foodMarkers.push(marker);
    });
  }
}





// ----- 축제 정보 출력
function displayFestivalInfo(festival) {
  const infoDiv = document.getElementById("festivalInfo");
  infoDiv.classList.remove("visible");

  setTimeout(() => {
    infoDiv.innerHTML = `
      <br><h1>${festival.TITLE}</h1><br>
      <div><img src="${festival.MAIN_IMG_NORMAL || '#'}" style="width: 100%; max-width: 700px;"></div><br>
      <div class="festival-quick-info">
        <span><strong>기간:</strong> ${festival.USAGE_DAY_WEEK_AND_TIME || '정보 없음'}</span>
        <span><strong>주소:</strong> ${festival.ADDR1 || '정보 없음'}</span>
        <span><strong>장소:</strong> ${festival.PLACE || '정보 없음'}</span>
        <span><strong>가격:</strong> ${festival.USAGE_AMOUNT || '정보 없음'}</span>
        <span><strong>연락처:</strong> ${festival.CNTCT_TEL || '정보 없음'}</span>
        <span><strong>홈페이지:</strong> <a href="${festival.HOMEPAGE_URL}" target="_blank">이동하기</a></span>
      </div><br>
      <div class="festival-description">${festival.ITEMCNTNTS || '정보 없음'}</div><br>
    `;
    infoDiv.classList.add("visible");
  }, 300);
}





// ----- 맛집 정보 출력
function displayFoodInfo(food) {
  const infoDiv = document.getElementById("festivalInfo");
  infoDiv.classList.remove("visible");

  setTimeout(() => {
    infoDiv.innerHTML = `
      <br><h1>${food.MAIN_TITLE}</h1><br>
      <div><img src="${food.MAIN_IMG_NORMAL || '#'}" style="width: 100%; max-width: 700px;"></div><br>
      <div class="festival-quick-info">
        <span><strong>메뉴:</strong> ${food.RPRSNTV_MENU || '정보 없음'}</span>
        <span><strong>영업 시간:</strong> ${food.USAGE_DAY_WEEK_AND_TIME || '정보 없음'}</span>
        <span><strong>주소:</strong> ${food.ADDR1 || '정보 없음'}</span>
        <span><strong>연락처:</strong> ${food.CNTCT_TEL || '정보 없음'}</span>
      </div><br>
      <div class="festival-description">${food.ITEMCNTNTS || '정보 없음'}</div><br>
    `;
    infoDiv.classList.add("visible");
  }, 300);
}





// ----- 마커 제거 (초기화)
function clearMarkers(markerList) {
  markerList.forEach(marker => marker.setMap(null));
  markerList.length = 0;
}





// ----- 버튼 및 이벤트 연결
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("showFestivals").addEventListener("click", () => {
    clearMarkers(foodMarkers);
    map.setLevel(9);
    fetchFestivalData();
  });

  document.getElementById("showFoods").addEventListener("click", () => {
    clearMarkers(markers);
    fetchFoodData();
  });

  // 검색 필터링
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();

    currentListItems.forEach((item, index) => {
      const text = item.dataset.title.toLowerCase();
      const visible = text.includes(keyword);
      item.style.display = visible ? "block" : "none";

      const { marker } = currentListData[index];
      marker.setMap(visible ? map : null);
    });
  });
});





// ----- 첫 실행시 지도 및 데이터 초기화
window.onload = function () {
  initMap();
  fetchFestivalData();
};





// ----- 인삿말 처리 (사용자 입력 받기 조건 만족을 위해)
enterBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    welcomeText.textContent = `${name}님, 반가워요! 👋`;
    intro.classList.add("hidden");
    mainPage.classList.remove("hidden");
  }
});





// ----- 가이드 모달
function openGuideModal() {
  guideModal.style.display = "block";
}
function closeGuideModal() {
  guideModal.style.display = "none";
}