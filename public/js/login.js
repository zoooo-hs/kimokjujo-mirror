$("#login-submit").click(function () {

    console.log('login')
    var formData = $("#login-form").serialize();

    $.ajax({
        type: "POST",
        url: "/login",
        cache: false,
        data: formData,
        success: onSuccess,
        error: onError
    });
});
function onSuccess(json, status){

    if(json.success == true){
        // $.cookie('session', json.sessionkey,{path:'/'});
        alert("로그인이 되었습니다.");
        location.href='/main';
    }
    else if(json.success == false){
        alert("로그인에 실패하였습니다.");
        location.reload();
    }
;}

function onError(data, status){alert("error");}


