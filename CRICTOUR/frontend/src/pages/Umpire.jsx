import React, { useState, useEffect } from "react";
import axios from "axios";

function Umpire() {
    const [umpires, setUmpires] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/umpire')
            .then(response => response.json())
            .then(data => setUmpires(data))
            .catch(error => console.error(error));
    }, []);

    console.log(umpires);

    return (
        <div>
            <center>
                <h2>Umpire Information</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Nationality</th>
                            <th>Age</th>
                            <th>Image</th>
                            <th>Person ID</th>
                            <th>No. of Matches Conducted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {umpires.map(umpire => (
                            <tr key={umpire.personid}>
                                <td>{umpire.full_name}</td>
                                <td>{umpire.nationality}</td>
                                <td>{umpire.age}</td>
                                <td><img src={umpire.image} alt="Umpire" style={{ maxWidth: "100px" }} /></td>
                                <td>{umpire.personid}</td>
                                <td>{umpire.no_of_match_conducted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Umpire;
