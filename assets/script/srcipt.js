$(function () {
    $('.sls-cards-group').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});



  let countDownDate = new Date("May 28, 2023 11:22:33").getTime();

  let interval = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $(".days").html(days.toString().padStart(2, "0"));
    $(".hours").html(hours
      .toString()
      .padStart(2, "0"));
    $(".minutes").html(minutes
      .toString()
      .padStart(2, "0"));
    $(".seconds").html(seconds
      .toString()
      .padStart(2, "0"))

    if (distance < 0) {
      clearInterval(interval);
      $("#countdown").html("EXPIRED");
    }
  }, 1000);
