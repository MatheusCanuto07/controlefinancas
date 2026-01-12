<script lang="ts">
  import {Menu} from "lucide-svelte";
	interface Props {
		
	}

	let {  }: Props = $props();
</script>

{#snippet navItems()}
  <li><a href="/login">Login</a></li>
  <li><a href="/cadastro">Cadastro</a></li>
{/snippet}

<div class="navbar bg-base-100 shadow-lg">
		<div class="flex-1">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" class="btn btn-ghost text-xl normal-case text-purple-400">
				<i class="fas fa-wallet mr-2"></i> FinWise
			</a>
		</div>
		<div class="md:flex hidden">
			<ul class="menu menu-horizontal px-1">
				{@render navItems()}
			</ul>
		</div>
    <div class="md:hidden">
      <div class="dropdown dropdown-left">
        <div tabindex="0" role="button" class="btn m-1"><Menu /></div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          {@render navItems()}
        </ul>
      </div>
    </div>
	</div>


<!-- <div class="navbar bg-base-300">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="{userName ? "/dashboard" : "/"}">Controle de finanças</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      {#if userName}
        <li><a href="/control">Control</a></li>
        <li><a href="/profile">Olá, {userName}</a></li>
        <li><a href="/logout">Sair</a></li>
        {:else}
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastro">Cadastro</a></li>
      {/if}
    </ul>
  </div>
</div> -->