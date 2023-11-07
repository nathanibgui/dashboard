<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2 class="text-center">Informations de l'utilisateur</h2>
      </div>
      <div class="card-body">
        <table class="table table-bordered mt-3 text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td class="d-flex justify-content-center gap-3">
                <button @click="createClock(user.id)" class="btn btn-success">
                  Je Badge !
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  @click="
                    showWorkingTimes = true;
                    getWorkingTimes(this.id);
                  "
                >
                  Mes Working Times
                </button>

                <button
                  type="button"
                  @click="showModel"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Modifier
                </button>
                <button @click="supprimerUser(this.id)" class="btn btn-danger">
                  Supprimer
                </button>
              </td>
              <div class="form-group">
                <label for="dashStart">Début :</label>
                <input
                  type="dashStart"
                  class="form-control"
                  id="dashStart"
                  v-model="dashStart"
                  placeholder=" entre la date de début "
                />
                <label for="dashEnd">Fin :</label>
                <input
                  type="dashEnd"
                  class="form-control"
                  id="dashEnd"
                  v-model="dashEnd"
                  placeholder=" entre la date de fin "
                />
                <button
                  class="btn btn-secondary"
                  type="button"
                  @click="showDashboard(user.id, dashStart, dashEnd)"
                >
                  Graphique de mes heures
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="logoutUser()"
                >
                  Deconnexion
                </button>
              </div>
              <!-- <div class="form-group">
                  <label for="dashStart">Début :</label>
                  <input type="dashStart" class="form-control" id="dashStart" v-model="dashStart" placeholder=" entre la date de début "/>
                  <label for="dashEnd">Fin :</label>
                  <input type="dashEnd" class="form-control" id="dashEnd" v-model="dashEnd" placeholder=" entre la date de fin "/>
                  <button class="btn btn-secondary" type="button" @click="showDashboard(this.userId, dashStart, dashEnd)">Graphique de mes heures</button>
                </div> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="chartExist">
      <myChart :chartInput="this.chartData" :key="componentKey"/>
    </div>
    <div v-if="showWorkingTimes" class="container">
      <div class="card">
        <div class="card-header">
          <h2 class="text-center">Vos working times</h2>
        </div>
        <div class="card-body">
          <table class="table table-bordered mt-3 text-center">
            <thead>
              <tr>
                <th>Début</th>
                <th>Fin</th>
                <th>Durée de travail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(working, index) in allWorkingTimes" :key="index">
                <td>{{ formatWorkingTime(working.start) }}</td>
                <td>{{ formatWorkingTime(working.end) }}</td>
                <td>
                  {{ calculateWorkingDuration(working.start, working.end) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import myChart from "../Charts/Charts.vue";

export default {
  name: "infoUser",
  data() {
    return {
      id: null,
      user: {
        name: "",
        email: "",
        surname: "",
      },
      workingTimeData: {
        start: "",
        end: "",
        user_id: "",
      },
      allWorkingTimes: {},
      showWorkingTimes: false,
      chartData: {},
      chartExist: false,
      componentKey: 0,
    };
  },
  components: {
    myChart,
  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    // this.getUser( this.id);
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(
          `http://localhost:4000/api/users/${this.id}`
        );
        console.log(
          "Détails de l'utilisateur récupérés avec succès:",
          response.data
        );
        this.user = response.data;
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      }
    },
    async logoutUser() {
      const token = JSON.parse(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete("http://localhost:4000/api/auth", {
        headers,
      });
      localStorage.clear();
      this.$router.push({ name: "home" });
    },
    async createClock(user_id) {
      try {
        const currentDate = moment().tz("Europe/Paris");
        const data = {
          time: currentDate,
        };
        console.log(data);
        const response = await axios.post(
          `http://localhost:4000/api/clocks/${user_id}`,
          { clock: data }
        );
        console.log("Clock créée avec succès:", response.data);
        if (response.data.status) {
          localStorage.setItem("start", JSON.stringify(response.data.time));
        } else if (!response.data.status) {
          console.log(this.date_starte);
          // const today = moment().format('YYYY-MM-DD H:mm');
          this.workingTimeData.start = JSON.parse(
            localStorage.getItem("start")
          );
          this.workingTimeData.user_id = user_id;
          this.workingTimeData.end = response.data.time;
          console.log(this.workingTimeData);
          axios
            .post(`http://localhost:4000/api/working_times/${user_id}`, {
              working_time: this.workingTimeData,
            })
            .then((response) => {
              console.log("Working time créé avec succès:", response.data);
              localStorage.clear();
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la création du working time :",
                error
              );
            });
        }
      } catch (error) {
        console.error("Erreur lors de la création de la clock :", error);
      }
    },
    async getWorkingTimes(id) {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(
          `http://localhost:4000/api/working_timesAll/${id}`
        );
        this.allWorkingTimes = response.data;
        console.log(this.allWorkingTimes);
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des temps de travail :",
          error
        );
      }
    },

    calculateWorkingDuration(start, end, retHours = false) {
      const startTime = moment(start);
      const endTime = moment(end);
      const duration = moment.duration(endTime.diff(startTime));
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      if (retHours) {
        return hours + minutes / 60;
      }
      return { hours: hours, minutes: minutes };
    },
    formatWorkingTime(date) {
      return moment(date).subtract(1, "hour").format("YYYY-MM-DD HH:mm:SS");
    },
    async showDashboard(user_id, startDate, endDate) {
      const start = moment(startDate).format("YYYY-MM-DD HH:mm:SS");
      const end = moment(endDate).format("YYYY-MM-DD HH:mm:SS");
      // const response =
      await axios
        .get(
          `http://localhost:4000/api/working_times/${user_id}?start=${start}&end=${end}`
        )
        .then((response) => {
          const workByDay = {};
          const workingTimes = response.data;

          for (const workingTime of workingTimes) {
            const start = new Date(workingTime.start);
            const end = new Date(workingTime.end);
            const day = start.toDateString();
            const timeDiff = end - start;
            workByDay[day] = (workByDay[day] || 0) + timeDiff;
          }

          const labels = Object.keys(workByDay);
          const data = labels.map((day) => workByDay[day]);

          this.chartData = {
            chartTitle: "Your working time",
            chartLabels: labels,
            chartValues: data,
          };
          this.chartExist = true;
        })
        .catch((error) => {
          console.log(error);
        });
      this.componentKey += 1;
    },
  },
};
</script>

<style>
/* Your CSS styles here */
</style>
