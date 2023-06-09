<!-- Meower Svelte, the app itself. -->
<script>
	import Main from "./screens/Main.svelte";
	import Setup from "./screens/Setup.svelte";

	import Modal from "./lib/Modal.svelte";
	import LoginModal from "./lib/modals/Login.svelte";
	import SignupModal from "./lib/modals/Signup.svelte";
	import BannedModal from "./lib/modals/Banned.svelte";
	import IPBannedModal from "./lib/modals/IPBanned.svelte";
	import DeletePostModal from "./lib/modals/DeletePost.svelte";
	import ReportPostModal from "./lib/modals/ReportPost.svelte";
	import ReportUserModal from "./lib/modals/ReportUser.svelte";
	import GCMemberModal from "./lib/modals/GCMember.svelte";
	import AddMemberModal from "./lib/modals/AddMember.svelte";
	import RemoveMemberModal from "./lib/modals/RemoveMember.svelte";
	import CreateChatModal from "./lib/modals/CreateChat.svelte";
	import SetQuoteModal from "./lib/modals/SetQuote.svelte";
	import ChangePasswordModal from "./lib/modals/ChangePassword.svelte";
	import DeleteAccountModal from "./lib/modals/DeleteAccount.svelte";
	import ErrorModal from "./lib/modals/Error.svelte";
	import LogoutModal from "./lib/modals/Logout.svelte";
	import LinkDiscord from "./lib/modals/LinkDiscord.svelte";
	import AnnounceModal from "./lib/modals/Announce.svelte";
	import DevTooldModal from "./lib/modals/DevTools.svelte";

	import ModPanel from "./lib/ModPanel.svelte";

	import Spinner from "./lib/Spinner.svelte";
	import {link} from "./lib/clmanager.js";
	import {mobile, touch} from "./lib/responsiveness.js";

	import {
		screen,
		setupPage,
		modalShown,
		modalPage,
		disconnected,
		disconnectReason,
		user,
		spinner,
		modPanelOpen,
	} from "./lib/stores.js";
	import {tick} from "svelte";
	if (window.location.href != "https://svelte.streamilator.tk") {
		isDev = true
	}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<main
	id="main"
	class:theme-orange={$user.theme === "orange"}
	class:theme-blue={$user.theme === "blue"}
	class:mode-light={!($user.mode === false)}
	class:mode-dark={$user.mode === false}
	class:layout-old={$user.layout === "old"}
	class:layout-mobile={$mobile}
	class:input-touch={$touch}
	class:input-hover={!$touch}
