import { Provide } from '@midwayjs/decorator';
import { IFFCOptions } from '../interface';
import { FFCreator, FFCreatorCenter, FFImage, FFScene } from 'ffcreator';
import { join } from 'path';

@Provide()
export class FFCService {
  async createTemplate({ id }: IFFCOptions) {
    await FFCreatorCenter.createTemplate(id, ({ image }) => {
      const creator = new FFCreator({
        outputDir: join('public', 'result'),
      });
      const scene = new FFScene();
      scene.setBgColor('#b33771');
      creator.addChild(scene);

      const fImg = new FFImage({ path: image, x: 100, y: 200 });
      fImg.addEffect('fadeInLeft', 1, 1);
      scene.addChild(fImg);
      creator.start();
      return creator;
    });
  }
}
