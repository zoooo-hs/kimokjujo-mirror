function originalSearch(id) {
    var n;
    console.log(originals);

    for (var i = 0; i < originals.length; i++) {
        if(originals[i].data == id) {
            n = originals[i].value;
            return n;
        }
    }
}

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
    for (var i = 0; i < genres.length; i++) {
        if(genres[i].data == id) {
            n = genres[i].value;
            return n;
        }
    }
}

function actorSorting(object) {


}

if($.cookie('userType') == 1) {
    $('#user1-main').show();
} else {
    $('#user2-main').show();
}

$.ajax({
    type : "GET",
    url : "/history",
    cache : false,
    data : planMovieId,
    dataType : 'json',
    success : function(data) {

        if(success.data == true) {

            var origin = originalSearch(data.planMovie.original);
            var actor1 = actorSearch(data.planMovie.actor1Id);
            var actor2 = actorSearch(data.planMovie.actor2Id);
            var director = directorSearch(data.planMovie.directorId);
            var maker = producerSearch(data.planMovie.makerId);
            var content = contentRateSearch(data.planMovie.contentRate);
            var genre = genreSearch(data.planMovie.genre);

            var words;

            if (data.planMovie._3words == 1) {
                words = "O";
            }
            else if (data.planMovie._3words == 0) {
                words = "X";
            }

            var breakEvenPoint;

            if (data.planMovieResult.breakEvenPoint == 1) {
                breakEvenPoint = "달성";
            }
            else if (data.planMovieResult.breakEvenPoint == 0) {
                breakEvenPoint = "실패";
            }

            var contract;

            if (data.planMovieResult.contract == 1) {
                contract = "체결 완료";
            }
            else if (data.planMovieResult.contract == 0) {
                contract = "미정";
            }

            $('#title').text('제목 : ' + data.planMovie.title);
            $('#_3words').text('세글자여부 : ' + words);
            $('#original').text('원작 : ' + origin);
            $('#budget').text('예산 : ' + data.planMovie.budget + ' 원');
            $('#releaseMonth').text('개봉월 : ' + data.planMovie.releaseMonth + ' 월');
            $('#actor1Id').text('배우1 : ' + actor1);
            $('#actor2Id').text('배우2 : ' + actor2);
            $('#directorId').text('감독 : ' + director);
            $('#makerId').text('제작사 : ' + maker);
            $('#contentRate').text('관람등급 : ' + content);
            $('#genre').text('장르 : ' + genre);
            $('#audience').text('관객수 예상 : ' + data.planMovieResult.audience + ' 명');
            $('#breakEvenPoint').text('손익분기달성여부 : ' + breakEvenPoint);
            $('#contact').text('체결여부 : ' + contract);

            if ($.cookie('userType') == 2) { // user2일때 시나리오 추가
                $('#scenario').text('시나리오 : ' + data.planMovieResult.scenario);
            }
        } else {
            alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
        }

    },
    error : function(e) {
        alert('서버 연결 에러');
    }
});
