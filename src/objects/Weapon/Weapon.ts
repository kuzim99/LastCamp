import {GameObject} from "../GameObject";

export class Weapon extends GameObject {
    onRemove:  (() => void) | null = null;

    target: GameObject | null = null;

    dx: number
    dy: number

    damage: number


    setTarget = (targets: GameObject[]) =>{
        let closestDistance = Infinity;
        for (let target of targets) {
            const distance = this.getDistance(target)
            if (distance < closestDistance) {
                closestDistance = distance;
                this.setDirection(target.x, target.y)
            }
        }
    }

    protected setDirection  = (x: number, y: number) =>{
        const dx = x - this.x;
        const dy = y - this.y;
        const distance = this.getDistanceByPosition(dx, dy)
        this.dx = dx / distance;
        this.dy = dy / distance;
    }

    update() {
        this.x += this.speed * this.dx;
        this.y += this.speed * this.dy;
        super.update();
    }
}