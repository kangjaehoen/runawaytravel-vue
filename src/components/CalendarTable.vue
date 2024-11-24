<template>
    <div class="sellerContainer">
    <div class="sellerController">
    <button @click="lastmonth">이전 달</button>
    <p>{{ year }} 년 {{ month +1 }} 월</p>
    <button @click="nextmonth">다음 달</button>
    </div>
    <br>
    <div style="display: flex">
    <table class="calendar">
        <thead>
            <tr>
                <td v-for="day in dayofweek">{{ day }}</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="week in 6">
                <td v-for="day in 7">
                    <CalendarDate :date="calcdate(day,week)" :thismonth="month.valueOf()" :data="dayplans(calcdate(day,week).toLocaleDateString('en-CA'))" @thisres="showthisRes"></CalendarDate>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
        <CalendarOneDetail v-if="oneres" :oneres="oneres" :isshow="showmethedetail" @close="closedetail"></CalendarOneDetail>
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import CalendarDate from './CalendarDate.vue';
import axios from 'axios';
import CalendarOneDetail from './CalendarOneDetail.vue';
    const dayofweek = ['월','화','수','목','금','토','일'];
    const now = new Date();
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth());
    const reslist = reactive([]);
    const resdaylist = reactive([]);
    
    const calendarstart = computed(()=>{
        const firstday = new Date(year.value,month.value,1);
        return new Date(firstday.setDate(1-firstday.getDay()));
    });
    const calendarstarttext = computed(()=>{
        return calendarstart.value.toLocaleDateString("en-CA");
    });
    const calendarend = computed(()=>{
        return new Date(calendarstart.value.getFullYear(),calendarstart.value.getMonth(),calendarstart.value.getDate()+41,23,59,59);
    });
    const calendarendtext = computed(()=>{
        return calendarend.value.toLocaleDateString("en-CA");
    });
    const calcdate = (day, week) =>{
        return new Date(calendarstart.value.getFullYear(), calendarstart.value.getMonth(), calendarstart.value.getDate()+day-1+(week-1)*7);
    }
    const nextmonth =async()=>{
        if(month.value==11){
            month.value=0;
            year.value++;
        }else{
            month.value++;
        }
        await resmonth();
    }
    const lastmonth =async()=>{
        if(month.value==0){
            month.value=11;
            year.value--;
        } else{
            month.value--;
        }
        await resmonth();
    }    
    const resmonth = async() =>{
        await axios
        .get(`http://localhost:8086/api/resmonth?start=${calendarstarttext.value}&end=${calendarendtext.value}`)
        .then((response)=>{
            reslist.splice(0,reslist.length, ...response.data.resmonth);
            //console.log(reslist)
        })
        .catch((error)=>{
            console.log("what the hell " + error)
        })
        distribute();
    }
    const distribute = () =>{
        const travelplan =[];
        const tColor = ['coral','yellowgreen','pink','turquoise','mediumpurple']
        let colorindex = 0;
        for(let res of reslist){
            const travelstart = new Date(res.chkin_Date);
            const travelend = new Date(res.chkout_Date);
            while(travelstart<=travelend){
                travelplan.push([travelstart.toLocaleDateString("en-CA"), res , tColor[colorindex]]);
                travelstart.setDate(travelstart.getDate()+1);
            }
            colorindex = (colorindex + 1) % tColor.length ;
        }
        resdaylist.splice(0,resdaylist.length, ...travelplan)
    }
    const dayplans = (today) =>{
        const plan = [];
        for(let res of resdaylist){
            if(res[0]==today){
                plan.push(res);
            }
        }
        return plan;
    }
    const oneres = ref('');
    const showmethedetail = ref('');
    const showthisRes = (thisres) =>{
        showmethedetail.value = 'block';
        oneres.value=thisres;
    }
    const closedetail = () =>{
        showmethedetail.value = 'none';
    }
onMounted(async()=>{
    await resmonth();
});
</script>
<style>
    .calendar table{
        border-collapse: collapse;
        display: inline-block;
        width: 100%;
    }
    .calendar thead{
        text-align: center;
        background-color: #B2D055;
        color: white;
        font-size: 20px;
        font-weight: bold;
        text-wrap: nowrap;
    }
</style>