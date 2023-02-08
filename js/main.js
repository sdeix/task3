let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>

<card></card>
<input type="date" id="start" name="trip-start" v-model="date1"

       min="2018-01-01" max="2018-12-31">
<input type="date" id="start" name="trip-start" v-model="date2"

       min="2018-01-01" max="2018-12-31">
       <button
       v-on:click="But()"
 >кнопка
</button>

</div>


`,
data(){
      return{
            date1:new Date(),
            date2:new Date(),
      }
  },
methods:{
      But(){
            if (this.date1>this.date2){
                  console("Qw")
            }
            
      }
}    
})

Vue.component('card',{
      template:`
      <div id=card>
            <p></p>
      
      
      </div>
      `,
      data(){
            return{
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
