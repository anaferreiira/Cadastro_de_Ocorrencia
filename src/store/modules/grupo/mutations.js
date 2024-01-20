import { set } from "@/utils/vuex"
export default {
    setDescricaoGrupo(state, data) { state.descricaoGrupo = data },
    setStep(state, data) { state.step = data },
    setFaixaLoc(state, data) { state.faixaLoc = data },
    setDescricaoGroupoSelected(state, data) { state.descricaoGroupoSelected = data }

}