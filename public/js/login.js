$("#login-submit").click(function () {

    console.log('login')
    var formData = $("#login-form").serialize();

    $.ajax({
        type: "POST",
        url: "/login",
        cache: false,
        data: formData,
        success: function (data, status){

            if(data.success == true){
                alert("로그인이 되었습니다.");
                location.href='/main';
            }
            else if(data.success == false){
                alert("로그인에 실패하였습니다.");
                location.reload();
            }
        },
        error: function (data, status) {
            alert("서버 연결 실패");
        }
    });
});



