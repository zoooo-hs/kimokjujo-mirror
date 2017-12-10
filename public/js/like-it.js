$('.like-box').click(function() {

    var l = location.href.split('/');
    var planMovieId = l[l.length - 1];

    $.ajax({
        type: "POST",
        url: "/like-it",
        cache: false,
        data: {
            'planMovieId': planMovieId 
        },
        success: function (data, status){

            if(data.success == true){

                $('.like-count').text(data.likeCount);

                if (myLike == false) {

                    $('.like-message').text('"좋아요"를 선택하셨습니다.');
                    $('.like-message-box').fadeIn(700);
                    $('.like-message-box').fadeOut(700);
                    $('.like-cnt').css("background-color", "rgba(255, 255, 0, 0.3)");
                    $('.like-message-box').css("background-color", "rgba(255, 255, 0, 0.3)");
                    myLike = true;
                } else {
                    $('.like-message').text('"좋아요"를 취소하였습니다.');
                    $('.like-message-box').fadeIn(700);
                    $('.like-message-box').fadeOut(700);
                    $('.like-cnt').css("background-color", "rgba(142, 142, 142, 0.7)");
                    $('.like-message-box').css("background-color", "rgba(142, 142, 142, 0.7)");
                    myLike = false;
                }

            }
            else if(data.success == false){
                alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
            }
        },
        error: function (data, status) {
            $('#login-err-span').text("서버 연결 실패");
        }
    });
})
