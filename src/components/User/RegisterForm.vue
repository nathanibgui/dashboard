<template>
  <div class="parent">
    <div class="wrapper">
      <span class="bg-animat2"></span>
      <div class="form-box register">
        <h2>Sing Up</h2>
        <form action="#">
          <div class="input-box">
            <input type="text" required v-model="user.name" />
            <label>Nom</label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box">
            <input type="text" required v-model="user.surname" />
            <label>Prénom</label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box">
            <input type="email" required v-model="user.email" />
            <label>Email</label>
            <i class="bx bx-envelope"></i>
          </div>
          <div class="input-box">
            <input type="passowrd" required v-model="user.password"/>
            <label>passowrd</label>
            <i class="bx bx-lock-alt"></i>
          </div>
          <button class="btn-lgrg" type="button" @click="createUser()">
            Sign Up
          </button>
          <div class="logreg-link">
            <p>
              Already have an account?
              <RouterLink to="/" class="register-link">Login</RouterLink>
            </p>
          </div>
        </form>
      </div>
      <div class="form-image register">
        <img src="../../assets/time.png" alt="log time manger" />
      </div>
    </div>
  </div>
  <!-- <div class="container">
    <h2 class="text-center">Inscription</h2>
    <form class="mx-auto user-form">
      <div class="form-group">
        <label for="email">Email :</label>
        <input
          type="email"
          class="form-control"
          id="email"
          
          placeholder=" entre votre email "
        />
      </div>
      <div class="form-group">
        <label for="email">Nom :</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          v-model="user.username"
          placeholder=" entre votre nom "
        />
      </div>
      <div class="form-group">
        <button
          class="btn btn-success w-100"
          type="button"
          @click="createUser()"
        >
          Creation
        </button>
      </div>
    </form>
  </div> -->
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        password:"",
      },
    };
  },
  methods: {
    async createUser() {
      try {
        // Effectuer une requête POST pour créer un nouvel utilisateur
        const response = await axios.post("http://localhost:4000/api/inscription", this.user);
        console.log("Utilisateur créé avec succès:", response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Count has been created",
          showConfirmButton: false,
          timer: 2000,
        }).then(function () {
          window.location = "http://localhost:8080/";
        });
        this.user = "";
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#app {
  min-height: 100vh;
  background: linear-gradient(#120023, #3b0052, #120023, #3b0052);
}
.parent {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #120023;
}
.wrapper {
  position: relative;
  width: 750px;
  height: 450px;
  background: transparent;
  border: 2px solid #3b0052;
  box-shadow: 0 0 25px #3b0052;
  overflow: hidden;
}
.wrapper .form-box {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper .form-box.register {
  right: 0;
  padding: 0px 40px 0px 60px;
}
.form-box h2 {
  font-size: 32px;
  color: #fff;
  text-align: center;
}
.form-box .input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 25px 0;
}
.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid #fff;
  color: #fff;
  font-size: 16px;
  padding-right: 25px;
  font-weight: 600;
  transition: 0.5s;
}

.input-box input:focus,
.input-box input:valid {
  color: #0ef;
}
.input-box label {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -5px;
  color: #0ef;
}
.input-box i {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 18px;
  transition: 0.5s;
}
.input-box input:focus ~ i,
.input-box input:valid ~ i {
  color: #0ef;
}
.btn-lgrg {
  position: relative;
  width: 100%;
  height: 45px;
  background: transparent;
  border: 2px solid #3b0052;
  outline: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
  z-index: 1;
}
.btn-lgrg::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 300%;
  background: linear-gradient(#120023, #3b0052, #120023, #3b0052);
  z-index: -1;
  transition: 0.5s;
}
.btn-lgrg:hover:before {
  top: 0;
}

.logreg-link {
  font-size: 14.5px;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px;
}
.logreg-link p a {
  color: #0ef;
  text-decoration: none;
  font-weight: 600;
}

.wrapper .form-image {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper .form-image.register {
  left: 0;
  padding: 0 4px 60px 40px;
}

.bg-animat2 {
  position: absolute;
  top: 100%;
  left: 250px;
  width: 850px;
  height: 700px;
  background: #120023;
  /* transform: rotate(10deg) skewY(40deg); */
  transform: rotate(-11deg) skewY(-41deg);
  transform-origin: bottom left;
  border-top: 3px solid #0ef;
}

@media (max-width: 765px) {
  .wrapper .form-box {
    width: 100%;
  }
  .wrapper .form-image {
    display: none;
  }
}
</style>