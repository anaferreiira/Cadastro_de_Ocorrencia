<template>
  <div class="container">
    <v-card class="container__card">
      <div class="container__card__box">
        <v-card-title class="container__card__box__title">
          Cadastro de Grupo de Ocorrência
        </v-card-title>
        <div class="container__card__box__button">
          <v-btn @click="goTopesquisa" class="btn1" rounded outlined color="#0672b9">Pesquisar</v-btn>
        </div>
      </div>
      <v-row class="2">
        <v-col cols="4">
          <v-text-field label="Nome Grupo" outlined v-model="nameGroup"></v-text-field>

        </v-col>
        <v-col cols="4">
          <v-text-field label="Código" outlined v-model="code" readonly></v-text-field>

        </v-col>
        <v-col cols="4">
          <v-text-field label="Status" outlined v-model="status" readonly>
          </v-text-field>

        </v-col>
      </v-row>
      <br />
      <v-btn @click="impress" class="btna" rounded color="#349BFF">Gravar</v-btn>
      <v-btn @click="cdelete" class="btn" rounded outlined color="#0672b9">Excluir</v-btn>
      <v-btn @click="clean" class="btn" rounded outlined color="#0672b9">Limpar</v-btn>
      <v-btn @click="goToHome" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      itemInLine: {},
      nameGroup: '',
      code: '',
      status: '',
      stepActive: true,
      clear: false,
      teste: null,
    }
  },


  mounted() {
    // this.nameGroup = ''
    // this.code = ''
    if (this.getDescricaoGroupoSelected) {
      this.nameGroup = this.getDescricaoGroupoSelected.desc_status_tracking_longa.desc_status_tracking
      this.code = this.getDescricaoGroupoSelected.desc_status_tracking_longa.tab_status_tracking_id
      this.status = 'Ativo',
        this.$store.commit('grupo/setFaixaLoc', this.code)
      this.code = data.data.taB_STATUS_TRACKING_ID
    }

  },

  computed: {
    ...mapGetters({
      getInserir: 'usuario/getInserir',
      getStep: 'pesquisa/getStep',
      getDescricaoGrupo: 'grupo/getDescricaoGrupo',
      snackbarMessage: 'snackbarMessage',
      loading: 'loading',
      usarioInsert: 'usuario/usarioInsert',
      getUsuario: 'usuario/getUsuario',
      getDescricaoGroupoSelected: 'grupo/getDescricaoGroupoSelected',
      getUserStep: 'usuario/getUserStep',
      getUserState: 'usuario/getUserState',
    }),
    filteredItems() {
      return this.getDescricaoGrupo.filter(item =>
        item.toLowerCase().includes(this.nameGroup.toLowerCase())
      )
    },
    filteredItems() {
      return this.getDescricaoGrupo.filter(item =>
        item.toLowerCase().includes(this.code.toLowerCase())
      )
    },
  },
  methods: {
    ...mapActions({
      excluir: 'usuario/getExcluir',
      inserir: 'usuario/inserir',
      idUsuarioId: 'usuario/idUsuarioId',
    }),
    querynameGroup(val) {
      this.$store.dispatch('usuario/idUsuarioId', val)
    },
    queryCode(val) {
      this.$store.dispatch('usuario/idUsuarioId', val)
    },


    goToHome() {
      this.$router.push('/')
    },
    goTopesquisa() {
      this.$router.push('/pesquisa')
    },

    async impress() {
      this.$store.dispatch('setLoading', true)
      try {
        if (this.nameGroup === '') {
          this.$store.dispatch('setSnackbar', {
            status: true,
            message: 'Preencha Descrição.',
          })
          this.$store.dispatch('setLoading', true)
        } else {
          const obj = {
            taB_STATUS_TRACKING_ID: this.code,
            ordem_status: 0,
            desc_status_tracking: this.nameGroup,
            empresa_Id: 0,
            msg_Ret: '',
            usuario_incl: 0
          }
          const arr = [this.nameGroup]
          await this.$store.dispatch('usuario/getInserir', obj)
          this.$store.dispatch('setSnackbar', {
            status: true,
            message: 'Grupo de Ocorrência Alterado com Sucesso.',
          })
          this.$store.commit('usuario/setusuarioInsert', arr)
          this.reset()
          this.$store.dispatch('setLoading', false)
        }
      } catch (e) {
        this.$store.dispatch('setLoading', false)
      }
    },
    async cdelete() {
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
      await this.$store.dispatch('usuario/getExcluir', this.code)
    },
    clean() {
      this.nameGroup = null
      this.code = null
      this.status = null
    },
    goToHome() {
      this.$router.push('/')
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

    &__box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__title {
        margin-bottom: 1rem;
        color: #3498db;
      }

      &__button {
        width: 400px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

.btn {
  margin-right: 8px;
}

.btn1 {
  margin-left: 70%;
}

.btna {
  margin-right: 8px;
  color: #ffffff !important;
}
</style>
