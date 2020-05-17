import { Request, Response, NextFunction } from "express";


export const AuthChecker = function (req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		next()
	} else {
		return res.status(401).json({ msg: 'Ehhez nincs jogod' })
	}
}