// 플러그인 등록합니다.
$.fn.imageSlider = function (object) {
    // 변수를 선언합니다.
    var width = object.width || 460;
    var height = object.height || 300;
    var current = 0;
    var k = this;
    var x_left = 0;
    // 함수를 선언합니다.
    var moveTo = function () {
        //$(this).find('.images').animate({
        x_left = -current * width;
        $(k).find('.images').animate({
            //$('.images').animate({
            left: x_left
        }, 1000);
    };
    // 슬라이더 내부의 이미지 개수를 확인합니다.
    var imageLength = $(this).find('.image').length;
    // 슬라이더 버튼을 추가합니다.
    for (var i = 0; i < imageLength; i++) {
        $('<button></button>')
            .attr('data-position', i)
            .text(i)
            .click(function () {
                current = $(this).attr('data-position');
                moveTo();
            })
            .insertBefore(this);
    }
    // 슬라이더 스타일을 설정합니다.
    $(this).css({
        position: 'relative',
        width: width,
        height: height,
        overflow: 'hidden'
    });
    $(this).find('.images').css({
        position: 'absolute',
        width: width * imageLength,
    });
    $(this).find('.image').css({
        margin: 0,
        padding: 0,
        width: width,
        height: height,
        display: 'block',
        float: 'left'
    });
    // 3초마다 슬라이더를 이동시킵니다.
    /*setInterval(function () {
        current = current + 1;
        current = current % imageLength;
        moveTo();
    }, 3000);*/

    var isclick = false;
    var inipos = 0;
    var moving = 0;
    var origin = 0;
    var init = true;
    $(this).find('.images').on({
        "touchstart mousedown": function(e) {
            e.preventDefault();
            isclick = true;
            origin = $(this).offset().left;
            moving = 0;
        },
        "touchstart": function(e) {
            inipos = e.originalEvent.touches[0].screenX;
        },
        "mousedown": function(e) {
            inipos = e.pageX;
        },
        "touchmove": function(e) {
            e.preventDefault();
            if(isclick) {
                moving = e.originalEvent.touches[0].screenX - inipos;
                $(this).animate({ left: origin + moving }, 0);
            }
        },
        "mousemove": function(e) {
            if(isclick) {
                moving = e.pageX - inipos;
                $(this).animate({ left: origin+ moving }, 0);
            }
        },
        "touchend mouseup": function(e) {
            isclick = false;
            if($(this).offset().left > 0){
                $(this).animate({ left: 0 }, 0);
            }
            else if($(this).offset().left + width * (imageLength -1) < 0 )
            {
                $(this).animate({ left: -width * (imageLength-1) }, 0);
            }
            else 
            {
                 let t = moving / width;
                 t = ((moving > 0) ? Math.ceil(t) : Math.floor(t));
                 t = width * t;
                 x_left += t;
                 $(this).animate({ left: x_left }, 1000);
            }
        }
    })
};