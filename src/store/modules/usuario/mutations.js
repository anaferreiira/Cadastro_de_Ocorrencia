import { set } from '@/utils/vuex'
export default {
	setInserir(state, data) { state.inserir = data },
	setExcluir(state, data) { state.excluir = data },
	setUsuarioId(state, data) { state.idUsuarioId = data },
	setUsuarioInsert(state, data) { state.usarioInsert = data },
	setUsuario(state, data) { state.usuario = data },
	setUserStep(state, data) { state.userStep = data },
	setUserState(state, data) { state.userState = data },
	setListInLine(state, data) { state.listInLine = data },
	setData(state, data) { state.data = data }

}
