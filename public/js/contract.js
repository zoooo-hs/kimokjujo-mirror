$('#contractButton').click(function() {

    var l = location.href.split('/');
    var planMovieId = l[l.length - 1];

    var result = confirm('정말 계약하시겠습니까?');

    if(result) {
        $.ajax({
            type: "POST",
            url: "/contract",
            cache: false,
            data: planMovieId,
            success: function (data, status) {

                if (data.success == true) {
                    $('#contractButton').text("계약중...").prop('disabled', true);

                }
                else if (data.success == false) {
                    alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
                }
            },
            error: function (data, status) {
                $('#login-err-span').text("서버 연결 실패");
            }
        });
    } else {}
})