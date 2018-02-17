$('.fa').on('mouseover', function () {
    $(".highlight").css('visibility','visible');
    $(".highlight2").css('visibility','visible');
});  
$('.fa').on('mouseout', function () {
    $(".highlight2").css('visibility','hidden');
    $(".highlight").css('visibility','hidden');
});  