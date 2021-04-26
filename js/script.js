function burgerMenu(selector) {
  let menu = $(selector);
  let button = menu.find(".burger-menu__button");

  button.on("click", (event) => {
    event.preventDefault();
    toggleMenu();
  });

  function toggleMenu() {
    menu.toggleClass("burger-menu__active");

    if (menu.hasClass("burger-menu__active")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "visible");
    }
  }
}

burgerMenu(".burger-menu");

$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    var dropdownlink = this.el.find(".dropdownlink");
    dropdownlink.on(
      "click",
      {
        el: this.el,
        multiple: this.multiple,
      },
      this.dropdown
    );
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      $el
        .find(".submenuItems")
        .not($next)
        .slideUp()
        .parent()
        .removeClass("open");
    }
  };

  var accordion = new Accordion($(".accordion-menu"), false);
});

$(document).ready(function () {
  if ($(this).scrollTop() >= 25) {
    $("header").addClass("fix");
  }
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 25) {
      $("header").addClass("fix");
    } else {
      $("header").removeClass("fix");
    }
  });
});

$(document).ready(function () {
  $(".product-slider").slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    dotsClass: "slick-dots",
  });
});

$(function () {
  $(".scrollTop").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});
$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
    $(".scrollTop").fadeIn();
  } else {
    $(".scrollTop").fadeOut();
  }
});

var selector = document.querySelectorAll('input[type="tel"]');
var im = new Inputmask("+(999) 99-999-99-99");
im.mask(selector);

document.querySelector(".reCall").addEventListener("submit", (e) => {
  var telInp = document.getElementById("telInp").value;
  var telInpNums = parseInt(telInp.replace(/[^\d]/g, ""));
  e.preventDefault();
  if (String(telInpNums).length >= 12) {
    var div = document.getElementById("alert");
    let tk = "";
    grecaptcha.ready(function () {
      grecaptcha
        .execute("6LfrkusZAAAAAPpTcR-fVuoI4cduTxi6-sCt68OR", {
          action: "homepage",
        })
        .then(function (token) {
          tk = token;
          document.getElementById("token").value = token;

          const data = new URLSearchParams();
          for (const pair of new FormData(document.querySelector(".reCall"))) {
            data.append(pair[0], pair[1]);
          }
          fetch("send.php", {
            method: "post",
            body: data,
          })
            .then((response) => response.json())
            .then((result) => {
              if (result["om_score"] >= 0.5) {
                document.getElementById("telInp").value = "+998";
                div.textContent = "Заявка принята!";
                div.style.visibility = "visible";
                div.style.backgroundColor = "#c4ebb4";
                div.style.borderColor = "#c4ebb4";
              } else {
                div.textContent = "Заявка отклонена!";
                div.style.visibility = "visible";
                div.style.color = "red";
                div.style.borderColor = "red";
              }
              setTimeout(() => {
                div.style.visibility = "hidden";
              }, 1300);
            });
        });
    });
  } else {
    document.getElementById("telInp").style.color = "red";
    setTimeout(() => {
      document.getElementById("telInp").style.color = "#000";
    }, 800);
  }
});

$(document).ready(function () {
  $(".myLinkModal").click(function (event) {
    event.preventDefault();
    $("#myOverlay").fadeIn(297, function () {
      $("#myModal").css("display", "block").animate({ opacity: 1 }, 198);
    });
  });

  $("#myModal__close, #myOverlay").click(function () {
    $("#myModal").animate({ opacity: 0 }, 198, function () {
      $(this).css("display", "none");
      $("#myOverlay").fadeOut(297);
    });
  });
});

document.querySelector("#order-skype").addEventListener("submit", (e) => {
  e.preventDefault();
  var ordeName = document.getElementById("order-name").value;
  var orderEmail = document.getElementById("order-email").value;
  var skypeName = document.getElementById("skypeName").value;
  var orderSelect = document.getElementById("order-select").value;

  var div = document.getElementById("alert");
  let tk = "";
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LfrkusZAAAAAPpTcR-fVuoI4cduTxi6-sCt68OR", {
        action: "homepage",
      })
      .then(function (token) {
        tk = token;
        document.getElementById("token2").value = token;

        const data = new URLSearchParams();
        for (const pair of new FormData(
          document.querySelector("#order-skype")
        )) {
          data.append(pair[0], pair[1]);
        }
        fetch("send.php", {
          method: "post",
          body: data,
        })
          .then((response) => response.json())
          .then((result) => {
            if (result["om_score"] >= 0.5) {
              document.getElementById("order-name").value = "";
              document.getElementById("order-email").value = "";
              document.getElementById("skypeName").value = "";
              document.getElementById("order-select").value = "";

              div.textContent = "Заявка принята!";
              div.style.visibility = "visible";
              div.style.backgroundColor = "#c4ebb4";
              div.style.borderColor = "#c4ebb4";
              $("#myModal").animate({ opacity: 0 }, 198, function () {
                $(this).css("display", "none");
                $("#myOverlay").fadeOut(297);
              });
            } else {
              div.textContent = "Заявка отклонена!";
              div.style.visibility = "visible";
              div.style.color = "red";
              div.style.borderColor = "red";
              $("#myModal").animate({ opacity: 0 }, 198, function () {
                $(this).css("display", "none");
                $("#myOverlay").fadeOut(297);
              });
            }
            setTimeout(() => {
              div.style.visibility = "hidden";
            }, 1300);
          });
      });
  });
});
