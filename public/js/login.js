$("#login-form").submit(function (evt) {

    console.log('login')
    evt.preventDefault();
    var formData = $("#login-form").serialize();

    $.ajax({
        type: "POST",
        url: "/login",
        cache: false,
        data: formData,
        success: function (data, status){

            if(data.success == true){
                location.href='/main';
            }
            else if(data.success == false){
                $('#login-err-span').text("로그인에 실패하였습니다.");
            }
        },
        error: function (data, status) { 
            $('#login-err-span').text("서버 연결 실패");
        }
    });
});



