import { Component, Sprite} from '@ali/mui-eva/index';
import { registerComponent } from '../../plugins';
import { SpritePool } from './SpritePool';


export enum AtlasNumberAlign{
    Left,
    Right,
    Center
}

export interface AtlasNumberParams{
    // 字符对应图片
    charMap:{[char:string]:string},

    // 图集资源名
    resource:string,

    // 左中右对齐
    align:AtlasNumberAlign,
}

/**
 * 图集字体
 */
export class AtlasNumber extends Component{
    static componentName = "AtlasNumber"
    private _text:string;
    private _dirty:boolean;
    public _params:AtlasNumberParams;
    private _sprites:Sprite[];
    protected init(params:AtlasNumberParams){
        this._params = params;
        this._sprites = [];
    }

    get text() {
        return this._text; 
    }

    set text(v:string){
        if(this._text === v){
            return;
        }
        this._text = v;
        this._dirty = true;
    }

    

    update(){
        if(!this._dirty){
            return;
        }
        this._dirty = false;
        this.updateText();
    }

    // 根据_text的内容修改图片显示
    private updateText(){
        let maps = this._params.charMap;
        let oldLen = this._sprites.length;
        let len = this._text.length;
        let i=0
        for(;i<len;++i){
            let res = maps[this._text[i]];
            if(!res){
                console.log('字符串不能为空',this._text);
                continue;
            }
            if(i<oldLen){
                this._sprites[i].spriteName = res;
            }
            else{
                let sprite = SpritePool.get(this._params.resource,res);
                this.gameObject.addChild(sprite.gameObject);
                this._sprites.push(sprite);
            }
        }
        for(;i<oldLen;++i){
            SpritePool.put(this._sprites[i]);
        }
        this._sprites.splice(len);
        this.updatePosition();
    }

    private updatePosition(){
        if(this._sprites.length === 0){
            return;
        }
        let totalWidth = 0;
        let maxHeight = 0;
        for(let i=0;i<this._sprites.length;++i){
            totalWidth += this._sprites[i].width;
            if(this._sprites[i].height > maxHeight){
                maxHeight = this._sprites[i].height;
            }
        }
        this.gameObject.transform.size={width:totalWidth,height:maxHeight}
        
        let startX = 0;
        switch(this._params.align){
            case AtlasNumberAlign.Left:
                startX = 0;
            break;
            case AtlasNumberAlign.Center:
                startX = - totalWidth/2;
            break;
            case AtlasNumberAlign.Right:
                startX = - totalWidth;
            break;
        }
        let x = startX;
        let y = 0;
        for(let i=0;i<this._sprites.length;++i){
            let sprite = this._sprites[i];
            sprite.gameObject.transform.position={x:x,y:y};
            x += sprite.width;
        }
        
    }


   
}




registerComponent(AtlasNumber);