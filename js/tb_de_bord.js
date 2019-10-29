const etoile = {
    w_min: 3, //largeur minimum
    w_max: 15,//largeur max
    h_min: 3,// hauteur min
    h_max: 15,//hauteur max
    v_min: 2, //vitesse minimum
    v_max: 4, //vitesse max
    color: "#FFA71B",
    color_fast: "#FF7414",
    spawn: 0.08, //les chances de spawn a chaque frame
    spawn_fast: 0.16,
    frame: 50,
    frame_fast:10,
    usine: null,
    last_usine_id: 0,
    registre: []
}

const triangle = {
    width: 0.1,
    height: 1, //pourcentage,
    borderSize: 0.05,//pourcentag
    borderColor: "black",// milliseconde
    borderColorClicked: "white"
}