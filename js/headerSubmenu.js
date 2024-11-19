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