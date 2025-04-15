import CreatePact from './pages/CreatePact.jsx';
import ViewAllPacts from './pages/ViewAllPacts.jsx';
import CollapsibleTable from './components/CollapsibleTable.jsx';
import IconButtons from './components/IconButton.jsx';
import './App.css'

function App() {
  return (
    <main>
      <CreatePact />
      <ViewAllPacts />
      <div>
        <CollapsibleTable />
      </div>
    </main>
  );
}

// function App() {
//   return (
//     <>
//       <h1>CommitFit</h1>
//       <div className="card">
//         <button>Create</button>
//         <p>
//           This is the homepage
//         </p>
//       </div>
//     </>
//   )
// }

export default App
