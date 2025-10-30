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
$(".tab-list li").click(function () {
  // タブのアクティブ状態をリセット
  $(".tab-list li").removeClass("active");
  $(".products-list").removeClass("active");

  // クリックしたタブをアクティブにする
  $(this).addClass("active");

  // タブのクラス名から表示するコンテンツを決める
  // 例: tab-sofa → .sofa を表示
  var tabClass = $(this).attr("class").split(" ").find(function(c) {
    return c.startsWith("tab-");
  });

  if (tabClass === "tab-all") {
    $(".products-list.all").addClass("active");
  } else {
    var contentClass = tabClass.replace("tab-", "");
    $(".products-list." + contentClass).addClass("active");
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
