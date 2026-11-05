/**
 * Ghi nhận nguồn ảnh (bắt buộc theo giấy phép Creative Commons).
 * Khi thay bằng ảnh chính hãng/ảnh đại lý tự chụp, xóa mục tương ứng.
 * Ảnh trong public/images/vehicles/<id>/ là ảnh chính hãng VinFast (vinfastauto.com), không cần ghi ở đây.
 */
export const imageCredits = [
  { file: "vf3-green.webp", subject: "VinFast VF 3", author: "Ethan Llamas", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2025_VinFast_VF_3,_front_left.jpg" },
  { file: "vf5-red.webp", subject: "VinFast VF 5", author: "Ethan Llamas", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2024_VinFast_VF5,_front_left,_06-14-2024.jpg" },
  { file: "vf7.webp", subject: "VinFast VF 7", author: "Ethan Llamas", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2025_VinFast_VF_7_in_Vinfast_Blue,_front_right.jpg" },
  { file: "vf7-green.webp", subject: "VinFast VF 7", author: "Ethan Llamas", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:MIAS_2025_-_VinFast_VF_7_01.jpg" },
  { file: "vf7-interior.webp", subject: "Nội thất VinFast VF 7", author: "Ethan Llamas", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:MIAS_2025_-_VinFast_VF_7_02.jpg" },
  { file: "vf7-cockpit.webp", subject: "Nội thất VinFast VF 7", author: "ToyotaCamry7834", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:VinFast_VF7_Interior.jpg" },
  { file: "vf9.webp", subject: "VinFast VF 9", author: "Mr.choppers", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Vinfast_VF9_at_NYIAS_2022,_front_right.jpg" },
  { file: "vf9-ocean.webp", subject: "VinFast VF 9", author: "Ethan Llamas", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:VinFast_VF_9_Plus_Deep_Ocean_Metallic.jpg" },
] as const
