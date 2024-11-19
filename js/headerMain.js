let recentHistory  = JSON.parse(localStorage.getItem("recent-history")) || [];

const $body        = document.querySelector("body");
const $searchDiv   = document.querySelector(".search-div");
const $searchInput = document.querySelector("input[name='search']");
const $sortLists   = document.querySelectorAll(".develop-recruit-sort li");
const $recentList  = document.querySelector(".recent-list ul");
const $prevBtn     = document.querySelector(".prev-btn");
const $nextBtn     = document.querySelector(".next-btn");
const $recruitList = document.querySelector(".develop-recruit-list");

displayRecent()

// 검색인풋 클릭시 클래스 추가
$searchDiv.addEventListener("click", (e) => {
  if(recentHistory.length != 0){
    $searchDiv.classList.add("recent");
  }
});

// 검색인풋 이외에 클릭하면 클래스 제거
$body.addEventListener("click", (e) => {
  const element = e.target;
  if (!element.closest(".search-div") && !element.closest(".recent-remove") && recentHistory.length > 0) {
    $searchDiv.classList.remove("recent");
  }
});



$searchInput.addEventListener("keyup",(e)=>{
  if(e.keyCode == 13 && e.target.value != ""){
    saveRecent(e.target.value.trim())
    displayRecent();
    $searchDiv.classList.add("recent")
  }
})

function displayRecent(){
    let recentInnerHtml = "";
    recentHistory.forEach((item,index) => {
      recentInnerHtml += `<li>
                            <a href="#">`+item+`</a>
                            <img src="/images/icon/recent-close.png"
                            alt="검색 삭제" class="recent-remove" onclick="removeRecent(${index})"/>
                          </li>`
    });
    $recentList.innerHTML = recentInnerHtml;
}

// 최근검색 저장 함수
function saveRecent (keyword){
  if(keyword != "" && keyword != null){
    recentHistory.unshift(keyword);
  }
  if(recentHistory.length > 10){
    recentHistory.pop();
  }
  localStorage.setItem('recent-history', JSON.stringify(recentHistory));
}

  // 최근검색 삭제 함수
  function removeRecent(index) {
    recentHistory.splice(index,1);
    localStorage.setItem('recent-history', JSON.stringify(recentHistory));
    displayRecent();
    if(recentHistory.length == 0){
      $searchDiv.classList.remove("recent");
    }
  }

  function removeRecentAll() {
    recentHistory = []
    localStorage.setItem('recent-history', JSON.stringify(recentHistory));
    $searchDiv.classList.remove("recent");
  }

  $sortLists.forEach((li)=>{
    li.addEventListener("click",(e)=>{
      $sortLists.forEach(a=>{
        a.classList.remove("sort-active")
      })
      li.classList.remove("sort-active")
      e.target.classList.add("sort-active")
    })
  })

  let recruitListIndex = 0

  $nextBtn.addEventListener("click",(e)=>{
    recruitListIndex++;
    console.log(recruitListIndex)
    moveRecruitList(recruitListIndex)
    if(recruitListIndex >= 6){
      e.target.style.display = "none"
    }
    if(recruitListIndex >= 1){
      $prevBtn.style.display = "block"
    }
  })

  $prevBtn.addEventListener("click",(e)=>{
    recruitListIndex--;
    moveRecruitList(recruitListIndex)
    if(recruitListIndex < 6){
      $nextBtn.style.display = "block"
    }
    if(recruitListIndex < 1){
      e.target.style.display = "none"
    }
  })

  function moveRecruitList(i){
    $recruitList.style.transform=`translateX(${i*-260}px)`
  }
  
  
document.addEventListener('DOMContentLoaded', () => {
  let submenuActive = false;
  const userElement = document.querySelector('.header-right.logined .user');
  if (userElement) {
    const $submenu = document.querySelector(".submenu");
    const $user = document.querySelector(".user");
    
    // 초기 상태 설정
    $submenu.style.display = "none";

    $user.addEventListener('click', (e) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      $submenu.style.display = submenuActive ? "none" : "block";
      submenuActive = !submenuActive;
    });
    
    document.body.addEventListener("click", (e) => {
      if (!e.target.closest(".submenu") && !e.target.closest(".user") && submenuActive) {
        $submenu.style.display = "none";
        submenuActive = false;
      }
    });
  }
});
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  