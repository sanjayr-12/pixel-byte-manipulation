import sharp from "sharp";

export async function convert(buffer) {
  try {
    const data = await sharp(buffer).metadata();
    //raw data
    const rawBytes = await sharp(buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // let twoD = [];
    // let ans = convertto2d(twoD, data.width, data.height, rawBytes.data);

    const div = rawBytes.data.length / 2;
    for (let i = 0; i < rawBytes.data.length; i += 4) {
      if (i <= div) {
        rawBytes.data[i] = 145;
        rawBytes.data[i + 1] = 26;
        rawBytes.data[i + 2] = 200;
        rawBytes.data[i + 3] = Math.floor(0.9 * 255);
      } else {
        rawBytes.data[i] = 84;
        rawBytes.data[i + 1] = 135;
        rawBytes.data[i + 2] = 21;
        rawBytes.data[i + 3] = Math.floor(0.9 * 255);
      }
    }

    await sharp(rawBytes.data, {
      raw: {
        width: data.width,
        height: data.height,
        channels: data.channels,
      },
    })
      .png()
      .toFile("demo.png");
  } catch (error) {
    console.log(error.message);
  }
}

// const convertto2d = (arr, width, height, originalArr) => {
//   let start = 0;
//   let k = 0;
//   for (let i = 0; i < height; i++) {
//     start += width;
//     let row = [];
//     for (let j = k; j < start; j++) {
//       row.push(originalArr[j]);
//     }
//     k = start;
//     arr.push(row);
//   }
//   //check if the length is same
//   console.log(arr.length * arr[0].length * 4 === width * height * 4);

//   let ans = [];

//   for (let i = 0; i < height / 2; i++) {
//     for (let j = 0; j < width; j += 4) {
//       ans.push((arr[i][j] = 176));
//       ans.push((arr[i][j + 1] = 172));
//       ans.push((arr[i][j + 2] = 21));
//       ans.push((arr[i][j + 3] = Math.floor(0.8 * 255)));
//     }
//   }
//   for (let i = height / 2; i < height; i++) {
//     for (let j = 0; j < width; j += 4) {
//       ans.push((arr[i][j] = 145));
//       ans.push((arr[i][j + 1] = 26));
//       ans.push((arr[i][j + 2] = 200));
//       ans.push((arr[i][j + 3] = Math.floor(0.08 * 255)));
//     }
//   }
//   console.log(ans.length);

//   console.log(ans.length === height * width * 4);

//   return ans;
// };
