let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>
<div class="column1">


</div>
<card></card>
      <form>
      <!--      <div id="upperFormDiv">
          <div>
              <p>Название карточки:</p>
              <input type="text" placeholder="Название" v-model="cardTitle" maxlength="15">
          </div>
          <p>Количество заметок в карточке:</p>
          <input type="number" max="5" min="3" v-model="numberOfOptions">
          
          
          <input type="submit" value="Создать пункты" @click.prevent="makeOptionsArr" maxlength="20">
      </div>
      <input v-for="i in options" :key="i" class="pointInput" type="text" placeholder="пункт">
      <input type="submit" @click.prevent="createCard" value="Создать карточку"> -->
      </form>
<div class="column2">


</div>


<div class="column3">


</div>


<div class="column4">


</div>

<!--
<input type="date" id="start" name="trip-start" v-model="date2"

       min="2018-01-01" max="2018-12-31">
       <button
       v-on:click="But()"
 >кнопка
</button>
-->
</div>


`,
data(){
      return{
            date1:12,
            date2:new Date(),
            q:0,
            column1:[],
            column2:[],
            column3:[],
            column4:[],
      }
  },
methods:{
      But(){
            this.q= this.date1[0]
            this.q+= this.date1[1]
            this.q+= this.date1[2]
            this.q+= this.date1[3]
            console.log(typeof(this.date1))        
            console.log(this.date1)            
            // console.log(this.q)
            // console.log(this.date2.getFullYear())
      }
},


})

Vue.component('card',{
      template:`
      <div id=card>
      <p class="createdate">{{createdate}}</p>
      <p class="cardTitle">{{title}}</p>
      <p class="desc">{{desc}}</p>
      <p class="deadline">{{deadline}}</p>
      <p class="last">{{lastediting}}</p>
      
             
      
      
      </div>
      `,
      data(){
            return{
                  createdate:new Date(),
                  title:"название",
                  desc:"description",
                  deadline:"2012-12-12",
                  lastediting:"last",

            }
        },
      methods:{
      }    
      })





let app = new Vue({
   el: '#app',
   data: {
   },
})
