import React, { useState } from 'react';
import _ from 'lodash';


// import { Map, Marker, Popup, TileLayer } from "react-leaflet";

//import {Button} from 'reactstrap';
//import useParams from 'react-router-dom';
//import { permute } from 'd3';



function App(props) {
  const [art, setArt] = useState(props.art);

  let category = _.groupBy(art, "category");
  let categArray = Object.keys(category);

  const handleMatch = function(artist, category, title) {   
    let copy = art.map(piece => {
      let tempCopy = {...piece};
     // console.log(tempCopy);
      artist = artist.toLowerCase();
      title = title.toLowerCase();
      let tartist = tempCopy.artist.toLowerCase();
      let ttitle = tempCopy.title.toLowerCase();
      if (tartist === artist ||
          tempCopy.category === category ||
          ttitle === title) {
        tempCopy.match = true;
      }
      return tempCopy;
    })
    setArt(copy);
  }

  return (
    <div>
      <main>
        <Header />
        <Filters categs={categArray} filterCallback={handleMatch}/>
        <LeafletMap />
        <Cards art={art}/>
      </main>
    </div>
  );
}

export default App;


export function Header() {
  return (
    <section className="jumbotron jumbotron-fluid text-center">
      <div className="container">
        <h1>SEATTLE GALLERY GLOSSARY</h1>
        <p className="lead">Bringing Seattle's best art within reach.</p>
      </div>
      <div>
        <p>

        </p>
        <a className="btn btn-dark" href="splash.html" role="button">Back to Splash</a>
      </div>
    </section>
  );
}

export function Filters(props) {

  const [artistInput, setArtist] = useState("ARTIST");
  const [catInput, setCategory] = useState("CATEGORY");
  const [titleInput, setTitle] = useState("TITLE");


  const changeArtist = (event) => {
    let newValue = event.target.value;
    setArtist(newValue);
  };
  
  const changeCategory = (event) => {
    let newValue = event.target.value;
    setCategory(newValue);
  };

  const changeTitle = (event) => {
    let newValue = event.target.value;
    setTitle(newValue);
  };

  // const logValue = () => {
  //   console.log(catInput);
  // };

  return (
    <section>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="filters">
            <form onSubmit={() => props.filterCallback(artistInput, catInput, titleInput)}>
             {/* ={logValue}> */}
              <div className="col-sm-4">
                <input type="text" id="artist" className="artistname" placeholder="ARTIST" aria-label="enter artist name" onChange={changeArtist} />
              </div>
              <div className="col-sm-4">
                <select id="category" className="category" placeholder="CATEGORY" aria-label="enter art category" onChange={changeCategory}>
                  <option defaultValue="">MOVEMENT</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="native american">Native American</option>
                  <option value="modern / contemporary">Modern or Contemporary</option>
                  <option value="european">European</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="photography">Photography</option>
                  </select> 
                <div className="col-sm-4">
                  <input type="text" id="title" className="arttitle" placeholder="TITLE" aria-label="enter title of artwork" onChange={changeTitle}/>
                </div>
              </div>
              <div>
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}



export function LeafletMap(props) {

  // return (
  //   <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
  //     <TileLayer
  //       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //     />
  //     <Marker position={position}>
  //       <Popup>
  //         A pretty CSS3 popup. <br /> Easily customizable.
  //       </Popup>
  //     </Marker>
  //   </MapContainer>
  // )

  return (
    <section class="museum-map">
      <div class="text-dark" id="map" aria-label="map of Seattle"></div>
    </section>
  )
}

export function Cards(props) {
  let art = props.art;
  let cards = art.map(piece => <CardTemplate key={piece.title + piece.artist} piece={piece}/>)
  return(
    <section className="mu-cards">
      <h2>Matching Pieces of Art</h2>
      <div className="museum-cards py-5">
        <div className="container" id="card-cont">
          <div className="row" id="card-row">
            {cards};
          </div>
        </div>
      </div>
    </section>
  )
}

export function CardTemplate(props) {
  //console.log(props.piece);
  let piece = props.piece;
  let image = "../public/" + piece.img;
  //const returnVal

  if (piece.match) {
  return (
    <div className="col col-md-6 d-flex lg-h-100 col-xl-3">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-auto">
              <img className="pb-3" id="pic" src={image} alt={piece.title} />
            </div>
            <div className="col-sm">
              <h2 className="card-title" id={piece.title}>{piece.title} by {piece.artist}</h2>
              <h3 className="info" id="info">{piece.museum}</h3>
              <a className="btn btn-dark" href={piece.website} id="website" role="button">Visit Website</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
  return null;
 }
 


export function Footer(props) {
  
}
