let   recentHistory = JSON.parse(localStorage.getItem("recent-history")) || [];
let   submenuActive = false;

const $searchDiv    = document?.querySelector(".search-div");
const $recentList   = document?.querySelector(".recent-list ul");
let   $submenu      = null;
let   $user         = null;

displayRecent()

if ("${sessionScope.userLogin") {
	$submenu = document.querySelector(".submenu");
	$user = document.querySelector(".user");
}

// 클릭 위임 이벤트
document.addEventListener("click", (e) => {
	const clicked = e.target;
	// 검색인풋 클릭시 클래스 추가
	if (clicked.closest(".search-div")) {
		if (recentHistory.length != 0) {
			$searchDiv.classList.add("recent");
		}
	}

	// 검색인풋 이외에 클릭하면 클래스 제거
	if (!clicked.closest(".search-div") && !clicked.closest(".recent-remove") && recentHistory.length > 0) {
		$searchDiv.classList.remove("recent");
	}

	// 유저 클릭시 서브메뉴 보여줌
	if (clicked.closest(".user")) {
		e.stopPropagation(); // 이벤트 버블링 방지
		$submenu.style.display = submenuActive ? "none" : "block";
		submenuActive = !submenuActive;
	}
	
	// 서브메뉴 외부 클릭시 서브메뉴 숨김
	if (!clicked.closest(".submenu") && !clicked.closest(".user") && submenuActive) {
		$submenu.style.display = "none";
		submenuActive = false;
	}
})

// 키업 위임 이벤트
document.addEventListener("keyup", (e) => {
	if (e.target.matches("input[name='search']") && e.keyCode == 13 && e.target.value != "") {
		saveRecent(e.target.value.trim())
		displayRecent();
		$searchDiv.classList.add("recent")
		/*
		if(e.target.value != ""){
			location.href = "/Common/RecruitSearchForm?search=" + e.target.value		
		}else{
			location.href = "/Common/RecruitSearchForm"
		}
		*/
	}
})

// 최근검색 display
function displayRecent() {
	let recentInnerHtml = "";
	recentHistory.forEach((item, index) => {
		recentInnerHtml += `<li>
                            <a href="/Common/RecruitSearchForm?search=`+ item + `">`+ item + `</a>
                            <img src="/images/icon/header-icon/recent-close.png"
                            alt="검색 삭제" class="recent-remove" onclick="removeRecent(${index})"/>
                          </li>`
	});
	$recentList.innerHTML = recentInnerHtml;

}

// 최근검색 저장
function saveRecent(keyword) {
	if (keyword != "" && keyword != null) {
		recentHistory.unshift(keyword);
	}
	if (recentHistory.length > 10) {
		recentHistory.pop();
	}
	localStorage.setItem('recent-history', JSON.stringify(recentHistory));
}

// 최근검색 삭제
function removeRecent(index) {
	recentHistory.splice(index, 1);
	localStorage.setItem('recent-history', JSON.stringify(recentHistory));
	displayRecent();
	if (recentHistory.length == 0) {
		$searchDiv.classList.remove("recent");
	}
}

// 최근검색 전체 삭제
function removeRecentAll() {
	recentHistory = []
	localStorage.setItem('recent-history', JSON.stringify(recentHistory));
	$searchDiv.classList.remove("recent");
}
