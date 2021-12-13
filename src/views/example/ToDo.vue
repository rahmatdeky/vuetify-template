<template>
  <v-card>
    <v-card-title><h1>Simple TodoList App</h1></v-card-title>
    <v-card-text>
      <v-form class="form">
        <v-text-field label="Nama Tugas" v-model="nama" required></v-text-field>

        <v-text-field label="Deskripsi" v-model="desk" required></v-text-field>

        <v-btn @click="addTodo" color="info"> Kirim </v-btn>
        <v-btn @click="clear">Bersihkan</v-btn>
      </v-form>

      <v-data-table
        :headers="headers"
        :items="todos"
        hide-actions
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <!-- <td class="text-xs-left">{{ item.nama }}</td>
          <td class="text-xs-left">{{ item.desk }}</td> -->
          <td class="text-xs-left">
            <v-btn icon @click="removeTodo(item)">
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "Nama Tugas", value: "nama" },
      { text: "Deskripsi", value: "desk" },
      { text: "Hapus", value: "actions" },
    ],
    nama: "",
    desk: "",
    todos: [],
  }),
  methods: {
    addTodo() {
      if (this.nama.trim() === "" && this.desk.trim() === "") {
        alert("Data tidak boleh kosong!");
      } else {
        this.todos.push({
          nama: this.nama,
          desk: this.desk,
        });
        this.nama = "";
        this.desk = "";
      }
    },
    removeTodo(id) {
      this.todos.splice(id, 1);
    },
    clear() {
      this.nama = "";
      this.desk = "";
    },
  },
};
</script>

<style scoped>
#app {
  margin-top: 30px;
}
.form {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>