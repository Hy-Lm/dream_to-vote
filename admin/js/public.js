$(document).ready(function(){
    $('.Interlaced tr:odd').addClass('trbgcolor');
    $('.menu-list-title').click(function(){
          $(this).next('li').toggle('1500');
         });
    $(".menu-children li").click(function(){
        $(".menu-children li").css({background:'none'});
        $(this).css({background:'#f35844'});
       });
   });