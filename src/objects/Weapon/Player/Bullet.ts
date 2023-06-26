import { Enemy } from "../../../index";
import {Weapon} from "../Weapon";

export class Bullet extends Weapon {
    attackCount: number = 2;

    constructor(x: number, y: number, enemies: Enemy[]) {
        super();
        this.element.style.width = '10px';
        this.element.style.height = '10px';
        this.element.style.backgroundColor = 'red';
        this.width = 10;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.speed = 5;

        this.setTarget(enemies)
        this.update();
    }

}
