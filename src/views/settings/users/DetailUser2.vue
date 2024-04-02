<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-card elevation="2">
                        <v-container>
                            <v-row class="text-center ma-auto mt-5 justify-center">
                                <v-col cols="12">
                                    <v-img height="200px" width="200px" class="rounded-circle mx-auto"
                                        src="@/assets/anya.jpg"></v-img>
                                </v-col>
                            </v-row>
                            <v-row class="mx-7">
                                <v-col>
                                    <table width="100%" class="table">
                                        <tr>
                                            <td width="20%"><h5>Nama</h5></td>
                                            <td width="1%"><h5>:</h5></td>
                                            <td><h5></h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>Email</h5></td>
                                            <td><h5>:</h5></td>
                                            <td><h5></h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>Role</h5></td>
                                            <td><h5>:</h5></td>
                                            <td><h5></h5></td>
                                        </tr>
                                    </table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card elevation="2">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-btn text>Edit Profile</v-btn>
                                    <v-btn class="float-right" text>Ubah Password</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>