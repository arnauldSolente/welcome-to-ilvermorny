    
function drawTriangleCanvas (){
        
    const width = parseInt($(".hero").width() * 0.10);
    const height = parseInt($(".hero").height());
        
    $(".hero").children("canvas").attr({
        width: width + "px",
        height: height+"px"
    });
        
    let ctx = $("#jean").children("canvas")[0].getContext("2d");
    ctx.clearRect(0,0,width, height);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0, height);
    ctx.lineTo(width,0);
    ctx.lineTo(0,0);
    ctx.fillStyle="#8B2A17";
    ctx.fill();
        
    ctx = $("#mechant").children("canvas")[0].getContext("2d");
    ctx.clearRect(0,0,width, height);
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.lineTo(width, 0);
    ctx.fillStyle="#8B2A17";
    ctx.fill();
}

function setupHeight(element){
    const height_header = document.getElementsByTagName("header")[0].offsetHeight;
    element.height($(window).height() - height_header);
}

function createStar(){
    const x = parseInt(Math.random() * $("#background").width());
    const y = $("#background").height();
    
    const width = parseInt(Math.random() * (etoile.w_max - etoile.w_min) + etoile.w_min);
    const height = parseInt(Math.random() * (etoile.h_max - etoile.h_min) + etoile.h_min);
    const vitesse = parseInt(Math.random() * (etoile.v_max - etoile.v_min) + etoile.v_min);
    
    return {x:x, y:y, width:width, height:height, v: vitesse, w_p: 0, h_p:0};
}

function setupBackground(){
    setTimeout(()=>{
        
        setupHeight($("#background"));
        
        $("#fx").attr({
            width: $("#background").width(),
            height: $("#background").height()
        });
        
        const ctx = $("#fx")[0].getContext("2d");
        const liste_etoile = [];
        const usine_a_etoile = setInterval(()=>{
             
            if(Math.random() <= etoile.spawn){
                liste_etoile.push(createStar());
            }
            
            ctx.clearRect(0, 0, $("#background").width(), $("#background").height());
            
            for(let eto in liste_etoile){
                const etoil = liste_etoile[eto];
                ctx.fillStyle = etoile.color;
                ctx.fillRect(parseInt(etoil.x - etoil.width/2), parseInt(etoil.y - etoil.height/2), etoil.width, etoil.height);
                
                etoil.y -= etoil.v;
                
                if(etoil.y < -parseInt(etoil.height/2)){
                   liste_etoile.splice(eto, 1);
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
            
        }, etoile.frame)
    }, 100)
}

