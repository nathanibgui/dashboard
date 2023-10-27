<template>
  <!-- Contenu du composant Utilisateur ici -->
  <div class="home-page">

    <div class="navbar">
      <div class="container">
        <router-link to="/" class="nav-link" exact>
          Dashboard
        </router-link>
        <router-link to="/orders" class="nav-link">
          Orders
        </router-link>
        <router-link to="/products" class="nav-link">
          Products
        </router-link>
        <router-link to="/customers" class="nav-link">
          Customers
        </router-link>
      </div>
    </div>

    <div class="container mt-4" v-if="!userExists">
      <div class="row">

        <div class="col-6">
          <h2 class="text-center"> Connexion </h2>
            <form @submit.prevent="submitUser">
                  <div class="user-form">
                    <div class="form-group">
                      <label for="email">Email :</label>
                      <input type="email" id="email" v-model="formData.email" required>
                    </div>
                    <div class="form-group">
                      <label for="username">Nom d'utilisateur :</label>
                      <input type="text" id="username" v-model="formData.username" required>
                    </div>
                    <button  type="submit">Récupérer les données utilisateur</button>
                  </div>
            </form>
        </div>
        <div class="col-6" >
          <h2 class="text-center"> Inscription </h2>
          <form class="  mx-auto user-form">
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" class="form-control" id="email" v-model="user.email" placeholder=" entre votre email "/>
            </div>
            <div class="form-group">
              <label for="email">Nom :</label>
              <input type="text" class="form-control" id="nom" v-model="user.username"  placeholder=" entre votre nom "/>
            </div>
            <div class="form-group ">
              <button class="btn btn-success w-100" type="button" @click="createUser()">Creation</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="userExists" class="user-info">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ userId }}</td>
                <td>{{ username }}</td>
                <td>{{ email }}</td>
                <td class="d-flex  justify-content-center gap-3 ">
                  <RouterLink :to="{path:'/users/'+userId+'/edit'}" class="btn btn-success" >Modifier</RouterLink>
                  <a class="btn btn-info">Je Badge !</a>
                  <button class="btn btn-danger">Supprimer</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
    <div class="user-info" v-if="showErrorMessage">
      <p>L'utilisateur n'existe pas dans la base de données.</p>
    </div>

  </div>
</template>
<script>

import moment from 'moment';
import axios from 'axios';


export default {
  name: 'GestionUtilisateurs',
  data() {
    return {
      formData: {
        email: '',
        username: '',
      },
        user : {
          email: '',
          username: '',
        },
      userId: '',
      userExists: false, // Ajout d'une variable pour suivre si l'utilisateur existe
      email: '', // Variable pour stocker l'e-mail de l'utilisateur
      username: '', // Variable pour stocker le nom d'utilisateur de l'utilisateur
      showErrorMessage: false,
    };
  },
  computed: {
    formattedDate() {
      return moment().locale('fr').format('LL');
    },
  },
  methods: {
    async createUser() {
      try {
       let dataUser= this.user ;
        // Effectuer une requête POST pour créer un nouvel utilisateur
        const response = await axios.post('http://localhost:4000/api/users', {"user":dataUser})
        console.log('Utilisateur créé avec succès:', response.data);
        // Mettez en œuvre la logique nécessaire après la création de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      }
    },
    async updateUser() {
      try {
        // Effectuer une requête PUT pour mettre à jour l'utilisateur existant
        const response = await axios.put(`http://localhost:4000/api/users/1`, this.formData);
        console.log('Utilisateur mis à jour avec succès:', response.data);
        // Mettez en œuvre la logique nécessaire après la mise à jour de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      }
    },
    async getUser() {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(`http://localhost:4000/api/users/1`);
        console.log('Détails de l\'utilisateur récupérés avec succès:', response.data);
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      }
    },
    async supprimerUser() {
      try {
        // Effectuer une requête DELETE pour supprimer l'utilisateur
        const response = await axios.delete(`http://localhost:4000/api/users/1`);
        console.log('Utilisateur supprimé avec succès:', response.data);
        // Mettez en œuvre la logique nécessaire après la suppression de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      }
    },
    async submitUser() {
      const email = this.formData.email;
      const username = this.formData.username;
      try {
        // Effectuez une requête à l'API pour vérifier si l'utilisateur existe
        const response = await axios.get(`http://localhost:4000/api/users?email=${email}&username=${username}`);

        if (response.data) {
          this.userExists = true;
          this.email = email;
          this.username = username;
          this.showErrorMessage = false;
          // Récupérer l'ID de l'utilisateur
          this.userId = response.data.id;
        } else {
          this.userExists = false;
          this.showErrorMessage = true;
          // L'utilisateur n'existe pas dans la base de données
          console.log(response.data);
        }
      } catch (error) {
        this.userExists = false;
        this.showErrorMessage = true;
      }
    },
  }
};
</script>

<style scoped>
/* Styles pour la page d'accueil */

/* Style pour la barre de navigation */
.navbar {
  background-color: beige;
  padding: 15px 0; /* Ajoutez un espace autour du texte dans la navbar */
  width: 100%; /* Faites en sorte que la navbar occupe toute la largeur de son conteneur */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Ajoute une légère ombre */
}

/* Style pour les liens dans la navbar */
.navbar a {
  margin: 0 20px; /* Ajoute un espace entre chaque lien */
  color: black; /* Couleur du texte des liens */
  text-decoration: none; /* Supprime la soulignement des liens */
  font-weight: bold; /* Mettez en gras le texte des liens */
  font-size: 1.2rem; /* Taille de la police des liens */
}





/* Changez la couleur du texte des liens au survol */
.navbar a:hover {
  color: darkred; /* Couleur du texte des liens au survol */
}

/* Style pour la barre latérale */
.sidebar {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  width: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}



/* Vos autres styles restants... */

/* Style pour le formulaire utilisateur */
.user-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-form .form-group {
  margin-bottom: 15px;
}

.user-form .form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-form .form-group input[type="email"],
.user-form .form-group input[type="text"] {
  width: calc(100% - 20px);
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.user-form button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-form button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>



