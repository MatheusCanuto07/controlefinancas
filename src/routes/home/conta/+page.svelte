<script lang="ts">
  import type { PageProps } from './$types';
  import { getAccounts } from './AccountController';

  let { data }: PageProps = $props();
</script>

<h1>Minhas Contas</h1>
<a href="/home/conta/novo">Nova Conta</a>

<ul>
  {#each await getAccounts() as account}
    <li>
      <a href={`/home/conta/${account.id}`}>{account.name} - R$ {account.balance?.toFixed(2) ?? '0.00'}</a>
    </li>
  {/each}
</ul>