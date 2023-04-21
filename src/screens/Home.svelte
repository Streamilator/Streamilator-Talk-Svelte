<!--
	The home page!
	It features live post updates and a load more button which is pretty nice.
-->
<script>
	import {ulist} from "../lib/stores.js";
	import Container from "../lib/Container.svelte";
	import PostList from "../lib/PostList.svelte";
</script>

<div class="home">
	<Container>
		<h1>Home</h1>
		<div class="overflow">
			{#if $ulist.length == 1}
				You are the only user online. Try https://discord.gg/sX6qUuQz9a.
			{:else if $ulist.length == 0}
				Nobody is online? Somehow you are a ghost.
			{:else}
				There are currently {$ulist.length} users online ({$ulist.join(
					", "
				)}).
			{/if}
		</div>
	</Container>
	<PostList fetchUrl="home" postOrigin="home" canPost={true} />
</div>

<style>
	.home {
		height: 100%;
	}
</style>
