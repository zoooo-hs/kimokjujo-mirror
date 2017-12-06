var signupStatus = false;

function duplicationCheck(userType) {
    var inputId = $('#inputId' + userType).val();
    $.ajax({
        type: "POST",
        url: "/signup/dup-id",
        cache: false,
        data: {
            id: inputId,
            userType: userType
        },
        success: function (json, status){

            console.log(json);
            if(json.success == true){
                $('.id-dup-check').text("사용 가능한 ID입니다.");
                $('.id-dup-check').css({'color': 'black'});
                $('.id-dup-check').show();
                signupStatus = true;
            }
            else if(json.success == false){
                $('.id-dup-check').text("사용중인 ID입니다.");
                $('.id-dup-check').css({'color': 'red'});
                $('.id-dup-check').show();
                signupStatus = false;
            }
        },
        error: function (data, status) {
            $('.id-dup-check').text("ID check error");
            $('.id-dup-check').css({ 'color': 'red' });
            $('.id-dup-check').show();
        }
    });
}

function validation(userType) {
    var msg = '';
    var err = false;
    var val;
    var regex;

    val = $("#inputId"+userType).val();
    console.log(val)
    regex = /^[A-Za-z0-9+]{4,16}$/;

    if (!regex.test(val)) {
        msg += "ID: 4자리 이상 16자리 이하, 영문, 숫자만 가능";
        err = true;
    }
    val = $("#inputPassword"+userType).val();
    regex = /^[a-z0-9\W+]{4,16}$/;
    if (!regex.test(val)) {
        msg += "\nPASSWORD: 4자리 이상 16자리 이하, 영문과 숫자 특수문자만 가능";
        err = true;
    }

    if (err)  {
        alert(msg);
        return -1;
    }
    else {
        return 0;
    }
}

$('#userType-1').click(function () {
    $('#user-signup-form').hide();
    $('#user1-form').show();
    $("#inputId1").focusout(function () {
        duplicationCheck(1);
    });
    
    $("#user1-form").submit(function (ev) {
        console.log('hello')
        if (validation()) {
            ev.preventDefault();
            return;
        }

        var formData = $("#user1-form").serialize();
    
        if (signupStatus == true) {
            $.ajax({
                type: "POST",
                url: "/signup",
                cache: false,
                data: formData,
                success: onSuccess,
                error: onError
            });
        } else {
            alert('ID 중복검사를 해주십시오');
        }
        ev.preventDefault();
    });

});

$('#userType-2').click(function(){ 
    $('#user-signup-form').hide();
    $('#user2-form').show(); 
    $("#inputId2").focusout(function() {
        duplicationCheck(2);
    });
    
    $("#user2-form").submit(function (ev) {

        if (validation()) {
            ev.preventDefault();
            return;
        }

        var formData = $("#user2-form").serialize();
    
        if (signupStatus == true) {
            $.ajax({
                type: "POST",
                url: "/signup",
                cache: false,
                data: formData,
                success: onSuccess,
                error: onError
            });
        } else {
            alert('ID 중복검사를 해주십시오');
        }
        ev.preventDefault();
    });
    
});

function onSuccess(data, status){

    if(data.success == true){
        location.href = '/login';
    } else {
        alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
    }
};

function onError(data, status) {
    alert("Signup error please retry");
}
