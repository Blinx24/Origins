//////////////////////////////////////////////////////////////////////
//                         Clase gato (jugadores)                   //
//////////////////////////////////////////////////////////////////////
class DarkMatter {
    //******************* Constructor clase ************************//
    constructor(obj) {
        this.object = obj;      // Objeto de phaser
    }

    //******************* Getters ************************//
    getObject() {
        return this.object;
    }

    //******************* Setters ************************//
    setObject(obj) {
        this.object = obj
    }
}

//////////////////////////////////////////////////////////////////////
//                         Creación de                     //
//////////////////////////////////////////////////////////////////////
var darkMatter = new DarkMatter(undefined);

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export { darkMatter };