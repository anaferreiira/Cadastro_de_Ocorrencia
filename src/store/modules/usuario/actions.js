import usuario from '@/services/usuario/index.js'
export default {

	async getInserir({ commit, dispatch }, payload) {

		try {
			const { data } = await usuario.getInserir(payload)
			commit('setInserir', data)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Grupo de Ocorrência Gravado com Sucesso.',
				},
				{ root: true }
			)
		} catch (e) {
			throw e
		}
	},


	async getExcluir({ commit, dispatch }, id) {

		try {
			await usuario.getExcluir(id)
			commit('setExcluir', id)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Exclusão efetuada com sucesso.',
				},
				{ root: true }
			)
		} catch (e) {
			dispatch(
				'setSnackbar',
				{
					status: true,
					message:
						'Informe uma Localidade.',
				},
				{ root: true }
			)
			throw e
		}
	},
}
