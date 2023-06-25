import { PlaceType } from "../../constant/enum";
import { Position } from "../../constant/interface";
import { Enemy } from "../../objects/Enemy/Enemy";

export default class Place {
    placeType: PlaceType
    initPosition: Position

}

class Town extends Place {

    constructor(){
        super()
        this.placeType = PlaceType.town
    }

}

class Dungeon extends Place {

    enemys: Enemy[]

    constructor(){
        super()
        this.placeType = PlaceType.dungeon
    }

}