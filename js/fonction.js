    
function drawTriangleCanvas (){

        
    const w_j = $("#jean").width() * triangle.width;//width de jean
    const h_j = $("#jean").height();
    
    $("#jean").children("div.foreground").children("canvas.triangle").attr({
        width: w_j + "px",
        height: h_j+"px"
    });
    
    let ctx = $("#jean").children("div.foreground").children("canvas.triangle")[0].getContext("2d");
    ctx.clearRect(0,0,w_j, h_j);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0, h_j);
    ctx.lineTo(w_j,0);
    ctx.lineTo(0,0);
    ctx.fillStyle="#8B2A17";
    ctx.fill();
    
    const w_m = $("#mechant").width() * triangle.width;//width de mechant
    const h_m = $("#mechant").height();
    
    $("#mechant").children("div.foreground").children("canvas.triangle").attr({
        width: w_m + "px",
        height: h_m+"px"
    }); 
    
    ctx = $("#mechant").children("div.foreground").children("canvas.triangle")[0].getContext("2d");
    ctx.clearRect(0,0,w_m, h_m);
    ctx.beginPath();
    ctx.moveTo(w_m, 0);
    ctx.lineTo(w_m, h_m);
    ctx.lineTo(0, h_m);
    ctx.lineTo(w_m, 0);
    ctx.fillStyle="#8B2A17";
    ctx.fill();
}

function drawBordureCanvas(elem_parent, sens="", clicked=false){
    
    const canvas = elem_parent.children("canvas.bordure");
    const rectangle = elem_parent.children("div.foreground").children(".rectangle");
    const triangl = elem_parent.children("div.foreground").children(".triangle");
    
    canvas.attr({
        width: elem_parent.width() ,
        height: elem_parent.height()
    });
    
    const ctx = canvas[0].getContext("2d");
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    if(elem_parent.attr("id") === "jean"){
        ctx.beginPath();
        ctx.moveTo(rectangle.width(), 0);
        ctx.lineTo(rectangle.width(), rectangle.height());
        ctx.lineTo(rectangle.width() + triangl.width(), 0);
        ctx.lineTo(rectangle.width(), 0);
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fill();
        
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fillRect(0, 0, rectangle.width() + 1, rectangle.height());
    }
    else if(elem_parent.attr("id") === "mechant"){
        ctx.beginPath();
        ctx.moveTo(triangl.width(), 0);
        ctx.lineTo(triangl.width(), triangl.height());
        ctx.lineTo(0, triangl.height());
        ctx.lineTo(triangl.width(), 0);
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor
        ctx.fill();
        
        ctx.fillStyle =  (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fillRect(triangl.width(), 0, rectangle.width() + 1, rectangle.height());
    }
    else if(sens === "haut"){
        ctx.beginPath();
        console.log(parseInt(triangl.css("border-right")))
        ctx.moveTo(rectangle.width(), 0);
        ctx.lineTo(rectangle.width(), rectangle.height());
        ctx.lineTo(rectangle.width() + parseInt(triangl.css("border-right")), 0);
        ctx.lineTo(rectangle.width(), 0);
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fill();
        
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fillRect(0, 0, rectangle.width() + 1, rectangle.height());
    }
    else if (sens === "bas"){
        ctx.beginPath();
        console.log("alalal")
        console.log(parseInt(triangl.css("border-left")))
        ctx.moveTo(parseInt(triangl.css("border-left")), 0);
        ctx.lineTo(parseInt(triangl.css("border-left")), rectangle.height());
        ctx.lineTo( 0, rectangle.height());
        ctx.lineTo(parseInt(triangl.css("border-left")), 0);
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fill();
        
        ctx.fillStyle = (clicked) ? triangle.borderColorClicked : triangle.borderColor;
        ctx.fillRect(parseInt(triangl.css("border-left")) - 1, 0, rectangle.width(), rectangle.height());
    }
}

function reloadBackground(){
    
    const ctx = $("#fx")[0].getContext("2d");
    ctx.clearRect(0, 0, $("#fx").width(), $("#fx").height());
    
    $("#fx").attr({
        width: $("#background").width(),
        height: $("#background").height()
    });
}

function restartBackground(frame=etoile.frame, spawn=etoile.spawn){
    
    
    if(etoile.usine !== etoile.last_usine_id){//pour eviter les bug
        clearInterval(etoile.usine)
        etoile.last_usine_id = etoile.usine;
        setupBackground(frame,spawn);
    }
    else{
        setTimeout(()=>{
            restartBackground(frame, spawn);
        }, 50)
        
    }
    
    
    
}



function createStar(){
    const x = parseInt(Math.random() * $("#background").width());
    const y = $("#background").height();
    
    const width = parseInt(Math.random() * (etoile.w_max - etoile.w_min) + etoile.w_min);
    const height = parseInt(Math.random() * (etoile.h_max - etoile.h_min) + etoile.h_min);
    const vitesse = parseInt(Math.random() * (etoile.v_max - etoile.v_min) + etoile.v_min);
    
    return {x:x, y:y, width:width, height:height, v: vitesse, w_p: 0, h_p:0};
}


function setupBackground(frame=etoile.frame, spawn=etoile.spawn){
    setTimeout(()=>{
                
        $("#fx").attr({
            width: $("#background").width(),
            height: $("#background").height()
        });
        
        const ctx = $("#fx")[0].getContext("2d");
        etoile.usine = setInterval(()=>{
             
            if(Math.random() <= spawn){
                etoile.registre.push(createStar());
            }
            
            ctx.clearRect(0, 0, $("#fx").width(), $("#fx").height());
            
            for(let eto in etoile.registre){
                const etoil = etoile.registre[eto];
                ctx.fillStyle = etoile.color;
                ctx.fillRect(parseInt(etoil.x - etoil.width/2), parseInt(etoil.y - etoil.height/2), etoil.width, etoil.height);
                
                etoil.y -= etoil.v;
                
                if(etoil.y < -parseInt(etoil.height/2)){
                   etoile.registre.splice(eto, 1);
                }
                else{
                    
                    if(etoil.h_p === 0){
                        if(Math.random() <= 0.2 && etoil.height > etoile.h_min){
                            etoil.h_p = parseInt(Math.random() * (etoil.height - etoile.h_min)) * -1;
                        }
                        else if(Math.random() <= 0.2 && etoil.height < etoile.h_max){
                            etoil.h_p = parseInt(Math.random() * (etoile.h_max - etoil.height));
                        }
                    }
                    else{
                        if(etoil.h_p < 0){
                            etoil.height -= 1;
                            etoil.h_p += 1;
                        }
                        else{
                            etoil.height += 1;
                            etoil.h_p -= 1;
                        }
                    }
                    
                    
                    
                    
                    if(etoil.w_p === 0){
                        if(Math.random() <= 0.2 && etoil.width > etoile.w_min){
                            etoil.w_p = parseInt(Math.random() * (etoil.width - etoile.w_min)) * -1;
                        }
                        else if(Math.random() <= 0.2 && etoil.width < etoile.w_max){
                            etoil.w_p = parseInt(Math.random() * (etoile.w_max - etoil.width));
                        }
                    }
                    else{
                        if(etoil.w_p < 0){
                            etoil.width -= 1;
                            etoil.w_p += 1;
                        }
                        else{
                            etoil.width += 1;
                            etoil.w_p -= 1;
                        }
                    }
                    
                    
                }
                
            }
        }, frame)
    }, 100)
}

