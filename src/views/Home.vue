<template>
<div id="main-box">
            <div id="action-buttons" >
                <a href="insert-invoice.html" class="button">Wprowadź</a>
                <a href="#" class="button">Modyfikuj</a>
                <a href="#" class="button">Usuń</a>
                <input/>
                <a href="#" class="button">Szukaj</a>
            </div>
            <div class="data-grid">
                <table>
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Numer faktury</th>
                            <th>Kontrahent</th>
                            <th>Data wystawienia</th>
                            <th>Kwota brutto</th>
                            <th>Kwota netto</th>
                            <th>Termin płatności</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                                <td>1</td>
                                <td>F/01/12</td>
                                <td>Innsoft Sp. z o.o.</td>
                                <td>02-01-2019</td>
                                <td>553,50 zł</td>
                                <td>450,00 zł</td>
                                <td>02-01-2019</td>
                        </tr>
                        <tr class="blank">
                                <td></td>
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
        </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  }
}
</script>
<style lang="scss" scoped>

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
    height:80px;
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
      margin-right: 5px;
    }
}
</style>