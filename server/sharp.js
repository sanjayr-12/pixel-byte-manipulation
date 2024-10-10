import sharp from "sharp";

export async function convert(buffer) {
  try {
    const data = await sharp(buffer).metadata();
    const rawBytes = await sharp(buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });
    console.log(rawBytes.data.length);
    console.log(rawBytes.data);

    const div = rawBytes.data.length / 2;
    for (let i = 0; i < rawBytes.data.length; i += 4) {
      if (i <= div) {
        rawBytes.data[i] = 240;
        rawBytes.data[i + 1] = 255;
        rawBytes.data[i + 2] = 21;
        rawBytes.data[i + 3] = Math.floor(0.8 * 255);
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
