import './App.css';
import DynamicList from './DynamicList';
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container>
          <Grid item lg={12}>
            <DynamicList/>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
