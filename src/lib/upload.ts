import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the upload directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Create a unique filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
    const filename = `${Date.now()}-${sanitizedName}`;
    const path = join(uploadDir, filename);

    await writeFile(path, buffer);
    return `/uploads/${filename}`;
}
