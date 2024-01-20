import { request } from "@/utils/request"
export default {
        getAllPesquisa: (payload) => request.get(`Pesquisa`),
        getAllPesquisaCod: (id) => request.get(`PesquisaCod?id=${id}`),




}


