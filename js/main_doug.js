$(function(){
  /*-------------------------------
  ハンバーガーメニュー
  ---------------------------------*/
  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $("#header .navi").toggleClass("active");
    $("#header .mask").toggleClass("active");
  });
  
  $(".navi a").click(function () {
    $(".hamburger").removeClass("active");
    $("#header .navi").removeClass("active");
    $("#header .mask").removeClass("active");
  });
  
  $(".mask").click(function () {
    $(".hamburger").removeClass("active");
    $("#header .navi").removeClass("active");
    $("#header .mask").removeClass("active");
  });
  
  /*-------------------------------
  ドロップダウンメニュー
  ---------------------------------*/
  $(".navi .menu .menu-first span").click(function () {
    $(this).toggleClass("active");
    $(this).next().slideToggle();
  });
  
  $(".navi .menu .menu-second").click(function () {
    $(this).prev().toggleClass("active");
    $(this).slideToggle();
  });

  /*-------------------------------
  Inview
  ---------------------------------*/
  $(".fadein").on("inview", function () {
    $(this).addClass("inview");
  });

/*-------------------------------
タブ切り替え
---------------------------------*/
$(".tab-list .tab-all").addClass("active");
$(".products-list.all").addClass("active");

$(".tab-list li").click(function () {
  $(".tab-list li").removeClass("active");
  $(".products-list").removeClass("active");

  $(this).addClass("active");

  if ($(this).hasClass("tab-all")) {
    $(".products-list.all").addClass("active");
  } else if ($(this).hasClass("tab-sofa")) {
    $(".products-list.sofa").addClass("active");
  } else if ($(this).hasClass("tab-desk")) {
    $(".products-list.desk").addClass("active");
  } else if ($(this).hasClass("tab-chair")) {
    $(".products-list.chair").addClass("active");
  } else if ($(this).hasClass("tab-mizusasi")) {
    $(".products-list.mizusasi").addClass("active");
  }
});


  /*-------------------------------
  モーダルウィンドウ
  ---------------------------------*/
  // オープン
  $(".work1 .modal-open").click(function () {
    $("body").css("overflow-y", "hidden");
    $(".work1 .modal-container").addClass("active");
  });
  
  $(".work2 .modal-open").click(function () {
    $("body").css("overflow-y", "hidden");
    $(".work2 .modal-container").addClass("active");
  });
  
  $(".work3 .modal-open").click(function () {
    $("body").css("overflow-y", "hidden");
    $(".work3 .modal-container").addClass("active");
  });

  // クローズ
  $(".modal-close").click(function () {
    $("body").css("overflow-y", "auto");
    $(".modal-container").removeClass("active");
  });

  /*-------------------------------
  アコーディオン
  ---------------------------------*/
  $(".faq-list dd").hide();
  $(".faq-list dt").click(function () {
    $(this).next().slideToggle();
    $(this).toggleClass("active");
  });
});
