$(document).ready(function () {
  function FixMenu() {
    let scroll = $(window).scrollTop();
    if (scroll >= 1) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  }

  FixMenu();

  $(window).scroll(function () {
    FixMenu();
  });
});
