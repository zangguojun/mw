import { Provide } from '@midwayjs/decorator';
import { IFFCOptions, IFFCParams, IFFCProgress } from '../interface';
import { FFCreator, FFCreatorCenter, FFScene } from 'ffcreator';
import { join } from 'path';
// import WordWrappr from 'word-wrappr';
// import gm from 'gm';

// const getImageInfo = filePath => {
//   return new Promise((resolve, reject) => {
//     gm(filePath).size((err, size) => {
//       if (!err) {
//         resolve([size.width, size.height]);
//       }
//       reject([]);
//     });
//   });
// };

@Provide()
export class FFCService {
  async createTemplate({ id }: IFFCOptions) {
    await FFCreatorCenter.createTemplate(id, ({ images }) => {
      const creator = new FFCreator({
        width: 720,
        height: 1280,
        outputDir: join('public', 'result'),
        audio: join('public', 'audio', '夏日漱石.mp3'),
      });

      for (let j = 0; j < images.length; j++) {
        const imgName = images[j];
        if (imgName.startsWith('.')) continue;
        // const imgPath = path.resolve(projectDir, imgName);
        const scene = new FFScene();
        scene.setBgColor('#c4d7d6');
        // const [w, h] = await getImageInfo(imgPath);
      }

      // const scene = new FFScene();
      // scene.setBgColor('#b33771');
      // creator.addChild(scene);
      //
      // const fImg = new FFImage({ path: image, x: 100, y: 200 });
      // fImg.addEffect('fadeInLeft', 1, 1);
      // scene.addChild(fImg);
      // creator.start();
      return creator;
    });
  }

  async progress({ taskId }: IFFCParams): Promise<IFFCProgress> {
    const progress = FFCreatorCenter.getProgress(taskId);
    const state = FFCreatorCenter.getTaskState(taskId);
    return {
      taskId,
      progress,
      state,
    };
  }
}
