/**
 * @typedef {{
 * 	id: any,
 * 	post_id: any,
 * 	user: string,
 * 	content: string,
 * 	date: number,
 * }} ListPost
 */

/**
 * @typedef {{
 * 	_id: string,
 * 	isDeleted: boolean,
 * 	p: string,
 * 	post_id: string,
 * 	post_origin: string,
 * 	t: {
 * 		d: string,
 * 		e: number,
 * 		h: string,
 * 		mi: string,
 * 		mo: string,
 * 		s: string,
 * 		y: string
 * 	},
 * 	type: number,
 * 	u: string
 * }} ServerPost
 */

/**
 * @typedef {{
 * 	autoget: Array<ServerPost>,
 * 	error: boolean,
 * 	"page#":  number,
 * 	pages: number
 * }} ServerPostList
 */

/**
 * @typedef {{
 * 	_id: string,
 * 	id: any,
 * 	banned: boolean,
 * 	created: number,
 * 	lower_username: string,
 * 	lvl: number,
 * 	pfp_data: number,
 * 	quote: string,
 * 	type: number,
 * 	uuid: string
 * }} User
 */

// make vscode recognize this as a module
export {};
