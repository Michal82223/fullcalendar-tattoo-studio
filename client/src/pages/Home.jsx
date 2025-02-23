import React, {useEffect} from "react";
import {Link} from 'react-router';

const Home = () => {
    useEffect(() => {
        document.title = 'Home | FBTS';
      }, []);
    return (
        <div className="col-12 col-md-6 col-lg-6">
            <div className="d-flex justify-content-center">
            <div className="jumbotron text-center">
                <h1 className="display-3 mb-4">Front Back Tattoos Studio</h1>
                <h2 className="mb-4">Wytatuuj sobie nie tylko tył i przód!<br></br>Zapisz się na wizytę już teraz</h2>
                <Link to='/calendar'><button className="link">Zapisz się!</button></Link>
            </div>
        </div>
        </div>
    )
}

export default Home