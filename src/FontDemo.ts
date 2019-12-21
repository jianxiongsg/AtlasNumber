import { Component, } from '@ali/mui-eva/index'
import { registerComponent } from '../plugins';
import { AtlasNumber, AtlasNumberAlign } from './utils/AtlasNumber';

export interface FontTestParams  {
    position:{x:number,y:number}
}





export class FontDemo extends Component  {
    static componentName = 'FontDemo';

    private font: AtlasNumber;
    private params: FontTestParams;
    protected init(params: FontTestParams) {
        this.params = params;

        this.gameObject.transform.position = params.position;
        this.font = this.gameObject.addComponentType(AtlasNumber,{
            charMap:{
                '0':'food_0.png',
                '1':'food_1.png',
                '2':'food_2.png',
                '3':'food_3.png',
                '4':'food_4.png',
                '5':'food_5.png',
                '6':'food_6.png',
                '7':'food_7.png',
                '8':'food_8.png',
                '9':'food_9.png',
            },
            resource:'fonttest',
            align:AtlasNumberAlign.Right
        })
        this.font.text = '0123456789';
        
        // this.gameObject.addChild(imgObj);
    }
}

registerComponent(FontDemo);