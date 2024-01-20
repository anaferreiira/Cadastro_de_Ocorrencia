import { get } from "@/utils/vuex"
export default {
  getDescricaoGrupo: state => state.descricaoGrupo,
  getStep: state => state.step,
  getFaixaLoc: state => state.faixaLoc,
  getDescricaoGroupoSelected: state => state.descricaoGroupoSelected

}