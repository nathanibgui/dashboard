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

      <h2 v-if="userExists">Bonjour : {{ userExists }}</h2>
    </div>

    <div class="container mt-4">
      <div class="row">

        <div class="col-md-9">
          <!-- Votre formulaire ici -->
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
              <button type="submit">Récupérer les données utilisateur</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="userExists" class="user-info">
      <h2>Informations de l'utilisateur :</h2>
      <p>Email : {{ email }}</p>
      <p>Nom d'utilisateur : {{ username }}</p>
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
      selected: this.$route.params.city || '', // Utilisez le paramètre de l'URL comme valeur initiale
      formData:{
        email:'',
        username:'',
      },
      userExists: false, // Ajout d'une variable pour suivre si l'utilisateur existe
      email: '', // Variable pour stocker l'e-mail de l'utilisateur
      username: '', // Variable pour stocker le nom d'utilisateur de l'utilisateur
      showErrorMessage:false,
      options: ['Paris', 'Nice', 'Barcelone'],
      meteoDonnee: null
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
        // Effectuer une requête POST pour créer un nouvel utilisateur
        const response = await axios.post('http://localhost:4000/api/users', this.formData);
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
          this.email=email;
          this.username=username;
          this.showErrorMessage = false;
        }
        else {
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
    fetchData() {
      const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4dcc2218a9bf517e2c98a9da0ca721cd';

      // Fonction de réussite (resolveCallback) en gros response est un objet ou tout est stocke il faut utiliser
      // un systeme de .data pour recuperer les données

      const resolveCallback = response => {
        // Traite les données de la réponse ici
        console.log(response.data);
      };

      // Fonction d'échec (rejectCallback)
      const rejectCallback = error => {
        console.error('Erreur lors de la requête :', error);
      };

      // Effectuer la requête Axios avec les callbacks de réussite et d'échec
      axios.get(requestUrl).then(resolveCallback, rejectCallback);

    },
    search(ville) {
      // Logique de recherche avec la ville ici (par exemple, appel à une API)
      // Mettez à jour votre composant avec les résultats de la recherche

      // Dans cet exemple, générons une température aléatoire entre 1 et 32
      const randomTemperature = Math.floor(Math.random() * 32) + 1;

      switch (ville) {
        case 'Paris':
          this.meteoDonnee = { temperature: randomTemperature, city: ville }; // Remplacez cela par les données réelles
          break;
        case 'Nice':
          this.meteoDonnee = {temperature: randomTemperature, city: ville }; // Remplacez cela par les données réelles
          break;
        case 'Barcelone':
          this.meteoDonnee = { temperature: randomTemperature, city: ville }; // Remplacez cela par les données réelles
          break;
        default:
          this.meteoDonnee = null;
      }
    }
  },
  watch: {
    '$route.params.city': function(newCity) {
      this.selected = newCity || ''; // Mettez à jour la ville sélectionnée lorsque le paramètre de l'URL change
      this.search(newCity); // Effectuez la recherche avec la nouvelle ville
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



