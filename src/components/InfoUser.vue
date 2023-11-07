
<template>
  <div class="container">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Informations de l'utilisateur </h2>
          </div>
          <div class="card-body">
            <table class="table table-bordered mt-3 text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom d'utilisateur </th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ userId }}</td>
                  <td>{{ formData.username }}</td>
                  <td>{{ formData.email }}</td>
                  <td class="d-flex  justify-content-center gap-3 ">
                    <button @click="createClock(userId)" class="btn btn-success">Je Badge !</button>
                    <button class="btn btn-secondary" type="button"
                      @click="showWorkingTimes = true; getWorkingTimes(this.userId)"> Mes Working Times</button>

                    <button type="button" @click="showModel" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop">Modifier</button>
                    <button @click="supprimerUser(this.userId)" class="btn btn-danger">Supprimer</button>

                  </td>
                  <div class="form-group">
                    <label for="dashStart">Début :</label>
                    <input type="dashStart" class="form-control" id="dashStart" v-model="dashStart"
                      placeholder=" entre la date de début " />
                    <label for="dashEnd">Fin :</label>
                    <input type="dashEnd" class="form-control" id="dashEnd" v-model="dashEnd"
                      placeholder=" entre la date de fin " />
                    <button class="btn btn-secondary" type="button"
                      @click="showDashboard(this.userId, dashStart, dashEnd)">Graphique de mes heures</button>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import 'moment-timezone';
export default {
    name:"InfoUser",
    props: {
      formData:Object,
      userId:Number,
    },
    methods:{
      async createClock(user_id) {
      try {
        const currentDate = moment().tz('Europe/Paris');
        const data = {
          time: currentDate,
        }
        console.log(data);
        const response = await axios.post(`http://localhost:4000/api/clocks/${user_id}`, { clock: data });
        console.log('Clock créée avec succès:', response.data);
        if(response.data.status) {
          localStorage.setItem("start",JSON.stringify(response.data.time))
        }else if(!response.data.status) {
          console.log(this.date_starte)
        // const today = moment().format('YYYY-MM-DD H:mm');
        this.workingTimeData.start =  JSON.parse(localStorage.getItem('start'))
        this.workingTimeData.user_id = user_id
        this.workingTimeData.end = response.data.time
        console.log(this.workingTimeData)
        axios.post(`http://localhost:4000/api/working_times/${user_id}`, { working_time: this.workingTimeData })
          .then(response => {
            console.log('Working time créé avec succès:', response.data);
            localStorage.clear()
          }).catch(error => {
            console.error('Erreur lors de la création du working time :', error);
          });
        }

      } catch (error) {
        console.error('Erreur lors de la création de la clock :', error);
      }
    }
    }
}
</script>

<style>

</style>