/**
 * @file Stores, not to be confused with shops or those other stores.
 */

import {writable} from "svelte/store";

export const screen = writable("setup");
export const mainPage = writable("home");
export const setupPage = writable("logo");

// Used for modal overlay
export const modalShown = writable(false);
export const modalPage = writable("");

// Used for the disconnected screen
export const disconnected = writable(false);
export const disconnectReason = writable("");

// Last typed
export const lastTyped = writable(0);

// Current chat stuff
export const chatName = writable("");
export const chatid = writable("");
export const chatMembers = writable([]);
export const chatOwner = writable("");

// User list
export const ulist = writable([]);

// Mod panel
export const userToMod = writable("");

// Last (blank) clicked
export const postClicked = writable({});
export const profileClicked = writable("");
export const profileClicked_GC = writable("");
export const announcementToSend = writable("");
export const searchQuery = writable("");
export const searchType = writable("");

// Current auth header
export const authHeader = writable({});

// The mod panel is a popup
export const modPanelOpen = writable(false);

// The current user profile
export const user = writable({
	name: null,
	lvl: 0,
	unread_inbox: false,
	theme: "orange",
	mode: true,
	sfx: true,
	bgm: true,
	bgm_song: 2,
	layout: "new",
	pfp_data: 1,
	quote: "",
});

export const spinner = writable(false);

export const windowStyle = writable({});
