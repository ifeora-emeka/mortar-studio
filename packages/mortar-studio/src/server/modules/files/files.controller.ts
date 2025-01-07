import {NextFunction, Response, Request} from "express";
import path from 'path';
import fs from 'fs';

export default class FilesController {

    public uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }
            res.status(200).json({ message: "Files uploaded successfully", files: req.files });
        } catch (e) {
            console.log('UPLOAD ERROR:::', e)
            res.status(500).json({ message: "Error uploading files" });
        }
    }

    public deleteFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fileName } = req.params;
            const publicDir = process.env.MORTAR_PUBLIC_DIRECTORY as string;
            const filePath = path.join(publicDir, fileName as string);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "File not found" });
            }

            fs.unlinkSync(filePath);
            res.status(200).json({ message: "File deleted successfully" });
        } catch (e) {
            res.status(500).json({ message: "Error deleting file" });
        }
    }

    public downloadFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { fileName } = req.params;
            const publicDir = process.env.MORTAR_PUBLIC_DIRECTORY as string;
            const filePath = path.join(publicDir, fileName as string);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "File not found" });
            }

            res.download(filePath);
        } catch (e) {
            res.status(500).json({ message: "Error downloading file" });
        }
    }

}
