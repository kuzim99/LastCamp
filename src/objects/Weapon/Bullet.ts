import { GameObject } from "../GameObject";
import { Enemy } from "../../index";

class Weapon extends GameObject {

    dx: number
    dy: number

    protected getDistance = () =>{
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }
}

export class Bullet extends Weapon {
    target: Enemy | null = null;

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

        let closestDistance = Infinity;
        for (let enemy of enemies) {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < closestDistance) {
                closestDistance = distance;
                // 벡터를 정규화하여 길이가 1인 방향벡터로 만듦
                this.dx = dx / distance;
                this.dy = dy / distance;
                this.target = enemy;
            }
        }        

        this.update();
    }

    update() {
        this.x += this.speed * this.dx;
        this.y += this.speed * this.dy;
        super.update();
    }


}
