<template>
<div id="main-box">
            <div id="action-buttons" >
                <a v-on:click="showModify = true" class="button">Wprowadź</a>
                <!-- <button v-on:click="showModify = true" class="button" >Wprowadź</button> -->
                <a v-on:click="showModify = true" class="button">Modyfikuj</a>
                <a v-on:click="deleteInvoices()" class="button">Usuń</a>
                <input/>
                <a href="#" class="button">Szukaj</a>
            </div>
            <div class="data-grid">
                <table>
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Nazwa</th>
                            <th>Jednostka</th>
                            <th>Cena netto</th>
                            <th>Cena brutto</th>
                            <th>Stawka podatku</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" v-bind:key="product.id" v-on:click="activeRow(product.id, $event)">
                                <td>{{product.id}}</td>
                                <td>{{product.name}}</td>
                                <td>{{product.unit}}</td>
                                <td>{{product.netprice}} zł</td>
                                <td>{{product.grossprice}} zł</td>
                                <td>0.{{product.taxRate}}</td>
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
            <!-- <Invoice :invoiceId="active_invoice[0]" v-if="showModify" @close="showModify = false"/> -->
        </div>
</template>
<script>
import axios from "axios";
// import Invoice from '@/components/partials/Invoice.vue';
export default {
  name: 'products',
  components: {
    //   Invoice,
  },
  mounted:function(){
        this.getProducts() //method1 will execute at pageload
  },
  data(){
        return{
            invoiceExist: false,
            products: [],
            active_row: [],
            showModify: false
        }
    },
    methods:{
        getProducts() {
            axios.get(`http://localhost:3128/products`).then(res => {
                this.products = res.data.products
            });
        },
        activeRow( id, event ){
            let row = event.target.parentElement
            if (row.classList.contains("active")){
                row.classList.remove("active");
                this.active_row.splice( this.active_row.indexOf(id), 1 );
            }else{
                row.classList.add("active");
                this.active_row.push(id);
            }
        },
        deleteInvoices() {
            let invoiceId = this.active_invoice.pop()
            if(window.confirm(`Czy na pewno chcesz usunąć fakturę nr ${invoiceId}`)){
                axios.delete(`http://localhost:3128/invoice/${invoiceId}`).then(res => {
                if(res.data.status){
                    window.alert("Faktura usunięta pomyślnie");
                    this.getInvoices()
                }else{
                    window.alert("Nie udało się usunąc wybranej faktury");
                }
            })
            }
        }
    }
}
</script>
<style lang="scss">

#main-box{
    background-color: white;
    flex: 5 0;
    margin: 15px;
    height: calc(100vh - 80px);
    display: flex;
    color: black;
    text-align: left;
    flex-direction: column;
}

.data-grid{
    width: calc(100% - 16px);
    height: 100%;
    padding: 8px;
}

.button {
    background-color: #124273;
    border: none;
    color: white;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
  }

table{
    width: 100%;
    height: 100%;
    border-spacing: 0;
    border: black solid 1px;
}

th, table tbody tr td{
    border-right: black solid 1px;
    height: 30px;
    text-align: center;
}
th:last-child {
    border-right: unset;
}

tr.blank td{
    border-right: black solid 1px;
    height: unset;
}

tbody tr:hover {
    color: white;
    background-color: #124273;
}

tbody .active {
    color: white;
    background-color: #124273;
}

tbody .blank:hover {
    background-color: white;
}

table tbody tr td:last-child {
    border-right: unset;
}


#action-buttons input{
    height: 26px;
    border: 1px solid black;
}

.logout-button {
    width: 60%;
    border: solid 1px black;
    margin: auto auto 15px auto;
    font-size: 20px;
    padding: 12px;
    text-decoration: none;
}

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
    overflow-y: auto;
}

.form table{
  height: 50%;
} 

.fixedHeader {
    position: relative;
}
#action-buttons{
    border-bottom: #454546 1px solid;
    padding: 8px;
    
    *{
      margin-right: 4px;
    }
}
</style>