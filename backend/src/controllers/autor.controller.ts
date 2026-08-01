import { Request, Response } from "express";
import * as autoresService from "../services/autor.services";

export function getAll(req: Request, res: Response) {
    return res.json(autoresService.findAll());
}

export function getById(req: Request, res: Response) {
    const autor = autoresService.findById(Number(req.params.id));
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
}

export function create(req: Request, res: Response) {
    const nuevo = autoresService.create(req.body);
    return res.status(200).json(nuevo);
}