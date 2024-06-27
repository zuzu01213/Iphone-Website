import {Navbar} from "./components/Navbar.jsx";
import {Highlights} from "./components/Highlights.jsx";
import {Hero} from "./components/Hero.jsx";
import {Model} from "./components/Model.jsx";
import {Feature} from "./components/Feature.jsx";
const App = () => {

  return (

      <main className={"bg-black"}>

          <Navbar/>
          <Hero/>
          <Highlights/>
          <Model/>
          <Feature/>
      </main>
  )
}

export default App
