import { ObjectType } from "../constant/enum"

export class GameObject {
    onRemove:  (() => void) | null = null;

    element: HTMLDivElement;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    objectType: ObjectType

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speed = 0;
        this.update()
    }

    update() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    collision(target: GameObject): boolean {
        return (
            this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.height + this.y > target.y
        );
    }

    protected getDistance = (target: GameObject) =>{
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    protected getDistanceByPosition = (x: number, y: number) =>{
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

}