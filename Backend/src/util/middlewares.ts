import { Request, Response, NextFunction } from "express";


export const authChecker = function (req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		next()
	} else {
		return res.status(401).json({ msg: 'Ehhez nincs jogod' })
	}
}

export const userNamePasswordChecker = function (req: Request, res: Response, next: NextFunction) {
	if (!req.body.username || !req.body.password) {
		return res.status(403).json({ msg: 'Felhasználónév vagy jelszó hiányzik' });
	} else {
		next();
	}
}