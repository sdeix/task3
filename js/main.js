let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>
<div class="column" class="column1">

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
      </div>
      <card v-for="(card, index) in column1" :createdate="card.createdate" :title="card.title" 
      :desc="card.desc" :deadlineYear="card.deadline[index].year" :deadlineMonth="card.deadline[index].month" :deadlineDay="card.deadline[index].day" :lastediting="card.lastediting">  </card>
<div class="column" class="column2">


</div>


<div class="column" class="column3">


</div>


<div class="column" class="column4">


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
      But(){
            this.q= this.date1[0]
            this.q+= this.date1[1]
            this.q+= this.date1[2]
            this.q+= this.date1[3]
            console.log(typeof(this.date1))        
            console.log(this.date1)            
            // console.log(this.q)
            // console.log(this.date2.getFullYear())
      },
      createCard(){
            if(typeof(this.deadlin) != "number"){
                  this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                  this.month = this.deadlin[5] + this.deadlin[6]
                  this.day= this.deadlin[8] + this.deadlin[9]
                  
                  this.points.splice(0,this.points.length)
                  this.deadline.push({day:this.day, month:this.month, year:this.year})
                  var now = new Date()
                  now = String(now)
                  this.column1.push({createdate:now, title:this.title ? this.title: "Без названия", desc:this.desc ? this.desc:"Без описания", lastediting:now, deadline:this.deadline })
                  console.log(this.column1)
            }
            
      }
},


})

Vue.component('card',{
      template:`
      <div class=card>
      <p class="createdate">Дата создания: {{createdate}}</p>
      <p class="cardTitle">Название: {{title}}</p>
      <p class="desc">Описание: {{desc}}</p>
      <p class="deadline">Дэдлайн: {{deadlineDay}}-{{deadlineMonth}}-{{deadlineYear}}</p>
      <p class="last" v-if="lastediting" >Время последнего редактирования: {{lastediting}}</p>
      
             
      
      
      </div>
      `,
      data(){
            return{


            }
        },
      methods:{
      },
      props:{
            createdate:Date(),
            title: String,
            desc:String,
            deadlineYear:String,
            deadlineMonth:String,
            deadlineDay:String,

            lastediting:String,

      }



})





let app = new Vue({
   el: '#app',
   data: {
   },
})