>
	{#if $modPanelOpen}
		<div class="mod-panel">
			<Modal
				on:close={() => {
					$modPanelOpen = false;
				}}
			>
				<div slot="header">
					<h1>Moderation Panel</h1>
				</div>
				<ModPanel />
			</Modal>
		</div>
	{/if}

	{#if $disconnected}
		<Modal>
			<h2 slot="header">Uh-oh.</h2>
			<div slot="default">
				<p>
					{#if $disconnectReason === ""}
						Something went wrong and the connection to Streamilator Talk was
						lost.
					{:else if $disconnectReason === "Failed to load userdata"}
						An unexpected error occurred while trying to load your
						userdata! Check console for more information.
					{:else if $disconnectReason === "E:119 | IP Blocked"}
						The server has blocked your IP address ({link.ip}).
					{:else if $disconnectReason == "E:110 | ID conflict"}
						There has been a hiccup! Looks like you logged into
						Streamilator Talk from another device.
						<br /><br />
						Please check any devices currently logged into Streamilator Talk and
						try again.
					{:else if $disconnectReason == "E:018 | Account Banned"}
						You have been banned by a moderator.
					{:else if $disconnectReason == "E:020 | Kicked"}
						You have been kicked by a moderator.
					{:else}
						We ran into an error trying to connect to the server.
						<pre><code>{$disconnectReason}</code></pre>
					{/if}
				</p>
				<button
					on:click={async () => {
						screen.set("setup");
						disconnected.set(false);
						await tick();
						setupPage.set("reconnect");
					}}>Reconnect</button
				>
				{#if isDev}
					<button on:click={async () => {
						localStorage.removeItem("meower_linkurl")
						localStorage.removeItem("meower_apiurl")
						location.reload()
					}}>Reset Server URLS</button>
					<button on:click={async () => {
						disconnected.set(false);
						$modalPage = "devTools"
					}}>Open dev tools</button>
				{/if}
			</div>
		</Modal>
	{/if}

	{#if $modalShown}
		<!-- Login, signup -->
		{#if $modalPage === "login"}
			<LoginModal />
		{:else if $modalPage === "signup"}
			<SignupModal />
			<!-- Bans -->
		{:else if $modalPage === "banned"}
			<BannedModal />
		{:else if $modalPage === "ipBanned"}
			<IPBannedModal />
			<!-- Confirmations -->
		{:else if $modalPage === "deletePost"}
			<DeletePostModal />
		{:else if $modalPage === "reportPost"}
			<ReportPostModal />
		{:else if $modalPage === "reportUser"}
			<ReportUserModal />
		{:else if $modalPage === "deleteAccount"}
			<DeleteAccountModal />
		{:else if $modalPage === "logout"}
			<LogoutModal />
			{:else if $modalPage === "announce"}
				<AnnounceModal />
			<!-- Text inputs -->
		{:else if $modalPage === "createChat"}
			<CreateChatModal />
		{:else if $modalPage === "setQuote"}
			<SetQuoteModal />
		{:else if $modalPage === "changePassword"}
			<ChangePasswordModal />
			<!-- Group chats -->
		{:else if $modalPage === "gcMember"}
			<GCMemberModal />
		{:else if $modalPage === "addMember"}
			<AddMemberModal />
		{:else if $modalPage === "removeMember"}
			<RemoveMemberModal />
		{:else if $modalPage === "linkDiscord"}
			<LinkDiscord />
		{:else if $modalPage === "devTools"}
			<DevTooldModal /> <!-- wip dev tools -->
		{:else}
			<ErrorModal />
		{/if}
	{/if}

	{#if $screen === "setup"}
		<Setup />
	{:else}
		<Main />
	{/if}

	{#if $spinner}
		<div class="spinner-container">
			<Spinner />
		</div>
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
	
	.spinner-container {
		position: fixed;
		right: 27px;
		bottom: 25px;
		z-index: 10000;
	}

	#main {
		width: 100%;
		height: 100%;

		font-family: 'Inter';

		--orange: #176d71;
		--orange-button: var(--orange);
		--orange-light: #419498;
		--orange-dark: #0f474a;
		--orange-scrollbar-back: #0a4346;
		--background: white;
		--foreground: black;
		--foreground-orange: white;

		--pfp-bg: white;
		--pfp-outline: #d9d9d9;

		background-color: var(--background);
		color: var(--foreground);
		scrollbar-color: var(--orange) var(--orange-scrollbar-back);
		font-size: 15pt;
	}

	#main.theme-orange.mode-dark {
		--orange: #0f474a;
		--orange-light: #176d71;
		--orange-dark: #134143;
		--orange-scrollbar-back: #0a4346;
		--background: #020010;
		--foreground: #eef;
		--foreground-orange: #eef;
	}
	#main.theme-blue {
		/*--orange: #aa0000;
		--orange-light: #aa0000;
		--orange-dark: #aa0000;
		--orange-scrollbar-back: #aa0000;*/
		--orange: #1a1e84;
		--orange-light: #2e32a6;
		--orange-dark: #13166c;
		--orange-scrollbar-back: #374eb1;
		--background: white;
		--foreground: black;
		--foreground-orange: white;
		scrollbar-color: unset;
	}
	#main.theme-blue.mode-dark {
		--background: #202020;
		--foreground: white;
		--foreground-orange: white;
	}
</style>
