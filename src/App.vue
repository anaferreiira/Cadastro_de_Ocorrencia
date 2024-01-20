<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
		<v-snackbar :color="snackbarColor" v-model="snackbar" @input="change">
			{{ snackbarMessage }}
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'App',
	data: () => ({
		snackbar: false,
		snackbarColor: ''
	}),
	async mounted() {
		await this.$store.dispatch('auth/getPermissao')
	},
	computed: {
		...mapGetters({
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	watch: {
		getSnackbar() {
			this.snackbar = this.getSnackbar
		},
		snackbarMessage() {
			/*
			Altera a cor da snackbar dependendo da mensagem no padrão de cores 
			atuais do figma | VERDE -> SUCESSO | AMARELO -> AVISO | VERMELHO -> ERRO
			*/
			if (this.snackbarMessage.startsWith('Grupo de Ocorrência Gravado com Sucesso.') == true || this.snackbarMessage === 'Alteração efetuada com sucesso.' || this.snackbarMessage === 'Exclusão efetuada com sucesso.') this.snackbarColor = '#00BFA1'
			if (this.snackbarMessage === 'Informe o Grupo de Ocorrência.' || this.snackbarMessage === 'Informe um Grupo' || this.snackbarMessage === 'Localidade, Código, CEP, Código Externo: um destes filtros deve ser preenchido.' || this.snackbarMessage.startsWith('O fornecedor já está ligado ao grupo') === true) this.snackbarColor = '#FFAB00'
			if (this.snackbarMessage.startsWith('Nada encontrado.') === true) this.snackbarColor = '#FFAB00'

		}
	},
	methods: {
		...mapActions({
			getPermissao: 'auth/getPermissao',
		}),
		change() {
			this.$store.dispatch('setSnackbar', { status: false, message: '' })
		},
	},
}
</script>
