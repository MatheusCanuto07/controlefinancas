<script>
  import ModalComponent from "$lib/components/ModalComponent.svelte";
  import {onMount} from "svelte";

  let { id, tipo, desc, meio, data, recorrencia = 'nenhuma', valor } = $props();

  const dataFormatada = $derived(new Date(data).toLocaleDateString('pt-BR'));
  const ehReceita = $derived(tipo === 'receita');
  const ehDespesa = $derived(tipo === 'despesa');
  const sinal = $derived(ehReceita ? '+' : '-');
  const corTexto = $derived(ehReceita ? 'text-green-500' : ehDespesa ? 'text-red-500' : '');

  let instance = $state()
  function onclick() {
      instance.abrirModal()
  }
  
  async function excluirTransacao() {
    await fetch(`/api/transacao/${id}`, {
      method: 'DELETE'
    });
  }

  async function deleteTransacao() {
    
  }
  onMount(() => {
      deleteTransacao();
  });
  
</script>

<a href="#" class="flex justify-between items-center p-3 bg-base-100 rounded-lg shadow-sm hover:bg-base-200 transition-colors" {onclick}>
    <div class="flex items-center gap-3">
        {#if tipo === 'entrada'}
            <div class="text-green-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </div>
        {:else}
            <div class="text-red-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        {/if}

        <div>
            <p>{desc}</p>
            <p class="font-medium">{meio}</p>
            <p class="text-sm text-gray-500">{dataFormatada}</p>
            {#if recorrencia !== 'nenhuma'}
                <span class="badge badge-xs">{recorrencia}</span>
            {/if}
        </div>
    </div>

    <div class="text-right">
        <p class:font-bold={ehReceita} class={corTexto}>
            {sinal} {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
    </div>
</a>

{#snippet modalContent()}
    <p class="text-center text-lg font-semibold">Tem certeza que deseja excluir essa transação?</p>
    <div class="modal-action">
        <form method="dialog">
            <button class="btn btn-error w-28 rounded-lg" onclick={excluirTransacao}>Sim</button>
            <button class="btn btn-primary w-28 rounded-lg">Close</button>
        </form>
    </div>
{/snippet}

<ModalComponent bind:this={instance} children={modalContent}/>