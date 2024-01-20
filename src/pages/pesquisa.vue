<template>
	<div class="container">
		<v-card class="container__card">
			<v-card-title class="container__card__title">
				Consulta de Grupo de Ocorrência
				<v-btn @click="goToCadastro" class="pes btn" rounded outlined color="#0672b9">Pesquisar</v-btn>
			</v-card-title>
			<v-card-subtitle class="container__card__subtitle">
				<font color="black"><b>Selecione as opções de filtro</b></font>
			</v-card-subtitle>
			<v-row class="3">
				<v-col cols="3">
					<v-autocomplete :fnSync="querynameGroup" isAsync ref="autocomplete" no-data-text v-model="nameGroup"
						label="Grupo de Ocorrência" item-text="desc_status_tracking" item-value="tab_status_tracking_id"
						returnObject :items="getDescricaoGrupo" outlined>
					</v-autocomplete>
				</v-col>
			</v-row>
			<br />
			<v-btn @click="goToHome" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
		</v-card>
	</div>
</template>
<script>
import Autocomplete from '@/pages/Autocomplete.vue'
import { mapGetters } from 'vuex'
export default {
	name: 'app',
	data() {
		return {
			itens: [],
			n: null,
			nameGroup: null,
			clear: false,
		}
	},
	components: {
		Autocomplete,
	},
	mounted() {
		this.$store.dispatch('grupo/getDescricaoGrupo')

	},
	watch: {
		getDescricaoGrupo() {
			this.nameGroup = this.getDescricaoGrupo.nameGroup
			this.status = this.getDescricaoGrupo.status
			this.code = this.getDescricaoGrupo.code
		}
	},

	computed: {
		...mapGetters({
			getDescricaoGrupo: 'grupo/getDescricaoGrupo',

		}),
		filteredItems() {
			return this.getDescricaoGrupo.filter((item) =>
				item.toLowerCase().includes(this.nameGroup.toLowerCase())
			);
		},
	},

	methods: {
		querynameGroup(val) {
			this.$store.dispatch('grupo/getDescricaoGrupo', val)
		},

		goToHome() {
			this.$router.push('/')
		},
		async goToCadastro() {
			if (!this.nameGroup) {
				this.$store.dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Informe o Grupo de Ocorrência.',
					},
					{ root: true }
				)
				return
			}
			const obj = {
				desc_status_tracking_longa: this.nameGroup,
				tab_status_tracking_id: this.code,
			}
			this.$store.commit('grupo/setDescricaoGroupoSelected', obj)
			this.$router.push('/Cadastro')
			this.reset()
			this.$store.dispatch('setLoading', false)
		},
	},
}
</script>
<style lang="scss" scoped>
.container {
	&__card {
		right: 70px;

		padding: 1rem;
		color: black;

		&__title {
			margin-bottom: 1rem;
			color: #3498db;
		}
	}
}

.pes {
	position: absolute;
	right: 0%;
}

.btn {
	margin-right: 8px;
}
</style>
