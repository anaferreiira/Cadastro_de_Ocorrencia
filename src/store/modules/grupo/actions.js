import grupo from '@/services/grupo/index.js'
export default {

	async getDescricaoGrupo({ commit }, payload) {
		try {
			const data = await grupo.getDescricaoGrupo(payload)

			commit('setDescricaoGrupo', data.data)
		} catch (e) {
			throw e
		}
	},
}
