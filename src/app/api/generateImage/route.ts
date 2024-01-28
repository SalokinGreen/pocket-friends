import { NextResponse } from "next/server";
import axios from "axios";
import JSZip from "jszip";

export async function POST(request: Request) {
  const req = await request.json();
  const prompt = req.prompt;
  const key = req.key;
  let newImage;
  const image = await axios
    .post(
      "https://api.novelai.net/ai/generate-image",
      {
        input:
          prompt +
          ", SFW., {{{very aesthetic}}}, {{{best quality}}}, {{{absurdres}}}",
        model: "nai-diffusion-3",
        action: "generate",
        parameters: {
          params_version: 1,
          width: 1024,
          height: 1024,
          scale: 5,
          sampler: "k_euler",
          steps: 28,
          n_samples: 1,
          ucPreset: 0,
          qualityToggle: false,
          sm: false,
          sm_dyn: false,
          dynamic_thresholding: false,
          controlnet_strength: 1,
          legacy: false,
          add_original_image: false,
          uncond_scale: 1,
          cfg_rescale: 0,
          noise_schedule: "native",
          legacy_v3_extend: false,
          negative_prompt:
            "nsfw, lowres, {bad}, error, fewer, extra, missing, worst quality, jpeg artifacts, bad quality, watermark, unfinished, displeasing, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract], low quality, low res little detail, drawing",
        },
      },
      {
        headers: {
          authorization: `Bearer ${key}`,
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      // console.log(response);
      const zip = new JSZip();
      return zip.loadAsync(response.data).then((zip) => {
        console.log(zip);
        return zip.file("image_0.png").async("base64");
      });

      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log(image);
  return NextResponse.json(
    { image },
    {
      // status: image.status,
      // statusText: image.statusText,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
