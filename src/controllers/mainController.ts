import { Request, Response } from "express";

/**
 * @desc Get main rout
 * @route /
 * @method GET
 * @access public
 */
const main_index_get = (req: Request, res: Response): void => {
  res.status(200).json("Welcome to the API!");
}

export {
  main_index_get
}