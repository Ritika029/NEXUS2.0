import React from 'react';
import './App.css';
import WalletCard from './WalletCard';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import * as ReactDOM from "react-dom";
// import AnotherPage from './components/AnotherPage'; // Assuming you have AnotherPage.js for the new HTML page
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <WalletCard />,
//     // loader: rootLoader,
//     children: [
//       {
//         path: "anotherpage",
//         element: <AnotherPage />,
//         // loader: teamLoader,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );

// function App() {
//   return (
//     <Router>
//       {/* <div className="App"> */}
//       <Routes>
//         <Route path="/" exact element={WalletCard} />
//         <Route path="/anotherpage" element={AnotherPage} />
//       </Routes>
//       {/* </div> */}
//     </Router>
//   );
// }

function App() {

  return (
    <div className="App">
    <WalletCard/>
    </div>
  );
}

export default App;