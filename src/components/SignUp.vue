<template>
  <div>
    <div class="login">
      <div class="window">
        <h1>Moja Firma</h1>
        <div class="row">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="">Użytkownik</label>
                <input required class="form-control" placeholder="Basia" v-model="model.name">
              </div>
              <div class="form-group">
                <label for="">Hasło</label>
                <input type="password" required class="form-control" placeholder="******" v-model="model.password">
              </div>
              <label for="">Firma: </label>
              <select v-model="selected">
                <option disabled value="">Wybierz kontekst</option>
                <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                  {{company.name}}
                </option>
              </select>
              <div class="form-group">
                <button class="btn" >Zaloguj</button>
                {{ loading }}
                {{ status }}
              </div>
            </form> 
        </div>
      </div>
      </div>
    <!-- <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="">Name:</label>
              <input type="text" required class="form-control" placeholder="eg Chris" v-model="model.name">
            </div>
            <div class="form-group">
              <label for="">Email:</label>
              <input type="email" required class="form-control" placeholder="eg chris@invoiceapp.com" v-model="model.email">
            </div>

            <div class="form-group">
              <label for="">Company Name:</label>
              <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option v-for="company in companies" v-bind:key="company">
                  {{company}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Password:</label>
              <input type="password" required class="form-control" placeholder="Enter Password" v-model="model.password">
            </div>
            <div class="form-group">
              <label for="">Confirm Password:</label>
              <input type="password" required class="form-control" placeholder="Confirm Passowrd" v-model="model.c_password">
            </div>
            <div class="form-group">
              <button class="btn btn-primary" >Register</button>
              {{ loading }}
              {{ status }}
            </div>
          </form>
        </div>
      </div>
  </div> -->
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "SignUp",
  components: {
  },
  mounted:function(){
        this.getCompnyList() //method1 will execute at pageload
  },
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
        c_password: "",
        companyid: ""
      },
      loading: "",
      status: "",
      companies: [],
      selected: "",
    };
  },
  methods: {
    validate() {
      // checks to ensure passwords match
      if( this.model.password != this.model.c_password){
        return false;
      }
      return true;
    },
    register() {
    let valid = this.validate();
    if(valid){
    let form = {
      name: this.model.name,
      email: this.model.email,
      companyId: Number(this.model.companyid),
      password: this.model.password
    };
    this.loading = "Registering you, please wait";
    // Post to server
    axios.post("http://localhost:3128/register", form).then(res => {
      // Post a status message
      this.loading = "";
      if (res.data.status == true) {
        // now send the user to the next route
        this.$router.push({
          name: "invoices",
          params: { user: res.data.user }
        });
      } else {
        this.status = res.data.message;
      }
    });
      }else{
    alert("Passwords do not match");
      }
    },
    login() {
      let form = {
        name: this.model.name,
        password: this.model.password
      };
      this.loading = "Signing in";
      // Post to server
      axios.post("http://localhost:3128/login", form).then(res => {
        // Post a status message
        this.loading = "";
        if (res.data.status == true) {
          // now send the user to the next route
          this.$store.state.user = res.data.user;
          this.$router.push({
            name: "invoices",
            params: { user: res.data.user }
          });
        } else {
          this.status = res.data.message;
        }
      });
    },
    getCompnyList(){
      axios.get("http://localhost:3128/companies").then(res => {
        this.companies = res.data.companies
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login{
  background-color: white;
  height: 100vh;
  width: 100vw;
  padding-top: 5em;
}

.window{
  margin: auto;
  width: 30%;
  height: 30%;
  text-align: center;
  background-color:  rgba(28, 91, 164, .5);
  color: white;
  label{
    font-size: 30px;
    margin: auto;
  }
  input{
    height: 30px;
  }
}
// .login{
//   margin: auto;
//   width: 50%;
//   border: 3px solid green;
//   color: white;
//   text-align: center;
//   .form-group{
//     float: left;
//     width: 100%;
//   }
//   label{
//     font-size: 30px;
//     margin: auto;
//   }
//   input{
//     height: 30px;
//   }
// .btn {
// 	background-color:#ffffff;
// 	border:1px solid #a6a6a6;
// 	display:inline-block;
// 	cursor:pointer;
// 	color:#006275;
// 	font-family:Arial;
// 	font-size:17px;
// 	font-weight:bold;
// 	padding:15px 31px;
// 	text-decoration:none;
// }
// .btn:hover {
// 	background-color:#fc08fc;
// }
// .btn:active {
// 	position:relative;
// 	top:1px;
// }

        
// }
</style>