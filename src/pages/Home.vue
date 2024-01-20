<template>
  <div class="container">
    <v-card class="container__card">
      <v-card-title class="container__card__title">
        Cadastro de Grupo de Ocorrência
        <v-btn @click="goTopesquisa" class="pes btn" rounded outlined color="#0672b9">Pesquisar</v-btn>
      </v-card-title>
      <v-card-subtitle class="container__card__subtitle">
        <font color="black"><b>Informe os dados abaixo para realizar o cadastro</b></font>
      </v-card-subtitle>
      <v-col cols="6">
        <v-text-field label="Grupo de Ocorrência" outlined v-model="nameGroup"></v-text-field>
      </v-col>
      <v-btn @click="impress" class="btna" rounded color="#349BFF">Gravar</v-btn>
      <v-btn @click="cdelete" class="btn" rounded outlined color="#0672b9">Excluir</v-btn>
      <v-btn @click="clean" class="btn" rounded outlined color="#0672b9">Limpar</v-btn>
      <v-btn @click="back" class="btn" rounded outlined color="#0672b9">Voltar</v-btn>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      itens: [],
      nameGroup: null,
      clear: false,
    }
  },
  mounted() {
    this.$store.dispatch('grupo/getDescricaoGrupo'),
      this.$store.dispatch('usuario/getInserir')
  },
  computed: {
    ...mapGetters({
      getDescricaoGrupo: 'grupo/descricaoGrupo',
      snackbarMessage: 'snackbarMessage',
      loading: 'loading',
      getInserir: 'usuario/getInserir',
      usuario: "usuario/getUsuario"
    }),

  },
  methods: {
    usuarioDados() {
      this.dispatch('usuario/getInserir')
    },

    ...mapActions({
      excluir: 'bem/excluir',
      inserir: 'bem/inserir',
    }),

    async impress() {
      this.$store.commit('usuario/setUserStep', false)
      this.$store.dispatch('setLoading', true)
      try {
        if (
          this.nameGroup == null
        ) {
          this.$store.dispatch('setSnackbar', {
            status: true,
            message: 'Informe a descrição do Grupo.',
          })
          this.$store.dispatch('setLoading', true)
        } else {
          const obj = {

            desc_status_tracking: this.nameGroup,

          }
          const arr = [
            this.nameGroup,
          ]
          await this.$store.dispatch('usuario/getInserir', obj)
          this.$store.commit('grupo/setDescricaoGroupoSelected', { desc_status_tracking_longa: this.getInserir, })
          this.$store.commit('usuario/setUsuarioInsert', arr)
          this.$router.push('/Cadastro')
          this.reset()
          this.$store.dispatch('setLoading', false)
        }
      } catch (e) {
        this.$store.dispatch('setLoading', false)
      }
    },

    async cdelete() {
      await this.$store.dispatch('usuario/getExcluir', this.code)
    },
    goTopesquisa() {
      this.$router.push('/pesquisa')
    },
    clean() {
      this.nameGroup = null
    },
    back() {
      window.location.reload();
    },
  },
};
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
  right: 1%;
}

.btn {
  margin-right: 8px;
}

.btna {
  margin-right: 8px;
  color: #ffffff !important;
}
</style>
