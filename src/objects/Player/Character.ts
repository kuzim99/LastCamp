import TypeUtils from "../../utils/TypeUtils";
import { GameObject } from "../GameObject";

// 1. 캐릭터는 wasd로 이동
export class Character extends GameObject {
    keyState: Record<string, boolean> = {};

    constructor() {
        super();
        this.x = 500
        this.y = 500
        this.setSize(50, 50)
        this.element.style.backgroundColor = 'blue';
        this.speed = 5;

        window.addEventListener('keydown', (event) => this.keyHandler(event, true));
        window.addEventListener('keyup', (event) => this.keyHandler(event, false));
    }

    setSize = (width: number, height: number) =>{
        this.width = width
        this.height = height
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
    }

    private keyHandler = (event: KeyboardEvent, isDown: boolean) =>{
        console.log(event.code, TypeUtils.isEnum(Keyconfig, event.code));

        const isKey = TypeUtils.isEnum(Keyconfig, event.code)
        if(isKey) this.keyState[event.code] = isDown;
    }

    update = () =>{
        if (this.keyState[Keyconfig.KeyW]) this.y -= this.speed;
        if (this.keyState[Keyconfig.left]) this.x -= this.speed;
        if (this.keyState[Keyconfig.down]) this.y += this.speed;
        if (this.keyState[Keyconfig.right]) this.x += this.speed;

        super.update()
    }

}


enum Keyconfig { 
    KeyW = "KeyW",
    down = "KeyS",
    left = "KeyA",
    right = "KeyD",
}