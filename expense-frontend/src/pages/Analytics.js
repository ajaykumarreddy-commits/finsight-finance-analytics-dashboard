import { useState, useEffect } from "react";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
ArcElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
ArcElement,
Tooltip,
Legend
);

function Analytics(){

const token = localStorage.getItem("token");

const [categoryData,setCategoryData] = useState({});
const [dailyData,setDailyData] = useState({});
const [monthlyData,setMonthlyData] = useState({});



useEffect(()=>{

const fetchCategory = async ()=>{

const res = await fetch(
"http://127.0.0.1:8000/analytics/category",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();
setCategoryData(data);

};



const fetchDaily = async ()=>{

const now = new Date();

const res = await fetch(
`http://127.0.0.1:8000/analytics/daily/${now.getFullYear()}/${now.getMonth()+1}`,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();
setDailyData(data);

};



const fetchMonthly = async ()=>{

const now = new Date();

const res = await fetch(
`http://127.0.0.1:8000/analytics/monthly/${now.getFullYear()}/${now.getMonth()+1}`,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();
setMonthlyData(data);

};



fetchCategory();
fetchDaily();
fetchMonthly();

},[token]);



const categoryChart = {

labels:Object.keys(categoryData),

datasets:[{
label:"Category Spending",
data:Object.values(categoryData),
backgroundColor:[
"#FF6384",
"#36A2EB",
"#FFCE56",
"#4BC0C0",
"#9966FF"
]
}]

};



const dailyChart = {

labels:Object.keys(dailyData),

datasets:[{
label:"Daily Spending",
data:Object.values(dailyData),
borderColor:"#36A2EB",
backgroundColor:"#36A2EB",
fill:false
}]

};



const monthlyChart = {

labels:[monthlyData.month],

datasets:[{
label:"Monthly Spending",
data:[monthlyData.total_spent],
backgroundColor:"#4BC0C0"
}]

};



return(

<div className="p-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold mb-6">
Financial Analytics Dashboard
</h1>



<div className="grid grid-cols-2 gap-8">

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">
Category Spending
</h2>

<Pie data={categoryChart}/>

</div>



<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-bold mb-4">
Daily Spending Trend
</h2>

<Line data={dailyChart}/>

</div>

</div>



<div className="bg-white p-6 rounded shadow mt-8">

<h2 className="text-xl font-bold mb-4">
Monthly Spending
</h2>

<Bar data={monthlyChart}/>

</div>

</div>

);

}

export default Analytics;