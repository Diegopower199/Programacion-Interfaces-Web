export default class EnemyController {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 1, 1, 1, 2, 3, 2],
        [2, 2, 3, 3, 3, 3, 3, 1],
        [3, 3, 3, 3, 1, 1, 2, 1],
        [1, 2, 1, 3, 3, 2, 1, 3],
    ];

    enemyRow = [];

    constructor(canvas) {
        this.canvas = canvas;
    }

    draw (ctx) {
        console.log("draw");
    }

    createdEnemies() {
        this.enemyMap.forEach( (row, rowIndex) => {
            this.enemyRow[rowIndex] = []; // Estamos inicializando a array vacio para que sepamos que hay 5 filas
            row.forEach( (enemyNumber, enemyIndex) => {
                
            })
        })
    }
}