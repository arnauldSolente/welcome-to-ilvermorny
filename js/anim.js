$(document).ready(function(){
    
    $(".hero").mouseover(function(){
        hoverTriangle($(this), "enter");
    }).mouseout(function(){
        hoverTriangle($(this),"exit")
    })

})