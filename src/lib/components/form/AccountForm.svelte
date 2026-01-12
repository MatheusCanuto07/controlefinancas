<script lang="ts">
  import { saveAccount } from '$lib/controller/AccountController.remote';
  import { type AccountInsert } from '$lib/db/schema/tables';

  interface Props {
    account: AccountInsert | null;
  }

  let { account }: Props = $props();
  
  const { name, balance } = saveAccount.fields;
  $effect(() => {
    if (account) {
      name.set(account.name);
      balance.set(account.balance ?? 0);
    }
  });
</script>

<form
  {...saveAccount.enhance(async ({ submit }) => {
    await submit();

    if (Object.keys(saveAccount.fields.issues).length > 0) {
      console.log('Erro de validação');
      return;
    }

    alert(account ? 'Conta atualizada com sucesso!' : 'Conta criada com sucesso!');
  })}
>
  {#if account}
    <input type="hidden" name="id" value={account.id} />
  {/if}

  <label>
    <h2>Name</h2>
    {#each name.issues() as issue}
      <p class="issue">{issue.message}</p>
    {/each}
    <input {...name.as('text')} />
  </label>

  <label>
    <h2>Balance</h2>
    {#each balance.issues() as issue}
      <p class="issue">{issue.message}</p>
    {/each}
    <input {...balance.as('number')} />
  </label>

  <button>
    {account ? 'Update account' : 'Create account'}
  </button>
</form>
