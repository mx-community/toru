import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import ffmpeg from 'fluent-ffmpeg'
import { fileTypeFromBuffer } from 'file-type'
import webp from 'node-webpmux'

const __dirname = dirname(fileURLToPath(import.meta.url))
const tmpDir = path.join(__dirname, '../tmp')

if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)

async function addExif(webpSticker, packname, author) {
  const img = new webp.Image()
  const stickerPackId = crypto.randomBytes(32).toString('hex')

  const json = {
    'sticker-pack-id': stickerPackId,
    'sticker-pack-name': packname,
    'sticker-pack-publisher': author
  }
                                                                               const exifAttr = Buffer.from([
    0x49,0x49,0x2a,0x00,0x08,0x00,0x00,0x00,
    0x01,0x00,0x41,0x57,0x07,0x00,0x00,0x00,
    0x00,0x00,0x16,0x00,0x00,0x00
  ])

  const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
  const exif = Buffer.concat([exifAttr, jsonBuffer])
  exif.writeUIntLE(jsonBuffer.length, 14, 4)

  await img.load(webpSticker)
  img.exif = exif
  return await img.save(null)
}

async function sticker(media, packname, author) {
  const type = await fileTypeFromBuffer(media)

  if (type?.mime === 'image/webp') {
    return await addExif(media, packname, author)
  }

  const ext = type?.ext || 'bin'
  const input = path.join(tmpDir, `${Date.now()}.${ext}`)
  const output = input + '.webp'

  await fs.promises.writeFile(input, media)

  await new Promise((resolve, reject) => {
    ffmpeg(input)
      .outputOptions([
        '-vcodec', 'libwebp',
        '-vf',

        'scale=512:512:force_original_aspect_ratio=increase,crop=512:512,fps=15'
      ])
      .toFormat('webp')
      .save(output)
      .on('end', resolve)
      .on('error', reject)
  })

  const buffer = await fs.promises.readFile(output)

  fs.unlinkSync(input)
  fs.unlinkSync(output)

  return await addExif(buffer, packname, author)
}

export { sticker, addExif }
