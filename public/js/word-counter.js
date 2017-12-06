$(function() {
    $('#scenario-content').keyup(function (e){
        var content = $(this).val();
        $(this).height(((content.split('\n').length + 1) * 1.5) + 'em');
        $('#scenario-counter').html(content.length + '/1500');
    });
    $('#scenario-content').keyup();
});