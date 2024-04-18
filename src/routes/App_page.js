import logo from '../logo.svg';
import Card from '../common/Card'
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Deck from '../common/Deck';

// async function loader({ request }) {
//   const result = await fetch("/api/deck", {
//     signal: request.signal,
//     method: "get",
//   });
//   if (result.ok) {
//     return await result.json()
//   } else {
//     // this is just going to trigger the 404 page, but we can fix that later :|
//     throw new Response("ERROR", { status: result.status });
//   }
// }

function App() {
  const [decks, setDecks] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function fetchData() {
      const result = await fetch("/api/deck", {
            method: "get",
          });
      if (result.ok) {
        const body = await result.json()
        setDecks(body.data)
        setLoading(false)
      } else {
        console.log(result);
        // todo, be better.
      }
    }
    const handle = setInterval(fetchData, 10000);
    return ()=>{
      clearInterval(handle);
    }
  },[])


  async function newDeck() {
    const result = await fetch("/api/deck", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({name})
    })
    if (result.ok) {
      setDecks([...decks, await result.json()]);
      setName("");
    }
  }
  if (loading) {
    return <span>LOADING</span>
  } else {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
            {decks.map(deck => <Deck key={deck._id} deck={deck}></Deck>)}
            <input value={name} placeholder="name" onChange={e=>setName(e.target.value)}></input>
            <button onClick={newDeck}>Add Deck</button>
        </div>
      </header>
  );
  }
}

export const App_Page = {
  path:"/",
  element:<App></App>,
  // loader:loader
}