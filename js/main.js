let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>
<div  class="column column1">

      <form>
           <div id="upperFormDiv">
          <div>
              <p>Название карточки:</p>
              <input type="text" placeholder="Название" v-model="title" maxlength="15">
          </div>
          <div>
          <p>Описание задачи:</p>
          <input type="text" placeholder="Описание" v-model="desc" maxlength="60">
          </div>
          <div>
          <input type="date" id="start" name="trip-start" v-model="deadlin"

          min="2023-01-01" max="2030-12-31">
          </div>
          
      </div>
      <p>Время дедлайна</p>
      <input type="submit" @click.prevent="createCard" value="Создать карточку"> 
      </form>
      
      <card v-for="card in column1" :pointss="card"> </card>
      </div>
      <div  class="column column2">
      <card v-for="card in column2" :pointss="card"> </card>

</div>


<div  class="column column3">
<card v-for="card in column3" :pointss="card"> </card>

</div>


<div  class="column column4">
<card v-for="card in column4" :pointss="card"> </card>

</div>





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
            points:[],
            year:"",
            month:"",
            day:"",

            title:"",
            desc: "",
            deadline: [],
            deadlin:2,
            lastediting: null,
      }
  },
methods:{
      createCard(){
            if(typeof(this.deadlin) != "number"){
                  this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                  this.month = this.deadlin[5] + this.deadlin[6]
                  this.day= this.deadlin[8] + this.deadlin[9]
                  
                  this.points.splice(0,this.points.length)
                  this.deadline.push({day:this.day, month:this.month, year:this.year})
                  var now = new Date()
                  now = String(now)
                  this.column1.push({createdate:now, title:this.title ? this.title: "Без названия", desc:this.desc ? this.desc:"Без описания", lastediting:now, deadline:this.deadline, delete:false})
                  this.deadline=[]
            }
            
      }
},
mounted(){
      eventBus.$on('deleteCard', cardsCheck => {
            for(let i = 0; i < this.column1.length; i++){
                  if(this.column1[i].delete){
                        this.column1.splice(i, 1)

            }}
      })
},
watch:{
      column1(){



      }}

})

Vue.component('card',{
      template:`
      <div class=card>
      <p class="createdate">Дата создания: {{pointss.createdate}}</p>
      <p class="cardTitle">Название: {{pointss.title}}</p>
      <p class="desc">Описание: {{pointss.desc}}</p>
      <p class="deadline">Дэдлайн: {{pointss.deadline[0].day}}-{{pointss.deadline[0].month}}-{{pointss.deadline[0].year}}</p>
      <p class="last" v-if="pointss.lastediting" >Время последнего редактирования: {{pointss.lastediting}} </p>
      <button  v-on:click="Delete()"    > Удалить </button>
      
             
      
      
      </div>
      `,
      data(){
            return{

            }
        },
      methods:{
            Delete(){
                  this.pointss.delete = true
                  eventBus.$emit('deleteCard')
            },
      },    
      props:{
            pointss: null,

      }



})





let app = new Vue({
   el: '#app',
   data: {
   },
})
