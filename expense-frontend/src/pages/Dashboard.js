import { useState, useEffect, useCallback } from "react";

function Dashboard() {

const token = localStorage.getItem("token");

const [expenses,setExpenses] = useState([]);

const [amount,setAmount] = useState("");
const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [date,setDate] = useState("");

const [editId,setEditId] = useState(null);
const [search,setSearch] = useState("");

const [budget,setBudget] = useState(null);
const [newBudget,setNewBudget] = useState("");

const [insights,setInsights] = useState(null);



const fetchExpenses = useCallback(async ()=>{

const res = await fetch(
"http://127.0.0.1:8000/expenses/all",
{ headers:{ Authorization:`Bearer ${token}` } }
);

const data = await res.json();

if(Array.isArray(data)){
setExpenses(data);
}

},[token]);



const fetchBudget = useCallback(async ()=>{

const res = await fetch(
"http://127.0.0.1:8000/budget/current",
{ headers:{ Authorization:`Bearer ${token}` } }
);

const data = await res.json();
setBudget(data);

},[token]);



const fetchInsights = useCallback(async ()=>{

const res = await fetch(
"http://127.0.0.1:8000/insights/summary",
{ headers:{ Authorization:`Bearer ${token}` } }
);

const data = await res.json();
setInsights(data);

},[token]);



useEffect(()=>{

fetchExpenses();
fetchBudget();
fetchInsights();

},[fetchExpenses,fetchBudget,fetchInsights]);



const clearForm = ()=>{

setAmount("");
setCategory("");
setDescription("");
setDate("");

};



const addExpense = async ()=>{

const res = await fetch(
"http://127.0.0.1:8000/expenses/add",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
amount:Number(amount),
category,
description,
date
})
}
);

if(res.ok){

clearForm();
fetchExpenses();

}

};



const updateExpense = async ()=>{

const res = await fetch(
`http://127.0.0.1:8000/expenses/update/${editId}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
amount:Number(amount),
category,
description,
date
})
}
);

if(res.ok){

clearForm();
setEditId(null);
fetchExpenses();

}

};



const deleteExpense = async(id)=>{

await fetch(
`http://127.0.0.1:8000/expenses/delete/${id}`,
{
method:"DELETE",
headers:{ Authorization:`Bearer ${token}` }
}
);

fetchExpenses();

};



const startEdit = (exp)=>{

setEditId(exp.id);
setAmount(exp.amount);
setCategory(exp.category);
setDescription(exp.description);
setDate(exp.date);

};



const setBudgetValue = async ()=>{

try{

const res = await fetch(
"http://127.0.0.1:8000/budget/set",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
monthly_budget:Number(newBudget)
})
}
);

const data = await res.json();

if(res.ok){

alert(data.message);
fetchBudget();
setNewBudget("");

}

}catch{

alert("Backend not reachable");

}

};



const exportCSV = ()=>{

const headers=["ID","Amount","Category","Description","Date"];

const rows=expenses.map(exp=>[
exp.id,
exp.amount,
exp.category,
exp.description,
exp.date
]);

const csv=[headers,...rows].map(r=>r.join(",")).join("\n");

const blob=new Blob([csv],{type:"text/csv"});
const url=window.URL.createObjectURL(blob);

const a=document.createElement("a");
a.href=url;
a.download="expenses.csv";
a.click();

};



const totalSpent = expenses.reduce((sum,e)=>sum+e.amount,0);

const remaining = budget ? budget.monthly_budget-totalSpent : 0;

const percent = budget ? (totalSpent/budget.monthly_budget)*100 : 0;



const filteredExpenses = expenses.filter(exp=>
exp.description.toLowerCase().includes(search.toLowerCase())
);



