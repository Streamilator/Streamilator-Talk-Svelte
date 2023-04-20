/**
 * @file Server-related URL constants.
 */

export const linkUrl =
	localStorage.getItem("meower_linkurl") ||
	"wss://api.streamilator.tk/v0/cloudlink/";
export const apiUrl =
	localStorage.getItem("meower_apiurl") || "https://api.streamilator.tk/";
export const encodeApiURLParams =
	localStorage.getItem("meower_encodeapi") || false;
