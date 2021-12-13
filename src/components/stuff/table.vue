<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Nama</th>
          <th class="text-left">Email</th>
        </tr>
      </thead>
      <tbody>
        <!-- looping data di sini -->
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: {
    tableHeader: [],
    tableBody: {},
  },
};
</script>