
function hoverTriangle(element, mode){
    
    const other = $(".hero");
    other.splice($('.hero').index(element), 1);
    
    if(mode === "enter"){
        element.css({
            height: "23vh",
            width: "55%"
        });
        
        other.css({
            height:"18vh",
            width: "45%"
        })
        
        drawBordureCanvas(element);
    }
    else{
        element.css({
            height: "20vh",
            width: "50%"
        });
        
        
        other.css({
            height:"20vh",
            width: "50%"
        })
        
        element.children("canvas.bordure").attr({
            width: "0",
            height: "0"
        })
    }
    drawTriangleCanvas();
}

function changeColor(color){
    $("#titre").css({color: color});
    $(".hero").children().children(".rectangle").children().children().css("color", color);
    $("#disco").css("color", color);
}

function batement(element, duree){
    return new Promise((resolve, reject)=>{
        const sauvegarde = element.css('font-size');
        element.css("font-size",parseInt(element.css('font-size')) * 1.25 +"px");
        setTimeout(()=>{
            element.css("font-size", sauvegarde);
            resolve(true);
        }, duree)    
    })
     
        
}

function allOrange(){
    etoile.color = etoile.color_fast;
    restartBackground(etoile.frame_fast, etoile.spawn_fast);
    changeColor(etoile.color_fast)
     
}

function allYellow(){
    etoile.color = etoile.color_slow;
    restartBackground();
    changeColor(etoile.color);
}