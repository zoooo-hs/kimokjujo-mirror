if($.cookie('userType') == 1) {
    $('#user1-fundlist').show();
    $('#user1-header').show();
}
else if($.cookie('userType') == 2){
    $('#user2-header').show();
    $('#input-scenario').show();
}

$('#actor1Name').focus(function() {
    $('#actor1Real').val('actor_0')
    console.log($('#actor1Real').val())
});
$('#actor2Name').focus(function() {
    $('#actor2Real').val('actor_0')
    console.log($('#actor2Real').val())
});
$('#directorName').focus(function() {
    $('#directorReal').val('director_0')
    console.log($('#directorReal').val())
});
$('#makerName').focus(function() {
    $('#makerReal').val('producer_0')
    console.log($('#makerReal').val())
});
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
    var n = 'actor_0';
    for (var i = 0; i < actors.length; i++) {
        if(actors[i].data == id) {
            n = actors[i].value;
            break;
        }
    }
    return n;
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

function bepSearch(id) {
    if(id == 1) {
        return "달성";
    } else {
        return "실패";
    }
}

function actorSorting(object) {


}


$('#plan-movie-form').submit(function(evt){

    var budgetBefore = $('.budget-input > input')[0].value
    $('.budget-input > input')[0].value = parseInt(budgetBefore) * 10000000;

    var formData = $("#plan-movie-form").serialize();
    evt.preventDefault();

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

                $('#title').text(data.planMovie.title);
                $('#budget').text('예산 : ' + data.planMovie.budget + ' 원');
                $('#releaseMonth').text('개봉월 : ' + data.planMovie.releaseMonth + ' 월');
                $('<span>배우 1 : </span><span class="actor-trend" id="' + data.actors[0] + '">' + actor1 + '</span>').appendTo('#actor1Id');
                $('<span>배우 2 : </span><span class="actor-trend" id="' + data.actors[1] + '">' + actor2 + '</span>').appendTo('#actor2Id');
                $('#directorId').text('감독 : ' + director);
                $('#makerId').text('제작사 : ' + maker);
                $('#contentRate').text('관람등급 : ' + content);
                $('#genre').text('장르 : ' + genre);

                if($.cookie('userType') == 1){
                    $('.user1-result').show();

                    $('#audience').text('관객수 예상 : ' + data.planMovieResult.audience + ' 명');
                    $('#breakEvenPoint').text('손익분기달성여부 : ' + bepSearch(data.planMovieResult.breakEvenPoint));
                    for (var i in data.similarActors.actor1) {
                        $('<li ><span class="actor-trend" id=' + data.similarActors.actor1[i].actorId + '>'+ actorSearch(data.similarActors.actor1[i].actorId)+'</span></li>').appendTo('#actor1-similar-actors')
                    }
                    for (var i in data.similarActors.actor2) {
                        $('<li ><span class="actor-trend" id=' + data.similarActors.actor2[i].actorId + '>'+ actorSearch(data.similarActors.actor2[i].actorId)+'</span></li>').appendTo('#actor2-similar-actors')
                    }


                    $('.actor-trend').click(function() {

                        var actorId = $(this).attr('id');

                        $.ajax({
                            type : "GET",
                            url : "/actor-trend/" + actorId,
                            cache : false,
                            dataType : 'json',
                            success : function(data) {

                                if(data.success == true){
                                    var actorPower;

                                    actorPower = [{
                                        type: "line",
                                        dataPoints: [

                                        ]
                                    }];

                                    for(var i = 0; i < data.power.length; i++){

                                        var d = data.power[i].date.substring(0, 10).split('-');

                                        actorPower[0].dataPoints.push({ x: new Date(d[0], d[1], d[2]), y: parseInt(data.power[i].audience)});
                                    }

                                    console.log(actorPower);

                                    var chart = new CanvasJS.Chart("chartContainer", {
                                        animationEnabled: true,
                                        theme: "light2",
                                        backgroundColor: 'rgba(0, 0, 0, 0.075)',
                                        title:{
                                            text: actorSearch(actorId),
                                            fontColor: 'black' 
                                        },
                                        axisY:{
                                            includeZero: false,
                                            fontColor: 'black' 
                                        },
                                        data: actorPower
                                    });

                                    chart.render();

                                }
                                else
                                    alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
                            },
                            error : function(e) {
                                alert('서버 연결 에러');
                            }
                        });
                    });
                }
                else if($.cookie('userType') == 2)
                {
                    $('.user2-result').show();

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

