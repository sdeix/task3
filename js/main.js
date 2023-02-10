let eventBus = new Vue()


Vue.component('board',{
template:`
<div id=board>
<div  class="column column1">
<h2>Запланированные задачи</h2>
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
      <h2>Задачи в работе</h2>
      <card v-for="card in column2" :pointss="card"> </card>

</div>


<div  class="column column3">
<h2>Тестирование</h2>
<card v-for="card in column3" :pointss="card"> </card>

</div>


<div  class="column column4">
<h2>Выполненные задачи</h2>
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

            move : "",
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
                  this.column1.push({createdate:now, move:this.move, title:this.title ? this.title: "Без названия", desc:this.desc ? this.desc:"Без описания", 
                  lastediting:now, deadline:this.deadline, delete:false, column:1, edit:false, comment:""})
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
      }),
      eventBus.$on('OneToTwo', movecard1 => {
            for(let i = 0; i < this.column1.length; i++){
                  if(this.column1[i].move == "two"){
                        this.column1[i].move = ""
                        this.column1[i].column = 2
                        this.column2.push(this.column1[i])
                        this.column1.splice(i, 1)
                        console.log(this.column2)
                        

            }}
      }),
      eventBus.$on('TwoToThree', movecard2 => {
            for(let i = 0; i < this.column2.length; i++){
                  if(this.column2[i].move == "three"){
                        this.column2[i].move = ""
                        this.column2[i].column = 3
                        this.column3.push(this.column2[i])
                        this.column2.splice(i, 1)
                        

            }}
      }),
      eventBus.$on('ThreeToTwo', movecard3 => {
            for(let i = 0; i < this.column3.length; i++){
                  if(this.column3[i].move == "two"){
                        this.column3[i].move = ""
                        this.column3[i].column = 2
                        this.column2.push(this.column3[i])
                        this.column3.splice(i, 1)

                        

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
      <button    @click="pointss.delete=true" v-on:click="Delete()" > Удалить </button>
      <button    @click="pointss.edit=true"> Редактировать </button>

      <div v-if="pointss.edit">
      <p>Название: <input type="text" v-model="newTitle"></p>
      <p>Описание: <input type="text" v-model="newDesc"></p>
      <button    @click="pointss.edit=false"> Отмена </button>
      <button    @click="pointss.edit=false" v-on:click="Edit()"> Подтвердить </button> </div>
      <div v-else >  </div>

      <div v-if="pointss.column==1">
      <button    @click="OneToTwo()"> --></button>
      </div>


      <div v-if="pointss.column==2">
      <button    @click="TwoToThree()"> --></button>
      </div>

      <div v-if="pointss.column==3">
      <button    @click="ThreeToTwo()"> <-- </button>
      <button    @click="ThreeToFour()"> --> </button>
      
      <p>Причина: <input type="text" v-model="newComment"></p>    
      </div>


      <div v-if="pointss.comment">
      <p>Причина: {{pointss.comment}}</p>
      </div>
      `,
      data(){
            return{
                  newTitle:"",
                  newDesc: "",
                  newComment:'',
            }
        },
      methods:{
            Delete(){
                  console.log(this.pointss.edit)
                  eventBus.$emit('deleteCard')
            },
            Edit(){
                  var now = new Date(),
                  now = String(now)
                  this.pointss.lastediting = now,
                  this.pointss.title = this.newTitle,
                  this.pointss.desc = this.newDesc
            },
            OneToTwo(){
                  this.pointss.move = "two",
                  eventBus.$emit('OneToTwo')
            },
            TwoToThree(){
                  this.pointss.move = "three",
                  eventBus.$emit('TwoToThree')

            },
            ThreeToTwo(){
                  this.pointss.comment = this.newComment
                  this.newComment = "",
                  this.pointss.move = "two",
                  eventBus.$emit('ThreeToTwo')

            }
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