return(

<div className="p-10 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold mb-2">
Finance Analytics Dashboard
</h1>

<p className="text-gray-500 mb-6">
Track spending and analyze financial habits
</p>



{/* DASHBOARD METRIC CARDS */}

<div className="grid grid-cols-4 gap-6 mb-8">

<div className="bg-blue-500 text-white p-6 rounded-lg shadow">
<p className="text-sm">Total Spending</p>
<h2 className="text-3xl font-bold">₹{totalSpent}</h2>
</div>

<div className="bg-green-500 text-white p-6 rounded-lg shadow">
<p className="text-sm">Transactions</p>
<h2 className="text-3xl font-bold">{expenses.length}</h2>
</div>

<div className="bg-purple-500 text-white p-6 rounded-lg shadow">
<p className="text-sm">Highest Expense</p>
<h2 className="text-3xl font-bold">
₹{expenses.length?Math.max(...expenses.map(e=>e.amount)):0}
</h2>
</div>

<div className="bg-orange-500 text-white p-6 rounded-lg shadow">
<p className="text-sm">Remaining Budget</p>
<h2 className="text-3xl font-bold">₹{remaining}</h2>
</div>

</div>



{/* BUDGET TRACKER */}

<div className="bg-white p-6 rounded-lg shadow mb-8">

<h2 className="text-xl font-bold mb-3">
Monthly Budget
</h2>

<input
type="number"
placeholder="Set monthly budget"
value={newBudget}
onChange={(e)=>setNewBudget(e.target.value)}
className="border p-2 mr-3"
/>

<button
onClick={setBudgetValue}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Set Budget
</button>

{budget && (

<div className="mt-4">

<p>Budget: ₹{budget.monthly_budget}</p>
<p>Spent: ₹{totalSpent}</p>
<p>Remaining: ₹{remaining}</p>

<div className="w-full bg-gray-200 rounded-full h-5 mt-4">

<div
className={`h-5 rounded-full ${
percent>80?"bg-red-500":"bg-green-500"
}`}
style={{width:`${percent}%`}}
></div>

</div>

<p className="mt-2 text-sm">
{percent.toFixed(1)}% of budget used
</p>

</div>

)}

</div>



{/* AI INSIGHTS */}

<div className="bg-white p-6 rounded-lg shadow mb-8">

<h2 className="text-xl font-bold mb-4">
AI Financial Insights
</h2>

{insights && (

<div className="space-y-3">

<p>
📊 Top spending category:
<b> {insights.top_category}</b>
</p>

<p>
📅 Average daily spending:
<b> ₹{insights.average_daily_spend}</b>
</p>

<p>
📈 Predicted monthly spending:
<b> ₹{insights.predicted_monthly_spend}</b>
</p>

</div>

)}

</div>



{/* ADD / EDIT FORM */}

<div className="bg-white p-6 rounded-lg shadow mb-8">

<h2 className="text-xl font-bold mb-4">
{editId?"Edit Expense":"Add Expense"}
</h2>

<div className="grid grid-cols-4 gap-4">

<input
className="border p-2"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<input
className="border p-2"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<input
className="border p-2"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
type="date"
className="border p-2"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

</div>

<button
onClick={editId?updateExpense:addExpense}
className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
>
{editId?"Update Expense":"Add Expense"}
</button>

</div>



{/* SEARCH + EXPORT */}

<div className="flex justify-between mb-4">

<input
type="text"
placeholder="Search description..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-2 rounded"
/>

<button
onClick={exportCSV}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Export CSV
</button>

</div>



{/* EXPENSE TABLE */}

<table className="w-full bg-white shadow rounded-lg overflow-hidden">

<thead className="bg-gray-800 text-white">

<tr>
<th className="p-3">Amount</th>
<th>Category</th>
<th>Description</th>
<th>Date</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filteredExpenses.map(exp=>(

<tr key={exp.id} className="text-center border-t">

<td>{exp.amount}</td>
<td>{exp.category}</td>
<td>{exp.description}</td>
<td>{exp.date}</td>

<td>

<button
onClick={()=>startEdit(exp)}
className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
Edit
</button>

<button
onClick={()=>deleteExpense(exp.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Dashboard;