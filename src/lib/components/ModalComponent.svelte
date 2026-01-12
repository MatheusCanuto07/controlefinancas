<script lang="ts">
	let dialog: HTMLDialogElement | undefined = $state();
	export function abrirModal() {
		dialog?.showModal();
	}

	let { children } = $props();
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		{@render children()}
	</div>
</dialog>
