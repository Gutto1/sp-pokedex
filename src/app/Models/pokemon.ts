import { Type } from './type'
import { Sprite } from './sprite'


export class Pokemon{
    id: number
    name: string
    types: Array<Type>
    sprites: Sprite

    constructor(
        id,
        name,
        types,
        sprites
    ){
        this.id = id
        this.name = name
        this.types = types
        this.sprites = sprites
    }
}