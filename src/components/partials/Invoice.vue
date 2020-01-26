<template>
  <div class="form">
        Wprowadzanie faktury
        <div class="form-content">
            <div class="label">Numer faktury<input v-model="invoice.invoiceNo" placeholder="F/0120/01"></div>
            <div class="label">Kontrahent
                <select v-model="invoice.buyer">
                    <option disabled value="">Wybierz kontrahenta</option>
                    <option v-for="company in companies" v-bind:key="company.id" v-bind:value="company.id">
                    {{company.name}}
                    </option>
                </select>
            </div>
            <div class="label">
                Data wystawienia
                <input v-model="invoice.invoiceDate" placeholder="2020-01-01">
            </div>
            <br>
            <div id="action-buttons" >
                    <a href="#" class="button">Dodaj pozycje</a>
                    <a href="#" class="button">Modyfikuj</a>
                    <a href="#" class="button">Usuń</a>
            </div>
            <div class="data-grid">
                    <table>
                        <thead class="fixedHeader">
                            <tr>
                                <th>Lp</th>
                                <th>Nazwa produktu</th>
                                <th>Cenna netto</th>
                                <th>Ilość</th>
                                <th>Wartość podatku</th>
                                <th>Wartość brutto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='position in invoicePositions' v-bind:key="position">
                                    <td>1</td>
                                    <td>{{position.name}}</td>
                                    <td>{{position.netprice}}</td>
                                    <td>{{position.amount}}</td>
                                    <td>{{position.taxAmount}} zł</td>
                                    <td>{{position.grossPrice}} zł</td>
                            </tr>
                            <tr class="blank">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="modal-default-button" @click="$emit('close')">
                    OK
                </button>
                <button v-on:click="createInvoice" class="modal-default-button">
                    Wprowadz
                </button>
            </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Invoice",
    props:['invoiceId'],
    data() {
        return {
            companies: [],
            invoice: {
                invoiceNo:"test",
                seller:this.$store.state.user.companyId,
                buyer:null,
                user_id:this.$store.state.user.id,
                netPrice:100.00,
                grossPrice:123.00,
                taxAmount:23.00,
                invoiceDate:"2020-01-03"
            },
            invoicePositions:[]
        }
    },
    mounted:function(){
        this.getCompnyList()
        if (this.invoiceId){
            axios.get(`http://localhost:3128/invoice/${this.invoiceId}`).then(res => {
                this.invoice = res.data.invoice
            });
            
            axios.get(`http://localhost:3128/invoicePositions/${this.invoiceId}`).then(res => {
                this.invoicePositions = res.data.invoicePositions
            });
        }else{
            window.alert('Nowa faktura');
        }

    },
    methods:{
        getCompnyList(){
            axios.get("http://localhost:3128/companies").then(res => {
                this.companies = res.data.companies
            });
        },
        createInvoice(){
            axios.post("http://localhost:3128/invoice", this.invoice).then(res => {
                if (res.data.status == true) {
                    window.alert("Faktura utworzona pomyślnie");
                } else {
                    window.alert(res.data.message);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.form{
    height: 50vh;
    width: 50vw;
    background-color: white;
    position: absolute;
    top: 25vh;
    left: 25vh;
    border: black solid 1px;
    padding: 8px;
    font-size: 20px;
}

.form-content{
    padding: 10px;
    font-size: 15px;
    height: 100%;
}
.data-grid{
    height: 50%
}
</style>