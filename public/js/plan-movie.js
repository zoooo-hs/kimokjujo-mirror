if($.cookie('userType') == 1) {
    $('#user1-fundlist').show();
    $('#user1-header').show();
}
else if($.cookie('userType') == 2){
    $('#user2-header').show();
    $('#input-scenario').show();
}

$('#actor1Name').autocomplete({
    source: actors,
    select: function(e, ui) {
        console.log(ui.item.data);
        $('#actor1Real').val(ui.item.data);
    }
});
$('#actor2Name').autocomplete({
    source: actors,
    select: function(e, ui) {
        console.log(ui.item.data);
        $('#actor2Real').val(ui.item.data);
    }
});
$('#directorName').autocomplete({
    source: directors,
    select: function(e, ui) {
        console.log(ui.item.data);
        $('#directorReal').val(ui.item.data);
    }
});
$('#makerName').autocomplete({
    source: producers,
    select: function(e, ui) {
        console.log(ui.item.data);
        $('#makerReal').val(ui.item.data);
    }
});

function actorSearch(id) {
    var n;
    for (var i = 0; i < actors.length; i++) {
        if(actors[i].data == id) {
            n = actors[i].value;
            return n;
        }
    }
}

function directorSearch(id) {
    var n;
    for (var i = 0; i < directors.length; i++) {
        if(directors[i].data == id) {
            n = directors[i].value;
            return n;
        }
    }
}

function producerSearch(id) {
    var n;
    for (var i = 0; i < producers.length; i++) {
        if(producers[i].data == id) {
            n = producers[i].value;
            return n;
        }
    }
}
function contentRateSearch(id) {
    var n;
    for (var i = 0; i < contentRate.length; i++) {
        if(contentRate[i].data == id) {
            n = contentRate[i].value;
            return n;
        }
    }
}

function genreSearch(id) {
    var n;
    for (var i = 0; i < genre.length; i++) {
        if(genre[i].data == id) {
            n = genre[i].value;
            return n;
        }
    }
}

function actorSorting(object) {


}


$('#plan-movie').click(function(){
    var formData = $("#plan-movie-form").serialize();

    console.log(formData);

    $('#plan-movie-post').hide();
    $('#loading-container').show();

    $.ajax({
        type : "POST",
        url : "/new-plan",
        cache : false,
        data : formData,
        success : function(data) {
            if(data.success == true){

                $('#loading-container').hide();
                $('#plan-movie-result').show();

                console.log(data);

                var actor1 = actorSearch(data.actors[0]);
                var actor2 = actorSearch(data.actors[1]);
                var director = directorSearch(data.planMovie.directorId);
                var maker = producerSearch(data.planMovie.makerId);
                var content = contentRateSearch(data.planMovie.contentRate);
                var genre = genreSearch(data.planMovie.genre);

                $('#title').text('제목 : ' + data.planMovie.title);
                $('#budget').text('예산 : ' + data.planMovie.budget + ' 원');
                $('#releaseMonth').text('개봉월 : ' + data.planMovie.releaseMonth + ' 월');
                $('#actor1Id').text('배우1 : ' + actor1);
                $('#actor2Id').text('배우2 : ' + actor2);
                $('#directorId').text('감독 : ' + director);
                $('#makerId').text('제작사 : ' + maker);
                $('#contentRate').text('관람등급 : ' + content);
                $('#genre').text('장르 : ' + genre);

                if($.cookie('userType') == 1){
                    $('#user1-result').show();

                    $('#audience').text('관객수 예상 : ' + data.planMovieResult.audience + ' 명');
                    $('#breakEvenPoint').text('손익분기달성여부 : ' + data.planMovieResult.breakEvenPoint);
                    for (var i in data.similarActors.actor1) {
                        $('<li>'+ actorSearch(data.similarActors.actor1[i].actorId)+'</li>').appendTo('#actor1-similar-actors')
                    }
                    for (var i in data.similarActors.actor2) {
                        $('<li>'+ actorSearch(data.similarActors.actor2[i].actorId)+'</li>').appendTo('#actor2-similar-actors')
                    }
                }
                else if($.cookie('userType') == 2)
                {
                    $('#user2-result').show();

                    $('#scenario').text('시나리오 : ' + data.scenario);
                }
            }
            else
                alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다.');
        },
        error : function(e) {
            alert('서버 연결 에러');
        }
    });

});

