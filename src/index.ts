// game.ts

import { Character } from "./objects/Player/Character";
import { GameObject } from "./objects/GameObject";
import { Bullet } from "./objects/Weapon/Player/Bullet";


// 3. 적은 랜덤으로 생성
export class Enemy extends GameObject {
    target: Character | null = null;

    constructor(x: number, y: number, target: Character) {
        super();
        this.element.style.width = '50px';
        this.element.style.height = '50px';
        this.element.style.backgroundColor = 'green';
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.target = target;
        this.update()
    }

    update() {
        if (this.target) {
            let dx = this.target.x - this.x;
            let dy = this.target.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            this.x += this.speed * dx / distance;
            this.y += this.speed * dy / distance;
        }
        super.update();
    }
}

// 게임 초기화 및 로직 수행
class Game {
    gameArea: HTMLDivElement;
    character: Character;
    bullets: Bullet[] = [];
    enemies: Enemy[] = [];
    lastBulletTime: number = 0;
    lastEnemyTime: number = 0;
    lastFrameTime: number = 0;
    keyState: Record<string, boolean> = {};

    with: number = 1000;
    height: number = 1000;

    constructor() {
        // 게임 영역 생성
        this.gameArea = document.createElement('div');
        this.gameArea.style.width = `${this.with}px`;
        this.gameArea.style.height = `${this.height}px`;
        this.gameArea.style.border = '1px solid black';
        document.body.appendChild(this.gameArea);

        // 캐릭터 생성
        this.character = new Character();
        this.gameArea.appendChild(this.character.element);
        
        // 게임 시작
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    // 게임 루프
    gameLoop(timestamp: number) {
        // 60FPS 제한
        if (timestamp - this.lastFrameTime < 1000 / 60) {
            window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
            return;
        }
        this.lastFrameTime = timestamp;

        // 캐릭터 업데이트
        this.character.update();

        // 총알 업데이트 및 충돌 검사
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let bullet = this.bullets[i];
            bullet.update();

            if (bullet.y < 0 || bullet.x < 0 || bullet.x > this.with || bullet.y > this.height) {
                this.gameArea.removeChild(bullet.element);
                this.bullets.splice(i, 1);
                continue;
            }

            for (let j = this.enemies.length - 1; j >= 0; j--) {
                let enemy = this.enemies[j];
                if (bullet.collision(enemy)) {
                    bullet.attackCount -= 1
                    if(bullet.attackCount === 0) {
                        this.gameArea.removeChild(bullet.element);
                        this.bullets.splice(i, 1);
                    }
                    this.gameArea.removeChild(enemy.element);
                    this.enemies.splice(j, 1);
                    break;
                }
            }
        }

        // 적 업데이트 및 충돌 검사
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let enemy = this.enemies[i];
            enemy.update();

            if (enemy.y > this.height || enemy.x < 0 || enemy.x > this.with) {
                this.gameArea.removeChild(enemy.element);
                this.enemies.splice(i, 1);
                continue;
            }

            if (enemy.collision(this.character)) {
                this.gameArea.removeChild(enemy.element);
                this.enemies.splice(i, 1);
                alert('Game Over!');
                return;
            }
        }

        // 총알 발사
        if (this.enemies.length !== 0 && timestamp - this.lastBulletTime > 1000) {
            let bullet = new Bullet(this.character.x, this.character.y, this.enemies);
            this.bullets.push(bullet);
            this.gameArea.appendChild(bullet.element);
            this.lastBulletTime = timestamp;
        }

        // 적 생성
        if (timestamp - this.lastEnemyTime > 500) {
            let enemy = new Enemy(Math.random() * 1000, Math.random() * 1000, this.character);
            this.enemies.push(enemy);
            this.gameArea.appendChild(enemy.element);
            this.lastEnemyTime = timestamp;
        }

        // 다음 프레임을 위한 호출
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}

window.onload=()=>{
    new Game();
}

