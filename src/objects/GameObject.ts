import { ObjectType } from "../constant/enum"

export class GameObject {
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

}