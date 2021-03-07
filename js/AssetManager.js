export default class AssetManager {
    constructor(){
        this.toLoad = 0;
        this.load = 0;
    }

    progress(){
        if (this.toLoad > 0){
            return `${(this.load/this.toLoad*100).toFixed(2)}%`
        }

        return "nada a carregar";
    }
}