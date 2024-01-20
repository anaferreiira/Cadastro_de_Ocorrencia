import { request } from '../../utils/request'
export default {
	getInserir: (payload) => request.post(`/CadastrarOcorrencia`, payload),
	getExcluir: (id) => request.delete(`/DeleteOcorrencia/${id}`),


}

