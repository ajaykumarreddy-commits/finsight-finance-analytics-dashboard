import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";

function App(){

const token = localStorage.getItem("token");

return(

<BrowserRouter>

<Routes>

{!token ? (

<>
<Route path="/" element={<Login/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
</>

):( 

<>
<Route
path="/"
element={
<Layout>
<Dashboard/>
</Layout>
}
/>

<Route
path="/analytics"
element={
<Layout>
<Analytics/>
</Layout>
}
/>

</>

)}

</Routes>

</BrowserRouter>

);

}

export default App;