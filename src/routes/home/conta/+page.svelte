<script lang="ts">
  import type { PageProps } from './$types';
  import { getAccounts } from '$lib/controller/AccountController.remote';

  let { data }: PageProps = $props();
</script>

<h1>Minhas Contas</h1>
<a href="/home/conta/novo">Nova Conta</a>

<ul>
  {#each await getAccounts() as {id, name, balance}}
    <li>
      <a href={`/home/conta/${id}`}>{name} - R$ {balance?.toFixed(2) ?? '0.00'}</a>
    </li>
  {/each}
</ul>